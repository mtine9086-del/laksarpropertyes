# Deployment Guide

The site builds to a **fully static export** (`next build` → `./out`), so it runs on
any static host. Build once, deploy anywhere.

```bash
npm ci
NEXT_PUBLIC_SITE_URL=https://your-domain.in npm run build
```

Set `NEXT_PUBLIC_SITE_URL` to the real domain — it powers canonical URLs,
Open Graph links and `sitemap.xml`.

---

## Vercel

1. Push the repo to GitHub/GitLab and import it in Vercel, or run `npx vercel`.
2. Framework preset: **Next.js** (detected automatically — `output: 'export'` is respected).
3. Environment variables: `NEXT_PUBLIC_SITE_URL` (+ optional `NEXT_PUBLIC_LEAD_ENDPOINT`).
4. Deploy. Every push to `main` redeploys automatically.

## Netlify

**Git-connected:** build command `npm run build`, publish directory `out`.
A ready `netlify.toml` is included.

**Manual (no Git):** run the build locally, then drag the `out/` folder into
Netlify → Sites → “Deploy manually”.

Security/caching headers ship in `public/_headers` (Netlify applies them
automatically). Review `X-Frame-Options: SAMEORIGIN` — relax it if the site
must ever be embedded in an iframe elsewhere.

## GitHub Pages

The repo ships a ready workflow at `.github/workflows/deploy.yml` — no manual
build or branch pushing needed.

1. Push this repo to GitHub.
2. In the repo **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Push to `main` (or run the workflow manually from the **Actions** tab).
   The workflow builds the site and deploys `out/` automatically.
4. The workflow computes the correct base path for you:
   - Project site (`github.com/<user>/<repo>` → served at
     `https://<user>.github.io/<repo>/`) → base path `/<repo>` is set
     automatically via the `BASE_PATH` build env var (see `next.config.mjs`).
   - User/org site (repo literally named `<user>.github.io`) or a custom
     domain → base path stays empty.
5. Custom domain: add a `CNAME` file to `public/` (so it's copied into `out/`)
   with your domain, and set it in **Settings → Pages → Custom domain**.

Notes:
- `public/.nojekyll` is included and copied into `out/` — without it, GitHub
  Pages' Jekyll processing silently drops the `_next/` assets folder (any
  filename/folder starting with `_`), breaking the whole site.
- GitHub Pages cannot set custom headers; the site works without them.
- Prefer the old manual route instead? `npm run build` locally with
  `BASE_PATH=/<repo-name>` set, then push the `out/` folder to a `gh-pages`
  branch (e.g. via `npx gh-pages -d out`) and point Pages at that branch.

## Any other static host / VPS

Serve `out/` with any web server. One-liner locally: `npm run preview`
(uses `scripts/serve.mjs`, zero dependencies). For nginx/Caddy/Apache, point the
docroot at `out/` and enable a try-files rule: `/path → /path/index.html`.

---

## Functions / lead endpoint (optional)

The requirement form POSTs JSON to `NEXT_PUBLIC_LEAD_ENDPOINT` when set.
Any HTTPS endpoint works — e.g. a Vercel/Netlify function, Formspree, a CRM
webhook, or a Google Apps Script. Contract:

```
POST <endpoint>        Content-Type: application/json
{ name, phone, email?, intent, propertyType?, location?, budget?, area?,
  message?, contactVia, consent, submittedAt }
→ 2xx = delivered (UI shows success) · anything else = error state with retry
```

If unset, the form uses its built-in honest fallback (WhatsApp/email deep-links
once configured in `src/config/site.ts`) — nothing is silently dropped.

## Post-launch checklist

- [ ] Real contact details in `src/config/site.ts` (phone/WhatsApp/email/address)
- [ ] Real inventory in `src/data/properties.ts`, `showSampleListings: false`
- [ ] Drone-video derivatives in `public/videos/`, `heroVideo.enabled: true`
- [ ] `NEXT_PUBLIC_SITE_URL` set to the live domain
- [ ] Submit `https://your-domain.in/sitemap.xml` in Google Search Console
