# Hero Drone Video — Setup Guide

The homepage hero is built around the cinematic drone footage of the
Laksar area. The site ships with a poster-image fallback and switches to
video the moment the files below exist and are enabled.

## Rules (from the master spec)

- **Never** put the original 4K master in `public/` — browsers would download it.
- Create small web derivatives; keep the master in `assets-src/` or offline.
- Both variants must be muted (the hero autoplays; audio is stripped entirely).

## 1. Create the derivatives with ffmpeg

From the folder containing the master (e.g. `assets-src/drone-master.mp4`):

```bash
# Desktop variant — 1920px wide, ~8–15 s loop, no audio
ffmpeg -i assets-src/drone-master.mp4 \
  -an -vf "scale=1920:-2" -c:v libx264 -preset slow -crf 26 \
  -movflags +faststart public/videos/hero-desktop.mp4

# Mobile variant — 960px wide, lighter, no audio
ffmpeg -i assets-src/drone-master.mp4 \
  -an -vf "scale=960:-2" -c:v libx264 -preset slow -crf 28 \
  -movflags +faststart public/videos/hero-mobile.mp4

# Optional: refresh the poster frame from the video itself
ffmpeg -i assets-src/drone-master.mp4 -ss 00:00:03 -frames:v 1 \
  -q:v 3 /tmp/poster.jpg
# then convert to WebP (e.g. with Pillow) and overwrite
# public/images/hero-poster.webp

# Optional: trim to the best 12 seconds for the loop
ffmpeg -i assets-src/drone-master.mp4 -ss 00:00:10 -t 00:00:12 \
  -an -vf "scale=1920:-2" -c:v libx264 -crf 26 -preset slow \
  -movflags +faststart public/videos/hero-desktop.mp4
```

Target sizes: desktop ≤ 4 MB, mobile ≤ 2 MB. Raise `-crf` (e.g. 28/30) if larger.

## 2. Enable the video

In `src/config/site.ts`:

```ts
heroVideo: {
  enabled: true,                    // ← flip this
  desktopSrc: '/videos/hero-desktop.mp4',
  mobileSrc: '/videos/hero-mobile.mp4',
  poster: '/images/hero-poster.webp',
  ...
},
```

## 3. Verify

```bash
npm run build && npm run preview
```

Open the home page — the video should fade in over the poster. On a mobile
viewport only the mobile file is fetched. If a file is missing, the hero
automatically stays on the poster (check the README hero section if you
expect video and see the image instead).
