"use client";

import { useState } from "react";
import type { WorkItem } from "@/types/content";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { getYouTubeThumbnail, isYouTubeUrl } from "@/lib/youtube";
import { VideoPlayerModal } from "./VideoPlayerModal";

type Props = {
  work: WorkItem[];
  youtubeUrl: string;
};

type ActiveVideo = {
  videoUrl: string;
  title: string;
};

export function WorkSection({ work, youtubeUrl }: Props) {
  const [active, setActive] = useState<ActiveVideo | null>(null);

  return (
    <>
      <section id="work" data-hscroll style={{ position: "relative", height: "520vh", background: "#0B0B0C", borderRadius: "34px 34px 0 0", marginTop: -34 }}>
        <div data-hscroll-sticky style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div data-hscroll-header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", padding: "0 clamp(20px,5vw,72px)", marginBottom: 30, flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ fontSize: 13, letterSpacing: ".3em", textTransform: "uppercase", color: "#2F6BFF", marginBottom: 14, fontWeight: 600 }}>Our work</div>
              <h2 data-display-heading style={{ margin: 0, fontFamily: "var(--font-bricolage)", fontWeight: 800, fontSize: "clamp(30px,4.6vw,70px)", letterSpacing: "-.02em", lineHeight: 1 }}>Selected projects</h2>
            </div>
            <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" data-section-cta style={{ fontSize: 14, fontWeight: 600, border: "1px solid rgba(255,255,255,.22)", padding: "13px 22px", borderRadius: 9999 }}>See more of our work →</a>
          </div>
          <div data-htrack style={{ display: "flex", gap: 24, padding: "0 clamp(20px,5vw,72px)", alignItems: "center", width: "max-content", willChange: "transform" }}>
            {work.map((item, i) => {
              const thumbnail = item.imageUrl || (item.videoUrl ? getYouTubeThumbnail(item.videoUrl) || "" : "");
              const fallbackThumbnail = item.imageUrl || !item.videoUrl
                ? undefined
                : getYouTubeThumbnail(item.videoUrl, "max") || undefined;
              const canPlay = Boolean(item.videoUrl && isYouTubeUrl(item.videoUrl));

              return (
                <article key={item.id} style={{ flex: "none", width: "min(80vw,560px)", alignSelf: i % 2 ? "flex-end" : "flex-start" }}>
                  <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", aspectRatio: item.aspect, background: "#141416" }}>
                    <MediaSlot url={thumbnail} fallbackUrl={fallbackThumbnail} placeholder="Project preview" />
                    {canPlay && (
                      <button
                        type="button"
                        aria-label={`Play ${item.title}`}
                        onClick={() => setActive({ videoUrl: item.videoUrl!, title: item.title })}
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
                          }}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </span>
                      </button>
                    )}
                  </div>
                  <div style={{ marginTop: 14 }}>
                    <div style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: i % 2 ? "#2F6BFF" : "#FF4D2E" }}>{item.category} · {item.year}</div>
                    <h3 style={{ margin: "6px 0 0", fontFamily: "var(--font-bricolage)", fontWeight: 700, fontSize: 22 }}>{item.title}</h3>
                  </div>
                </article>
              );
            })}
            <article style={{ flex: "none", width: "min(80vw,420px)", alignSelf: "center", display: "flex", flexDirection: "column", justifyContent: "center", paddingLeft: 10 }}>
              <h3 style={{ margin: 0, fontFamily: "var(--font-bricolage)", fontWeight: 800, fontSize: "clamp(28px,3vw,44px)", lineHeight: 1, letterSpacing: "-.02em" }}>Let&apos;s make<br />yours next.</h3>
              <a href="/contact" style={{ marginTop: 22, display: "inline-flex", alignItems: "center", gap: 10, fontSize: 14, fontWeight: 600, border: "1px solid rgba(255,255,255,.25)", padding: "14px 24px", borderRadius: 9999, width: "max-content" }}>Start a project <span style={{ color: "#FF4D2E" }}>→</span></a>
            </article>
          </div>
        </div>
      </section>

      {active && (
        <VideoPlayerModal videoUrl={active.videoUrl} title={active.title} onClose={() => setActive(null)} />
      )}
    </>
  );
}
