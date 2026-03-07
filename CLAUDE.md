# CLAUDE.md

teal.（横浜元町の美容院）の公式ウェブサイト。Next.js App Router + microCMS + Vercel で構成。

## コマンド

```bash
npm run dev      # 開発サーバー起動
npm run build    # プロダクションビルド
npm run start    # プロダクションサーバー起動
npm run lint     # ESLint実行
```

## 技術スタック

- **フレームワーク:** Next.js 15+ (App Router), React 19, TypeScript (strict)
- **スタイリング:** TailwindCSS v4（`@theme` ディレクティブ）
- **フォント:** Urbanist / Noto Sans JP / Noto Serif JP / Cormorant Garamond（Google Fonts, `next/font`）
- **アニメーション:** Framer Motion v12
- **CMS:** microCMS (Hobbyプラン) - `microcms-js-sdk`
- **ホスティング:** Vercel (GitHub連携自動デプロイ)
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
- `Staff` 型に `specialty?: string`（得意なスタイル・施術）を定義済み。microCMS 側フィールド追加後に有効化される

### 主要コンポーネント
- `ScrollAnimation`: スクロールトリガーのフェードイン（Framer Motion + `useReducedMotion` 対応）
- `SectionHeading`: セクション見出し（Urbanist / size prop 対応・AnimatedLine 含む）
- `Button`: ポリモーフィックなボタン/リンク（primary / secondary / ghost-white）
- `StaffCardAnimated`: スタッフカードのスタガーアニメーション（Client Component）

### 環境変数
- `MICROCMS_SERVICE_DOMAIN` - microCMS サービスドメイン
- `MICROCMS_API_KEY` - microCMS APIキー
- `NEXT_PUBLIC_SITE_URL` - 本番サイトURL（構造化データ・OGP に使用）
- `.env.local.example` にテンプレートあり

### SEO・構造化データ
- `app/page.tsx`: HairSalon スキーマ（営業時間・sameAs・画像含む）
- 各詳細ページ: BreadcrumbList スキーマ
- `app/staff/[slug]`: Person スキーマ追加済み
- サイトマップ: `app/sitemap.ts`（全ページ動的生成）

### ページ構成
- `/` - トップページ（Hero, ABOUT, STYLE, MENU, STAFF, FAQ, NEWS, BLOG, SNS, ACCESS）
- `/news`, `/news/[slug]` - お知らせ一覧・詳細
- `/style`, `/style/[slug]` - スタイルギャラリー一覧・詳細
- `/blog`, `/blog/[slug]` - ブログ一覧・詳細（news APIからカテゴリでフィルタ）
- `/staff`, `/staff/[slug]` - スタッフ一覧・詳細

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

## ドキュメント命名規則

- `docs/` 配下のファイル・フォルダ: **lowercase kebab-case**（例: `color-system.md`）
- リポジトリルートの重要ファイル: **UPPERCASE**（例: `README.md`, `CHANGELOG.md`）
