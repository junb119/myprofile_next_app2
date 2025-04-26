import type { NextConfig } from "next";

// next.config.ts
const NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default NextConfig;
