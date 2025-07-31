import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['images.microcms-assets.io'],
  },
  // `experimental.appDir` は削除！（Next.js 13以降はデフォルト有効）
};

export default nextConfig;
