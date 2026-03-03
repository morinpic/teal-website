# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

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

### ブランドカラー（Tailwind カスタムカラー）
- `teal-primary`: #008080（プライマリ）
- `dark-text`: #231815（テキスト・ロゴ）

### レスポンシブ
- モバイルファースト
- ブレイクポイント: SP（〜768px）、tablet（769px〜、Tailwindカスタム）、PC（1025px〜）

### ページ構成
- `/` - トップページ（Hero, NEWS, STYLE, MENU, STAFF, SNS, ACCESS セクション）
- `/news`, `/news/[slug]` - お知らせ一覧・詳細
- `/style`, `/style/[slug]` - スタイルギャラリー一覧・詳細
- `/blog`, `/blog/[slug]` - ブログ一覧・詳細（news APIからカテゴリでフィルタ）
- `/menu` - メニュー・料金表
- `/staff/[slug]` - スタッフ詳細

## 仕様書

詳細な要件定義は `docs/teal-requirements.md` を参照。店舗情報、メニュー料金、デザイン仕様等を含む。

## チーム作業について
* チームで相談し、修正を行ってください。
* ディレクター、デザイナー、コーダー、で実装して下さい。
* メンバーが足りない場合は、適切に増員してください。
* 適切な粒度でgit commitしてください（コミットメッセージは1行で簡潔にまとめてください）
* ディレクター以外はモデルはSonnetを使用してください。
