import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getContactSubmissions } from "@/lib/contact-submissions";

export async function GET() {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const submissions = await getContactSubmissions();
  return NextResponse.json(submissions);
}
