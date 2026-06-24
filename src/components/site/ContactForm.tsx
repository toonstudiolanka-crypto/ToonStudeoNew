"use client";

import { FormEvent, useState } from "react";

const fieldStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: 12,
  border: "1px solid rgba(21,19,15,.14)",
  background: "#fff",
  color: "#15130F",
  fontSize: 15,
  outline: "none",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 12,
  letterSpacing: ".14em",
  textTransform: "uppercase",
  color: "rgba(21,19,15,.5)",
  marginBottom: 8,
  fontWeight: 600,
};

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, subject, message, website }),
      });
      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        setStatus("error");
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setMessage("");
    } catch {
      setStatus("error");
      setError("Could not send message. Please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        data-reveal
        style={{
          padding: "clamp(32px,5vw,48px)",
          borderRadius: 24,
          background: "#15130F",
          color: "#F2EEE6",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 40, marginBottom: 16 }}>✓</div>
        <h2
          style={{
            margin: "0 0 12px",
            fontFamily: "var(--font-bricolage)",
            fontWeight: 800,
            fontSize: "clamp(28px,5vw,36px)",
            lineHeight: 1,
          }}
        >
          Message sent!
        </h2>
        <p style={{ margin: "0 0 24px", fontSize: 16, lineHeight: 1.55, color: "rgba(242,238,230,.72)" }}>
          Thanks for reaching out. We&apos;ll get back to you as soon as possible.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          style={{
            fontSize: 14,
            fontWeight: 600,
            background: "#FF4D2E",
            color: "#fff",
            padding: "14px 24px",
            borderRadius: 9999,
            border: "none",
            cursor: "pointer",
          }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      data-reveal
      data-contact-form
      onSubmit={onSubmit}
      style={{
        padding: "clamp(28px,4vw,40px)",
        borderRadius: 24,
        background: "#fff",
        border: "1px solid rgba(21,19,15,.08)",
        boxShadow: "0 24px 60px rgba(21,19,15,.06)",
      }}
    >
      <div
        style={{
          fontSize: 12,
          letterSpacing: ".2em",
          textTransform: "uppercase",
          color: "#FF4D2E",
          marginBottom: 12,
          fontWeight: 600,
        }}
      >
        Send a message
      </div>
      <h2
        style={{
          margin: "0 0 28px",
          fontFamily: "var(--font-bricolage)",
          fontWeight: 800,
          fontSize: "clamp(28px,4vw,40px)",
          lineHeight: 0.95,
          letterSpacing: "-.02em",
        }}
      >
        Tell us about your project
      </h2>

      <div data-contact-form-grid style={{ display: "grid", gap: 18 }}>
        <div>
          <label htmlFor="contact-name" style={labelStyle}>
            Name *
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            minLength={2}
            maxLength={120}
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={fieldStyle}
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="contact-email" style={labelStyle}>
            Email *
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={fieldStyle}
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="contact-phone" style={labelStyle}>
            Phone
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            maxLength={40}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={fieldStyle}
            placeholder="+94 71 123 4567"
          />
        </div>

        <div>
          <label htmlFor="contact-subject" style={labelStyle}>
            Subject
          </label>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            maxLength={200}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            style={fieldStyle}
            placeholder="Animation project, video production…"
          />
        </div>

        <div style={{ gridColumn: "1 / -1" }}>
          <label htmlFor="contact-message" style={labelStyle}>
            Message *
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            minLength={10}
            maxLength={5000}
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ ...fieldStyle, resize: "vertical", minHeight: 140, lineHeight: 1.55 }}
            placeholder="Share your idea, timeline, and what you need help with…"
          />
        </div>

        <input
          type="text"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          style={{ position: "absolute", left: -9999, opacity: 0, height: 0, width: 0 }}
        />
      </div>

      {status === "error" && error && (
        <p style={{ margin: "18px 0 0", fontSize: 14, color: "#FF4D2E", fontWeight: 500 }}>{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        style={{
          marginTop: 24,
          width: "100%",
          fontSize: 14,
          fontWeight: 600,
          background: status === "sending" ? "rgba(255,77,46,.6)" : "#FF4D2E",
          color: "#fff",
          padding: "16px 28px",
          borderRadius: 9999,
          border: "none",
          cursor: status === "sending" ? "wait" : "pointer",
        }}
      >
        {status === "sending" ? "Sending…" : "Send message →"}
      </button>
    </form>
  );
}
