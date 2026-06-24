import { ToonStudioLogo } from "@/components/ui/ToonStudioLogo";
import { NAV_LINKS } from "@/lib/theme";
import type { SiteContent } from "@/types/content";

type Props = {
  contact: SiteContent["contact"];
  footer: SiteContent["footer"];
};

export function SiteFooter({ contact, footer }: Props) {
  return (
    <footer
      style={{
        position: "relative",
        background: "#0B0B0C",
        color: "#fff",
        padding: "clamp(60px,9vh,110px) clamp(20px,5vw,80px) 40px",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
            gap: 40,
            paddingBottom: 60,
            borderBottom: "1px solid rgba(255,255,255,.1)",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 12,
                letterSpacing: ".2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,.4)",
                marginBottom: 16,
              }}
            >
              Menu
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9, fontSize: 15 }}>
              {NAV_LINKS.map((l) => (
                <a key={l.href} href={l.href} style={{ color: "rgba(255,255,255,.75)" }}>
                  {l.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: 12,
                letterSpacing: ".2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,.4)",
                marginBottom: 16,
              }}
            >
              Contact
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 9,
                fontSize: 15,
                color: "rgba(255,255,255,.75)",
              }}
            >
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              {contact.phones.map((p) => (
                <span key={p}>+94 {p.replace(/\s/g, " ").trim()}</span>
              ))}
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: 12,
                letterSpacing: ".2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,.4)",
                marginBottom: 16,
              }}
            >
              Social
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 9,
                fontSize: 15,
                color: "rgba(255,255,255,.75)",
              }}
            >
              {contact.social.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target={s.url.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div style={{ margin: "40px 0 24px", willChange: "transform" }}>
          <ToonStudioLogo variant="footer" dataFooterBrand />
        </div>
        <div
          data-footer-meta
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            fontSize: 13,
            color: "rgba(255,255,255,.4)",
          }}
        >
          <span>{footer.copyright}</span>
          <span>{footer.location}</span>
        </div>
      </div>
    </footer>
  );
}
