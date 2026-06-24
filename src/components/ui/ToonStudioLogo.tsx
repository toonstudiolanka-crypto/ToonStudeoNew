import Link from "next/link";

export const LOGO_SRC = "/TonStudioLogo.svg";

type Variant = "nav" | "menu" | "loader" | "footer" | "admin";

const HEIGHT: Record<Variant, number> = {
  nav: 30,
  menu: 28,
  loader: 64,
  footer: 110,
  admin: 34,
};

type Props = {
  variant?: Variant;
  href?: string;
  className?: string;
  dataFooterBrand?: boolean;
};

export function ToonStudioLogo({
  variant = "nav",
  href,
  className,
  dataFooterBrand,
}: Props) {
  const height = HEIGHT[variant];
  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={LOGO_SRC}
      alt="Toon Studio"
      data-footer-brand={dataFooterBrand ? "" : undefined}
      className={className}
      style={{
        height,
        width: "auto",
        display: "block",
        objectFit: "contain",
      }}
    />
  );

  if (href) {
    return (
      <Link href={href} style={{ display: "inline-flex", alignItems: "center", lineHeight: 0 }}>
        {img}
      </Link>
    );
  }

  return img;
}
