import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "a.ppy.sh",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "osu.ppy.sh",
        port: "",
        pathname: "/**",
      },
    ]
  },
  allowedDevOrigins:
  process.env.ALLOWED_DEV_ORIGINS
  ?
  process.env.ALLOWED_DEV_ORIGINS.split(',')
  :
  [],
};


export default nextConfig;
