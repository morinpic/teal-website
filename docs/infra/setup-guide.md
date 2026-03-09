# teal. インフラセットアップガイド

## 1. Cloudflare Pages デプロイ

microCMS 未設定でもダミーデータで動作するため、先にデプロイしてクライアント確認が可能。

### ステップ1: GitHubリポジトリの確認

現在のコードがGitHubにプッシュ済みであることを確認する。

### ステップ2: Cloudflare Pages でプロジェクト作成

1. https://dash.cloudflare.com にログイン
2. Compute > Workers & Pages > Create
3. Pages タブ → Connect to Git で GitHub リポジトリを選択

### ステップ3: ビルド設定

- Project name: `teal-website`
- Build command: `npx @opennextjs/cloudflare`
- Deploy command: `npx wrangler deploy`（デフォルトのまま）

### ステップ4: デプロイ完了

成功すると `https://teal-website.pages.dev` のURLが発行される。このURLをクライアントに共有。

---

## 2. microCMS セットアップ

### ステップ1: アカウント作成

https://microcms.io にアクセスし、無料（Hobbyプラン）でアカウントを作成。

### ステップ2: サービス作成

サービスIDの例: `teal-salon`（このIDが環境変数 `MICROCMS_SERVICE_DOMAIN` になる）

### ステップ3: APIを3つ作成（すべてリスト形式）

> **重要**: フィールドIDは `lib/types.ts` の型定義と完全に一致させること。

#### API 1: news（お知らせ+ブログ兼用）

エンドポイント: `news`

| フィールドID | 表示名 | 種類 | 必須 | 備考 |
|-------------|--------|------|:----:|------|
| slug | スラッグ | テキスト | ✅ | URL用。英数字・ハイフンのみ |
| title | タイトル | テキスト | ✅ | |
| content | 本文 | リッチエディタ | ✅ | |
| excerpt | 抜粋 | テキスト | | 一覧表示用の概要文 |
| category | カテゴリ | セレクト | ✅ | `news` / `blog` の2値 |
| tags | タグ | 複数選択 | | `ヘアカラー`, `トレンド`, `ヘアケア`, `パーマ・縮毛矯正` |
| eyecatch | アイキャッチ | 画像 | | ブログ記事には設定推奨 |

#### API 2: style（スタイルギャラリー）

エンドポイント: `style`

| フィールドID | 表示名 | 種類 | 必須 | 備考 |
|-------------|--------|------|:----:|------|
| slug | スラッグ | テキスト | ✅ | URL用 |
| title | タイトル | テキスト | ✅ | スタイル名 |
| image | メイン画像 | 画像 | ✅ | |
| description | 説明 | テキスト | | スタイルの説明文 |
| stylist | スタイリスト | テキスト | | 担当スタイリスト名 |
| menu | 施術メニュー | テキスト | | 例: カット + デザインパーマ |

#### API 3: staff（スタッフ紹介）

エンドポイント: `staff`

| フィールドID | 表示名 | 種類 | 必須 | 備考 |
|-------------|--------|------|:----:|------|
| slug | スラッグ | テキスト | ✅ | URL用 |
| name | 名前 | テキスト | ✅ | 日本語表記 |
| nameEn | 英語名 | テキスト | ✅ | 英語表記（カード表示用） |
| position | 役職 | テキスト | ✅ | 例: owner / hair designer |
| photo | 写真 | 画像 | | プロフィール写真 |
| profile | プロフィール | リッチエディタ | | 経歴・紹介文 |
| message | メッセージ | テキスト | | お客様へのメッセージ |
| specialty | 得意な施術 | テキスト | | 例: カラー、縮毛矯正 |

### ステップ4: APIキー取得

サービス設定 → APIキー から取得。これが環境変数 `MICROCMS_API_KEY` になる。

> **セキュリティ注意**: APIキーは GET のみ許可に設定すること（デフォルト）。POST/PUT/DELETE 権限は不要。

---

## 3. Cloudflare Pages に環境変数を設定（microCMS連携）

microCMSのセットアップ完了後、Cloudflare に環境変数を追加してダミーデータから実データに切り替える。

1. Cloudflare Dashboard → Compute > Workers & Pages → teal-website → Settings → Environment variables
2. 以下を追加：
   - `MICROCMS_SERVICE_DOMAIN` = microCMS のサービスID
   - `MICROCMS_API_KEY` = microCMS の APIキー（Encrypt 推奨）
   - `NEXT_PUBLIC_SITE_URL` = 本番サイトのURL
3. Deployments から再デプロイを実行

---

*作成日: 2026年3月5日 / 最終更新: 2026年3月9日*
