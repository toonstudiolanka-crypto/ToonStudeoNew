import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "toon-studio",
    time: new Date().toISOString(),
  });
}
