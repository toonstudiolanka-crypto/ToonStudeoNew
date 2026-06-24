import { promises as fs } from "fs";
import path from "path";
import type { SiteContent } from "@/types/content";

const DATA_DIR = path.join(process.cwd(), "data");
const CONTENT_FILE = path.join(DATA_DIR, "site-content.json");
const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

export async function ensureDirs() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.mkdir(UPLOADS_DIR, { recursive: true });
}

const DEFAULT_CLIENT_LOGOS: SiteContent["clientLogos"] = {
  label: "Brands we've worked with",
  logos: Array.from({ length: 10 }, (_, i) => ({
    id: `client-${i + 1}`,
    name: `Partner ${String(i + 1).padStart(2, "0")}`,
    imageUrl: "",
  })),
};

function normalizeContent(content: SiteContent): SiteContent {
  return {
    ...content,
    clientLogos: content.clientLogos ?? DEFAULT_CLIENT_LOGOS,
  };
}

export async function getSiteContent(): Promise<SiteContent> {
  await ensureDirs();
  const raw = await fs.readFile(CONTENT_FILE, "utf-8");
  return normalizeContent(JSON.parse(raw) as SiteContent);
}

export async function saveSiteContent(content: SiteContent): Promise<SiteContent> {
  await ensureDirs();
  await fs.writeFile(CONTENT_FILE, JSON.stringify(content, null, 2), "utf-8");
  return content;
}

export async function deleteUploadedFile(fileUrl: string) {
  if (!fileUrl.startsWith("/uploads/")) return;
  const filePath = path.join(process.cwd(), "public", fileUrl.replace(/^\//, ""));
  try {
    await fs.unlink(filePath);
  } catch {
    /* file may already be gone */
  }
}

export function uploadsDir() {
  return UPLOADS_DIR;
}
