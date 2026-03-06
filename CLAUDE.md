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

- **フレームワーク:** Next.js 15+ (App Router), React 18, TypeScript (strict)
- **スタイリング:** TailwindCSS v3
- **CMS:** microCMS (Hobbyプラン) - `microcms-js-sdk`
- **ホスティング:** Vercel (GitHub連携自動デプロイ)
- **Lint:** ESLint (`next/core-web-vitals`)

## アーキテクチャ

### パスエイリアス
`@/*` でプロジェクトルートからのインポートが可能（tsconfig.json で設定済み）

### CMS連携
- microCMS のデータ取得処理は `lib/microcms.ts` に集約する設計
- APIは3つ: `news`（お知らせ+ブログ）、`style`（スタイルギャラリー）、`staff`（スタッフ紹介）
- メニュー・料金表はコード側で管理（更新頻度が低いため）
- 画像ドメイン: `images.microcms-assets.io` を Next.js で許可済み

### 環境変数
- `MICROCMS_SERVICE_DOMAIN` - microCMS サービスドメイン
- `MICROCMS_API_KEY` - microCMS APIキー
- `.env.local.example` にテンプレートあり

### ページ構成
- `/` - トップページ（Hero, NEWS, STYLE, MENU, STAFF, BLOG, SNS, ACCESS セクション）
- `/news`, `/news/[slug]` - お知らせ一覧・詳細
- `/style`, `/style/[slug]` - スタイルギャラリー一覧・詳細
- `/blog`, `/blog/[slug]` - ブログ一覧・詳細（news APIからカテゴリでフィルタ）
- `/menu` - メニュー・料金表
- `/staff/[slug]` - スタッフ詳細

## 参照ドキュメント

### プロジェクト管理 (`docs/project/`)
- 要件定義: `docs/project/requirements.md`
- 開発改善計画・進捗管理: `docs/project/improvement-plan.md`
- デザイン改善バックログ: `docs/project/improvement-list.md`

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
