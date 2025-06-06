import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheMaxMemorySize: 52428800,
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    path: '/_next/image',
    loader: 'default',
    loaderFile: '',
    domains: [],
    disableStaticImages: false,
    minimumCacheTTL: 60,
    formats: ['image/webp'],
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "script-src 'none'; frame-src 'none'; sandbox;",
    contentDispositionType: 'inline',
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
    unoptimized: false,
  },
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'standalone'
  /* config options here */
  // redirects: async () => [
  // 	{
  // 		source: "/",
  // 		destination: "/",
  // 		permanent: true,
  // 	},
  // ],
}

export default nextConfig
