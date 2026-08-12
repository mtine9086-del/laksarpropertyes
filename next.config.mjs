import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/laksarpropertyes' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/laksarpropertyes/' : '',
};

export default nextConfig;
