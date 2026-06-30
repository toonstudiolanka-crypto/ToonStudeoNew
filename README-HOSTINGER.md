# Hostinger Node.js Web App — exact build settings

Use these values in **hPanel → Websites → your site → Settings & Redeploy**.

## Build settings (copy exactly)

| Setting | Value |
|---------|-------|
| **Framework** | **Next.js** |
| **Node.js version** | **20.x** |
| **Install command** | `npm ci` |
| **Build command** | `npm run build` |
| **Start command** | `npm start` |
| **Output directory** | `.next` |
| **Entry file** | `server.js` |

> The `start` script in package.json runs `node server.js`.
> `server.js` binds to `0.0.0.0` and reads `PORT` from the environment (set automatically by Hostinger).
> Do **not** pass `-H` / `-p` flags in the Start command — they are ignored by `node server.js`.

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
- Start command blank, `next start`, or `npm run start -- -H 0.0.0.0 -p $PORT` (use **`npm start`**)
- Entry file left blank (must be **`server.js`**)
- `ADMIN_PASSWORD` or `SESSION_SECRET` (32+ chars) missing from Environment Variables

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

### Step 5 — Custom domain (e.g. toonstudiolk.com) shows 503 but the preview URL works?

The Hostinger preview URL must work first:

```
https://bisque-albatross-265429.hostingersite.com/api/health
```

If that returns `{"ok":true,...}` but your custom domain does not:

1. hPanel → **Websites** → your Node.js site → **Domains** → add `toonstudiolk.com` and `www.toonstudiolk.com`
2. Point DNS **A records** for `@` and `www` to the IP shown in hPanel for this website (use Hostinger’s value — do not guess)
3. Wait for DNS/SSL to finish (can take up to a few hours), then **Redeploy**
4. Test `https://toonstudiolk.com/api/health` — same JSON as the preview URL means the domain is wired correctly

### Step 6 — Still 503 after all steps?

Go to hPanel → **Log files** (or ask Hostinger support for **stderr / runtime logs**).
Paste the last 30 lines here so the exact crash reason can be diagnosed.

---

## Data files — do not overwrite on redeploy

- `data/site-content.json` — all site content
- `data/contact-submissions.json` — contact form submissions
- `public/uploads/` — uploaded images and videos

---

## Fix ChunkLoadError / MIME type errors after deploy

If the browser console shows errors like:

- `Failed to load chunk /_next/static/chunks/....js`
- `MIME type ('text/plain') is not executable`
- `ChunkLoadError`

the HTML page is pointing at JavaScript files from an **older build** that no longer exist on the server.

### What to do

1. In hPanel click **Redeploy** (not only Restart) and wait until the build finishes.
2. Hard refresh the site: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac).
3. Confirm `https://your-domain.com/api/health` returns `{"ok":true,...}`.
4. If the error persists, open the failing chunk URL directly in the browser. A working deploy returns JavaScript; a broken deploy returns plain text or 404/500.

### Prevent it

- Always redeploy after pushing code changes.
- Do not manually delete files inside `.next/` on the server between restarts.
- Keep **Node.js 20.x** and the build/start commands from the table above.

The app now auto-reloads once when a stale chunk is detected, but a full redeploy is still required if the build on the server is incomplete.
