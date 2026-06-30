"use client";

import { useState } from "react";
import type { FeaturedVideo } from "@/types/content";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { getYouTubeThumbnail, isYouTubeUrl } from "@/lib/youtube";
import { VideoPlayerModal } from "./VideoPlayerModal";

type Props = {
  videos: FeaturedVideo[];
};

type ActiveVideo = {
  videoUrl: string;
  title: string;
};

export function FeaturedVideosSection({ videos }: Props) {
  const [active, setActive] = useState<ActiveVideo | null>(null);

  function openVideo(video: FeaturedVideo) {
    if (!video.videoUrl) return;
    setActive({ videoUrl: video.videoUrl, title: video.title });
  }

  return (
    <>
      <section id="featured" data-hscroll className="ts-hscroll-scene ts-hscroll-scene--featured" style={{ position: "relative", background: "#0B0B0C" }}>
        <div
          data-hscroll-sticky
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            data-hscroll-header
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              padding: "0 clamp(20px,5vw,72px)",
              marginBottom: 34,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 13,
                  letterSpacing: ".3em",
                  textTransform: "uppercase",
                  color: "#FF4D2E",
                  marginBottom: 14,
                  fontWeight: 600,
                }}
              >
                Featured videos
              </div>
              <h2
                data-display-heading
                style={{
                  margin: 0,
                  fontFamily: "var(--font-bricolage)",
                  fontWeight: 800,
                  fontSize: "clamp(30px,4.6vw,68px)",
                  letterSpacing: "-.02em",
                  lineHeight: 1,
                }}
              >
                Stories in motion
              </h2>
            </div>
            <span
              data-hscroll-hint
              style={{
                fontSize: 12,
                letterSpacing: ".2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,.4)",
              }}
            >
              Scroll →
            </span>
          </div>
          <div
            data-htrack
            style={{
              display: "flex",
              gap: 26,
              padding: "0 clamp(20px,5vw,72px)",
              willChange: "transform",
              width: "max-content",
            }}
          >
            {videos.map((v, i) => {
              const thumbnail = v.thumbnailUrl || getYouTubeThumbnail(v.videoUrl) || "";
              const fallbackThumbnail = v.thumbnailUrl
                ? undefined
                : getYouTubeThumbnail(v.videoUrl, "max") || undefined;
              const canPlay = Boolean(v.videoUrl && (isYouTubeUrl(v.videoUrl) || v.videoUrl));

              return (
                <article key={v.id} data-featured-card style={{ flex: "none", width: "min(74vw,820px)" }}>
                  <div
                    style={{
                      position: "relative",
                      borderRadius: 18,
                      overflow: "hidden",
                      aspectRatio: "16/9",
                      background: "#141416",
                    }}
                  >
                    <MediaSlot url={thumbnail} fallbackUrl={fallbackThumbnail} placeholder="Drop video thumbnail" />
                    <div
                      style={{
                        position: "absolute",
                        left: 18,
                        top: 16,
                        fontSize: 12,
                        letterSpacing: ".14em",
                        color: "rgba(255,255,255,.7)",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    {canPlay && (
                      <button
                        type="button"
                        aria-label={`Play ${v.title}`}
                        onClick={() => openVideo(v)}
                        style={{
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "none",
                          background: "transparent",
                          cursor: "pointer",
                          padding: 0,
                        }}
                      >
                        <span
                          style={{
                            width: 64,
                            height: 64,
                            borderRadius: "50%",
                            background: "rgba(255,255,255,.16)",
                            backdropFilter: "blur(6px)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "1px solid rgba(255,255,255,.4)",
                            transition: "transform .2s ease, background .2s ease",
                          }}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </span>
                      </button>
                    )}
                  </div>
                  <div
                    data-featured-meta
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      marginTop: 18,
                      gap: 16,
                    }}
                  >
                    <h3
                      style={{
                        margin: 0,
                        fontFamily: "var(--font-bricolage)",
                        fontWeight: 700,
                        fontSize: "clamp(20px,2vw,28px)",
                      }}
                    >
                      {v.title}
                    </h3>
                    <span
                      style={{
                        fontSize: 12,
                        letterSpacing: ".16em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,.45)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {v.category}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {active && (
        <VideoPlayerModal videoUrl={active.videoUrl} title={active.title} onClose={() => setActive(null)} />
      )}
    </>
  );
}
