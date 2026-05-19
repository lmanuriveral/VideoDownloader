import { useState, useCallback, useRef } from "react";
import { AxiosError } from "axios";

import { videoApi } from "../lib/api";

interface ApiErrorResponse {
  message?: string;
}

export function useDownload() {
  const [progress, setProgress] = useState<number>(0);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const cleanupRef = useRef<(() => void) | null>(null);

  const startDownload = useCallback(
    async (url: string, formatId: string): Promise<void> => {
      setIsDownloading(true);
      setProgress(0);
      setIsDone(false);
      setError("");

      try {
        const { jobId } = await videoApi.startDownload(url, formatId);

        cleanupRef.current = videoApi.subscribeProgress(
          jobId,
          (percentage: number) => {
            setProgress(percentage);
          },
          () => {
            setIsDone(true);
            setIsDownloading(false);

            // Dispara la descarga automática en el navegador.
            const link = document.createElement("a");
            link.href = videoApi.getFileUrl(jobId);
            link.download = "video";
            link.click();
          },
        );
      } catch (error: unknown) {
        let message = "Error al iniciar la descarga";

        if (error instanceof AxiosError) {
          const axiosError = error as AxiosError<ApiErrorResponse>;

          message = axiosError.response?.data?.message ?? message;
        }

        console.error("Download error:", error);

        setError(message);
        setIsDownloading(false);
      }
    },
    [],
  );

  const cancel = useCallback((): void => {
    cleanupRef.current?.();
    cleanupRef.current = null;

    setIsDownloading(false);
    setProgress(0);
    setIsDone(false);
    setError("");
  }, []);

  return {
    progress,
    isDownloading,
    isDone,
    error,
    startDownload,
    cancel,
  };
}
