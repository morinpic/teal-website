import type { NextConfig } from "next";

// デバッグ: next build 時の環境変数確認（一時的）
console.log("[DEBUG next.config] MICROCMS_SERVICE_DOMAIN:", process.env.MICROCMS_SERVICE_DOMAIN || "(undefined)");
console.log("[DEBUG next.config] MICROCMS_API_KEY:", process.env.MICROCMS_API_KEY ? "(set)" : "(undefined)");

const nextConfig: NextConfig = {
  images: {
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
      },
      {
        protocol: "https",
        hostname: "placehold.jp",
      },
      {
        protocol: "https",
        hostname: "imgbp.hotp.jp",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "fastly.picsum.photos",
      },
    ],
  },
};

export default nextConfig;
