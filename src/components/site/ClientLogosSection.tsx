"use client";

import type { ClientLogo } from "@/types/content";

type Props = {
  label: string;
  logos: ClientLogo[];
};

function LogoItem({ logo }: { logo: ClientLogo }) {
  if (logo.imageUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={logo.imageUrl}
        alt={logo.name}
        data-client-logo
        style={{
          height: 44,
          width: "auto",
          maxWidth: 160,
          objectFit: "contain",
          filter: "brightness(0) invert(1)",
          opacity: 0.72,
        }}
      />
    );
  }

  return (
    <div
      data-client-logo
      data-client-logo-placeholder
      aria-label={`${logo.name} logo placeholder`}
      style={{
        flex: "none",
        width: 148,
        height: 64,
        borderRadius: 14,
        border: "1px dashed rgba(255,255,255,.18)",
        background: "rgba(255,255,255,.04)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 16px",
      }}
    >
      <span
        style={{
          fontSize: 11,
          letterSpacing: ".18em",
          textTransform: "uppercase",
          color: "rgba(242,238,230,.42)",
          fontWeight: 600,
          textAlign: "center",
          lineHeight: 1.3,
        }}
      >
        {logo.name}
      </span>
    </div>
  );
}

export function ClientLogosSection({ label, logos }: Props) {
  if (!logos.length) return null;

  const track = [...logos, ...logos];

  return (
    <section
      id="clients"
      data-section="client-logos"
      style={{
        position: "relative",
        background: "#0B0B0C",
        padding: "0 0 clamp(72px,10vh,120px)",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 clamp(20px,5vw,80px) 36px" }}>
        <div
          data-reveal
          style={{
            fontSize: 13,
            letterSpacing: ".3em",
            textTransform: "uppercase",
            color: "rgba(242,238,230,.38)",
            fontWeight: 600,
          }}
        >
          {label}
        </div>
      </div>

      <div
        data-client-marquee
        style={{
          position: "relative",
          maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        }}
      >
        <div data-client-track style={{ display: "flex", width: "max-content", gap: 48, alignItems: "center" }}>
          {track.map((logo, i) => (
            <LogoItem key={`${logo.id}-${i}`} logo={logo} />
          ))}
        </div>
      </div>
    </section>
  );
}
