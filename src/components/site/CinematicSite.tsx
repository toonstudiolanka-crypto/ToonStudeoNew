"use client";

import { useRef } from "react";
import type { SiteContent } from "@/types/content";
import { ClientLogosSection } from "./ClientLogosSection";
import { FeaturedVideosSection } from "./FeaturedVideosSection";
import { HeroMedia } from "./HeroMedia";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { SERVICE_THEMES } from "@/lib/theme";
import { SiteFooter } from "./SiteFooter";
import { SiteNav } from "./SiteNav";
import { SiteLoader } from "./SiteLoader";
import { useScrollEffects } from "./useScrollEffects";

type Props = { content: SiteContent };

const DOT_COLORS = ["#FF4D2E", "#2F6BFF", "#FFC53D", "#FF4D2E"];

export function CinematicSite({ content }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  useScrollEffects(rootRef);

  const { hero, whoWeAre, clientLogos, featuredVideos, strength, services, work, founders, contact, footer } = content;

  return (
    <div ref={rootRef} style={{ position: "relative", background: "#0B0B0C" }}>
      <div
        aria-hidden
        style={{
          position: "fixed", inset: -40, zIndex: 60, pointerEvents: "none", mixBlendMode: "overlay", opacity: 0.06,
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`,
          animation: "ts-grain 1.1s steps(2) infinite",
        }}
      />

      <SiteLoader />

      <SiteNav logoHref="#top" />

      <span id="top" />

      {/* HERO */}
      <section data-scene="hero" style={{ position: "relative", height: "210vh", background: "#0B0B0C" }}>
        <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center" }}>

          {/* Background video */}
          <div data-hero-stage style={{ position: "absolute", inset: 0, overflow: "hidden", transformOrigin: "center center", willChange: "transform,border-radius" }}>
            <div data-hero-media style={{ position: "absolute", inset: "-5%", willChange: "transform", overflow: "hidden" }}>
              <HeroMedia url={hero.mediaUrl} type={hero.mediaType} placeholder="Drop showreel / hero footage" />
            </div>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(11,11,12,.72) 0%,rgba(11,11,12,.42) 40%,rgba(11,11,12,.82) 100%)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(100deg,rgba(11,11,12,.78) 0%,transparent 60%)" }} />
            <div data-hero-dark style={{ position: "absolute", inset: 0, background: "#0B0B0C", opacity: 0 }} />
          </div>

          {/* Main content */}
          <div data-hero-content style={{ position: "relative", zIndex: 3, padding: "0 clamp(20px,5vw,72px)", width: "100%", maxWidth: 1400 }}>

            {/* Eyebrow */}
            <div data-hero-eyebrow style={{ fontSize: 12, letterSpacing: ".38em", textTransform: "uppercase", color: "rgba(180,150,255,.85)", marginBottom: "clamp(10px,2vh,18px)", fontWeight: 600 }}>
              {hero.eyebrow}
            </div>

            {/* "The Creative Awakening" — Caveat cursive, tilted, pink-red */}
            <div data-hero-w data-hero-title-1 style={{
              fontFamily: "var(--font-caveat)",
              fontSize: "clamp(36px,7.2vw,110px)",
              fontWeight: 700,
              lineHeight: 0.88,
              color: "#FF2D78",
              background: "linear-gradient(90deg,#FF2D78,#FF4D2E)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
              transform: "rotate(-2.5deg)",
              transformOrigin: "left center",
              marginBottom: "-0.06em",
              marginLeft: "0.04em",
              willChange: "transform,opacity",
              opacity: 1,
            }}>
              {hero.titleLines[0]}
            </div>

            {/* "TOON STUDIO" — massive, full-width, bold white */}
            <div>
              <span data-hero-w data-hero-title-2 style={{
                display: "block",
                fontFamily: "var(--font-bricolage)",
                fontSize: "clamp(48px,15vw,240px)",
                fontWeight: 800,
                lineHeight: 0.86,
                letterSpacing: "-0.03em",
                color: "#fff",
                willChange: "transform,opacity",
                opacity: 1,
                textTransform: "uppercase",
              }}>
                {hero.titleLines[1] ?? ""}
              </span>
            </div>

            {/* Subtitle */}
            <div data-hero-fade data-hero-subtitle style={{
              marginTop: "clamp(28px,4.5vh,52px)",
              willChange: "transform,opacity",
            }}>
              <p style={{
                margin: 0,
                maxWidth: "44ch",
                fontSize: "clamp(15px,1.45vw,20px)",
                lineHeight: 1.55,
                color: "rgba(210,200,230,.78)",
              }}>
                {hero.subtitle}
              </p>
            </div>
          </div>

          {/* Scroll hint */}
          <a
            href="#who-we-are"
            data-hero-scroll-hint
            data-hero-fade
            aria-label="Scroll down"
            style={{
              position: "absolute",
              left: "50%",
              bottom: "clamp(52px,8vh,72px)",
              zIndex: 5,
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              color: "rgba(255,255,255,.55)",
              textDecoration: "none",
            }}
          >
            <span style={{ fontSize: 10, letterSpacing: ".28em", textTransform: "uppercase" }}>Scroll</span>
            <span data-hero-scroll-icon style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>

          {/* Tags row */}
          <div data-hero-fade data-hero-tags style={{
            position: "relative", zIndex: 3,
            padding: "clamp(18px,3vh,28px) clamp(20px,5vw,72px) 0",
            display: "flex", gap: "8px 0", flexWrap: "wrap", alignItems: "center",
            willChange: "transform,opacity",
          }}>
            {hero.tags.map((tag, i) => (
              <span key={tag} style={{ display: "contents" }}>
                {i > 0 && <span style={{ width: 3, height: 3, borderRadius: "50%", background: DOT_COLORS[(i - 1) % DOT_COLORS.length], margin: "0 14px" }} />}
                <span style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(255,255,255,.45)", fontWeight: 500 }}>{tag}</span>
              </span>
            ))}
          </div>

          {/* Bottom progress bar */}
          <div data-hero-ui style={{ position: "absolute", left: 0, right: 0, bottom: 0, zIndex: 4, padding: "0 clamp(20px,5vw,72px) clamp(18px,3vh,26px)", display: "flex", alignItems: "center", gap: 16 }}>
            <span data-hero-frame style={{ fontSize: 11, letterSpacing: ".22em", color: "rgba(255,255,255,.4)", fontVariantNumeric: "tabular-nums", minWidth: 36 }}>0001</span>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,.1)", borderRadius: 2, overflow: "hidden" }}>
              <div data-hero-bar style={{ height: "100%", width: "0%", background: "linear-gradient(90deg,#FF2D78,#7C4DFF)" }} />
            </div>
            <span style={{ fontSize: 10, letterSpacing: ".28em", textTransform: "uppercase", color: "rgba(255,255,255,.32)" }}>Showreel</span>
          </div>

        </div>
      </section>

      {/* WHO ARE WE */}
      <section id="who-we-are" data-section="who-we-are" style={{ position: "relative", background: "#0B0B0C", padding: "clamp(90px,12vh,170px) clamp(20px,5vw,80px)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div data-reveal style={{ fontSize: 13, letterSpacing: ".3em", textTransform: "uppercase", color: "#2F6BFF", marginBottom: 40, fontWeight: 600 }}>{whoWeAre.label}</div>
          <h2 style={{ margin: 0, fontFamily: "var(--font-bricolage)", fontWeight: 700, letterSpacing: "-.02em", lineHeight: 1.04, fontSize: "clamp(28px,4.4vw,62px)", maxWidth: "18ch" }}>
            {whoWeAre.headlineParts?.length ? (
              whoWeAre.headlineParts.map((part, i) => (
                <span key={i} data-center-fade style={{ display: "inline", ...(part.color ? { color: part.color } : {}) }}>{part.text}</span>
              ))
            ) : (
              <span data-center-fade style={{ display: "inline" }}>{whoWeAre.headline}</span>
            )}
          </h2>
          <p data-reveal style={{ margin: "48px 0 0", fontSize: "clamp(17px,1.6vw,22px)", lineHeight: 1.5, maxWidth: "46ch", color: "rgba(242,238,230,.62)" }}>{whoWeAre.description}</p>
        </div>
      </section>

      <ClientLogosSection label={clientLogos.label} logos={clientLogos.logos} />

      <FeaturedVideosSection videos={featuredVideos} />

      {/* STRENGTH */}
      <section data-section="strength" style={{ position: "relative", background: "#F2EEE6", color: "#15130F", borderRadius: "34px 34px 0 0", padding: "clamp(90px,12vh,160px) clamp(20px,5vw,80px)", marginTop: -34 }}>
        <div data-strength-grid style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0,0.8fr) minmax(0,1.2fr)", gap: "clamp(40px,6vw,90px)", alignItems: "start" }}>
          <div style={{ position: "sticky", top: 140 }}>
            <div data-reveal style={{ fontSize: 13, letterSpacing: ".3em", textTransform: "uppercase", color: "#FF4D2E", marginBottom: 20, fontWeight: 600 }}>{strength.label}</div>
            <h2 data-reveal style={{ margin: 0, fontFamily: "var(--font-bricolage)", fontWeight: 800, fontSize: "clamp(40px,6vw,96px)", lineHeight: 0.9, letterSpacing: "-.03em", whiteSpace: "pre-line" }}>{strength.headline.replace(". ", ".\n")}</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(30px,5vh,56px)", paddingTop: 10 }}>
            {strength.paragraphs.map((p) => (
              <p key={p.slice(0, 20)} data-center-fade style={{ margin: 0, fontSize: "clamp(19px,2vw,30px)", lineHeight: 1.45, fontWeight: 500 }}>{p}</p>
            ))}
            <blockquote data-reveal style={{ margin: "20px 0 0", fontFamily: "var(--font-bricolage)", fontWeight: 700, fontSize: "clamp(28px,3.6vw,52px)", lineHeight: 1.05, letterSpacing: "-.02em", color: "#FF4D2E" }}>&ldquo;{strength.quote}&rdquo;</blockquote>
            <p data-reveal style={{ margin: 0, fontSize: "clamp(15px,1.4vw,18px)", lineHeight: 1.55, color: "rgba(21,19,15,.6)", maxWidth: "46ch" }}>{strength.footer}</p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" data-section="services" style={{ position: "relative", background: "#F2EEE6", color: "#15130F", padding: "clamp(60px,8vh,110px) clamp(20px,5vw,80px) clamp(90px,12vh,160px)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div data-services-header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20, marginBottom: "clamp(40px,6vh,80px)" }}>
            <h2 data-reveal style={{ margin: 0, fontFamily: "var(--font-bricolage)", fontWeight: 800, fontSize: "clamp(36px,5.2vw,80px)", lineHeight: 0.92, letterSpacing: "-.03em", maxWidth: "14ch" }}>What we<br />do best</h2>
            <a data-reveal data-section-cta href="#work" style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 14, fontWeight: 600, border: "1px solid rgba(21,19,15,.25)", padding: "14px 24px", borderRadius: 9999 }}>Explore all services <span style={{ color: "#FF4D2E" }}>→</span></a>
          </div>
          <div data-services-stack style={{ position: "relative" }}>
            {services.map((svc, i) => {
              const theme = SERVICE_THEMES[svc.theme];
              return (
                <article key={svc.id} data-svc style={{ position: "sticky", top: 96 + i * 14, marginTop: i ? "5vh" : 0, borderRadius: 24, overflow: "hidden", background: theme.bg, color: theme.text, minHeight: "74vh", display: "grid", gridTemplateColumns: "1.05fr .95fr", willChange: "transform" }}>
                  <div data-svc-body style={{ padding: "clamp(28px,4vw,56px)", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 24 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 13, letterSpacing: ".22em", color: svc.accent }}>{svc.number}</span>
                      <span data-svc-label style={{ fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase", color: svc.theme === "orange" ? "rgba(21,19,15,.45)" : "rgba(255,255,255,.4)" }}>Service</span>
                    </div>
                    <div>
                      <h3 data-svc-title style={{ margin: "0 0 18px", fontFamily: "var(--font-bricolage)", fontWeight: 800, fontSize: "clamp(30px,3.6vw,54px)", lineHeight: 0.96, letterSpacing: "-.02em", whiteSpace: "pre-line" }}>{svc.title}</h3>
                      <p data-svc-desc style={{ margin: 0, fontSize: "clamp(15px,1.4vw,18px)", lineHeight: 1.55, color: theme.sub, maxWidth: "42ch" }}>{svc.description}</p>
                    </div>
                  </div>
                  <div data-svc-media style={{ position: "relative", background: theme.mediaBg, minHeight: 200 }}>
                    <MediaSlot url={svc.imageUrl} placeholder={`${svc.title} visual`} />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" data-hscroll style={{ position: "relative", height: "340vh", background: "#0B0B0C", borderRadius: "34px 34px 0 0", marginTop: -34 }}>
        <div data-hscroll-sticky style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div data-hscroll-header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", padding: "0 clamp(20px,5vw,72px)", marginBottom: 30, flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ fontSize: 13, letterSpacing: ".3em", textTransform: "uppercase", color: "#2F6BFF", marginBottom: 14, fontWeight: 600 }}>Our work</div>
              <h2 style={{ margin: 0, fontFamily: "var(--font-bricolage)", fontWeight: 800, fontSize: "clamp(30px,4.6vw,70px)", letterSpacing: "-.02em", lineHeight: 0.95 }}>Selected projects</h2>
            </div>
            <a href={contact.youtubeUrl} target="_blank" rel="noopener noreferrer" data-section-cta style={{ fontSize: 14, fontWeight: 600, border: "1px solid rgba(255,255,255,.22)", padding: "13px 22px", borderRadius: 9999 }}>See more of our work →</a>
          </div>
          <div data-htrack style={{ display: "flex", gap: 24, padding: "0 clamp(20px,5vw,72px)", alignItems: "center", width: "max-content", willChange: "transform" }}>
            {work.map((item, i) => (
              <article key={item.id} style={{ flex: "none", width: "min(80vw,560px)", alignSelf: i % 2 ? "flex-end" : "flex-start" }}>
                <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", aspectRatio: item.aspect, background: "#141416" }}>
                  <MediaSlot url={item.imageUrl} placeholder="Project image" />
                </div>
                <div style={{ marginTop: 14 }}>
                  <div style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: i % 2 ? "#2F6BFF" : "#FF4D2E" }}>{item.category} · {item.year}</div>
                  <h3 style={{ margin: "6px 0 0", fontFamily: "var(--font-bricolage)", fontWeight: 700, fontSize: 22 }}>{item.title}</h3>
                </div>
              </article>
            ))}
            <article style={{ flex: "none", width: "min(80vw,420px)", alignSelf: "center", display: "flex", flexDirection: "column", justifyContent: "center", paddingLeft: 10 }}>
              <h3 style={{ margin: 0, fontFamily: "var(--font-bricolage)", fontWeight: 800, fontSize: "clamp(28px,3vw,44px)", lineHeight: 1, letterSpacing: "-.02em" }}>Let&apos;s make<br />yours next.</h3>
              <a href="/contact" style={{ marginTop: 22, display: "inline-flex", alignItems: "center", gap: 10, fontSize: 14, fontWeight: 600, border: "1px solid rgba(255,255,255,.25)", padding: "14px 24px", borderRadius: 9999, width: "max-content" }}>Start a project <span style={{ color: "#FF4D2E" }}>→</span></a>
            </article>
          </div>
        </div>
      </section>

      {/* FOUNDERS */}
      <section data-scene="founders" id="about" style={{ position: "relative", height: "280vh", background: "#0B0B0C" }}>
        <div data-founders-desktop style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", gap: "clamp(24px,4vw,70px)", padding: "0 clamp(20px,5vw,80px)" }}>
          <div style={{ position: "relative", aspectRatio: "4/5", maxHeight: "78vh", borderRadius: 20, overflow: "hidden", background: "#141416", justifySelf: "center", width: "100%", maxWidth: 480 }}>
            {founders.map((f, i) => (
              <div key={f.id} data-founder={i + 1} style={{ position: "absolute", inset: 0, willChange: "transform,opacity", opacity: i === 0 ? 1 : 0 }}>
                <MediaSlot url={f.imageUrl} alt={f.name} placeholder={`${f.name.split(" ")[0]} portrait`} />
              </div>
            ))}
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ fontSize: 13, letterSpacing: ".3em", textTransform: "uppercase", color: "#FF4D2E", marginBottom: 28, fontWeight: 600 }}>The dreamers behind Toon Studio</div>
            {founders.map((f, i) => (
              <div key={f.id} data-bio={i + 1} style={{ ...(i > 0 ? { position: "absolute", top: 60, left: 0, right: 0, opacity: 0 } : {}), willChange: "transform,opacity" }}>
                <h3 style={{ margin: "0 0 18px", fontFamily: "var(--font-bricolage)", fontWeight: 800, fontSize: "clamp(34px,4.4vw,68px)", lineHeight: 0.95, letterSpacing: "-.02em", whiteSpace: "pre-line" }}>{f.name}</h3>
                <p style={{ margin: 0, fontSize: "clamp(15px,1.5vw,19px)", lineHeight: 1.55, color: "rgba(242,238,230,.66)", maxWidth: "46ch" }}>{f.bio}</p>
              </div>
            ))}
          </div>
        </div>

        <div data-founders-mobile>
          <div style={{ fontSize: 13, letterSpacing: ".3em", textTransform: "uppercase", color: "#FF4D2E", marginBottom: 8, fontWeight: 600, textAlign: "center" }}>The dreamers behind Toon Studio</div>
          {founders.map((f) => (
            <article key={f.id} data-founder-card>
              <div data-founder-portrait>
                <MediaSlot url={f.imageUrl} alt={f.name} placeholder={`${f.name.split(" ")[0]} portrait`} />
              </div>
              <div>
                <h3 style={{ margin: "0 0 12px", fontFamily: "var(--font-bricolage)", fontWeight: 800, fontSize: "clamp(28px,7vw,40px)", lineHeight: 0.95, letterSpacing: "-.02em", whiteSpace: "pre-line" }}>{f.name}</h3>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: "rgba(242,238,230,.66)" }}>{f.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" data-section="contact" style={{ position: "relative", background: "#F2EEE6", color: "#15130F", borderRadius: "34px 34px 0 0", marginTop: -34, padding: "clamp(80px,12vh,150px) clamp(20px,5vw,80px) clamp(50px,7vh,90px)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div data-reveal style={{ fontSize: 13, letterSpacing: ".3em", textTransform: "uppercase", color: "#FF4D2E", marginBottom: 24, fontWeight: 600 }}>Get in touch</div>
          <h2 data-reveal style={{ margin: 0, fontFamily: "var(--font-bricolage)", fontWeight: 800, fontSize: "clamp(40px,8vw,128px)", lineHeight: 0.88, letterSpacing: "-.03em", maxWidth: "14ch" }}>Let&apos;s create something wonderful.</h2>
          <div data-contact-grid style={{ marginTop: "clamp(40px,6vh,72px)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 30 }}>
            <div data-reveal>
              <div style={{ fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(21,19,15,.45)", marginBottom: 10 }}>Email</div>
              <a href={`mailto:${contact.email}`} style={{ fontSize: "clamp(18px,2vw,26px)", fontWeight: 600, borderBottom: "1px solid rgba(21,19,15,.2)" }}>{contact.email}</a>
            </div>
            <div data-reveal>
              <div style={{ fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(21,19,15,.45)", marginBottom: 10 }}>Phone</div>
              <div style={{ fontSize: "clamp(18px,2vw,26px)", fontWeight: 600, lineHeight: 1.4 }}>{contact.phones.map((p) => <div key={p}>{p}</div>)}</div>
            </div>
            <div data-reveal>
              <div style={{ fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(21,19,15,.45)", marginBottom: 10 }}>Follow</div>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                {contact.social.map((s) => (
                  <a key={s.label} href={s.url} target={s.url.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" style={{ fontSize: 15, fontWeight: 600 }}>{s.label}</a>
                ))}
              </div>
            </div>
          </div>
          <div data-reveal style={{ marginTop: "clamp(40px,6vh,56px)" }}>
            <a href="/contact" style={{ fontSize: 14, fontWeight: 600, border: "1px solid rgba(21,19,15,.22)", padding: "14px 24px", borderRadius: 9999, display: "inline-flex", alignItems: "center", gap: 8 }}>
              Full contact page <span style={{ color: "#FF4D2E" }}>→</span>
            </a>
          </div>
        </div>
      </section>

      <SiteFooter contact={contact} footer={footer} />
    </div>
  );
}
