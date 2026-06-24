import { ToonStudioLogo } from "@/components/ui/ToonStudioLogo";
import { NAV_LINKS } from "@/lib/theme";

type Props = {
  logoHref?: string;
};

export function SiteNav({ logoHref = "/" }: Props) {
  return (
    <>
      <header
        data-nav-wrap
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 90,
          display: "flex",
          justifyContent: "center",
          padding: "18px 18px",
        }}
      >
        <nav
          data-nav
          style={{
            width: "100%",
            maxWidth: 1180,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            padding: "20px 26px",
            border: "1px solid rgba(255,255,255,0)",
            borderRadius: 0,
            boxSizing: "border-box",
            transition: "background .15s linear",
          }}
        >
          <ToonStudioLogo variant="nav" href={logoHref} />
          <div data-desktop-links style={{ display: "flex", alignItems: "center", gap: 30 }}>
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} style={{ fontSize: 14, color: "rgba(255,255,255,.82)" }}>
                {l.label}
              </a>
            ))}
          </div>
          <button
            data-menu-open
            aria-label="Open menu"
            style={{
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 5,
              width: 42,
              height: 42,
              border: "1px solid rgba(255,255,255,.2)",
              borderRadius: "50%",
              background: "rgba(255,255,255,.04)",
              cursor: "pointer",
            }}
          >
            <span style={{ width: 16, height: 2, background: "#fff", display: "block" }} />
            <span style={{ width: 16, height: 2, background: "#fff", display: "block" }} />
          </button>
        </nav>
      </header>

      <div
        data-menu
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 120,
          background: "rgba(11,11,12,.86)",
          backdropFilter: "blur(22px)",
          opacity: 0,
          pointerEvents: "none",
          transition: "opacity .5s ease",
          display: "flex",
          flexDirection: "column",
          padding: "30px 28px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <ToonStudioLogo variant="menu" />
          <button
            data-menu-close
            aria-label="Close menu"
            style={{
              width: 44,
              height: 44,
              border: "1px solid rgba(255,255,255,.2)",
              borderRadius: "50%",
              background: "none",
              color: "#fff",
              fontSize: 22,
              cursor: "pointer",
            }}
          >
            &times;
          </button>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 6 }}>
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              data-menu-link
              href={l.href}
              style={{
                fontFamily: "var(--font-bricolage)",
                fontWeight: 700,
                fontSize: 44,
                opacity: 0,
                transform: "translateY(20px)",
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
