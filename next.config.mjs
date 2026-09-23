/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,     // ← required for static export (no Next.js image server)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
      }
    ],
  },
};

export default nextConfig;
