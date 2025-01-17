// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Enable React Strict Mode
  swcMinify: true, // Enable SWC minifier
  // Additional configurations can be added here
  images: {
    domains: ['your-image-domain.com'], // If you need to allow images from external sources
  },
  // Add other Next.js specific configurations here if necessary
};

export default nextConfig;
