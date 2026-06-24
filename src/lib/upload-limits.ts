export const IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
] as const;

export const VIDEO_MIME_TYPES = [
  "video/mp4",
  "video/webm",
  "video/quicktime",
] as const;

export const IMAGE_MAX_BYTES = 5 * 1024 * 1024; // 5 MB
export const VIDEO_MAX_BYTES = 20 * 1024 * 1024; // 20 MB

export const IMAGE_ACCEPT = ".jpg,.jpeg,.png,.webp,.gif,image/jpeg,image/png,image/webp,image/gif";
export const VIDEO_ACCEPT = ".mp4,.webm,.mov,video/mp4,video/webm,video/quicktime";
export const MEDIA_ACCEPT = `${IMAGE_ACCEPT},${VIDEO_ACCEPT}`;

export type UploadMediaKind = "image" | "video" | "both";

export function formatUploadSize(bytes: number): string {
  if (bytes >= 1024 * 1024) {
    return `${Math.round(bytes / (1024 * 1024))} MB`;
  }
  return `${Math.round(bytes / 1024)} KB`;
}

export function uploadHint(kind: UploadMediaKind): string {
  if (kind === "image") {
    return `JPG, PNG, WebP, or GIF · max ${formatUploadSize(IMAGE_MAX_BYTES)} · best under 1 MB`;
  }
  if (kind === "video") {
    return `MP4, WebM, or MOV · max ${formatUploadSize(VIDEO_MAX_BYTES)} · keep under 20 MB`;
  }
  return `Images max ${formatUploadSize(IMAGE_MAX_BYTES)} (JPG, PNG, WebP, GIF) · videos max ${formatUploadSize(VIDEO_MAX_BYTES)} (MP4, WebM, MOV)`;
}

export function acceptForKind(kind: UploadMediaKind): string {
  if (kind === "image") return IMAGE_ACCEPT;
  if (kind === "video") return VIDEO_ACCEPT;
  return MEDIA_ACCEPT;
}

export function validateUploadFile(
  file: Pick<File, "type" | "size" | "name">,
  kind: UploadMediaKind = "both",
): string | null {
  const isImage = IMAGE_MIME_TYPES.includes(file.type as (typeof IMAGE_MIME_TYPES)[number]);
  const isVideo = VIDEO_MIME_TYPES.includes(file.type as (typeof VIDEO_MIME_TYPES)[number]);

  if (kind === "image" && !isImage) {
    return "Only JPG, PNG, WebP, and GIF images are allowed.";
  }
  if (kind === "video" && !isVideo) {
    return "Only MP4, WebM, and MOV videos are allowed.";
  }
  if (kind === "both" && !isImage && !isVideo) {
    return "Unsupported file type. Use JPG, PNG, WebP, GIF, MP4, WebM, or MOV.";
  }

  if (isImage && file.size > IMAGE_MAX_BYTES) {
    return `Image too large (max ${formatUploadSize(IMAGE_MAX_BYTES)}). Compress the file and try again.`;
  }
  if (isVideo && file.size > VIDEO_MAX_BYTES) {
    return `Video too large (max ${formatUploadSize(VIDEO_MAX_BYTES)}). Use a shorter clip or lower quality.`;
  }

  return null;
}

export function maxUploadBytes(kind: UploadMediaKind): number {
  if (kind === "image") return IMAGE_MAX_BYTES;
  if (kind === "video") return VIDEO_MAX_BYTES;
  return VIDEO_MAX_BYTES;
}
