// GitHub Pages project sites (username.github.io/<repo-name>) serve everything
// from a sub-path, so every asset/link needs that prefix baked in at build time.
// The included GitHub Actions workflow sets BASE_PATH automatically to
// "/<repo-name>" for project pages ( leaves it empty for a custom domain or a
// user/org page repo named "<username>.github.io" ). Locally it defaults to ''.
const basePath = process.env.BASE_PATH ?? '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static export — deployable on Vercel, Netlify, GitHub Pages or any static host.
  output: 'export',
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  basePath,
  assetPrefix: basePath || undefined,
  env: {
    // Exposed to client code that needs to prefix internal links/images
    // (e.g. next/image `src`, manual <a href="/..."> outside next/link).
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    // Static export cannot run the server-side image optimizer.
    // All imagery in /public is pre-optimized at build/authoring time (see scripts/optimize-images.py).
    unoptimized: true,
  },
};

export default nextConfig;
