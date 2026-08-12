const basePath = process.env.BASE_PATH || (process.env.NODE_ENV === 'production' ? '/laksarpropertyes' : '');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
};

export default nextConfig;
