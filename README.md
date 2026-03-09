# teal.

横浜元町の美容院 **teal.** の公式ウェブサイト。

## 技術スタック

| カテゴリ | 技術 |
|---------|------|
| フレームワーク | Next.js 16 (App Router) / React 19 / TypeScript |
| スタイリング | Tailwind CSS v4 |
| アニメーション | Framer Motion v12 |
| CMS | microCMS (Hobby プラン) |
| ホスティング | Vercel（Cloudflare 対応あり） |

## セットアップ

```bash
git clone git@github.com:morinpic/teal-website.git
cd teal-website
npm install
```

### 環境変数

`.env.local.example` をコピーして値を設定する。

```bash
cp .env.local.example .env.local
```

| 変数名 | 説明 |
|--------|------|
| `MICROCMS_SERVICE_DOMAIN` | microCMS サービスドメイン |
| `MICROCMS_API_KEY` | microCMS API キー |
| `NEXT_PUBLIC_SITE_URL` | 本番サイト URL（OGP・構造化データ用） |

### 開発サーバー

```bash
npm run dev
```

## コマンド一覧

```bash
npm run dev        # 開発サーバー起動
npm run build      # プロダクションビルド
npm run start      # プロダクションサーバー起動
npm run lint       # ESLint 実行
npm run cf:build   # Cloudflare 向けビルド
npm run cf:deploy  # Cloudflare デプロイ
```

## ページ構成

| パス | 内容 |
|------|------|
| `/` | トップページ（Hero / About / Style / Menu / Staff / FAQ / News / Blog / SNS / Access） |
| `/news` `/news/[slug]` | お知らせ一覧・詳細 |
| `/blog` `/blog/[slug]` | ブログ一覧・詳細 |
| `/style` `/style/[slug]` | スタイルギャラリー一覧・詳細 |
| `/staff` `/staff/[slug]` | スタッフ紹介一覧・詳細 |

## ディレクトリ構成（抜粋）

```
app/           … App Router ページ・レイアウト
components/    … 共通 UI コンポーネント
lib/           … microCMS クライアント・型定義
public/        … 静的アセット
docs/          … プロジェクト管理・デザインシステムドキュメント
```

## ドキュメント

詳細な技術仕様・設計方針は `docs/` 配下を参照。

- **プロジェクト管理:** `docs/project/` — 要件定義・changelog・バックログ
- **デザインシステム:** `docs/design-system/` — カラー・タイポグラフィ・コンポーネント設計
- **インフラ:** `docs/infra/` — セットアップ手順

AI エージェント向けの詳細コンテキストは `CLAUDE.md` を参照。

## ライセンス

Private
