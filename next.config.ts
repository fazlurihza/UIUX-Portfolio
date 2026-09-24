import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Permit Google Fonts and external image domains if needed in future
    remotePatterns: [],
  },
};

export default nextConfig;
