"use client";

import { useEffect, useRef, useState } from "react";
import YouTube, { YouTubeEvent, YouTubePlayer } from "react-youtube";
import { getYouTubeId, getYouTubeThumbnail } from "@/lib/youtube";
import { dispatchHeroVideoReady } from "@/lib/youtube-player";

type Props = {
  url: string;
};

export function HeroYouTubeBackground({ url }: Props) {
  const readySentRef = useRef(false);
  const hasPlayedRef = useRef(false);
  const playerRef = useRef<YouTubePlayer | null>(null);

  const [playing, setPlaying] = useState(false);
  const [buffering, setBuffering] = useState(true);
  const [posterSrc, setPosterSrc] = useState(() => getYouTubeThumbnail(url, "max") || getYouTubeThumbnail(url, "hq") || "");

  const videoId = getYouTubeId(url);
  const showPoster = !playing || buffering;

  useEffect(() => {
    const resume = () => {
      const player = playerRef.current;
      if (!player) return;
      const state = player.getPlayerState();
      if (state === 2 /* PAUSED */ || state === 0 /* ENDED */) {
        player.playVideo();
      }
    };

    document.addEventListener("visibilitychange", resume);
    window.addEventListener("focus", resume);
    const watchdog = window.setInterval(resume, 4000);

    return () => {
      window.clearInterval(watchdog);
      document.removeEventListener("visibilitychange", resume);
      window.removeEventListener("focus", resume);
    };
  }, []);

  if (!videoId) return null;

  const markReady = () => {
    if (readySentRef.current) return;
    readySentRef.current = true;
    dispatchHeroVideoReady();
  };

  const onReady = (event: YouTubeEvent) => {
    playerRef.current = event.target;
    event.target.mute();
    event.target.playVideo();
  };

  const onStateChange = (event: YouTubeEvent) => {
    const state = event.data;

    if (state === 1 /* PLAYING */) {
      hasPlayedRef.current = true;
      setPlaying(true);
      setBuffering(false);
      markReady();
    }

    if (state === 3 /* BUFFERING */) {
      setBuffering(true);
      if (hasPlayedRef.current) setPlaying(true);
    }

    if (state === 2 /* PAUSED */ || state === 0 /* ENDED */) {
      event.target.playVideo();
    }

    if (state === -1 /* UNSTARTED */) {
      setTimeout(() => {
        if (event.target.getPlayerState() === -1) {
          event.target.playVideo();
        }
      }, 400);
    }
  };

  const onError = () => {
    markReady();
  };

  return (
    <div
      data-hero-youtube
      data-playing={playing ? "true" : "false"}
      style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#0B0B0C" }}
    >
      <div
        data-hero-youtube-player
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "max(100vw, 177.78vh)",
          height: "max(56.25vw, 100vh)",
          transform: "translate(-50%, -50%)",
          opacity: playing && !buffering ? 1 : 0,
          transition: "opacity 0.9s ease",
          pointerEvents: "none",
        }}
      >
        <YouTube
          videoId={videoId}
          opts={{
            width: "100%",
            height: "100%",
            playerVars: {
              autoplay: 1,
              mute: 1,
              loop: 1,
              playlist: videoId,
              controls: 0,
              rel: 0,
              modestbranding: 1,
              playsinline: 1,
              iv_load_policy: 3,
              disablekb: 1,
              fs: 0,
              cc_load_policy: 0,
              origin: typeof window !== "undefined" ? window.location.origin : "",
            },
          }}
          onReady={onReady}
          onStateChange={onStateChange}
          onError={onError}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {posterSrc && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={posterSrc}
          alt=""
          aria-hidden
          onError={() => {
            const fallback = getYouTubeThumbnail(url, "hq");
            if (fallback && fallback !== posterSrc) setPosterSrc(fallback);
          }}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.72)",
            opacity: showPoster ? 1 : 0,
            transition: "opacity 0.9s ease",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
      )}

      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          pointerEvents: "none",
          background: showPoster ? "rgba(11,11,12,0.08)" : "transparent",
          transition: "background 0.6s ease",
        }}
      />
    </div>
  );
}
