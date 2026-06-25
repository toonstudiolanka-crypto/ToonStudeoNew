"use client";

import { useRef } from "react";
import type { PressFeature, SiteContent } from "@/types/content";
import { SiteFooter } from "./SiteFooter";
import { SiteNav } from "./SiteNav";
import { useSiteUi } from "./useSiteUi";

type Props = {
  content: SiteContent;
};

function NewspaperFeature({ item }: { item: PressFeature }) {
  return (
    <article data-featured-press data-reveal style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <div
          style={{
            fontSize: 12,
            letterSpacing: ".2em",
            textTransform: "uppercase",
            color: "rgba(21,19,15,.45)",
            marginBottom: 10,
            fontWeight: 600,
          }}
        >
          {item.source}
        </div>
        <h2
          data-display-heading
          style={{
            margin: 0,
            fontFamily: "var(--font-bricolage)",
            fontWeight: 800,
            fontSize: "clamp(24px,3vw,36px)",
            lineHeight: 1.05,
            letterSpacing: "-.02em",
            maxWidth: "22ch",
          }}
        >
          {item.title}
        </h2>
        {item.byline && (
          <p style={{ margin: "12px 0 0", fontSize: 13, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(21,19,15,.5)" }}>
            {item.byline}
          </p>
        )}
      </div>

      {item.imageUrl && (
        <div
          style={{
            borderRadius: 16,
            overflow: "hidden",
            border: "1px solid rgba(21,19,15,.1)",
            boxShadow: "0 24px 60px rgba(21,19,15,.12)",
            background: "#fff",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.imageUrl}
            alt={`${item.source} feature: ${item.title}`}
            style={{ display: "block", width: "100%", height: "auto" }}
          />
        </div>
      )}
    </article>
  );
}

function ArticleFeature({ item }: { item: PressFeature }) {
  const href = item.articleUrl || "#";

  return (
    <article data-featured-press data-reveal>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          borderRadius: 16,
          overflow: "hidden",
          border: "1px solid rgba(21,19,15,.12)",
          boxShadow: "0 24px 60px rgba(21,19,15,.1)",
          background: "#fff",
          color: "inherit",
          textDecoration: "none",
          transition: "transform .25s ease, box-shadow .25s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow = "0 28px 70px rgba(21,19,15,.14)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "none";
          e.currentTarget.style.boxShadow = "0 24px 60px rgba(21,19,15,.1)";
        }}
      >
        {item.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.imageUrl}
            alt=""
            style={{ width: "100%", aspectRatio: "16/10", objectFit: "cover", display: "block" }}
          />
        ) : (
          <div
            aria-hidden
            style={{
              aspectRatio: "16/10",
              background:
                "linear-gradient(135deg, rgba(255,77,46,.16) 0%, rgba(47,107,255,.14) 55%, rgba(255,197,61,.12) 100%)",
              display: "flex",
              alignItems: "flex-end",
              padding: 20,
            }}
          >
            <span
              style={{
                fontSize: 11,
                letterSpacing: ".18em",
                textTransform: "uppercase",
                fontWeight: 700,
                color: "rgba(21,19,15,.55)",
                background: "rgba(255,255,255,.72)",
                padding: "8px 12px",
                borderRadius: 9999,
              }}
            >
              {item.source}
            </span>
          </div>
        )}

        <div style={{ padding: "clamp(20px,3vw,28px)" }}>
          {item.imageUrl && (
            <div
              style={{
                fontSize: 11,
                letterSpacing: ".18em",
                textTransform: "uppercase",
                color: "rgba(21,19,15,.45)",
                marginBottom: 12,
                fontWeight: 600,
              }}
            >
              {item.source}
            </div>
          )}
          <h2
            style={{
              margin: 0,
              fontFamily: "var(--font-bricolage)",
              fontWeight: 700,
              fontSize: "clamp(18px,2.2vw,24px)",
              lineHeight: 1.25,
              color: "#C43B52",
            }}
          >
            {item.title}
          </h2>
          {item.excerpt && (
            <p style={{ margin: "14px 0 0", fontSize: 15, lineHeight: 1.6, color: "rgba(21,19,15,.68)" }}>{item.excerpt}</p>
          )}
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginTop: 18,
              fontSize: 14,
              fontWeight: 600,
              color: "#FF4D2E",
            }}
          >
            Read article →
          </span>
        </div>
      </a>
    </article>
  );
}

export function FeaturedPage({ content }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  useSiteUi(rootRef);

  const { featuredPage, contact, footer } = content;

  return (
    <div ref={rootRef} style={{ position: "relative", background: "#0B0B0C", minHeight: "100vh" }}>
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: -40,
          zIndex: 60,
          pointerEvents: "none",
          mixBlendMode: "overlay",
          opacity: 0.06,
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`,
          animation: "ts-grain 1.1s steps(2) infinite",
        }}
      />

      <SiteNav />

      <main>
        <section
          style={{
            position: "relative",
            minHeight: "min(56vh, 520px)",
            display: "flex",
            alignItems: "flex-end",
            padding: "clamp(120px,18vh,180px) clamp(20px,5vw,80px) clamp(48px,8vh,80px)",
            overflow: "hidden",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 80% 60% at 20% 80%, rgba(255,77,46,.18) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 90% 20%, rgba(47,107,255,.12) 0%, transparent 50%)",
            }}
          />
          <div style={{ position: "relative", maxWidth: 1180, margin: "0 auto", width: "100%" }}>
            <div
              data-reveal
              style={{
                fontSize: 13,
                letterSpacing: ".3em",
                textTransform: "uppercase",
                color: "#FF4D2E",
                marginBottom: 24,
                fontWeight: 600,
              }}
            >
              {featuredPage.eyebrow}
            </div>
            <h1
              data-reveal
              data-display-heading
              style={{
                margin: 0,
                fontFamily: "var(--font-bricolage)",
                fontWeight: 800,
                fontSize: "clamp(44px,9vw,96px)",
                lineHeight: 0.98,
                letterSpacing: "-.03em",
                maxWidth: "12ch",
              }}
            >
              {featuredPage.title}
            </h1>
            {featuredPage.subtitle && (
              <p
                data-reveal
                style={{
                  margin: "24px 0 0",
                  maxWidth: 560,
                  fontSize: "clamp(16px,2vw,20px)",
                  lineHeight: 1.6,
                  color: "rgba(242,238,230,.72)",
                }}
              >
                {featuredPage.subtitle}
              </p>
            )}
          </div>
        </section>

        <section
          data-section="featured-press"
          style={{
            position: "relative",
            background: "#F2EEE6",
            color: "#15130F",
            borderRadius: "34px 34px 0 0",
            marginTop: -34,
            padding: "clamp(70px,10vh,120px) clamp(20px,5vw,80px) clamp(50px,7vh,90px)",
          }}
        >
          <div style={{ maxWidth: 1180, margin: "0 auto" }}>
            <div
              data-featured-grid
              style={{
                display: "grid",
                gridTemplateColumns: "1.05fr .95fr",
                gap: "clamp(28px,4vw,48px)",
                alignItems: "start",
              }}
            >
              {featuredPage.pressFeatures.map((item) =>
                item.kind === "newspaper" ? (
                  <NewspaperFeature key={item.id} item={item} />
                ) : (
                  <ArticleFeature key={item.id} item={item} />
                ),
              )}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter contact={contact} footer={footer} />
    </div>
  );
}
