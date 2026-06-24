# Toon Studio Website

Full-stack Node.js website for **Toon Studio** — cinematic public site + admin CMS at `/admin`.

Built with **Next.js 16** (React + Node.js API routes). Requires **Node.js 20.9.0+**.

See [README-HOSTINGER.md](./README-HOSTINGER.md) for full Hostinger deployment steps.

## Quick start

```bash
cd toon-studio-app
npm install
cp .env.example .env.local
npm run dev
```

| URL | Description |
|-----|-------------|
| http://localhost:3000 | Public cinematic site |
| http://localhost:3000/admin | Admin panel (CMS) |

**Default admin password:** `toonstudio2024` (change in `.env.local`)

## What you can manage in `/admin`

- **Hero** — title, subtitle, tags, showreel video/image
- **About** — who we are + strength section text
- **Featured** — add/remove videos, thumbnails, YouTube links
- **Services** — edit text + upload images per service
- **Work** — add/remove portfolio projects with images
- **Founders** — names, bios, portrait photos
- **Contact** — email, phones, social links
- **Footer** — copyright, location, SEO meta

Click **Save changes** after editing. Upload images/videos directly from each section.

## Project structure

```
toon-studio-app/
├── data/site-content.json    # Site content (editable via admin)
├── public/uploads/           # Uploaded images & videos
├── src/app/
│   ├── page.tsx              # Public homepage
│   ├── admin/page.tsx        # Admin CMS at /admin
│   └── api/                  # Backend API routes
├── src/components/site/      # Cinematic frontend
└── src/components/admin/     # Admin UI (same design language)
legacy/                       # Original .dc.html export (reference only)
```

## Production

```bash
npm run build
npm start
```

Set strong values for `ADMIN_PASSWORD` and `SESSION_SECRET` in production.

## Environment variables

| Variable | Description |
|----------|-------------|
| `ADMIN_PASSWORD` | Password for `/admin` login |
| `SESSION_SECRET` | Cookie encryption key (32+ chars) |
