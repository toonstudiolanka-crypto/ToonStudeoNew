"use client";

import { useEffect } from "react";
import { getYouTubeId } from "@/lib/youtube";
import { YouTubeModalPlayer } from "@/components/ui/YouTubeModalPlayer";

type Props = {
  videoUrl: string;
  title: string;
  onClose: () => void;
};

export function VideoPlayerModal({ videoUrl, title, onClose }: Props) {
  const youtubeId = getYouTubeId(videoUrl);
  const isDirectVideo = !youtubeId && /\.(mp4|webm|ogg)(\?|$)/i.test(videoUrl);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      data-video-modal
      role="dialog"
      aria-modal="true"
      aria-label={title}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(16px,4vw,40px)",
        background: "rgba(11,11,12,.88)",
        backdropFilter: "blur(14px)",
      }}
      onClick={onClose}
    >
      <div
        data-video-modal-panel
        style={{ width: "min(1100px,100%)", position: "relative" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close video"
          onClick={onClose}
          style={{
            position: "absolute",
            top: -48,
            right: 0,
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,.25)",
            background: "rgba(255,255,255,.08)",
            color: "#fff",
            fontSize: 22,
            cursor: "pointer",
            lineHeight: 1,
          }}
        >
          &times;
        </button>

        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16/9",
            borderRadius: 18,
            overflow: "hidden",
            background: "#000",
            boxShadow: "0 30px 80px rgba(0,0,0,.45)",
          }}
        >
          {youtubeId ? (
            <YouTubeModalPlayer url={videoUrl} title={title} />
          ) : isDirectVideo ? (
            <video
              src={videoUrl}
              controls
              autoPlay
              playsInline
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" }}
            />
          ) : (
            <iframe
              src={videoUrl}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
            />
          )}
        </div>

        <p
          style={{
            margin: "16px 0 0",
            fontFamily: "var(--font-bricolage)",
            fontWeight: 700,
            fontSize: "clamp(18px,2.5vw,24px)",
            color: "#F2EEE6",
          }}
        >
          {title}
        </p>
      </div>
    </div>
  );
}
