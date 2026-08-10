# Laksar Properties — Website

Production-ready website for **Laksar Properties**, a local real-estate service for the
**Laksar – Haridwar, Uttarakhand** region. Modern, trustworthy, premium-but-local design
with subtle 3D depth, a drone-video-ready hero, a full property browsing system and an
honest lead-capture flow.

Built with **Next.js 14 (App Router) · TypeScript · Tailwind CSS**. Fully static export —
deploys to Vercel, Netlify, GitHub Pages or any static host.

---

## Quick start

```bash
npm install        # install dependencies
npm run dev        # local dev server  → http://localhost:3000
npm run build      # production build  → static site in ./out
npm run preview    # serve ./out locally → http://localhost:3000
```

No environment variable is required to run. Copy `.env.example` → `.env.local` when you
want to set the public site URL and (optionally) a lead endpoint.

---

## Editing business content — START HERE

Everything business-related lives in one file:

```
src/config/site.ts        ← PROJECT CONTENT CONFIG
```

Open it and fill in the real details **before going live**:

| Field | What happens |
| --- | --- |
| `contact.phone` / `phoneHref` | Call buttons + JSON-LD telephone appear automatically |
| `contact.whatsapp` | WhatsApp buttons appear (international format, no `+`, e.g. `919876543210`) |
| `contact.email` | Email links + lead-form “Send via Email” channel appear |
| `contact.officeAddress` | Shown in footer/contact; added to structured data |
| `contact.mapEmbedUrl` | If set, a Google Maps iframe replaces the designed location panel |
| `contact.workingHours` | Shown in footer/contact |
| `social[]` | Add real profile URLs only — hidden when empty |
| `legal.rera` | Shown in footer only when provided |
| `heroVideo.enabled` | Flip to `true` after adding the drone-video files |
| `showSampleListings` | Set `false` once real inventory is in |

**Honesty rule (by design):** values left empty are simply not rendered anywhere —
the site never shows fake numbers, addresses or registrations.

## Managing properties

All inventory is in `src/data/properties.ts` (a plain typed array — the same shape a
CMS/API would return later; swapping the source requires no component changes).

```ts
{
  id: 'LP-007',
  slug: 'residential-plot-shantarshah-laksar',
  title: 'Residential Plot — Shantarshah',
  type: 'residential-plot',        // residential-plot | agricultural-land | house | commercial
  location: 'Shantarshah, Laksar',
  area: 150, areaUnit: 'sq yd',
  price: 2850000,                  // or null → shows "Price on request"
  status: 'available',             // available | under-offer | sold
  ...
  images: [{ src: '/images/properties/shantarshah.webp', alt: '…' }],
  sample: false,
}
```

* The six records shipped with the project are **sample listings** (`sample: true`,
  clearly badged in the UI). Replace them with real inventory, then set
  `showSampleListings: false`.
* Add pages/routes nothing else — detail pages, filters, sitemap and related
  properties are generated automatically.

## Drone video (hero)

The hero is engineered for the cinematic drone footage but does **not** ship it yet
(no video was supplied with the project). Until then a poster image renders — an
intentional fallback, not an error. To go live:

1. Create the web derivatives (`docs/VIDEO-SETUP.md` has copy-paste ffmpeg commands):
   `hero-desktop.mp4` (≤1920 px) and `hero-mobile.mp4` (≤960 px), audio stripped.
2. Place both in `public/videos/`.
3. Set `heroVideo.enabled: true` in `src/config/site.ts`.

The original 4K master belongs in `assets-src/` (or offline) — never in `public/`.

## Lead form & enquiry delivery

* If `NEXT_PUBLIC_LEAD_ENDPOINT` is set, the form POSTs JSON there and reports the real
  result (success / error + retry).
* If not set, the form never pretends to send: it composes the enquiry and offers real
  delivery — a prefilled **WhatsApp message** or **email draft** (once those channels are
  configured), plus a copyable summary. A local copy is kept in the visitor’s browser.
* Spam protection: honeypot field + minimum-fill-time heuristics. No third-party scripts.

## Project structure

```
├── assets-src/               # master imagery (never shipped) + optimization source
├── docs/                     # video setup, deployment, QA report
├── public/
│   ├── images/               # web-optimized WebP/JPG (generated, committed)
│   └── videos/               # hero video derivatives go here (see above)
├── scripts/
│   ├── optimize-images.py    # assets-src → public/images pipeline (Pillow)
│   └── serve.mjs             # zero-dep static server for `out/`
└── src/
    ├── app/                  # routes: / properties buy sell land-plots about contact …
    ├── components/
    │   ├── home/             # hero video, search, categories, featured, why-us, area map…
    │   ├── property/         # card, grid, explorer, gallery, details, related
    │   ├── forms/            # lead form + requirement wrapper
    │   ├── layout/           # header, mobile menu, footer, sticky mobile CTA
    │   └── ui/               # button, badge, reveal, tilt, modal, icon, plot visualizer…
    ├── config/site.ts        # ← PROJECT CONTENT CONFIG (edit me)
    ├── data/properties.ts    # inventory (swap for CMS/API later)
    └── lib/                  # seo/json-ld, utils
```

## Performance & accessibility notes

* ~87–107 kB first-load JS; zero runtime JS dependencies beyond React/Next.
* All imagery pre-compressed WebP (~130–245 KB), lazy-loaded, `alt` text everywhere.
* Fonts via `next/font` (self-hosted at build, no render-blocking requests).
* Motion respects `prefers-reduced-motion`; tilt/parallax disabled on touch devices.
* WCAG-oriented: landmarks, skip link, visible focus, labelled controls, keyboard-safe
  menu/gallery/modal, AA-conscious palette, 44 px+ touch targets.

## Deployment

See **docs/DEPLOYMENT.md** — covers Vercel, Netlify (incl. drag-and-drop of `out/`),
GitHub Pages and the security headers in `public/_headers` / `netlify.toml`.

## QA

See **docs/QA-REPORT.md** — full audit results (routes, SEO, accessibility, functional
browser tests, console-error check, visual inspection).
