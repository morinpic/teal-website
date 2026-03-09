import type { ImageLoaderProps } from "next/image";

/**
 * Cloudflare Pages 用カスタム画像ローダー
 * - ローカル画像（/images/ 始まり）: パススルー
 * - microCMS 画像: 変換パラメータ（w, fm, q）を付与
 * - その他の外部画像（picsum 等のダミー）: パススルー
 */
export default function imageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps): string {
  // ローカル画像はそのまま
  if (src.startsWith("/")) {
    return src;
  }

  // microCMS 画像は変換パラメータを付与
  if (src.includes("images.microcms-assets.io")) {
    const url = new URL(src);
    url.searchParams.set("w", width.toString());
    url.searchParams.set("fm", "webp");
    url.searchParams.set("q", (quality ?? 85).toString());
    return url.toString();
  }

  // その他の外部画像（ダミーデータの picsum 等）はそのまま
  return src;
}
