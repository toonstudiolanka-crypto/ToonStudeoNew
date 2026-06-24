import type { Metadata } from "next";
import { CinematicSite } from "@/components/site/CinematicSite";
import { getSiteContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  return {
    title: content.meta.title,
    description: content.meta.description,
  };
}

export default async function Home() {
  const content = await getSiteContent();
  return <CinematicSite content={content} />;
}
