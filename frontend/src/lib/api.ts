import axios from 'axios';
import type { VideoInfo } from '../types/video';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  timeout: 30000,
});

export const videoApi = {
  getInfo: (url: string) =>
    api.post<VideoInfo>('/download/info', { url }).then((r) => r.data),

  startDownload: (url: string, formatId: string) =>
    api
      .post<{ jobId: string }>('/download/start', { url, formatId })
      .then((r) => r.data),

  getFileUrl: (jobId: string) =>
    `${api.defaults.baseURL}/download/file/${jobId}`,

  subscribeProgress: (
    jobId: string,
    onProgress: (pct: number) => void,
    onDone: () => void,
  ) => {
    const es = new EventSource(
      `${api.defaults.baseURL}/download/progress/${jobId}`,
    );
    es.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.done) {
        onDone();
        es.close();
      } else if (data.progress !== undefined) onProgress(data.progress);
    };
    return () => es.close();
  },
};
