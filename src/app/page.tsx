import { CinematicSite } from "@/components/site/CinematicSite";
import { getSiteContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getSiteContent();
  return <CinematicSite content={content} />;
}
