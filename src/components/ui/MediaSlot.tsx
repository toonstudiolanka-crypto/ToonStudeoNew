"use client";

type MediaSlotProps = {
  url?: string;
  fallbackUrl?: string;
  type?: "image" | "video";
  alt?: string;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
};

export function MediaSlot({ url, fallbackUrl, type = "image", alt = "", placeholder, className, style }: MediaSlotProps) {
  if (url) {
    if (type === "video") {
      return (
        <video
          src={url}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className={className}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", ...style }}
        />
      );
    }
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={url}
        alt={alt}
        referrerPolicy="no-referrer"
        className={className}
        onError={(e) => {
          if (fallbackUrl && e.currentTarget.src !== fallbackUrl) {
            e.currentTarget.src = fallbackUrl;
          }
        }}
        onLoad={(e) => {
          // YouTube returns a 120x90 placeholder image for 404s
          if (fallbackUrl && e.currentTarget.naturalWidth === 120 && e.currentTarget.src !== fallbackUrl) {
            e.currentTarget.src = fallbackUrl;
          }
        }}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", ...style }}
      />
    );
  }

  return (
    <div
      className={className}
      style={{
        width: "100%",
        height: "100%",
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
        ...style,
      }}
    >
      {placeholder || "Add media"}
    </div>
  );
}
