import type { Metadata } from "next";
import { ContactPage } from "@/components/site/ContactPage";
import { getSiteContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  return {
    title: `Contact Us | ${content.meta.title.split("|")[0]?.trim() || "Toon Studio"}`,
    description: `Get in touch with Toon Studio — ${content.footer.location}. Email ${content.contact.email} or call us to start your next creative project.`,
  };
}

export default async function ContactRoute() {
  const content = await getSiteContent();
  return <ContactPage content={content} />;
}
