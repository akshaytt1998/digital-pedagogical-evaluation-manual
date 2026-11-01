import type { NextConfig } from "next";

const repo = "digital-pedagogical-evaluation-manual";
const basePath = process.env.NODE_ENV === "production" ? `/${repo}` : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  images: { unoptimized: true },
  trailingSlash: true,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
