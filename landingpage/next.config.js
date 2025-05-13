/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add custom PostCSS or other configs here
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;