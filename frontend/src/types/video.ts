export interface VideoFormat {
  formatId: string;
  ext: string;
  resolution: string;
  filesize: number | null;
  label: string;
  vcodec: string;
  acodec: string;
}

export interface VideoInfo {
  title: string;
  thumbnail: string;
  duration: number;
  platform: string;
  uploader: string;
  formats: VideoFormat[];
}

export type DownloadStatus =
  | 'idle'
  | 'loading'
  | 'ready'
  | 'downloading'
  | 'done'
  | 'error';
