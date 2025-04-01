import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.fl.yelpcdn.com",
      },
    ],
  },
};

export default nextConfig;
