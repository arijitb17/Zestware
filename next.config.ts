// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Enable React Strict Mode for development
  images: {
    domains: ['i.ibb.co'], // Allow images from ImgBB's domain
  },
  // Add other Next.js specific configurations if necessary
};

export default nextConfig;
