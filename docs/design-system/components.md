# コンポーネント設計

teal. ウェブサイトの主要UIコンポーネントの仕様。

## ボタンパターン

共通 Button コンポーネント（`components/Button.tsx`）実装済み。以下の3バリアントを提供:

### Primary（塗りつぶし）

```tsx
// 使用箇所: MENU RESERVE, SNS フォローボタン
className="bg-teal-primary px-10 py-3 text-xs font-medium tracking-widest text-white transition-colors hover:bg-teal-primary/80"
```

| プロパティ | 値 |
|---|---|
| 背景 | `bg-teal-primary` (#0c7c7c) |
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

## セクション見出し（SectionHeading）

共通コンポーネント `components/SectionHeading.tsx` で全セクション統一。

```tsx
<SectionHeading title="STYLE" subtitle="スタイルギャラリー" size="lg" />
<SectionHeading title="NEWS" subtitle="お知らせ" />
<SectionHeading title="STAFF" subtitle="スタッフ紹介" light />
```

### Props

| Prop | 型 | デフォルト | 説明 |
|---|---|---|---|
| `title` | `string` | — | 英字タイトル（大文字） |
| `subtitle` | `string` | — | 日本語サブタイトル |
| `light` | `boolean` | `false` | ダーク/teal背景時に `true`（テキスト白） |
| `size` | `"lg" \| "md"` | `"md"` | 見出しサイズ（Tier 1 セクションは `"lg"`） |

### サイズバリエーション

| size | h2 サイズ | 用途 |
|---|---|---|
| `"lg"` | `text-4xl lg:text-5xl` | Tier 1 セクション（STYLE） |
| `"md"` | `text-3xl lg:text-4xl` | Tier 2/3 セクション（その他） |

### スタイル

| 要素 | スタイル |
|---|---|
| ラッパー | `mb-16 flex flex-col items-center gap-3` + ScrollAnimation |
| 英字タイトル (h2) | `font-urbanist font-normal tracking-[0.2em]` |
| 日本語サブタイトル (p) | `text-sm tracking-widest` + 透過色 |
| 装飾ライン | `AnimatedLine`（スクロールインビュー時に `width: 0→64px`） |

### カラーバリエーション

| 背景 | `light` | タイトル色 | サブタイトル色 |
|---|---|---|---|
| 白 / クリーム | `false` | `text-dark-text` | `text-dark-text/60` |
| Teal / ダーク | `true` | `text-white` | `text-white/70` |

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

サーバーコンポーネント。全カテゴリを縦一覧で表示（タブUI廃止済み）。

### レイアウト

```tsx
<div className="mx-auto max-w-2xl space-y-12">
  {menuCategories.map((category) => (
    <div key={category.id}>
      <div className="mb-6 flex items-center gap-6">
        <h3 className="font-urbanist text-xl font-normal tracking-widest text-teal-primary">
          {category.title}
        </h3>
        <div className="flex-1 border-t border-dark-text/10" />
      </div>
      <table className="w-full border-collapse">
        <tbody className="divide-y divide-dark-text/5">
          <tr>
            <td className="py-4 pr-4 text-base leading-relaxed text-dark-text">{item.name}</td>
            <td className="py-4 text-right text-base font-semibold text-teal-primary whitespace-nowrap">{item.price}</td>
          </tr>
        </tbody>
      </table>
    </div>
  ))}
</div>
```

| プロパティ | 値 |
|---|---|
| コンテナ幅 | `max-w-2xl`（672px） |
| カテゴリ間隔 | `space-y-12` |
| カテゴリタイトル | `font-urbanist text-xl font-normal tracking-widest text-teal-primary` |
| 区切り線 | `border-t border-dark-text/10`（タイトル横） |
| 行区切り | `divide-y divide-dark-text/5` |
| 価格 | `font-semibold text-teal-primary whitespace-nowrap` |
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
// ロゴ → サブテキスト → ボタン群
delay: 0.3 → 0.6 → 0.9（0.3秒間隔）
duration: 0.8s
```

### Hero スライドショー（HeroSlideshow）

```tsx
// 2枚の背景画像を自動クロスフェード
interval: 6000ms
fade duration: 1.5s, ease: "easeInOut"
// useReducedMotion 時: 1枚目固定、切り替えなし
```

### ScrollToTop ボタン

```tsx
initial={{ opacity: 0, y: 12 }}
animate={{ opacity: 1, y: 0 }}
whileHover={{ y: -3 }}
transition={{ duration: 0.25, ease: "easeOut" }}
```
