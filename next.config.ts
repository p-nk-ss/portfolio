import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export → Cloudflare. No server features (API routes / server actions / ISR).
  output: "export",
  // No image optimization server in a static export.
  images: { unoptimized: true },
  // Stable directory-style URLs on a static host.
  trailingSlash: true,
};

export default nextConfig;
