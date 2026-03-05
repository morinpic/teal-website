# teal. インフラセットアップガイド

## 1. Vercel デプロイ（ダミーデータモード）

microCMS未設定でもダミーデータで動作するため、先にVercelにデプロイしてクライアント確認が可能。

### ステップ1: GitHubリポジトリの確認

現在のコードがGitHubにプッシュ済みであることを確認する。

### ステップ2: Vercelでプロジェクト作成

1. https://vercel.com/dashboard にログイン
2. 「Add New...」→「Project」をクリック
3. GitHubリポジトリ一覧からこのプロジェクトのリポジトリを選択して「Import」

### ステップ3: ビルド設定

Import画面で以下を確認：

- Framework Preset: **Next.js**（自動検出される）
- Build Command: `npm run build`（デフォルトのまま）
- Output Directory: そのまま
- Environment Variables: **何も設定しない**（ダミーデータモードで動作）

「Deploy」をクリック。

### ステップ4: デプロイ完了

成功すると `https://プロジェクト名.vercel.app` のURLが発行される。このURLをクライアントに共有。

---

## 2. microCMS セットアップ

### ステップ1: アカウント作成

https://microcms.io にアクセスし、無料（Hobbyプラン）でアカウントを作成。

### ステップ2: サービス作成

サービスIDの例: `teal-salon`（このIDが環境変数 `MICROCMS_SERVICE_DOMAIN` になる）

### ステップ3: APIを3つ作成（すべてリスト形式）

#### API 1: news（お知らせ+ブログ兼用）

| フィールドID | 表示名 | 種類 | 備考 |
|-------------|--------|------|------|
| slug | スラッグ | テキスト | |
| title | タイトル | テキスト | |
| content | 本文 | リッチエディタ | |
| excerpt | 抜粋 | テキスト | |
| category | カテゴリ | セレクト | news / blog |
| tags | タグ | 複数選択 | ヘアカラー, トレンド, ヘアケア, パーマ・縮毛矯正 |
| eyecatch | アイキャッチ | 画像 | |

#### API 2: style（スタイルギャラリー）

| フィールドID | 表示名 | 種類 | 備考 |
|-------------|--------|------|------|
| slug | スラッグ | テキスト | |
| title | タイトル | テキスト | |
| description | 説明 | テキスト | |
| image | 画像 | 画像 | |
| category | カテゴリ | セレクト | カット, カラー, パーマ, トリートメント |

#### API 3: staff（スタッフ紹介）

| フィールドID | 表示名 | 種類 | 備考 |
|-------------|--------|------|------|
| slug | スラッグ | テキスト | |
| name | 名前 | テキスト | |
| role | 役職 | テキスト | |
| image | 画像 | 画像 | |
| profile | プロフィール | リッチエディタ | |
| instagram | Instagram | テキスト | |

### ステップ4: APIキー取得

サービス設定 → APIキー から取得。これが環境変数 `MICROCMS_API_KEY` になる。

---

## 3. Vercel に環境変数を設定（microCMS連携）

microCMSのセットアップ完了後、Vercelに環境変数を追加してダミーデータから実データに切り替える。

1. Vercelダッシュボード → プロジェクト → Settings → Environment Variables
2. 以下を追加：
   - `MICROCMS_SERVICE_DOMAIN` = microCMSのサービスID
   - `MICROCMS_API_KEY` = microCMSのAPIキー
3. 再デプロイ（Deployments → 最新のデプロイで「Redeploy」）

---

*作成日: 2026年3月5日*
