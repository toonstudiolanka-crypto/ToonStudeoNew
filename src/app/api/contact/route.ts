import { NextRequest, NextResponse } from "next/server";
import { saveContactSubmission } from "@/lib/contact-submissions";
import type { ContactFormPayload } from "@/types/contact-submission";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function bad(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: NextRequest) {
  let body: ContactFormPayload;

  try {
    body = (await request.json()) as ContactFormPayload;
  } catch {
    return bad("Invalid request body");
  }

  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  if (!name || name.length < 2) return bad("Please enter your name");
  if (!email || !EMAIL_RE.test(email)) return bad("Please enter a valid email");
  if (!message || message.length < 10) return bad("Message must be at least 10 characters");
  if (message.length > 5000) return bad("Message is too long");

  const phone = body.phone?.trim() || "";
  const subject = body.subject?.trim() || "";

  if (phone.length > 40) return bad("Phone number is too long");
  if (subject.length > 200) return bad("Subject is too long");
  if (name.length > 120) return bad("Name is too long");

  try {
    await saveContactSubmission({ name, email, phone, subject, message });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Could not send message. Please try again." }, { status: 500 });
  }
}
