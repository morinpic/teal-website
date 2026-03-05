# コンポーネント設計

teal. ウェブサイトの主要UIコンポーネントの仕様。

## ボタンパターン

現在、共通 Button コンポーネントは未実装。各コンポーネントでインラインスタイルとして記述されている。以下は既存のボタンバリエーション:

### Primary（塗りつぶし）

```tsx
// 使用箇所: MENU RESERVE, SNS フォローボタン
className="bg-teal-primary px-10 py-3 text-xs font-medium tracking-widest text-white transition-colors hover:bg-teal-primary/80"
```

| プロパティ | 値 |
|---|---|
| 背景 | `bg-teal-primary` (#008080) |
| 文字色 | `text-white` |
| ホバー | `hover:bg-teal-primary/80` |
| パディング | `px-10 py-3` |
| フォント | `text-xs font-medium tracking-widest` |
| 角丸 | なし（シャープ） |

### Secondary（アウトライン / teal背景向け）

```tsx
// 使用箇所: Header RESERVE, Hero RESERVE, STAFF READ MORE
className="border border-teal-primary px-5 py-2 text-xs font-medium tracking-widest text-teal-primary transition-colors hover:bg-teal-primary hover:text-white"
```

| プロパティ | 値 |
|---|---|
| 背景 | 透明 |
| ボーダー | `border border-teal-primary` |
| 文字色 | `text-teal-primary` |
| ホバー | `hover:bg-teal-primary hover:text-white` |

### Ghost White（ダーク/teal背景向け）

```tsx
// 使用箇所: Footer RESERVE, STAFF READ MORE, Hero RESERVE
className="border border-white px-6 py-2 text-xs font-medium tracking-widest text-white transition-colors hover:bg-white hover:text-dark-text"
```

| プロパティ | 値 |
|---|---|
| 背景 | 透明 |
| ボーダー | `border border-white` |
| 文字色 | `text-white` |
| ホバー | `hover:bg-white hover:text-dark-text` または `hover:text-teal-primary` |

### 共通仕様

- `border-radius`: なし（`rounded-none` またはデフォルト）— ブランドのシャープな印象を維持
- `transition-colors`: 全ボタンに適用
- `tracking-widest` または `tracking-[0.3em]`: 大文字ラベルとの組み合わせ
- `text-xs font-medium`: 全ボタンラベル共通

## セクション見出し

現在は共通コンポーネントではなく、各セクションで直接記述。以下が共通パターン:

### 白背景セクション（NEWS, STYLE, MENU, SNS）

```tsx
<div className="mb-16 text-center">
  <h2 className="text-3xl font-bold tracking-widest text-dark-text lg:text-4xl">
    MENU
  </h2>
  <p className="mt-2 text-sm tracking-widest text-dark-text/60">
    メニュー・料金表
  </p>
</div>
```

### ダーク背景セクション（STAFF, ACCESS）

```tsx
<div className="mb-16 text-center">
  <h2 className="text-3xl font-bold tracking-widest text-white lg:text-4xl">
    STAFF
  </h2>
  <p className="mt-2 text-sm tracking-widest text-white/70">
    スタッフ紹介
  </p>
</div>
```

### 構成

| 要素 | スタイル |
|---|---|
| ラッパー | `mb-16 text-center` |
| 英字タイトル (h2) | `text-3xl font-bold tracking-widest lg:text-4xl` |
| 日本語サブタイトル (p) | `mt-2 text-sm tracking-widest` + 透過色 |

### カラーバリエーション

| 背景 | タイトル色 | サブタイトル色 |
|---|---|---|
| 白 (`bg-white`) | `text-dark-text` | `text-dark-text/60` |
| Teal (`bg-teal-primary`) | `text-white` | `text-white/70` |
| ダーク (`bg-dark-text`) | `text-white` | `text-white/60` |

## カード

### スタイルカード（StyleGridAnimated）

```tsx
<Link href={`/style/${style.slug}`} className="group block overflow-hidden">
  <div className="relative aspect-square w-full overflow-hidden bg-gray-200">
    <Image className="object-cover transition-transform duration-500 group-hover:scale-105" />
    {/* ホバーオーバーレイ */}
    <div className="absolute inset-0 ... bg-dark-text/60 opacity-0 group-hover:opacity-100">
      <span>VIEW</span>
    </div>
  </div>
  <div className="mt-3">
    <p className="text-xs tracking-widest text-teal-primary">{menu}</p>
    <p className="text-sm font-medium text-dark-text">{title}</p>
  </div>
</Link>
```

| プロパティ | 値 |
|---|---|
| 画像比率 | `aspect-square` (1:1) |
| ホバー効果 | 画像: `scale-105` (500ms) + オーバーレイ: `bg-dark-text/60` フェードイン (300ms) |
| テキスト | メニュー名（teal色）+ タイトル（ダーク色） |

### ニュースカード（NewsListAnimated）

リスト形式で表示:

| プロパティ | 値 |
|---|---|
| レイアウト | 縦並び → `tablet:flex-row`（日付+タイトル横並び） |
| 区切り | `divide-y divide-dark-text/10` |
| ホバー効果 | タイトルテキスト色: `group-hover:text-teal-primary` |
| 日付 | `text-xs tracking-widest text-dark-text/50` |

### スタッフカード（StaffSection）

| プロパティ | 値 |
|---|---|
| カード幅 | `w-64` (256px) |
| 画像サイズ | `h-64 w-64` (256x256px) |
| ホバー効果 | 画像: `group-hover:scale-105` (500ms) |
| テキスト構成 | 英語名（white/70）→ 日本語名（white, xl）→ 肩書き（white/70） |

## メニューセクション（MenuSection）

### レイアウト

```tsx
<div className="grid gap-8 tablet:grid-cols-2 lg:grid-cols-3">
  <div className="border border-dark-text/10 p-8">
    <h3 className="text-lg font-bold tracking-widest text-teal-primary">{title}</h3>
    <ul className="space-y-3">
      <li className="flex items-start justify-between gap-4 text-sm text-dark-text">
        <span className="flex-1">{name}</span>
        <span className="shrink-0 font-medium">{price}</span>
      </li>
    </ul>
  </div>
</div>
```

| プロパティ | 値 |
|---|---|
| カードボーダー | `border border-dark-text/10` |
| カードパディング | `p-8` |
| カテゴリタイトル | `text-lg font-bold tracking-widest text-teal-primary` |
| メニュー項目 | `flex justify-between`, 名前（flex-1）+ 価格（shrink-0） |
| 注記 | `text-xs text-dark-text/50` |

## アニメーション

### スクロールアニメーション（framer-motion）

各カード・リスト要素で `useInView` + `motion` を使用:

```tsx
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ニュースリスト
initial={{ opacity: 0, y: 16 }}
animate={inView ? { opacity: 1, y: 0 } : {}}
transition={{ duration: 0.5, ease: EASE, delay: i * 0.06 }}

// スタイルグリッド
initial={{ opacity: 0, y: 20 }}
transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
```

| パラメータ | ニュース | スタイル |
|---|---|---|
| 初期Y位置 | 16px | 20px |
| アニメーション時間 | 0.5s | 0.6s |
| スタガー遅延 | 0.06s/item | 0.08s/item |
| イージング | `[0.16, 1, 0.3, 1]` | 同左 |
| トリガー | `useInView({ once: true, margin: "-60px" })` | 同左 |

### Hero アニメーション

```tsx
// ロゴ → サブテキスト → ボタン → スクロールインジケーター
delay: 0.3 → 0.6 → 0.9 → 1.2（0.3秒間隔）
duration: 0.8s
```

### ScrollToTop ボタン

```tsx
initial={{ opacity: 0, y: 12 }}
animate={{ opacity: 1, y: 0 }}
whileHover={{ y: -3 }}
transition={{ duration: 0.25, ease: "easeOut" }}
```
