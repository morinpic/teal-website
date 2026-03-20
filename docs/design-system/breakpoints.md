# レスポンシブブレークポイント

teal. ウェブサイトのブレークポイント定義とレスポンシブ挙動。

## ブレークポイント定義

| 名前 | ブレークポイント | 定義元 | Tailwind プレフィックス |
|---|---|---|---|
| モバイル | デフォルト（〜768px） | - | プレフィックスなし |
| タブレット | 769px | `@theme { --breakpoint-tablet: 769px }` (globals.css) | `tablet:` |
| デスクトップ | 1024px | Tailwind v4 デフォルト | `lg:` |
| ワイド | 1280px | Tailwind v4 デフォルト | `xl:` |

### カスタムブレークポイント

`tablet` (769px) はプロジェクト固有のカスタムブレークポイント。Tailwind v4 の `@theme` ディレクティブで定義:

```css
@theme {
  --breakpoint-tablet: 769px;
}
```

## ナビゲーションの挙動

| 要素 | モバイル（〜1023px） | デスクトップ（lg: 1024px〜） |
|---|---|---|
| PC ナビ | `hidden` | `lg:flex` で表示 |
| ハンバーガーボタン | 表示 | `lg:hidden` で非表示 |
| モバイルメニュー | フルスクリーンオーバーレイ | 非表示 |
| PC RESERVE ボタン | `hidden` | `lg:block` で表示 |
| FloatingReserve（固定バー） | 画面下部に固定表示 | `lg:hidden` で非表示 |
| ScrollToTop ボタン位置 | `bottom-28`（固定バー上） | `lg:bottom-8` |

## グリッドレイアウトの挙動

| セクション | モバイル | タブレット（tablet:） | デスクトップ（lg:） |
|---|---|---|---|
| STYLE グリッド | `grid-cols-2` | `tablet:gap-6`（gap拡大） | `lg:grid-cols-3` |
| MENU テーブル | 1列（`max-w-2xl`） | — | — |
| SNS グリッド | `grid-cols-2` | `tablet:grid-cols-3` | - |
| NEWS リスト | 縦並び | `tablet:flex-row`（横並び） | - |
| ACCESS セクション | 縦並び | - | `lg:flex-row`（横並び） |
| Footer ロゴ+ボタン | 縦並び・中央揃え | - | `lg:flex-row lg:justify-between` |
| Footer ナビ | `grid-cols-3` | - | `lg:flex lg:justify-start` |
| Hero ボタン群 | 縦並び | `sm:flex-row`（横並び） | - |

## コンテナ幅

| クラス | 幅 | 使用セクション |
|---|---|---|
| `max-w-screen-xl` | 1280px | 多くのセクション（共通） |
| `max-w-screen-2xl` | 1536px | STYLE セクション（ギャラリーを広く見せるため） |
| `max-w-2xl` | 672px | MENU セクション（読みやすさ重視） |

基本パターン: `mx-auto max-w-screen-xl px-6`

## セクションの縦パディング（Tier システム）

セクションを3段階の Tier に分類し、padding で視覚的重みを表現。

| Tier | セクション | モバイル | デスクトップ (lg:) |
|---|---|---|---|
| Tier 1（主役） | STYLE | `py-32` | `lg:py-48` |
| Tier 2（重要） | ABOUT, STAFF | `py-24` | `lg:py-36` |
| Tier 3（情報） | MENU, FAQ, NEWS, BLOG, SNS | `py-16` | `lg:py-24` |
| Utility | ACCESS | 独自設定 | — |

## フォントサイズの変化

| 要素 | モバイル | デスクトップ (lg:) |
|---|---|---|
| セクション見出し (h2) | `text-3xl` (30px) | `lg:text-4xl` (36px) |
| Hero ロゴ | `w-[240px]` | `lg:w-[360px]` |

## モバイルファーストの原則

本プロジェクトはモバイルファーストで設計。基本スタイルはモバイル向けに記述し、`tablet:`, `lg:`, `xl:` プレフィックスで拡張する。

```tsx
// 例: MenuSection のグリッド
<div className="grid gap-8 tablet:grid-cols-2 lg:grid-cols-3">
```

## 想定デバイス幅

| カテゴリ | 想定幅 | 代表デバイス |
|---|---|---|
| モバイル | 375px〜 | iPhone SE / iPhone 15 |
| タブレット | 769px〜 | iPad Mini / iPad |
| デスクトップ | 1024px〜 | ノートPC |
| ワイド | 1280px〜 | デスクトップモニター |
