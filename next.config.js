/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["lh3.googleusercontent.com", "files.stripe.com"],
  },
};

module.exports = nextConfig;
