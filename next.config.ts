import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: ["flagcdn.com", "a.ppy.sh"],
        port: "",
        pathname: "/**",
      }
    ]
  },
};


export default nextConfig;
