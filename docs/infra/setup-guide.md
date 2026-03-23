# teal. インフラセットアップガイド

## 1. Cloudflare Workers デプロイ

microCMS 未設定でもダミーデータで動作するため、先にデプロイしてクライアント確認が可能。

### ステップ1: GitHubリポジトリの確認

現在のコードがGitHubにプッシュ済みであることを確認する。

### ステップ2: Cloudflare Workers & Pages でプロジェクト作成

1. https://dash.cloudflare.com にログイン
2. Compute > Workers & Pages > Create
3. Connect to Git で GitHub リポジトリを選択

### ステップ3: ビルド設定

- Project name: `teal-website`
- Build command: `npx @opennextjs/cloudflare build`
- Deploy command: `npx wrangler deploy`

### ステップ4: 環境変数の設定

**重要: 2箇所に同じ変数を設定する必要がある。**

#### ビルド時の変数（Settings > Build > 変数とシークレット）

SSG（静的ページ生成）時に microCMS からデータを取得するために必要。

| 変数名 | 値 | タイプ |
|---|---|---|
| `MICROCMS_SERVICE_DOMAIN` | microCMS のサービスID | テキスト |
| `MICROCMS_API_KEY` | microCMS の APIキー | シークレット |
| `NEXT_PUBLIC_SITE_URL` | `https://teal.yokohama` | テキスト |

#### ランタイムの変数（Settings > 変数とシークレット）

Worker がリクエスト処理時に参照する。OpenNext on Workers は SSG ページもランタイムで処理するため必要。

| 変数名 | 値 | タイプ |
|---|---|---|
| `MICROCMS_SERVICE_DOMAIN` | microCMS のサービスID | テキスト |
| `MICROCMS_API_KEY` | microCMS の APIキー | シークレット |
| `NEXT_PUBLIC_SITE_URL` | `https://teal.yokohama` | テキスト |

### ステップ5: wrangler.jsonc の重要設定

`keep_vars: true` が設定されていることを確認する。これがないと `wrangler deploy` 時にランタイム変数が削除される。

```jsonc
{
  "keep_vars": true,
  "compatibility_date": "2025-04-01"
}
```

### ステップ6: デプロイ完了

成功すると `https://teal-website.morinpic0518.workers.dev` のURLが発行される。
カスタムドメイン `teal.yokohama` は Workers & Pages > Settings > Domains & Routes から設定済み。

---

## 2. microCMS セットアップ

### ステップ1: アカウント作成

https://microcms.io にアクセスし、無料（Hobbyプラン）でアカウントを作成。

### ステップ2: サービス作成

サービスID: `teal`（このIDが環境変数 `MICROCMS_SERVICE_DOMAIN` になる）

### ステップ3: APIを3つ作成（すべてリスト形式）

> **重要**: フィールドIDは `lib/types.ts` の型定義と完全に一致させること。
> **注意**: slug フィールドは不要。microCMS の自動生成 ID を URL パラメータとして使用する。

#### API 1: news（お知らせ+ブログ兼用）

エンドポイント: `news`

| フィールドID | 表示名 | 種類 | 必須 | 備考 |
|-------------|--------|------|:----:|------|
| title | タイトル | テキスト | ✅ | |
| content | 本文 | リッチエディタ | ✅ | |
| excerpt | 抜粋 | テキスト | | 空でも本文から自動抽出される |
| category | カテゴリ | セレクト | ✅ | 値: `news` / `blog`。複数選択は OFF |
| tags | タグ | 複数選択 | | `ヘアカラー`, `トレンド`, `ヘアケア`, `パーマ・縮毛矯正` |
| eyecatch | アイキャッチ | 画像 | | ブログ記事には設定推奨。なければ「No Image」表示 |

> **注意**: category のセレクトフィールドは複数選択 OFF でも API レスポンスが配列で返る。コード側で `normalizeCategory()` により吸収済み。API フィルタは `category[contains]` を使用。

#### API 2: style（スタイルギャラリー）

エンドポイント: `style`

| フィールドID | 表示名 | 種類 | 必須 | 備考 |
|-------------|--------|------|:----:|------|
| title | タイトル | テキスト | ✅ | スタイル名 |
| image | メイン画像 | 画像 | ✅ | |
| description | 説明 | テキスト | | スタイルの説明文 |
| stylist | スタイリスト | テキスト | | 担当スタイリスト名 |
| menu | 施術メニュー | テキスト | | 例: カット + デザインパーマ |

#### API 3: staff（スタッフ紹介）

エンドポイント: `staff`

| フィールドID | 表示名 | 種類 | 必須 | 備考 |
|-------------|--------|------|:----:|------|
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

## 3. microCMS Webhook 設定（自動デプロイ）

microCMS でコンテンツを公開・更新すると、自動的にサイトが再ビルド＆デプロイされる。

### 仕組み

```
microCMS で公開 → Webhook → GitHub Actions (cms-deploy.yml) → cf:deploy → 本番反映
```

### 設定手順

各 API（お知らせ・ブログ / スタイル / スタッフ）ごとに Webhook を設定する。

1. microCMS 管理画面 → 対象 API → API設定 → Webhook → 追加
2. サービス: **GitHub Actions** を選択
3. 設定値:

| 項目 | 値 |
|---|---|
| Webhook の名前 | デプロイトリガー |
| GitHub トークン | GitHub PAT（Fine-grained、Contents: Read and write） |
| ユーザー名 | `morinpic` |
| リポジトリ名 | `teal-website` |
| トリガーイベント名 | `cms-update` |

4. 通知タイミング:
   - コンテンツの公開時・更新時: **ON**
   - コンテンツの公開終了時: **ON**（管理画面・予約設定）
   - 公開中コンテンツの削除時: **ON**
   - その他: OFF

5. 3つの API すべてに同じ設定を追加

### GitHub 側の設定

#### リポジトリ Secrets（Settings > Secrets and variables > Actions）

| Secret 名 | 用途 |
|---|---|
| `DEPLOY_TOKEN` | GitHub PAT（ワークフロー実行用） |
| `MICROCMS_SERVICE_DOMAIN` | microCMS サービス ID |
| `MICROCMS_API_KEY` | microCMS API キー |
| `CLOUDFLARE_API_TOKEN` | Cloudflare API トークン（Edit Workers テンプレートで作成） |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare アカウント ID |

---

*作成日: 2026年3月5日 / 最終更新: 2026年3月24日*
