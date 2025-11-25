import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  /* config options here */

};
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "plus.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com"
      }
    ]
  }
}

export default nextConfig;
