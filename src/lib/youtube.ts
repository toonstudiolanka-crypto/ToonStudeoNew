export function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([A-Za-z0-9_-]{11})/,
  );
  return match?.[1] ?? null;
}

export function isYouTubeUrl(url: string): boolean {
  return getYouTubeId(url) !== null;
}

export function getYouTubeWatchUrl(url: string): string | null {
  const id = getYouTubeId(url);
  return id ? `https://www.youtube.com/watch?v=${id}` : null;
}

export function inferMediaTypeFromUrl(url: string): "image" | "video" {
  if (!url) return "video";
  if (isYouTubeUrl(url)) return "video";
  if (/\.(mp4|webm|mov)(\?|$)/i.test(url)) return "video";
  if (/\.(jpe?g|png|webp|gif|svg)(\?|$)/i.test(url) || url.startsWith("/uploads/")) return "image";
  return "video";
}

export const YOUTUBE_URL_HINT =
  "Paste a YouTube link (watch, youtu.be, shorts, or embed). Thumbnails auto-fill when empty.";

export function getYouTubeThumbnail(url: string, quality: "hq" | "max" = "hq"): string | null {
  const id = getYouTubeId(url);
  if (!id) return null;
  return quality === "max"
    ? `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`
    : `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

export function getYouTubeEmbedUrl(url: string): string | null {
  const id = getYouTubeId(url);
  return id ? `https://www.youtube.com/embed/${id}` : null;
}

export function getYouTubeBackgroundEmbedUrl(url: string, origin?: string): string | null {
  const id = getYouTubeId(url);
  if (!id) return null;

  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    loop: "1",
    playlist: id,
    controls: "0",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    iv_load_policy: "3",
    disablekb: "1",
    fs: "0",
    cc_load_policy: "0",
    enablejsapi: "1",
    start: "0",
  });

  if (origin) params.set("origin", origin);

  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}
