import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "minio.sakachris.com",
        pathname: "/**",
      },
    ],
    unoptimized: true,
  },
  output: "standalone",
};

export default nextConfig;
