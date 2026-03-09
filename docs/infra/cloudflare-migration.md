# Cloudflare Pages 移行プロンプト（Claude Code 向け）

> **対象**: teal.（横浜元町の美容院）公式サイト
> **移行元**: Vercel Hobby → **移行先**: Cloudflare Pages (OpenNext)
> **理由**: Vercel Hobby プランは商用利用不可のため

## 前提知識

- Next.js 16 + App Router / React 19 / TypeScript
- API Routes・Middleware なし。SSG（`generateStaticParams`）のみ
- CMS: microCMS（Hobby プラン）
- 画像: `next/image` を使用。ローカル SVG + microCMS リモート画像の 2 パターン
- `@cloudflare/next-on-pages` は非推奨。**`@opennextjs/cloudflare`** を使うこと

---

## Step 1: Cloudflare アカウント作成・プロジェクト準備

1. https://dash.cloudflare.com/sign-up で Free プランのアカウントを作成（もりけんさんが実施）
2. Dashboard > Workers & Pages > Create > Pages > Connect to Git で GitHub リポジトリを連携
3. ビルド設定は Step 4 完了後に行うので、この時点では連携だけ済ませる

> **注意**: アカウント作成・GitHub 連携はもりけんさんが手動で行う。Claude Code はコード側の変更を担当する。

---

## Step 2: OpenNext アダプターの導入

### 2-1. パッケージインストール

```bash
npm install --save-dev @opennextjs/cloudflare wrangler
```

### 2-1b. `open-next.config.ts` をプロジェクトルートに作成（v1.17 以降必須）

```ts
import type { OpenNextConfig } from "@opennextjs/cloudflare";

const config: OpenNextConfig = {};

export default config;
```

### 2-2. `wrangler.jsonc` をプロジェクトルートに作成

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "teal-website",
  "main": ".open-next/worker.js",
  "compatibility_flags": ["nodejs_compat"],
  "compatibility_date": "2024-09-23",
  "assets": {
    "directory": ".open-next/assets",
    "binding": "ASSETS"
  }
}
```

### 2-3. `package.json` の `scripts` に追加

```json
{
  "cf:build": "npx @opennextjs/cloudflare build",
  "cf:dev": "npx wrangler dev",
  "cf:deploy": "npx @opennextjs/cloudflare build && npx wrangler deploy"
}
```

既存の `dev` / `build` / `start` / `lint` はそのまま残す（ローカル開発用）。

### 2-4. `.gitignore` に追加

```
.open-next/
.wrangler/
```

---

## Step 3: microCMS 画像用カスタムローダーを作成

Cloudflare Pages では Vercel の画像最適化 API（`/_next/image`）が使えない。
microCMS の画像変換 API（クエリパラメータ方式）で代替する。

### 3-1. `lib/image-loader.ts` を新規作成

```ts
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
```

### 3-2. `next.config.ts` を更新

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    // remotePatterns は custom loader 使用時も参照されることがあるため残す
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
```

**変更点**: `formats: ["image/avif", "image/webp"]` を削除（カスタムローダー側で `fm=webp` 指定するため不要）し、`loader: "custom"` と `loaderFile` を追加。

---

## Step 4: Hero 画像の WebP 事前変換

`next/image` のサーバーサイド最適化が使えなくなるため、ローカルのラスター画像は事前に WebP 化して LCP を改善する。

### 4-1. sharp で変換

```bash
npx sharp-cli -i public/images/hero-bg.jpg -o public/images/hero-bg.webp --format webp --quality 90
```

sharp-cli が使えない場合は代替手段:

```bash
# cwebp（libwebp）がインストール済みの場合
cwebp -q 90 public/images/hero-bg.jpg -o public/images/hero-bg.webp
```

### 4-2. Hero コンポーネントの src を更新

`app/page.tsx` 内の Hero 背景画像の `src` を変更:

```diff
- src="/images/hero-bg.jpg"
+ src="/images/hero-bg.webp"
```

### 4-3. 元の jpg は削除せず残す（フォールバック用）

---

## Step 5: ビルド確認

### 5-1. ローカルビルド

```bash
npm run cf:build
```

成功すると `.open-next/` ディレクトリが生成される。

### 5-2. Worker サイズ確認

```bash
ls -lh .open-next/worker.js 2>/dev/null || ls -lh .open-next/
```

Free プランの上限は **3 MiB**。超える場合は Workers Paid（$5/月）が必要。

### 5-3. ローカルプレビュー

```bash
npm run cf:dev
```

以下を重点チェック:

- [ ] トップページの Hero 画像が表示される
- [ ] スタイルギャラリーの画像が表示される
- [ ] スタッフ写真が表示される
- [ ] ブログのアイキャッチが表示される
- [ ] SVG ロゴ（ヘッダー・フッター）が表示される
- [ ] 各詳細ページ（`/news/[slug]`, `/style/[slug]`, `/staff/[slug]`, `/blog/[slug]`）に遷移できる
- [ ] ページネーション（ブログ・ニュース・スタイル一覧）が動作する
- [ ] スムーズスクロール（ヘッダー・フッターのハッシュリンク）が動作する
- [ ] モバイルハンバーガーメニューが開閉する
- [ ] ScrollToTop ボタンが動作する

---

## Step 6: 環境変数の設定とデプロイ

### 6-1. Cloudflare Dashboard で環境変数を設定

Workers & Pages > teal-website > Settings > Environment variables:

| 変数名 | 値 |
|--------|-----|
| `MICROCMS_SERVICE_DOMAIN` | microCMS のサービス ID |
| `MICROCMS_API_KEY` | microCMS の API キー |
| `NEXT_PUBLIC_SITE_URL` | 本番サイトの URL |

### 6-2. ビルド設定（Cloudflare Dashboard）

- Build command: `npx @opennextjs/cloudflare`
- Build output directory: `.open-next`
- Root directory: `/`（モノレポでない場合）

### 6-3. デプロイ実行

GitHub に push すると自動ビルド・デプロイされる。

### 6-4. カスタムドメイン設定

Workers & Pages > teal-website > Custom domains でドメインを追加。
Cloudflare DNS を使用する場合は CNAME レコードが自動設定される。

---

## Step 7: ドキュメント更新

### 7-1. `CLAUDE.md` 更新

ホスティング記述を変更:

```diff
- **ホスティング:** Vercel (GitHub連携自動デプロイ)
+ **ホスティング:** Cloudflare Pages / OpenNext (GitHub連携自動デプロイ)
```

コマンドセクションに追加:

```diff
+ npm run cf:build   # Cloudflare 用ビルド
+ npm run cf:dev     # Cloudflare ローカルプレビュー
+ npm run cf:deploy  # Cloudflare デプロイ
```

### 7-2. `docs/infra/setup-guide.md` 更新

Vercel 固有の記述を Cloudflare Pages に書き換える。

### 7-3. `docs/project/backlog.md` 更新

I-01 の記述を更新:

```diff
- | I-01 | VercelからNetlifyへの移行 | ... | ⬜ |
+ | I-01 | VercelからCloudflare Pagesへの移行 | Vercelのプランが商用利用不可のためCloudflare Pages (OpenNext)へ移行。GitHub連携・自動デプロイ・プレビューデプロイ等の機能を維持 | M | ★★★★★ | ✅ |
```

### 7-4. `docs/project/changelog.md` に追記

```markdown
## 2026-03-XX - Cloudflare Pages 移行 (I-01)
- Vercel Hobby → Cloudflare Pages (OpenNext) に移行
- `@opennextjs/cloudflare` アダプター導入
- microCMS 画像用カスタムローダー（`lib/image-loader.ts`）作成
- Hero 画像を WebP 事前変換
- `next.config.ts` を custom loader 対応に更新
```

---

## 技術メモ

- `@opennextjs/cloudflare` は Next.js 16 をサポート済み
- `nodejs_compat` compatibility flag が必須
- Workers Free プランの Worker サイズ上限は 3 MiB（超える場合は Paid $5/月）
- `next dev` はローカル開発に引き続き使える。`cf:dev` は Cloudflare 環境プレビュー用
- Cloudflare Pages の Free プランは帯域無制限、ビルド月 500 回
- microCMS 画像 API のパラメータ: `?w=幅&fm=webp&q=品質`（公式ドキュメント参照）

---

*作成: 2026-03-09 / 作成者: くーちゃん（テクニカルプロデューサー）*
