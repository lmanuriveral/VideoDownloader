import { useState, useCallback } from 'react';
import { AxiosError } from 'axios';

import { videoApi } from '../lib/api';
import type { VideoInfo, DownloadStatus } from '../types/video';

export function useVideoInfo() {
  const [status, setStatus] = useState<DownloadStatus>('idle');
  const [info, setInfo] = useState<VideoInfo | null>(null);
  const [error, setError] = useState<string>('');

  const fetchInfo = useCallback(async (url: string): Promise<void> => {
    setStatus('loading');
    setError('');

    try {
      const data = await videoApi.getInfo(url);
      setInfo(data);
      setStatus('ready');
    } catch (error: unknown) {
      let message = 'No se pudo obtener información del video';

      if (error instanceof AxiosError) {
        message =
          error.response?.data?.message ?? message;
      }

      setError(message);
      setStatus('error');
      setInfo(null);
    }
  }, []);

  const reset = useCallback((): void => {
    setStatus('idle');
    setInfo(null);
    setError('');
  }, []);

  return {
    status,
    info,
    error,
    fetchInfo,
    reset,
  };
}