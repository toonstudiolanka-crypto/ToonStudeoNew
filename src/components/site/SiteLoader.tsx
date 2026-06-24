"use client";

import { useEffect, useState } from "react";
import { ToonStudioLogo } from "@/components/ui/ToonStudioLogo";
import { HERO_VIDEO_READY_EVENT, loadYouTubeIframeApi } from "@/lib/youtube-player";

const MIN_LOADER_MS = 1500;
const MAX_LOADER_MS = 5500;

export function SiteLoader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    loadYouTubeIframeApi();
  }, []);

  useEffect(() => {
    let done = false;
    let heroReady = false;
    let minElapsed = false;
    let pageLoaded = document.readyState === "complete";

    const hide = () => {
      if (done) return;
      done = true;
      setFading(true);
      window.setTimeout(() => setVisible(false), 700);
    };

    const tryHide = () => {
      if (!minElapsed || !pageLoaded) return;
      if (heroReady) hide();
    };

    const onHeroReady = () => {
      heroReady = true;
      tryHide();
    };

    const onPageLoad = () => {
      pageLoaded = true;
      tryHide();
    };

    window.addEventListener(HERO_VIDEO_READY_EVENT, onHeroReady);

    if (pageLoaded) {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad, { once: true });
    }

    const minTimer = window.setTimeout(() => {
      minElapsed = true;
      tryHide();
    }, MIN_LOADER_MS);

    const maxTimer = window.setTimeout(hide, MAX_LOADER_MS);

    return () => {
      window.clearTimeout(minTimer);
      window.clearTimeout(maxTimer);
      window.removeEventListener(HERO_VIDEO_READY_EVENT, onHeroReady);
      window.removeEventListener("load", onPageLoad);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "#0B0B0C",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 26,
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? "none" : "auto",
        transition: "opacity 0.7s ease",
      }}
    >
      <ToonStudioLogo variant="loader" />
      <div style={{ fontSize: 13, letterSpacing: ".32em", textTransform: "uppercase", color: "rgba(242,238,230,.5)" }}>
        Awakening creativity…
      </div>
      <div style={{ width: "min(260px,60vw)", height: 2, background: "rgba(255,255,255,.12)", overflow: "hidden", borderRadius: 2 }}>
        <div
          style={{
            height: "100%",
            width: "100%",
            background: "linear-gradient(90deg,#FF4D2E,#2F6BFF)",
            transformOrigin: "left",
            animation: "ts-loadbar 1.9s cubic-bezier(.5,.1,.2,1) forwards",
          }}
        />
      </div>
    </div>
  );
}
