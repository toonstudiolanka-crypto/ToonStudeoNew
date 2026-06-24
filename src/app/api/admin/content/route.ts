import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getSiteContent, saveSiteContent } from "@/lib/content";
import type { SiteContent } from "@/types/content";

export async function PUT(request: NextRequest) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as SiteContent;
    const saved = await saveSiteContent(body);
    return NextResponse.json(saved);
  } catch {
    return NextResponse.json({ error: "Invalid content" }, { status: 400 });
  }
}

export async function GET() {
  const content = await getSiteContent();
  return NextResponse.json(content);
}
