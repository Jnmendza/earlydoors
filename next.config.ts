import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "images.unsplash.com",
      "upload.wikimedia.org",
      "cdn.sanity.io",
      "i.imghippo.com",
      "www.imghippo.com",
    ],
  },
};

export default nextConfig;
