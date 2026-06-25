"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { getVimeoBackgroundEmbedUrl, getVimeoId } from "@/lib/vimeo";
import { dispatchHeroVideoReady } from "@/lib/youtube-player";

type Props = {
  url: string;
};

type VimeoPlayer = {
  on: (event: string, cb: () => void) => void;
  play: () => Promise<void>;
  getPaused: () => Promise<boolean>;
};

declare global {
  interface Window {
    Vimeo?: {
      Player: new (el: HTMLIFrameElement) => VimeoPlayer;
    };
  }
}

export function HeroVimeoBackground({ url }: Props) {
  const readySentRef = useRef(false);
  const playerRef = useRef<VimeoPlayer | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [apiReady, setApiReady] = useState(false);
  const [playing, setPlaying] = useState(false);

  const videoId = getVimeoId(url);
  const embedUrl = videoId ? getVimeoBackgroundEmbedUrl(videoId) : "";

  const markReady = () => {
    if (readySentRef.current) return;
    readySentRef.current = true;
    dispatchHeroVideoReady();
  };

  useEffect(() => {
    if (!videoId || !apiReady || !iframeRef.current || !window.Vimeo) return;

    const player = new window.Vimeo.Player(iframeRef.current);
    playerRef.current = player;

    player.on("playing", () => {
      setPlaying(true);
      markReady();
    });

    player.on("bufferend", () => setPlaying(true));
    player.on("error", markReady);

    const resume = async () => {
      try {
        if (await player.getPaused()) await player.play();
      } catch {
        // ignore autoplay / cross-origin edge cases
      }
    };

    document.addEventListener("visibilitychange", resume);
    window.addEventListener("focus", resume);
    const watchdog = window.setInterval(resume, 4000);

    return () => {
      window.clearInterval(watchdog);
      document.removeEventListener("visibilitychange", resume);
      window.removeEventListener("focus", resume);
      playerRef.current = null;
    };
  }, [apiReady, videoId]);

  if (!videoId) return null;

  return (
    <div
      data-hero-vimeo
      data-playing={playing ? "true" : "false"}
      style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#0B0B0C" }}
    >
      <Script src="https://player.vimeo.com/api/player.js" onLoad={() => setApiReady(true)} />

      <div
        data-hero-vimeo-player
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "max(100vw, 177.78vh)",
          height: "max(56.25vw, 100vh)",
          transform: "translate(-50%, -50%)",
          opacity: playing ? 1 : 0,
          transition: "opacity 0.9s ease",
          pointerEvents: "none",
        }}
      >
        <iframe
          ref={iframeRef}
          src={embedUrl}
          title="Toon Web Video"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          onLoad={markReady}
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
        />
      </div>
    </div>
  );
}
