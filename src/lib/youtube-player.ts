export const HERO_VIDEO_READY_EVENT = "ts:hero-video-ready";

export function dispatchHeroVideoReady() {
  window.dispatchEvent(new Event(HERO_VIDEO_READY_EVENT));
}

export function loadYouTubeIframeApi(): Promise<void> {
  if (window.YT?.Player) return Promise.resolve();

  return new Promise((resolve) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };

    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      tag.async = true;
      document.head.appendChild(tag);
    }
  });
}
