export function getVimeoId(url: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:vimeo\.com\/(?:video\/)?|player\.vimeo\.com\/video\/)(\d+)/);
  return match?.[1] ?? null;
}

export function isVimeoUrl(url: string): boolean {
  return getVimeoId(url) !== null;
}

export function getVimeoBackgroundEmbedUrl(videoId: string): string {
  const params = new URLSearchParams({
    badge: "0",
    autopause: "0",
    player_id: "0",
    app_id: "58479",
    autoplay: "1",
    muted: "1",
    loop: "1",
  });

  return `https://player.vimeo.com/video/${videoId}?${params.toString()}`;
}
