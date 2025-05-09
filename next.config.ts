import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "images.unsplash.com",
      "upload.wikimedia.org",
      "cdn.sanity.io",
    ],
  },
};

export default nextConfig;
