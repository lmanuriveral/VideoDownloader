import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  MessageEvent,
  Param,
  Post,
  Res,
  Sse,
  UseGuards,
} from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import type { Response } from 'express';
import { Observable, Subject } from 'rxjs';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as mime from 'mime-types';
import { v4 as uuidv4 } from 'uuid';

import { DownloadService } from './download.service';
import { GetInfoDto } from './dto/info.dto';
import { DownloadDto } from './dto/download.dto';

interface DownloadJob {
  progress$: Subject<number>;
  filePath?: string;
}

const downloadJobs = new Map<string, DownloadJob>();

@Controller('download')
@UseGuards(ThrottlerGuard)
export class DownloadController {
  constructor(private readonly downloadService: DownloadService) {}

  /**
   * POST /api/download/info
   */
  @Post('info')
  async getInfo(@Body() dto: GetInfoDto) {
    return this.downloadService.getVideoInfo(dto.url);
  }

  /**
   * POST /api/download/start
   * Inicia la descarga y devuelve un jobId.
   */
  @Post('start')
  startDownload(@Body() dto: DownloadDto): { jobId: string } {
    const jobId = uuidv4();
    const progress$ = new Subject<number>();

    downloadJobs.set(jobId, { progress$ });

    void this.downloadService
      .downloadVideo(dto.url, dto.formatId, (percentage: number) => {
        progress$.next(percentage);
      })
      .then((filePath: string) => {
        const job = downloadJobs.get(jobId);

        if (!job) {
          return;
        }

        job.filePath = filePath;
        progress$.next(100);
        progress$.complete();
      })
      .catch((error: unknown) => {
        const message =
          error instanceof Error
            ? error.message
            : 'Error desconocido durante la descarga';

        progress$.error(new Error(message));
      });

    return { jobId };
  }

  /**
   * GET /api/download/progress/:jobId
   * Stream SSE con el progreso.
   */
  @Sse('progress/:jobId')
  progress(@Param('jobId') jobId: string): Observable<MessageEvent> {
    const job = downloadJobs.get(jobId);

    if (!job) {
      throw new HttpException('Job no encontrado', HttpStatus.NOT_FOUND);
    }

    return new Observable<MessageEvent>((observer) => {
      const subscription = job.progress$.subscribe({
        next: (percentage: number) => {
          observer.next({
            data: {
              progress: percentage,
            },
          });
        },
        complete: () => {
          observer.next({
            data: {
              progress: 100,
              done: true,
            },
          });
          observer.complete();
        },
        error: (error: unknown) => {
          observer.next({
            data: {
              error:
                error instanceof Error ? error.message : 'Error desconocido',
            },
          });
          observer.complete();
        },
      });

      return () => {
        subscription.unsubscribe();
      };
    });
  }

  /**
   * GET /api/download/file/:jobId
   * Descarga el archivo generado.
   */
  @Get('file/:jobId')
  getFile(
    @Param('jobId') jobId: string,
    @Res() res: Response,
  ): Response | void {
    const job = downloadJobs.get(jobId);

    if (!job?.filePath || !fs.existsSync(job.filePath)) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'Archivo no disponible',
      });
    }

    const extension = path.extname(job.filePath);
    const mimeType = mime.lookup(extension) || 'application/octet-stream';

    res.setHeader(
      'Content-Disposition',
      `attachment; filename="video${extension}"`,
    );
    res.setHeader('Content-Type', mimeType);

    const stream = fs.createReadStream(job.filePath);
    stream.pipe(res);

    // Limpieza 5 minutos después
    setTimeout(
      () => {
        try {
          if (fs.existsSync(job.filePath!)) {
            fs.unlinkSync(job.filePath!);
          }
        } catch {
          // Ignorar errores de limpieza
        }

        job.progress$.complete();
        downloadJobs.delete(jobId);
      },
      5 * 60 * 1000,
    );

    return undefined;
  }
}
