import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a self-contained .next/standalone build (server.js + traced deps)
  // for a minimal production Docker image.
  output: "standalone",
};

export default nextConfig;
