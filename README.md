# teal.

[![CI](https://github.com/morinpic/teal-website/actions/workflows/ci.yml/badge.svg)](https://github.com/morinpic/teal-website/actions/workflows/ci.yml)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![Cloudflare](https://img.shields.io/badge/Cloudflare_Workers-deployed-F38020?logo=cloudflare&logoColor=white)](https://teal.yokohama)
[![License](https://img.shields.io/badge/license-All_Rights_Reserved-red)](./LICENSE)

横浜元町の美容院 **teal.** の公式ウェブサイト。

🌐 https://teal.yokohama

## 技術スタック

| カテゴリ | 技術 |
|---------|------|
| フレームワーク | Next.js 16 (App Router) / React 19 / TypeScript |
| スタイリング | Tailwind CSS v4 |
| アニメーション | Framer Motion v12 |
| CMS | microCMS (Hobby プラン) |
| ホスティング | Cloudflare Workers (OpenNext) |
| CI/CD | GitHub Actions |
| アナリティクス | Cloudflare Web Analytics / Umami Cloud |

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

> microCMS 未設定でもダミーデータで動作するため、環境変数なしで開発を始められます。

### 開発サーバー

```bash
npm run dev
```

## コマンド一覧

```bash
npm run dev        # 開発サーバー起動
npm run build      # プロダクションビルド
npm run lint       # ESLint 実行
npm run cf:build   # Cloudflare 向けビルド
npm run cf:deploy  # Cloudflare デプロイ
```

## ページ構成

| パス | 内容 |
|------|------|
| `/` | トップページ（Hero / About / Style / Menu / Staff / FAQ / News / Blog / SNS / Access） |
| `/news` `/news/[id]` | お知らせ一覧・詳細 |
| `/blog` `/blog/[id]` | ブログ一覧・詳細 |
| `/style` `/style/[id]` | スタイルギャラリー一覧・詳細 |
| `/staff` `/staff/[id]` | スタッフ紹介一覧・詳細 |

## ディレクトリ構成（抜粋）

```
app/           … App Router ページ・レイアウト
components/    … 共通 UI コンポーネント
lib/           … microCMS クライアント・型定義・ユーティリティ
public/        … 静的アセット
docs/          … プロジェクト管理・デザインシステムドキュメント
.github/       … GitHub Actions ワークフロー
```

## ドキュメント

詳細な技術仕様・設計方針は `docs/` 配下を参照。

- **プロジェクト管理:** `docs/project/` — 要件定義・changelog・バックログ
- **デザインシステム:** `docs/design-system/` — カラー・タイポグラフィ・コンポーネント設計
- **インフラ:** `docs/infra/` — セットアップ手順・Webhook 設定

AI エージェント向けの詳細コンテキストは `CLAUDE.md` を参照。

## ライセンス

All Rights Reserved
