# Hostinger Node.js Web App — exact build settings

Use these values in **hPanel → Websites → your site → Settings & Redeploy**.

## Build settings (copy exactly)

| Setting | Value |
|---------|-------|
| **Framework** | **Next.js** |
| **Node.js version** | **20.x** |
| **Install command** | `npm ci` |
| **Build command** | `npm run build` |
| **Start command** | `npm run start -- -H 0.0.0.0 -p $PORT` |
| **Output directory** | `.next` |
| **Entry file** | *(leave blank — required when Framework = Next.js)* |

> The `start` script in package.json is simply `next start`.
> Hostinger appends `-H 0.0.0.0 -p $PORT` at runtime via the Start command field above.

## Environment variables

| Variable | Example |
|----------|---------|
| `ADMIN_PASSWORD` | your-strong-admin-password |
| `SESSION_SECRET` | random-string-at-least-32-characters-long |
| `NODE_ENV` | `production` |
| `PORT` | *(set automatically by Hostinger — do NOT add this manually)* |

---

## Fix 503 Service Unavailable (step by step)

503 means the Node.js process is **not running**. Complete every step in order.

### Step 1 — Verify hPanel settings

Open **Settings & Redeploy** and confirm every field matches the table above.
Common mistakes:
- Node.js left at **18.x** instead of **20.x**
- Start command blank or wrong (must include `-H 0.0.0.0 -p $PORT`)
- Entry file set to `server.js` when Framework = Next.js (leave Entry file blank)

### Step 2 — Read the deployment log

hPanel → **Deployments** → open latest entry → **View log**

| Log message | Fix |
|-------------|-----|
| `Node.js 18` / `>=20.9.0 is required` | Set Node.js to **20.x** and Redeploy |
| `npm ERR! Unsupported engine` | Same as above |
| `package-lock.json` out of sync | Run `npm install` locally → commit → push → Redeploy |
| `Cannot find module 'next'` | Install command not running; set Install command to `npm ci` |
| Build succeeded, no start errors shown | Continue to Step 3 |

### Step 3 — Redeploy (not just Restart)

Click **Redeploy** in hPanel. "Restart" only restarts the process — it does not rebuild.

### Step 4 — Test the health endpoint

```
https://bisque-albatross-265429.hostingersite.com/api/health
```

| Result | Meaning |
|--------|---------|
| `{"ok":true,...}` | App is running — deployment is working |
| 503 | App is still not starting — see Step 5 |

### Step 5 — Still 503 after all steps?

Go to hPanel → **Log files** (or ask Hostinger support for **stderr / runtime logs**).
Paste the last 30 lines here so the exact crash reason can be diagnosed.

---

## Data files — do not overwrite on redeploy

- `data/site-content.json` — all site content
- `data/contact-submissions.json` — contact form submissions
- `public/uploads/` — uploaded images and videos
