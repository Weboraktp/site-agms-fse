import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  turbopack: {
    root: rootDir
  },
  images: {
    formats: ["image/avif", "image/webp"]
  }
};

export default nextConfig;
