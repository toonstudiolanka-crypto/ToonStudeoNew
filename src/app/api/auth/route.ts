import { NextRequest, NextResponse } from "next/server";
import { getAdminPassword, getSession, getSessionSecretError } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const secretError = getSessionSecretError();
  if (secretError) {
    return NextResponse.json({ error: secretError }, { status: 500 });
  }

  let password: string | undefined;
  try {
    ({ password } = (await request.json()) as { password?: string });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!password || password !== getAdminPassword()) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  try {
    const session = await getSession();
    session.isLoggedIn = true;
    await session.save();
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Could not start session. Check SESSION_SECRET (32+ chars) in Hostinger env vars." },
      { status: 500 },
    );
  }
}

export async function DELETE() {
  const session = await getSession();
  session.destroy();
  return NextResponse.json({ ok: true });
}

export async function GET() {
  try {
    const session = await getSession();
    return NextResponse.json({ isLoggedIn: !!session.isLoggedIn });
  } catch {
    return NextResponse.json({ isLoggedIn: false });
  }
}
