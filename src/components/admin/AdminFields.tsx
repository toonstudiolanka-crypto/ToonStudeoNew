"use client";

import { MediaSlot } from "@/components/ui/MediaSlot";
import {
  acceptForKind,
  type UploadMediaKind,
  uploadHint,
  validateUploadFile,
} from "@/lib/upload-limits";
import { isYouTubeUrl, YOUTUBE_URL_HINT } from "@/lib/youtube";

type Props = {
  label: string;
  url: string;
  type?: "image" | "video";
  mediaKind?: UploadMediaKind;
  onUpload: (url: string, type: "image" | "video") => void;
  onRemove: () => void;
};

export function MediaField({
  label,
  url,
  type = "image",
  mediaKind = "image",
  onUpload,
  onRemove,
}: Props) {
  const accept = acceptForKind(mediaKind);
  const hint = uploadHint(mediaKind);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const validationError = validateUploadFile(file, mediaKind);
    if (validationError) {
      alert(validationError);
      e.target.value = "";
      return;
    }

    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: form, credentials: "same-origin" });
    if (!res.ok) {
      const err = (await res.json()) as { error?: string };
      alert(err.error || "Upload failed");
      e.target.value = "";
      return;
    }
    const data = (await res.json()) as { url: string; type: "image" | "video" };
    onUpload(data.url, data.type);
    e.target.value = "";
  }

  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: "block", fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(242,238,230,.45)", marginBottom: 8 }}>{label}</label>
      <p style={{ margin: "0 0 10px", fontSize: 12, lineHeight: 1.5, color: "rgba(242,238,230,.38)" }}>{hint}</p>
      <div style={{ borderRadius: 14, overflow: "hidden", aspectRatio: "16/9", maxHeight: 200, marginBottom: 10, border: "1px solid rgba(255,255,255,.1)" }}>
        <MediaSlot url={url} type={type} placeholder="No media yet" />
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <label style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 16px", borderRadius: 9999, background: "#FF4D2E", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
          Upload
          <input type="file" accept={accept} onChange={handleFile} style={{ display: "none" }} />
        </label>
        {url && (
          <button type="button" onClick={onRemove} style={{ padding: "10px 16px", borderRadius: 9999, border: "1px solid rgba(255,255,255,.2)", background: "transparent", color: "#F2EEE6", fontSize: 13, cursor: "pointer" }}>
            Remove
          </button>
        )}
      </div>
    </div>
  );
}

export function TextField({ label, value, onChange, multiline, hint }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean; hint?: string }) {
  const style = { width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid rgba(255,255,255,.12)", background: "#141416", color: "#fff", fontSize: 14, fontFamily: "inherit" };
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 12, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(242,238,230,.45)", marginBottom: 8 }}>{label}</label>
      {hint && <p style={{ margin: "0 0 10px", fontSize: 12, lineHeight: 1.5, color: "rgba(242,238,230,.38)" }}>{hint}</p>}
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={4} style={{ ...style, resize: "vertical" }} />
      ) : (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} style={style} />
      )}
    </div>
  );
}

export function YouTubeUrlField({
  label,
  value,
  onChange,
  onUseThumbnail,
  showThumbnailAction,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onUseThumbnail?: () => void;
  showThumbnailAction?: boolean;
}) {
  const detected = isYouTubeUrl(value);
  const hint = detected
    ? "YouTube link detected — video will play with react-youtube on the site."
    : YOUTUBE_URL_HINT;

  return (
    <div style={{ marginBottom: 16 }}>
      <TextField label={label} value={value} onChange={onChange} hint={hint} />
      {detected && (
        <p style={{ margin: "-8px 0 12px", fontSize: 12, color: "#2F6BFF" }}>✓ Valid YouTube URL</p>
      )}
      {showThumbnailAction && detected && onUseThumbnail && (
        <button
          type="button"
          onClick={onUseThumbnail}
          style={{
            padding: "8px 14px",
            borderRadius: 9999,
            border: "1px solid rgba(47,107,255,.4)",
            background: "rgba(47,107,255,.12)",
            color: "#2F6BFF",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Use YouTube thumbnail
        </button>
      )}
    </div>
  );
}

export function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ border: "1px solid rgba(255,255,255,.1)", borderRadius: 20, padding: "28px 24px", marginBottom: 24, background: "rgba(255,255,255,.02)" }}>
      <h2 style={{ margin: "0 0 20px", fontFamily: "var(--font-bricolage)", fontWeight: 700, fontSize: 22, color: "#FF4D2E" }}>{title}</h2>
      {children}
    </section>
  );
}
