import { getIronSession, SessionOptions } from "iron-session";
import { cookies } from "next/headers";

export type SessionData = {
  isLoggedIn: boolean;
};

function cookieSecure(): boolean {
  if (process.env.ADMIN_COOKIE_SECURE === "true") return true;
  if (process.env.ADMIN_COOKIE_SECURE === "false") return false;
  return process.env.NODE_ENV === "production";
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET || "toon-studio-dev-secret-change-in-production-min-32-chars",
  cookieName: "toon-studio-admin",
  cookieOptions: {
    secure: cookieSecure(),
    httpOnly: true,
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  },
};

export async function getSession() {
  return getIronSession<SessionData>(await cookies(), sessionOptions);
}

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "toonstudio2024";
}

export function getSessionSecretError(): string | null {
  const secret = process.env.SESSION_SECRET || "toon-studio-dev-secret-change-in-production-min-32-chars";
  if (secret.length < 32) {
    return "SESSION_SECRET must be at least 32 characters. Update it in Hostinger Environment Variables.";
  }
  return null;
}
