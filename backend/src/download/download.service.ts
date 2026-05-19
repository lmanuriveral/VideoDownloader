import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { spawn, execFile, type ExecFileException } from 'child_process';
import type { ChildProcessWithoutNullStreams } from 'child_process';
import { promisify } from 'util';
import * as path from 'path';
import * as fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

const execFileAsync = promisify(execFile);

export interface VideoFormat {
  formatId: string;
  ext: string;
  resolution: string;
  filesize: number | null;
  vcodec: string;
  acodec: string;
  tbr: number;
  label: string;
}

export interface VideoInfo {
  title: string;
  thumbnail: string;
  duration: number;
  platform: string;
  uploader: string;
  formats: VideoFormat[];
}

/**
 * Tipado parcial de la respuesta JSON de yt-dlp.
 */
interface YtDlpFormat {
  format_id?: string;
  ext?: string;
  resolution?: string;
  height?: number;
  filesize?: number;
  filesize_approx?: number;
  vcodec?: string;
  acodec?: string;
  tbr?: number;
}

interface YtDlpInfo {
  title?: string;
  thumbnail?: string;
  duration?: number;
  extractor_key?: string;
  uploader?: string;
  formats?: YtDlpFormat[];
}

@Injectable()
export class DownloadService {
  private readonly logger = new Logger(DownloadService.name);
  private readonly tempDir = path.join(process.cwd(), 'temp');
  private readonly oneHourMs = 60 * 60 * 1000;

  constructor() {
    // Evita no-floating-promises
    void this.initialize();
  }

  private async initialize(): Promise<void> {
    await fs.mkdir(this.tempDir, { recursive: true });

    // Evita no-misused-promises
    setInterval(() => {
      void this.cleanupOldFiles();
    }, this.oneHourMs);
  }

  async getVideoInfo(url: string): Promise<VideoInfo> {
    try {
      const { stdout } = await execFileAsync(
        'yt-dlp',
        ['--dump-json', '--no-playlist', '--no-warnings', url],
        { timeout: 30_000 },
      );

      const parsed: unknown = JSON.parse(stdout);
      const info = this.isYtDlpInfo(parsed) ? parsed : {};

      return {
        title: info.title ?? 'Sin título',
        thumbnail: info.thumbnail ?? '',
        duration: info.duration ?? 0,
        platform: info.extractor_key ?? 'Unknown',
        uploader: info.uploader ?? 'Unknown',
        formats: this.parseFormats(info.formats ?? []),
      };
    } catch (error: unknown) {
      const err = error as ExecFileException;

      if (
        typeof err.message === 'string' &&
        err.message.includes('Unsupported URL')
      ) {
        throw new BadRequestException('URL no soportada o privada');
      }

      this.logger.error('Error obteniendo información del video', error);
      throw new InternalServerErrorException(
        'Error al obtener información del video',
      );
    }
  }

  private parseFormats(rawFormats: YtDlpFormat[]): VideoFormat[] {
    return rawFormats
      .filter((format) => format.vcodec !== 'none' || format.acodec !== 'none')
      .map(
        (format): VideoFormat => ({
          formatId: format.format_id ?? '',
          ext: format.ext ?? 'mp4',
          resolution:
            format.resolution ??
            (typeof format.height === 'number' ? `${format.height}p` : 'audio'),
          filesize: format.filesize ?? format.filesize_approx ?? null,
          vcodec: format.vcodec ?? 'none',
          acodec: format.acodec ?? 'none',
          tbr: format.tbr ?? 0,
          label: this.buildFormatLabel(format),
        }),
      )
      .sort((a, b) => b.tbr - a.tbr)
      .slice(0, 10);
  }

  private buildFormatLabel(format: YtDlpFormat): string {
    if (format.vcodec === 'none') {
      return `Solo audio · ${(format.ext ?? 'mp3').toUpperCase()}`;
    }

    const resolution =
      typeof format.height === 'number' ? `${format.height}p` : 'SD';

    const size =
      typeof format.filesize === 'number'
        ? ` · ${(format.filesize / 1e6).toFixed(1)} MB`
        : '';

    return `${resolution} · ${(format.ext ?? 'mp4').toUpperCase()}${size}`;
  }

  async downloadVideo(
    url: string,
    formatId: string,
    onProgress: (pct: number) => void,
  ): Promise<string> {
    const jobId = uuidv4();
    const outputTemplate = path.join(this.tempDir, `${jobId}.%(ext)s`);

    return new Promise<string>((resolve, reject) => {
      /**
       * Si el cliente envía:
       * - "mp3"       → descarga audio y convierte a MP3
       * - "best"      → mejor calidad disponible
       * - "137+140"   → formato específico seleccionado por el usuario
       */
      const args: string[] = ['--no-playlist', '--newline'];

      if (formatId === 'mp3') {
        args.push('-x', '--audio-format', 'mp3', '--audio-quality', '0');
      } else {
        args.push(
          '-f',
          formatId === 'best' ? 'bv*+ba/b' : formatId,
          '--merge-output-format',
          'mp4',
        );
      }

      args.push('-o', outputTemplate, url);

      this.logger.log(`Ejecutando yt-dlp: ${args.join(' ')}`);

      const process: ChildProcessWithoutNullStreams = spawn('yt-dlp', args);

      let outputFile: string | undefined;
      let stderrOutput = '';

      process.stdout.on('data', (chunk: Buffer) => {
        const line = chunk.toString('utf8');

        // Progreso: [download]  53.2%
        const progressMatch = line.match(/\[download\]\s+([\d.]+)%/);
        if (progressMatch?.[1]) {
          onProgress(Number.parseFloat(progressMatch[1]));
        }

        // Archivo destino
        const destinationMatch = line.match(/Destination:\s+(.+)/);
        if (destinationMatch?.[1]) {
          outputFile = destinationMatch[1].trim();
        }

        // Archivo fusionado
        const mergeMatch = line.match(/Merging formats into "(.+)"/);
        if (mergeMatch?.[1]) {
          outputFile = mergeMatch[1].trim();
        }

        // Archivo final tras postprocesado
        const moveMatch = line.match(/Moving file "(.+)" to "(.+)"/);
        if (moveMatch?.[2]) {
          outputFile = moveMatch[2].trim();
        }
      });

      process.stderr.on('data', (chunk: Buffer) => {
        const text = chunk.toString('utf8');
        stderrOutput += text;
        this.logger.error(`yt-dlp stderr: ${text}`);
      });

      process.on('error', (error: Error) => {
        reject(
          new InternalServerErrorException(
            `No se pudo ejecutar yt-dlp: ${error.message}`,
          ),
        );
      });

      process.on('close', (code: number | null): void => {
        void (async () => {
          // Si no capturamos outputFile, buscamos el archivo generado
          if (!outputFile && code === 0) {
            try {
              const files = await fs.readdir(this.tempDir);
              const generated = files.find((file) => file.startsWith(jobId));

              if (generated) {
                outputFile = path.join(this.tempDir, generated);
              }
            } catch (error: unknown) {
              this.logger.error('Error buscando archivo generado', error);
            }
          }

          if (code === 0 && outputFile) {
            onProgress(100);
            resolve(outputFile);
            return;
          }

          if (stderrOutput.includes('Requested format is not available')) {
            reject(
              new BadRequestException(
                'El formato seleccionado no está disponible para este video.',
              ),
            );
            return;
          }

          if (stderrOutput.includes('Video unavailable')) {
            reject(
              new BadRequestException(
                'El video no está disponible o es privado.',
              ),
            );
            return;
          }

          reject(
            new InternalServerErrorException(
              `yt-dlp terminó con código ${code ?? 'null'}. ${stderrOutput}`,
            ),
          );
        })();
      });
    });
  }

  private async cleanupOldFiles(): Promise<void> {
    try {
      const files = await fs.readdir(this.tempDir);
      const now = Date.now();

      for (const file of files) {
        const filePath = path.join(this.tempDir, file);
        const stats = await fs.stat(filePath);

        if (now - stats.mtimeMs > this.oneHourMs) {
          await fs.unlink(filePath).catch(() => {
            this.logger.warn(`No se pudo eliminar ${filePath}`);
          });
        }
      }
    } catch (error: unknown) {
      this.logger.error('Error limpiando archivos temporales', error);
    }
  }

  /**
   * Type guard para validar que el JSON de yt-dlp
   * tenga la estructura esperada.
   */
  private isYtDlpInfo(value: unknown): value is YtDlpInfo {
    return typeof value === 'object' && value !== null;
  }
}
