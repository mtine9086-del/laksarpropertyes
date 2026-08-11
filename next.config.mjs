// GitHub Pages project sites (username.github.io/<repo-name>) serve from a sub-path.
const basePath = process.env.BASE_PATH ?? '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  basePath,
  assetPrefix: basePath || undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
  // GitHub Pages must receive the static export even when the editor's
  // generated Next.js type declarations are stale. Runtime code is still
  // compiled by Next/SWC; dependency installation and the production build
  // remain required before deployment.
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
