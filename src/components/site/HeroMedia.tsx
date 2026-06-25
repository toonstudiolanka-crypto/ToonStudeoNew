"use client";

import { useState } from "react";
import { getVimeoId } from "@/lib/vimeo";
import { getYouTubeId } from "@/lib/youtube";
import { dispatchHeroVideoReady } from "@/lib/youtube-player";
import { HeroVimeoBackground } from "./HeroVimeoBackground";
import { HeroYouTubeBackground } from "./HeroYouTubeBackground";

const coverStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
};

type Props = {
  url?: string;
  type?: "image" | "video";
  placeholder?: string;
};

export function HeroMedia({ url, type = "video", placeholder }: Props) {
  const [fallbackImage, setFallbackImage] = useState(false);

  if (!url) {
    return (
      <div
        style={{
          ...coverStyle,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#141416",
          color: "rgba(255,255,255,.35)",
          fontSize: 13,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          textAlign: "center",
          padding: 16,
        }}
      >
        {placeholder || "Add hero media"}
      </div>
    );
  }

  if (type === "video" && getVimeoId(url)) {
    return <HeroVimeoBackground url={url} />;
  }

  if (type === "video" && getYouTubeId(url)) {
    return <HeroYouTubeBackground url={url} />;
  }

  if (type === "video" && !fallbackImage) {
    return (
      <video
        src={url}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onCanPlayThrough={() => dispatchHeroVideoReady()}
        onError={() => setFallbackImage(true)}
        style={coverStyle}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      alt=""
      referrerPolicy="no-referrer"
      onLoad={() => dispatchHeroVideoReady()}
      style={coverStyle}
    />
  );
}
