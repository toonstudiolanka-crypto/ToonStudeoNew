"use client";

import { useEffect } from "react";

const STORAGE_PREFIX = "toon-chunk-reload:";

function isChunkLoadFailure(message: string) {
  return (
    message.includes("ChunkLoadError") ||
    message.includes("Loading chunk") ||
    message.includes("Failed to fetch dynamically imported module")
  );
}

export function ChunkLoadRecovery() {
  useEffect(() => {
    function recoverOnce(message: string) {
      if (!isChunkLoadFailure(message)) return;

      const key = `${STORAGE_PREFIX}${window.location.pathname}`;
      if (sessionStorage.getItem(key)) return;

      sessionStorage.setItem(key, "1");
      window.location.reload();
    }

    const onError = (event: ErrorEvent) => {
      recoverOnce(event.message || "");
    };

    const onRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason?.message || String(event.reason ?? "");
      recoverOnce(reason);
    };

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);

    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);

  return null;
}
