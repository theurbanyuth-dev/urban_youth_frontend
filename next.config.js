/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: true,
  experimental: {
    optimizeCss: true,
    mdxRs: true,
  },
  bundlePagesRouterDependencies: true,
  async headers() {
    return [
      {
        source: '/(.*).(jpg|jpeg|png|webp|avif|svg)$/i',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, immutable, max-age=31536000', // 1 year
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

module.exports = nextConfig;
