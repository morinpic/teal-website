# タイポグラフィスケール

teal. ウェブサイトのフォント設定とサイズスケールの定義。

## フォントファミリー

| フォント | 変数 | Tailwind クラス | 役割 |
|---------|------|----------------|------|
| Urbanist | `--font-urbanist` | `font-urbanist` | セクション h2 大見出し（英字）。ロゴと同系統のモダン・ジオメトリック体 |
| Noto Sans JP | `--font-sans-jp` | `font-sans` | 本文・UI 全般。日英混在テキストの基盤 |
| Noto Serif JP | `--font-serif-jp` | `font-serif` | rich-text 本文見出し（h2/h3） |
| Cormorant Garamond | `--font-accent` | `font-accent` | 小アクセント・キャプション用途（スタッフ英語名、Hero サブテキスト等） |

### Urbanist

```tsx
// app/layout.tsx
const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-urbanist",
});
```

- **ソース:** Google Fonts（Next.js `next/font/google` で最適化読み込み）
- **適用:** `SectionHeading.tsx` の h2、`AccessSection.tsx` の h2、`app/menu/page.tsx` のカテゴリ h2
- **ウェイト:** `font-normal`（400）を基本使用。`font-light`（300）は大サイズ時に使用可
- **選定理由:** teal. ロゴと同系統のジオメトリックサンセリフ。英字大見出しの視認性と高級感を両立

### Noto Sans JP

```tsx
// app/layout.tsx
const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-sans-jp",
});
```

- **ソース:** Google Fonts（Next.js `next/font/google` で最適化読み込み）
- **適用:** `<body>` に `font-sans` クラスで全体適用
- **display:** `swap`（FOUT許容、パフォーマンス優先）

### ウェイト

| ウェイト | 数値 | Tailwind クラス | 用途 |
|---|---|---|---|
| Regular | 400 | `font-normal`（デフォルト） | 本文テキスト、説明文 |
| Medium | 500 | `font-medium` | ナビリンク、ボタンラベル、カードタイトル |
| Bold | 700 | `font-bold` | リッチテキスト見出し（h2/h3 は rich-text 内のみ） |

## タイプスケール

| レベル | サイズ | Tailwind クラス | line-height | letter-spacing | 用途 |
|---|---|---|---|---|---|
| Display | - | - | - | - | （現在未使用、将来拡張用） |
| h1 (sr-only) | - | `sr-only` | - | - | Hero のスクリーンリーダー用見出し |
| h2 (セクション見出し) | 30px / 36px | `text-3xl lg:text-4xl` | デフォルト | `tracking-widest` (0.1em) / `tracking-[0.2em]` | 各セクションタイトル（NEWS, STYLE 等） |
| h3 (カテゴリ) | 18px | `text-lg` | デフォルト | `tracking-widest` | メニューカテゴリタイトル |
| h3 (スタッフ名) | 20px | `text-xl` | デフォルト | `tracking-wide` | スタッフカード名前 |
| Body | 16px | `text-base`（デフォルト） | `leading-relaxed` (1.625) | デフォルト | 本文テキスト |
| Body (rich-text) | 16px | - | `line-height: 1.9` | デフォルト | microCMS本文 |
| Small | 14px | `text-sm` | `leading-relaxed` | `tracking-widest` | サブタイトル、メニュー価格、抜粋 |
| XS | 12px | `text-xs` | デフォルト | `tracking-widest` / `tracking-[0.3em]` / `tracking-[0.4em]` | 日付、ボタンラベル、メタ情報 |

## letter-spacing の使い分け

| Tailwind クラス | 値 | 用途 |
|---|---|---|
| `tracking-wide` | 0.025em | スタッフ名 |
| `tracking-widest` | 0.1em | セクション見出し、ナビリンク、サブタイトル |
| `tracking-[0.2em]` | 0.2em | SNS セクション見出し |
| `tracking-[0.25em]` | 0.25em | FloatingReserve ボタン |
| `tracking-[0.3em]` | 0.3em | ボタンラベル（RESERVE, READ MORE, VIEW） |
| `tracking-[0.4em]` | 0.4em | Hero サブテキスト |

## リッチテキストのタイポグラフィ（globals.css `.rich-text`）

microCMS から取得したHTML本文に適用されるスタイル:

| 要素 | font-size | font-weight | margin | 特記 |
|---|---|---|---|---|
| `.rich-text h2` | 1.25rem (20px) | 700 | mt: 2.5rem, mb: 1rem | 下ボーダー付き |
| `.rich-text h3` | 1.1rem (17.6px) | 700 | mt: 2rem, mb: 0.75rem | - |
| `.rich-text p` | 継承 (16px) | 継承 | mb: 1.5rem | line-height: 1.9 |
| `.rich-text ul/ol` | 継承 | 継承 | mb: 1.5rem | line-height: 1.9, pl: 1.5rem |

## レスポンシブでのフォントサイズ変更

| 要素 | モバイル | lg (1024px〜) |
|---|---|---|
| セクション見出し (h2) | `text-3xl` (30px) | `text-4xl` (36px) |
| モバイルナビリンク | `text-xl` (20px) | - |
| PC ナビリンク | - | `text-sm` (14px) |

## アンチエイリアス

```tsx
<body className={`${notoSansJP.className} text-dark-text antialiased`}>
```

`antialiased` クラスにより、macOS/iOS で `-webkit-font-smoothing: antialiased`、その他で `-moz-osx-font-smoothing: grayscale` が適用される。
