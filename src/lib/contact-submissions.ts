import { promises as fs } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import type { ContactFormPayload, ContactSubmission } from "@/types/contact-submission";

const DATA_DIR = path.join(process.cwd(), "data");
const SUBMISSIONS_FILE = path.join(DATA_DIR, "contact-submissions.json");

async function ensureFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(SUBMISSIONS_FILE);
  } catch {
    await fs.writeFile(SUBMISSIONS_FILE, "[]", "utf-8");
  }
}

export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  await ensureFile();
  const raw = await fs.readFile(SUBMISSIONS_FILE, "utf-8");
  const list = JSON.parse(raw) as ContactSubmission[];
  return list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function saveContactSubmission(payload: ContactFormPayload): Promise<ContactSubmission> {
  await ensureFile();
  const submissions = await getContactSubmissions();

  const entry: ContactSubmission = {
    id: uuidv4(),
    name: payload.name.trim(),
    email: payload.email.trim(),
    phone: payload.phone?.trim() || "",
    subject: payload.subject?.trim() || "",
    message: payload.message.trim(),
    createdAt: new Date().toISOString(),
  };

  submissions.unshift(entry);
  await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2), "utf-8");
  return entry;
}
