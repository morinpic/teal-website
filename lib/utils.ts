/** HTML タグを除去してプレーンテキスト化し、指定文字数で切り詰める */
export function extractExcerpt(html: string, maxLength = 120): string {
  const text = html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "…";
}
