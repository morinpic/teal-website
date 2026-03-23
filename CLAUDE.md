# CLAUDE.md

teal.（横浜元町の美容院）の公式ウェブサイト。Next.js App Router + microCMS + Cloudflare Pages で構成。

## コマンド

```bash
npm run dev      # 開発サーバー起動
npm run build    # プロダクションビルド
npm run start    # プロダクションサーバー起動
npm run lint     # ESLint実行
npm run cf:build   # Cloudflare Pages 用ビルド
npm run cf:dev     # Cloudflare Pages ローカル開発
npm run cf:deploy  # Cloudflare Pages デプロイ
```

## 技術スタック

- **フレームワーク:** Next.js 16+ (App Router), React 19, TypeScript (strict)
- **スタイリング:** TailwindCSS v4（`@theme` ディレクティブ）
- **フォント:** Urbanist / Noto Sans JP / Noto Serif JP / Cormorant Garamond（Google Fonts, `next/font`）
- **アニメーション:** Framer Motion v12
- **CMS:** microCMS (Hobbyプラン) - `microcms-js-sdk`
- **ホスティング:** Cloudflare Pages (OpenNext, GitHub連携自動デプロイ)
- **Lint:** ESLint (`next/core-web-vitals`)

## アーキテクチャ

### パスエイリアス
`@/*` でプロジェクトルートからのインポートが可能（tsconfig.json で設定済み）

### フォント設計
- `font-urbanist`: Urbanist（セクション h2 大見出し・ロゴ統一）
- `font-sans`: Noto Sans JP（本文・UI全般）
- `font-serif`: Noto Serif JP（H1・ページタイトル系）
- `font-accent`: Cormorant Garamond（英字アクセント・タグライン）

### CMS連携
- microCMS のデータ取得処理は `lib/microcms.ts` に集約する設計
- APIは3つ: `news`（お知らせ+ブログ）、`style`（スタイルギャラリー）、`staff`（スタッフ紹介）
- メニュー・料金表はコード側で管理（更新頻度が低いため）
- 画像ドメイン: `images.microcms-assets.io` を Next.js で許可済み
- 画像最適化: WebP/AVIF 自動変換（`next.config.ts` の `formats` で設定済み）
- 画像 quality: サムネイル系 85 / メインビジュアル系 90

### 型定義（lib/types.ts）
- URL パラメータは microCMS の自動生成 `id` を使用（独自 slug フィールドは廃止）
- `category` フィールドは microCMS のセレクトフィールドが配列で返すため `string | string[]` 型
- `normalizeCategory()` ヘルパーで配列/文字列を正規化（`lib/utils.ts`）
- `extractExcerpt()` で `content` からプレーンテキストを自動抽出（`excerpt` 未入力時のフォールバック）

### 主要コンポーネント
- `ScrollAnimation`: スクロールトリガーのフェードイン（Framer Motion + `useReducedMotion` 対応）
- `SectionHeading`: セクション見出し（Urbanist / size prop 対応・AnimatedLine 含む）
- `Button`: ポリモーフィックなボタン/リンク（primary / secondary / ghost-white）
- `StaffCardAnimated`: スタッフカードのスタガーアニメーション（Client Component）
- `HeroSlideshow`: Hero背景画像のクロスフェードスライドショー（6秒間隔、useReducedMotion対応）

### 環境変数
- `MICROCMS_SERVICE_DOMAIN` - microCMS サービスドメイン
- `MICROCMS_API_KEY` - microCMS APIキー
- `NEXT_PUBLIC_SITE_URL` - 本番サイトURL（構造化データ・OGP に使用）
- `.env.local.example` にテンプレートあり
- Cloudflare には **ビルド時**（Settings > Build > 変数とシークレット）と **ランタイム**（Settings > 変数とシークレット）の **2箇所** に同じ変数を設定する必要がある

### デプロイ
- **本番URL:** https://teal.yokohama
- **ホスティング:** Cloudflare Workers（OpenNext 経由）
- **自動デプロイ:** git push → Cloudflare Workers Builds が自動ビルド＆デプロイ
- **CMS コンテンツ更新時:** microCMS Webhook → GitHub Actions (`cms-deploy.yml`) → `cf:deploy`
- **重要設定:** `wrangler.jsonc` に `keep_vars: true` を設定済み（デプロイ時にランタイム変数が削除されるのを防止）

### CI/CD
- `.github/workflows/ci.yml` — push / PR 時に Lint + Type Check + Build
- `.github/workflows/cms-deploy.yml` — microCMS Webhook → ビルド＆デプロイ
- `.github/workflows/lighthouse.yml` — PR 時に Lighthouse CI（パフォーマンス・a11y・SEO 計測）

### SEO・構造化データ
- `app/page.tsx`: LocalBusiness (HairSalon) スキーマ（営業時間・sameAs・geo・画像含む）
- 各詳細ページ: BreadcrumbList スキーマ
- `app/staff/[id]`: Person スキーマ追加済み
- サイトマップ: `app/sitemap.ts`（全ページ動的生成）

### ページ構成
- `/` - トップページ（Hero, ABOUT, STYLE, MENU, STAFF, FAQ, NEWS, BLOG, SNS, ACCESS）
- `/news`, `/news/[id]` - お知らせ一覧・詳細
- `/style`, `/style/[id]` - スタイルギャラリー一覧・詳細
- `/blog`, `/blog/[id]` - ブログ一覧・詳細（news APIからカテゴリでフィルタ）
- `/staff`, `/staff/[id]` - スタッフ一覧・詳細

## 参照ドキュメント

### プロジェクト管理 (`docs/project/`)
- 要件定義: `docs/project/requirements.md`
- 完了済みタスクの対応履歴: `docs/project/changelog.md`
- デザイン改善バックログ: `docs/project/backlog.md`
- デザイン方針書: `docs/project/design-direction.md`
- デザイン批評レポート: `docs/project/design-critique-v1.md`

### デザインシステム (`docs/design-system/`)
- カラーシステム: `docs/design-system/color-system.md`
- タイポグラフィ: `docs/design-system/typography.md`
- コンポーネント設計: `docs/design-system/components.md`
- レスポンシブブレークポイント: `docs/design-system/breakpoints.md`
- アクセシビリティガイドライン: `docs/design-system/accessibility.md`

### インフラ (`docs/infra/`)
- セットアップ手順: `docs/infra/setup-guide.md`
- Cloudflare Pages 移行手順: `docs/infra/cloudflare-migration.md`

## ドキュメント命名規則

- `docs/` 配下のファイル・フォルダ: **lowercase kebab-case**（例: `color-system.md`）
- リポジトリルートの重要ファイル: **UPPERCASE**（例: `README.md`, `CHANGELOG.md`）
