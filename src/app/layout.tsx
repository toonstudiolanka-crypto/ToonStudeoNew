import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Space_Grotesk, Caveat } from "next/font/google";
import { ChunkLoadRecovery } from "@/components/site/ChunkLoadRecovery";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/TonStudioLogo.svg",
    apple: "/TonStudioLogo.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#0B0B0C",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" className={`${bricolage.variable} ${spaceGrotesk.variable} ${caveat.variable} h-full`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://www.youtube-nocookie.com" />
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://i.ytimg.com" />
      </head>
      <body className="min-h-full antialiased" suppressHydrationWarning>
        <ChunkLoadRecovery />
        {children}
      </body>
    </html>
  );
}
