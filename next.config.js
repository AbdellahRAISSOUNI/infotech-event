/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
    unoptimized: true, // For static export of images
  },
  output: 'standalone',
};

module.exports = nextConfig; 