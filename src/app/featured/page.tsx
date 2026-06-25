import type { Metadata } from "next";
import { FeaturedPage } from "@/components/site/FeaturedPage";
import { getSiteContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  return {
    title: `Featured | ${content.meta.title.split("|")[0]?.trim() || "Toon Studio"}`,
    description: content.featuredPage.subtitle || "Press features and media coverage of Toon Studio.",
  };
}

export default async function FeaturedRoute() {
  const content = await getSiteContent();
  return <FeaturedPage content={content} />;
}
