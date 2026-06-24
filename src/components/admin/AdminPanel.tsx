"use client";

import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { SiteContent, WorkItem } from "@/types/content";
import type { ContactSubmission } from "@/types/contact-submission";
import { AdminLogin } from "./AdminLogin";
import { MediaField, SectionCard, TextField, YouTubeUrlField } from "./AdminFields";
import { getYouTubeThumbnail, inferMediaTypeFromUrl, isYouTubeUrl, YOUTUBE_URL_HINT } from "@/lib/youtube";
import { ToonStudioLogo } from "@/components/ui/ToonStudioLogo";

const TABS = ["Hero", "About", "Clients", "Featured", "Services", "Work", "Founders", "Contact", "Inquiries", "Footer"] as const;
type Tab = (typeof TABS)[number];

export function AdminPanel() {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const [content, setContent] = useState<SiteContent | null>(null);
  const [tab, setTab] = useState<Tab>("Hero");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [submissions, setSubmissions] = useState<ContactSubmission[] | null>(null);

  const [loadError, setLoadError] = useState("");

  const load = useCallback(async () => {
    setLoadError("");
    try {
      const [authRes, contentRes] = await Promise.all([
        fetch("/api/auth", { credentials: "same-origin" }),
        fetch("/api/admin/content", { credentials: "same-origin" }),
      ]);

      if (!authRes.ok) {
        setLoggedIn(false);
        setLoadError("Could not reach admin API. Redeploy the site or check Hostinger logs.");
        return;
      }

      const auth = (await authRes.json()) as { isLoggedIn: boolean };
      setLoggedIn(auth.isLoggedIn);

      if (auth.isLoggedIn) {
        if (!contentRes.ok) {
          setLoadError("Signed in but content could not load. Check data/site-content.json on the server.");
          return;
        }
        setContent((await contentRes.json()) as SiteContent);
      }
    } catch {
      setLoggedIn(false);
      setLoadError("Network error loading admin. Check your connection and try again.");
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  useEffect(() => {
    if (tab !== "Inquiries" || !loggedIn) return;
    fetch("/api/admin/submissions")
      .then((r) => r.json())
      .then((data) => setSubmissions(data as ContactSubmission[]))
      .catch(() => setSubmissions([]));
  }, [tab, loggedIn]);

  async function save() {
    if (!content) return;
    setSaving(true);
    setSaved(false);
    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    setSaving(false);
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } else {
      alert("Failed to save");
    }
  }

  async function logout() {
    await fetch("/api/auth", { method: "DELETE" });
    setLoggedIn(false);
    setContent(null);
  }

  if (loggedIn === null) {
    return (
      <div style={{ minHeight: "100vh", background: "#0B0B0C", color: "rgba(242,238,230,.5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>
        Loading admin…
      </div>
    );
  }

  if (!loggedIn) {
    return <AdminLogin onLogin={load} loadError={loadError} />;
  }

  if (!content) return null;

  const update = (patch: Partial<SiteContent>) => setContent({ ...content, ...patch });

  return (
    <div style={{ minHeight: "100vh", background: "#0B0B0C", color: "#F2EEE6" }}>
      <header style={{ position: "sticky", top: 0, zIndex: 50, borderBottom: "1px solid rgba(255,255,255,.08)", background: "rgba(11,11,12,.92)", backdropFilter: "blur(16px)", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <ToonStudioLogo variant="admin" href="/" />
          <span style={{ fontSize: 13, color: "rgba(242,238,230,.4)", fontWeight: 500 }}>/ Admin</span>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {saved && <span style={{ fontSize: 13, color: "#2F6BFF" }}>Saved ✓</span>}
          <button onClick={save} disabled={saving} style={{ padding: "10px 20px", borderRadius: 9999, border: "none", background: "linear-gradient(90deg,#FF4D2E,#2F6BFF)", color: "#fff", fontWeight: 600, cursor: saving ? "wait" : "pointer", fontSize: 14 }}>
            {saving ? "Saving…" : "Save changes"}
          </button>
          <a href="/" target="_blank" rel="noopener noreferrer" style={{ padding: "10px 16px", borderRadius: 9999, border: "1px solid rgba(255,255,255,.2)", color: "#F2EEE6", fontSize: 13, textDecoration: "none" }}>View site</a>
          <button onClick={logout} style={{ padding: "10px 16px", borderRadius: 9999, border: "1px solid rgba(255,255,255,.15)", background: "transparent", color: "rgba(242,238,230,.6)", fontSize: 13, cursor: "pointer" }}>Logout</button>
        </div>
      </header>

      <div style={{ display: "flex", minHeight: "calc(100vh - 72px)" }}>
        <nav style={{ width: 200, flexShrink: 0, borderRight: "1px solid rgba(255,255,255,.08)", padding: "20px 12px" }}>
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                display: "block", width: "100%", textAlign: "left", padding: "12px 14px", marginBottom: 4, borderRadius: 10, border: "none",
                background: tab === t ? "rgba(255,77,46,.15)" : "transparent",
                color: tab === t ? "#FF4D2E" : "rgba(242,238,230,.7)",
                fontWeight: tab === t ? 600 : 400, cursor: "pointer", fontSize: 14,
              }}
            >
              {t}
            </button>
          ))}
        </nav>

        <main style={{ flex: 1, padding: "28px 32px", maxWidth: 760, overflow: "auto" }}>
          {tab === "Hero" && (
            <SectionCard title="Hero section">
              <TextField label="Eyebrow" value={content.hero.eyebrow} onChange={(v) => update({ hero: { ...content.hero, eyebrow: v } })} />
              <TextField label="Title line 1" value={content.hero.titleLines[0] || ""} onChange={(v) => { const lines = [...content.hero.titleLines]; lines[0] = v; update({ hero: { ...content.hero, titleLines: lines } }); }} />
              <TextField label="Title line 2 (gradient)" value={content.hero.titleLines[1] || ""} onChange={(v) => { const lines = [...content.hero.titleLines]; lines[1] = v; update({ hero: { ...content.hero, titleLines: lines } }); }} />
              <TextField label="Title line 3" value={content.hero.titleLines[2] || ""} onChange={(v) => { const lines = [...content.hero.titleLines]; lines[2] = v; update({ hero: { ...content.hero, titleLines: lines } }); }} />
              <TextField label="Subtitle" value={content.hero.subtitle} onChange={(v) => update({ hero: { ...content.hero, subtitle: v } })} multiline />
              <TextField label="Tags (comma separated)" value={content.hero.tags.join(", ")} onChange={(v) => update({ hero: { ...content.hero, tags: v.split(",").map((s) => s.trim()).filter(Boolean) } })} />
              <MediaField
                label="Hero showreel / background"
                mediaKind="both"
                url={content.hero.mediaUrl}
                type={content.hero.mediaType}
                onUpload={(url, type) => update({ hero: { ...content.hero, mediaUrl: url, mediaType: type } })}
                onRemove={() => update({ hero: { ...content.hero, mediaUrl: "", mediaType: "video" } })}
              />
              <TextField
                label="Hero media URL (YouTube link, MP4, or image)"
                value={content.hero.mediaUrl}
                hint={YOUTUBE_URL_HINT}
                onChange={(v) =>
                  update({
                    hero: {
                      ...content.hero,
                      mediaUrl: v,
                      mediaType: isYouTubeUrl(v) ? "video" : inferMediaTypeFromUrl(v),
                    },
                  })
                }
              />
              {isYouTubeUrl(content.hero.mediaUrl) && (
                <p style={{ margin: "-8px 0 16px", fontSize: 12, color: "#2F6BFF" }}>
                  ✓ YouTube hero — background plays automatically with react-youtube
                </p>
              )}
              <TextField
                label="Hero media type (video or image)"
                value={content.hero.mediaType}
                onChange={(v) =>
                  update({
                    hero: {
                      ...content.hero,
                      mediaType: v === "image" ? "image" : "video",
                    },
                  })
                }
              />
            </SectionCard>
          )}

          {tab === "About" && (
            <>
              <SectionCard title="Who are we">
                <TextField label="Label" value={content.whoWeAre.label} onChange={(v) => update({ whoWeAre: { ...content.whoWeAre, label: v } })} />
                <TextField label="Headline" value={content.whoWeAre.headline} onChange={(v) => update({ whoWeAre: { ...content.whoWeAre, headline: v } })} multiline />
                <TextField label="Description" value={content.whoWeAre.description} onChange={(v) => update({ whoWeAre: { ...content.whoWeAre, description: v } })} multiline />
              </SectionCard>
              <SectionCard title="Our strength">
                <TextField label="Label" value={content.strength.label} onChange={(v) => update({ strength: { ...content.strength, label: v } })} />
                <TextField label="Headline" value={content.strength.headline} onChange={(v) => update({ strength: { ...content.strength, headline: v } })} />
                {content.strength.paragraphs.map((p, i) => (
                  <TextField key={i} label={`Paragraph ${i + 1}`} value={p} onChange={(v) => { const paragraphs = [...content.strength.paragraphs]; paragraphs[i] = v; update({ strength: { ...content.strength, paragraphs } }); }} multiline />
                ))}
                <TextField label="Quote" value={content.strength.quote} onChange={(v) => update({ strength: { ...content.strength, quote: v } })} multiline />
                <TextField label="Footer text" value={content.strength.footer} onChange={(v) => update({ strength: { ...content.strength, footer: v } })} multiline />
              </SectionCard>
            </>
          )}

          {tab === "Clients" && (
            <SectionCard title="Client logos">
              <TextField
                label="Section label"
                value={content.clientLogos.label}
                onChange={(v) => update({ clientLogos: { ...content.clientLogos, label: v } })}
              />
              {content.clientLogos.logos.map((logo, i) => (
                <div key={logo.id} style={{ borderTop: i ? "1px solid rgba(255,255,255,.08)" : "none", paddingTop: i ? 20 : 0, marginTop: i ? 20 : 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <strong>Logo {i + 1}</strong>
                    <button
                      type="button"
                      onClick={() =>
                        update({
                          clientLogos: {
                            ...content.clientLogos,
                            logos: content.clientLogos.logos.filter((x) => x.id !== logo.id),
                          },
                        })
                      }
                      style={{ background: "none", border: "none", color: "#FF4D2E", cursor: "pointer", fontSize: 13 }}
                    >
                      Remove
                    </button>
                  </div>
                  <TextField
                    label="Client name (shown on placeholder if no image)"
                    value={logo.name}
                    onChange={(val) => {
                      const logos = content.clientLogos.logos.map((x) => (x.id === logo.id ? { ...x, name: val } : x));
                      update({ clientLogos: { ...content.clientLogos, logos } });
                    }}
                  />
                  <MediaField
                    label="Logo image"
                    url={logo.imageUrl}
                    onUpload={(url) => {
                      const logos = content.clientLogos.logos.map((x) => (x.id === logo.id ? { ...x, imageUrl: url } : x));
                      update({ clientLogos: { ...content.clientLogos, logos } });
                    }}
                    onRemove={() => {
                      const logos = content.clientLogos.logos.map((x) => (x.id === logo.id ? { ...x, imageUrl: "" } : x));
                      update({ clientLogos: { ...content.clientLogos, logos } });
                    }}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  update({
                    clientLogos: {
                      ...content.clientLogos,
                      logos: [...content.clientLogos.logos, { id: uuidv4(), name: "Client Logo", imageUrl: "" }],
                    },
                  })
                }
                style={{
                  marginTop: 16,
                  padding: "12px 20px",
                  borderRadius: 9999,
                  border: "1px dashed rgba(255,255,255,.25)",
                  background: "transparent",
                  color: "#F2EEE6",
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                + Add client logo
              </button>
            </SectionCard>
          )}

          {tab === "Featured" && (
            <SectionCard title="Featured videos">
              {content.featuredVideos.map((v, i) => (
                <div key={v.id} style={{ borderTop: i ? "1px solid rgba(255,255,255,.08)" : "none", paddingTop: i ? 20 : 0, marginTop: i ? 20 : 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <strong>Video {i + 1}</strong>
                    <button type="button" onClick={() => update({ featuredVideos: content.featuredVideos.filter((x) => x.id !== v.id) })} style={{ background: "none", border: "none", color: "#FF4D2E", cursor: "pointer", fontSize: 13 }}>Remove</button>
                  </div>
                  <TextField label="Title" value={v.title} onChange={(val) => { const featuredVideos = content.featuredVideos.map((x) => x.id === v.id ? { ...x, title: val } : x); update({ featuredVideos }); }} />
                  <TextField label="Category" value={v.category} onChange={(val) => { const featuredVideos = content.featuredVideos.map((x) => x.id === v.id ? { ...x, category: val } : x); update({ featuredVideos }); }} />
                  <YouTubeUrlField
                    label="Video URL (YouTube etc.)"
                    value={v.videoUrl}
                    showThumbnailAction
                    onChange={(val) => {
                      const featuredVideos = content.featuredVideos.map((x) => {
                        if (x.id !== v.id) return x;
                        const autoThumb = !x.thumbnailUrl ? getYouTubeThumbnail(val, "max") || "" : x.thumbnailUrl;
                        return { ...x, videoUrl: val, thumbnailUrl: autoThumb };
                      });
                      update({ featuredVideos });
                    }}
                    onUseThumbnail={() => {
                      const thumb = getYouTubeThumbnail(v.videoUrl, "max") || getYouTubeThumbnail(v.videoUrl, "hq") || "";
                      if (!thumb) return;
                      const featuredVideos = content.featuredVideos.map((x) =>
                        x.id === v.id ? { ...x, thumbnailUrl: thumb } : x,
                      );
                      update({ featuredVideos });
                    }}
                  />
                  <MediaField label="Thumbnail" url={v.thumbnailUrl} onUpload={(url) => { const featuredVideos = content.featuredVideos.map((x) => x.id === v.id ? { ...x, thumbnailUrl: url } : x); update({ featuredVideos }); }} onRemove={() => { const featuredVideos = content.featuredVideos.map((x) => x.id === v.id ? { ...x, thumbnailUrl: "" } : x); update({ featuredVideos }); }} />
                </div>
              ))}
              <button type="button" onClick={() => update({ featuredVideos: [...content.featuredVideos, { id: uuidv4(), title: "New video", category: "Category", thumbnailUrl: "", videoUrl: "" }] })} style={{ marginTop: 16, padding: "12px 20px", borderRadius: 9999, border: "1px dashed rgba(255,255,255,.25)", background: "transparent", color: "#F2EEE6", cursor: "pointer", width: "100%" }}>
                + Add featured video
              </button>
            </SectionCard>
          )}

          {tab === "Services" && (
            <SectionCard title="Services">
              {content.services.map((s, i) => (
                <div key={s.id} style={{ borderTop: i ? "1px solid rgba(255,255,255,.08)" : "none", paddingTop: i ? 20 : 0, marginTop: i ? 20 : 0 }}>
                  <strong style={{ display: "block", marginBottom: 12 }}>Service {s.number}</strong>
                  <TextField label="Title" value={s.title} onChange={(val) => { const services = content.services.map((x) => x.id === s.id ? { ...x, title: val } : x); update({ services }); }} />
                  <TextField label="Description" value={s.description} onChange={(val) => { const services = content.services.map((x) => x.id === s.id ? { ...x, description: val } : x); update({ services }); }} multiline />
                  <MediaField label="Image" url={s.imageUrl} onUpload={(url) => { const services = content.services.map((x) => x.id === s.id ? { ...x, imageUrl: url } : x); update({ services }); }} onRemove={() => { const services = content.services.map((x) => x.id === s.id ? { ...x, imageUrl: "" } : x); update({ services }); }} />
                </div>
              ))}
            </SectionCard>
          )}

          {tab === "Work" && (
            <SectionCard title="Our work projects">
              {content.work.map((w, i) => (
                <div key={w.id} style={{ borderTop: i ? "1px solid rgba(255,255,255,.08)" : "none", paddingTop: i ? 20 : 0, marginTop: i ? 20 : 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                    <strong>Project {i + 1}</strong>
                    <button type="button" onClick={() => update({ work: content.work.filter((x) => x.id !== w.id) })} style={{ background: "none", border: "none", color: "#FF4D2E", cursor: "pointer", fontSize: 13 }}>Remove</button>
                  </div>
                  <TextField label="Title" value={w.title} onChange={(val) => { const work = content.work.map((x) => x.id === w.id ? { ...x, title: val } : x); update({ work }); }} />
                  <TextField label="Category" value={w.category} onChange={(val) => { const work = content.work.map((x) => x.id === w.id ? { ...x, category: val } : x); update({ work }); }} />
                  <TextField label="Year" value={w.year} onChange={(val) => { const work = content.work.map((x) => x.id === w.id ? { ...x, year: val } : x); update({ work }); }} />
                  <MediaField label="Project image" url={w.imageUrl} onUpload={(url) => { const work = content.work.map((x) => x.id === w.id ? { ...x, imageUrl: url } : x); update({ work }); }} onRemove={() => { const work = content.work.map((x) => x.id === w.id ? { ...x, imageUrl: "" } : x); update({ work }); }} />
                </div>
              ))}
              <button type="button" onClick={() => update({ work: [...content.work, { id: uuidv4(), title: "New project", category: "Category", year: "2024", imageUrl: "", aspect: "4/5" as WorkItem["aspect"] }] })} style={{ marginTop: 16, padding: "12px 20px", borderRadius: 9999, border: "1px dashed rgba(255,255,255,.25)", background: "transparent", color: "#F2EEE6", cursor: "pointer", width: "100%" }}>
                + Add project
              </button>
            </SectionCard>
          )}

          {tab === "Founders" && (
            <SectionCard title="Founders">
              {content.founders.map((f, i) => (
                <div key={f.id} style={{ borderTop: i ? "1px solid rgba(255,255,255,.08)" : "none", paddingTop: i ? 20 : 0, marginTop: i ? 20 : 0 }}>
                  <strong style={{ display: "block", marginBottom: 12 }}>Founder {i + 1}</strong>
                  <TextField label="Name" value={f.name} onChange={(val) => { const founders = content.founders.map((x) => x.id === f.id ? { ...x, name: val } : x); update({ founders }); }} />
                  <TextField label="Bio" value={f.bio} onChange={(val) => { const founders = content.founders.map((x) => x.id === f.id ? { ...x, bio: val } : x); update({ founders }); }} multiline />
                  <MediaField label="Portrait" url={f.imageUrl} onUpload={(url) => { const founders = content.founders.map((x) => x.id === f.id ? { ...x, imageUrl: url } : x); update({ founders }); }} onRemove={() => { const founders = content.founders.map((x) => x.id === f.id ? { ...x, imageUrl: "" } : x); update({ founders }); }} />
                </div>
              ))}
            </SectionCard>
          )}

          {tab === "Contact" && (
            <SectionCard title="Contact & social">
              <TextField label="Email" value={content.contact.email} onChange={(v) => update({ contact: { ...content.contact, email: v } })} />
              <TextField label="Phone 1" value={content.contact.phones[0] || ""} onChange={(v) => { const phones = [...content.contact.phones]; phones[0] = v; update({ contact: { ...content.contact, phones } }); }} />
              <TextField label="Phone 2" value={content.contact.phones[1] || ""} onChange={(v) => { const phones = [...content.contact.phones]; phones[1] = v; update({ contact: { ...content.contact, phones } }); }} />
              <TextField label="YouTube channel URL" value={content.contact.youtubeUrl} onChange={(v) => update({ contact: { ...content.contact, youtubeUrl: v } })} />
              {content.contact.social.map((s, i) => (
                <div key={s.label} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <TextField label={`${s.label} label`} value={s.label} onChange={(v) => { const social = content.contact.social.map((x, j) => j === i ? { ...x, label: v } : x); update({ contact: { ...content.contact, social } }); }} />
                  <TextField label={`${s.label} URL`} value={s.url} onChange={(v) => { const social = content.contact.social.map((x, j) => j === i ? { ...x, url: v } : x); update({ contact: { ...content.contact, social } }); }} />
                </div>
              ))}
            </SectionCard>
          )}

          {tab === "Inquiries" && (
            <SectionCard title="Contact form submissions">
              {submissions === null ? (
                <p style={{ margin: 0, color: "rgba(242,238,230,.5)", fontSize: 14 }}>Loading…</p>
              ) : submissions.length === 0 ? (
                <p style={{ margin: 0, color: "rgba(242,238,230,.5)", fontSize: 14 }}>No messages yet.</p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {submissions.map((s) => (
                    <div key={s.id} style={{ padding: 18, borderRadius: 14, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
                        <strong style={{ fontSize: 16 }}>{s.name}</strong>
                        <span style={{ fontSize: 12, color: "rgba(242,238,230,.45)" }}>
                          {new Date(s.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <div style={{ fontSize: 14, color: "rgba(242,238,230,.72)", marginBottom: 8 }}>
                        <a href={`mailto:${s.email}`} style={{ color: "#2F6BFF" }}>{s.email}</a>
                        {s.phone && <span> · {s.phone}</span>}
                      </div>
                      {s.subject && (
                        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: "rgba(242,238,230,.85)" }}>
                          {s.subject}
                        </div>
                      )}
                      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: "rgba(242,238,230,.72)", whiteSpace: "pre-wrap" }}>
                        {s.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </SectionCard>
          )}

          {tab === "Footer" && (
            <>
              <SectionCard title="Site meta">
                <TextField label="Page title" value={content.meta.title} onChange={(v) => update({ meta: { ...content.meta, title: v } })} />
                <TextField label="Meta description" value={content.meta.description} onChange={(v) => update({ meta: { ...content.meta, description: v } })} multiline />
              </SectionCard>
              <SectionCard title="Footer">
                <TextField label="Copyright" value={content.footer.copyright} onChange={(v) => update({ footer: { ...content.footer, copyright: v } })} />
                <TextField label="Location" value={content.footer.location} onChange={(v) => update({ footer: { ...content.footer, location: v } })} />
              </SectionCard>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
