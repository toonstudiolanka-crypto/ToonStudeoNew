"use client";

import { useState } from "react";
import Link from "next/link";
import { ToonStudioLogo } from "@/components/ui/ToonStudioLogo";

type Props = {
  onLogin: () => void;
  loadError?: string;
};

export function AdminLogin({ onLogin, loadError }: Props) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { error?: string };
      setLoading(false);
      if (!res.ok) {
        setError(data.error || "Invalid password");
        return;
      }
      onLogin();
    } catch {
      setLoading(false);
      setError("Could not sign in. Check your connection and try again.");
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0B0B0C", color: "#F2EEE6", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 420, border: "1px solid rgba(255,255,255,.12)", borderRadius: 24, padding: "40px 32px", background: "rgba(255,255,255,.03)" }}>
        <div style={{ marginBottom: 8 }}>
          <ToonStudioLogo variant="admin" />
        </div>
        <p style={{ margin: "0 0 28px", color: "rgba(242,238,230,.55)", fontSize: 14 }}>Admin panel — sign in to manage your site</p>
        <label style={{ display: "block", fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(242,238,230,.45)", marginBottom: 8 }}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "14px 16px", borderRadius: 12, border: "1px solid rgba(255,255,255,.15)", background: "#141416", color: "#fff", fontSize: 15, marginBottom: 16 }}
          placeholder="Enter admin password"
        />
        {loadError && <p style={{ color: "#FFC53D", fontSize: 13, margin: "0 0 12px", lineHeight: 1.5 }}>{loadError}</p>}
        {error && <p style={{ color: "#FF4D2E", fontSize: 13, margin: "0 0 12px" }}>{error}</p>}
        <button type="submit" disabled={loading} style={{ width: "100%", padding: "14px 20px", borderRadius: 9999, border: "none", background: "linear-gradient(90deg,#FF4D2E,#2F6BFF)", color: "#fff", fontWeight: 600, cursor: loading ? "wait" : "pointer", fontSize: 15 }}>
          {loading ? "Signing in…" : "Sign in"}
        </button>
        <p style={{ margin: "20px 0 0", fontSize: 12, color: "rgba(242,238,230,.35)", textAlign: "center" }}>
          <Link href="/" style={{ color: "#FF4D2E" }}>← Back to site</Link>
        </p>
      </form>
    </div>
  );
}
