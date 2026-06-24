"use client";

import YouTube, { type YouTubeEvent } from "react-youtube";
import { getYouTubeId } from "@/lib/youtube";

type Props = {
  url: string;
  title: string;
  autoplay?: boolean;
};

export function YouTubeModalPlayer({ url, title, autoplay = true }: Props) {
  const videoId = getYouTubeId(url);
  if (!videoId) return null;

  const onReady = (event: YouTubeEvent) => {
    if (autoplay) event.target.playVideo();
  };

  return (
    <div data-youtube-modal-player style={{ position: "absolute", inset: 0 }}>
      <YouTube
        videoId={videoId}
        title={title}
        opts={{
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: autoplay ? 1 : 0,
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
            origin: typeof window !== "undefined" ? window.location.origin : "",
          },
        }}
        onReady={onReady}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
