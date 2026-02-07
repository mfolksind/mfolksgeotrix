import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mfolksgeotrix.com',
      },
      {
        protocol: 'http',
        hostname: 'mfolksgeotrix.com',
      },
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
      }
    ],
  },
};

export default nextConfig;
