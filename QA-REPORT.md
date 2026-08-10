# Final QA Report — Laksar Properties

Date: 2026-08-09 · Build: Next.js 14.2.35 static export · Tester: automated suite +
headless-Chromium inspection (desktop 1440×900, tablet 834×1112, mobile 390×844 @2×)

## A. Route & asset integrity — PASS

All 21 routes return 200; unknown URL returns the designed 404 page.

| Group | Result |
| --- | --- |
| Core pages (`/`, `/properties`, `/buy`, `/sell`, `/land-plots`, `/about`, `/contact`, `/property-requirement`, `/privacy`) | 9/9 PASS |
| Property detail pages (6× `/properties/[slug]`) | 6/6 PASS |
| Infrastructure (`/sitemap.xml` 15 URLs, `/robots.txt`, `/manifest.webmanifest`, icons) | PASS |
| 404 handling | PASS (styled page, correct status) |

## B. Content quality — PASS

Automated scan of every rendered page found **zero** occurrences of:
lorem ipsum · placeholder/TODO/FIXME text · raw markdown (`##`) · `[object Object]`,
`undefined`, `NaN` artifacts · fake names · “coming soon”.

Honesty rules verified: no phone/email/address rendered (all unconfigured in
`src/config/site.ts`); all sample listings carry a visible “Sample listing” badge;
all prices show “Price on request” (no invented figures); the location map is
labelled “Illustrative graphic — not to scale”; the plot visualizer is labelled
as not a real colony plan.

## C. SEO — PASS

- Unique `<title>` + meta description on every page (template: `%s · Laksar Properties`)
- Canonical URL, Open Graph (title/desc/url/image/locale en_IN), Twitter card on every page
- `RealEstateAgent` JSON-LD on all pages — **validated JSON**, verified to contain only
  facts from the config (contact fields omitted while unconfigured)
- `RealEstateListing` JSON-LD **suppressed on sample listings** (emitted only for real,
  accurately-priced inventory) — verified returning `null` for all 6 samples
- Semantic heading hierarchy (single `<h1>` per page), `<html lang="en">`, image `alt`
  coverage 100% (35/35 images across all pages), clean trailing-slash URLs, sitemap +
  robots.txt cross-referenced

## D. Functional browser tests (Chromium) — PASS

| Test | Result |
| --- | --- |
| Listing grid renders 6 sample properties | PASS |
| Pre-filter via URL (`/properties?type=house` → 2 results) | PASS |
| Live text search (`kothi` → 1 result) | PASS |
| Gallery lightbox opens, Escape closes, focus managed | PASS |
| Form validation: empty submit → per-field inline errors + alerts | PASS |
| Form valid submit (no endpoint) → honest “ready to send” state with summary, no false claim | PASS |
| Spam guards: honeypot field present, min-fill-time enforced | PASS |
| Plot visualizer: keyboard-focusable plot buttons update reading panel | PASS |
| Mobile menu: opens, 7 nav links + CTA reachable, closes after navigation | PASS |
| Sticky mobile CTA: appears on scroll, hidden on requirement page | PASS |
| Horizontal overflow: none on desktop or mobile viewport | PASS |
| **Console errors across all tested pages (desktop + mobile): 0** | PASS |

## E. Visual inspection — PASS

Screenshots reviewed at desktop/tablet/mobile for: hero, categories, featured,
location map, property detail, land-plots visualizer, form states, footer, mobile menu.
Checks: spacing rhythm, alignment, type hierarchy, contrast on scrims, image crops,
card consistency, CTA visibility, elevation/3D restraint. Issues found and fixed
during build: heading wording on land-plots (“Plot around” → “Explore”), sample-badge
placement, SEO fallback grid for `/properties` (server-rendered grid as Suspense
fallback so crawlers/no-JS see inventory).

## F. Performance posture — PASS (static)

- First-load JS: 87–107 kB per route (no runtime JS deps besides React/Next)
- Images: pre-optimized WebP 128–245 KB, `loading="lazy"` below the fold, hero image `fetchPriority="high"`
- Fonts self-hosted via `next/font` (Fraunces + Inter), `display: swap`
- Static export = single-digit TTFB on any CDN; immutable caching for `/_next/static`, `/images`, `/videos`
- Hero video deferred by design: no 4K master shipped; poster-first with fade-in

## G. Accessibility — PASS

Skip link, landmarks (`header/main/footer/nav`), `aria-current`, labelled icon buttons,
keyboard-trapped modal, radiogroup semantics on toggles, `role=status/alert` live
regions, visible `:focus-visible` rings, ≥44 px touch targets, `prefers-reduced-motion`
honored (reveal/tilt/ken-burns/parallax all gated), form labels + `aria-invalid` +
error descriptions.

## H. Security — PASS

- No secrets in repo or client bundle (`grep` verified: no keys/tokens; env example documents only public vars)
- No third-party runtime scripts, no iframes by default (Google Maps embed only when the owner supplies a URL)
- Form: sanitization by React escaping (no `dangerouslySetInnerHTML` with user data), honeypot + timing spam guards, consent required
- Security headers shipped for Netlify (`public/_headers`), documented for others
- Dependencies: `next`, `react`, `react-dom` only — `npm install` reported 0 vulnerabilities

## I. Known limitations (by design, all documented)

1. **Drone video not supplied with the project** — hero runs on the poster fallback;
   switching on requires the two web derivatives + one config flag (`docs/VIDEO-SETUP.md`).
2. **Contact channels are unconfigured** — call/WhatsApp/email UI stays hidden until the
   owner fills `src/config/site.ts`; the lead form uses its honest fallback meanwhile.
3. **Sample inventory** — six clearly-badged demonstration listings; hide with one flag.
4. **GitHub Pages** cannot apply custom headers (host limitation, noted in DEPLOYMENT.md).
5. Visual QA used Chromium headless; Safari/Firefox verified only by standards
   compliance (no vendor-specific code paths).

## Verdict

All master-spec success criteria pass. The build is stable, honest and deployable.
