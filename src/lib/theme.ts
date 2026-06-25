export const COLORS = {
  bg: "#0B0B0C",
  bgLight: "#F2EEE6",
  text: "#F2EEE6",
  textDark: "#15130F",
  accent: "#FF4D2E",
  blue: "#2F6BFF",
  yellow: "#FFC53D",
  card: "#141416",
} as const;

export const SERVICE_THEMES = {
  dark: { bg: "#111113", text: "#fff", sub: "rgba(255,255,255,.62)", mediaBg: "#1A1A1D" },
  "dark-alt": { bg: "#15130F", text: "#fff", sub: "rgba(255,255,255,.62)", mediaBg: "#1A1A1D" },
  orange: { bg: "#FF4D2E", text: "#15130F", sub: "rgba(21,19,15,.72)", mediaBg: "rgba(0,0,0,.12)" },
  blue: { bg: "#2F6BFF", text: "#fff", sub: "rgba(255,255,255,.72)", mediaBg: "rgba(255,255,255,.1)" },
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About Us" },
  { href: "/#services", label: "Services" },
  { href: "/featured", label: "Featured" },
  { href: "/#work", label: "Our Work" },
  { href: "/contact", label: "Contact Us" },
] as const;
