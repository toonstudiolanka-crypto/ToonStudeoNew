"use client";

import { useRef } from "react";
import type { SiteContent } from "@/types/content";
import { ContactForm } from "./ContactForm";
import { SiteFooter } from "./SiteFooter";
import { SiteNav } from "./SiteNav";
import { useSiteUi } from "./useSiteUi";

type Props = {
  content: SiteContent;
};

function phoneHref(phone: string) {
  return `tel:+94${phone.replace(/\D/g, "")}`;
}

export function ContactPage({ content }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  useSiteUi(rootRef);

  const { contact, footer } = content;

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
            minHeight: "min(72vh, 640px)",
            display: "flex",
            alignItems: "flex-end",
            padding: "clamp(120px,18vh,180px) clamp(20px,5vw,80px) clamp(60px,10vh,100px)",
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
              Contact Us
            </div>
            <h1
              data-reveal
              data-display-heading
              style={{
                margin: 0,
                fontFamily: "var(--font-bricolage)",
                fontWeight: 800,
                fontSize: "clamp(44px,9vw,120px)",
                lineHeight: 0.98,
                letterSpacing: "-.03em",
                maxWidth: "12ch",
              }}
            >
              Let&apos;s create something wonderful.
            </h1>
            <p
              data-reveal
              style={{
                margin: "28px 0 0",
                maxWidth: 520,
                fontSize: "clamp(16px,2vw,20px)",
                lineHeight: 1.6,
                color: "rgba(242,238,230,.72)",
              }}
            >
              Ready to start your next animation, video, or creative project? Reach out — we&apos;d love to hear
              from you.
            </p>
          </div>
        </section>

        <section
          data-section="contact"
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
            <div data-contact-layout style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: "clamp(32px,5vw,56px)", alignItems: "start" }}>
              <div
                data-contact-grid
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "clamp(28px,4vw,36px)",
                }}
              >
              <div data-reveal>
                <div
                  style={{
                    fontSize: 12,
                    letterSpacing: ".2em",
                    textTransform: "uppercase",
                    color: "rgba(21,19,15,.45)",
                    marginBottom: 12,
                  }}
                >
                  Email
                </div>
                <a
                  href={`mailto:${contact.email}`}
                  style={{
                    fontSize: "clamp(20px,2.5vw,28px)",
                    fontWeight: 600,
                    borderBottom: "1px solid rgba(21,19,15,.2)",
                    display: "inline-block",
                    paddingBottom: 4,
                  }}
                >
                  {contact.email}
                </a>
                <p style={{ margin: "16px 0 0", fontSize: 15, lineHeight: 1.55, color: "rgba(21,19,15,.62)" }}>
                  For project inquiries, quotes, and collaborations.
                </p>
              </div>

              <div data-reveal>
                <div
                  style={{
                    fontSize: 12,
                    letterSpacing: ".2em",
                    textTransform: "uppercase",
                    color: "rgba(21,19,15,.45)",
                    marginBottom: 12,
                  }}
                >
                  Phone
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {contact.phones.map((p) => (
                    <a
                      key={p}
                      href={phoneHref(p)}
                      style={{
                        fontSize: "clamp(20px,2.5vw,28px)",
                        fontWeight: 600,
                        borderBottom: "1px solid rgba(21,19,15,.2)",
                        width: "fit-content",
                        paddingBottom: 4,
                      }}
                    >
                      +94 {p.trim()}
                    </a>
                  ))}
                </div>
                <p style={{ margin: "16px 0 0", fontSize: 15, lineHeight: 1.55, color: "rgba(21,19,15,.62)" }}>
                  Call or message us during business hours.
                </p>
              </div>

              <div data-reveal>
                <div
                  style={{
                    fontSize: 12,
                    letterSpacing: ".2em",
                    textTransform: "uppercase",
                    color: "rgba(21,19,15,.45)",
                    marginBottom: 12,
                  }}
                >
                  Location
                </div>
                <div style={{ fontSize: "clamp(20px,2.5vw,28px)", fontWeight: 600, lineHeight: 1.35 }}>
                  {footer.location}
                </div>
                <p style={{ margin: "16px 0 0", fontSize: 15, lineHeight: 1.55, color: "rgba(21,19,15,.62)" }}>
                  Sri Lanka&apos;s premium animation studio & creative agency.
                </p>
              </div>
              </div>

              <ContactForm />
            </div>

            <div
              data-reveal
              style={{
                marginTop: "clamp(48px,8vh,80px)",
                padding: "clamp(28px,4vw,40px)",
                borderRadius: 24,
                background: "#15130F",
                color: "#F2EEE6",
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                  color: "rgba(242,238,230,.45)",
                  marginBottom: 20,
                }}
              >
                Follow us
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
                {contact.social.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target={s.url.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      border: "1px solid rgba(242,238,230,.22)",
                      padding: "12px 20px",
                      borderRadius: 9999,
                      transition: "background .2s ease",
                    }}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            <div
              data-reveal
              style={{
                marginTop: "clamp(40px,6vh,64px)",
                display: "flex",
                flexWrap: "wrap",
                gap: 16,
                alignItems: "center",
              }}
            >
              <a
                href={`mailto:${contact.email}?subject=Project%20Inquiry`}
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  background: "#FF4D2E",
                  color: "#fff",
                  padding: "16px 28px",
                  borderRadius: 9999,
                }}
              >
                Start a project →
              </a>
              {contact.youtubeUrl && (
                <a
                  href={contact.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    border: "1px solid rgba(21,19,15,.22)",
                    padding: "16px 28px",
                    borderRadius: 9999,
                  }}
                >
                  Watch our work →
                </a>
              )}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter contact={contact} footer={footer} />
    </div>
  );
}
