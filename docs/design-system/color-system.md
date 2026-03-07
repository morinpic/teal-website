# カラーシステム

teal. ウェブサイトで使用するカラーパレットの定義と運用ガイドライン。

## カラーパレット

### Tailwind CSS v4 テーマ変数（globals.css `@theme`）

```css
@theme {
  --color-teal-primary: #0c7c7c;
  --color-dark-text: #231815;
}
```

### 全カラー一覧

| カラー名 | HEX | Tailwind クラス | 用途 |
|---|---|---|---|
| Teal Primary | `#0c7c7c` | `text-teal-primary`, `bg-teal-primary`, `border-teal-primary` | ブランドカラー、ボタン背景、ホバー状態、リンク色、フォーカスリング |
| Dark Text | `#231815` | `text-dark-text`, `bg-dark-text` | メインテキスト、ヘッダー文字、フッター背景、ACCESS セクション背景 |
| White | `#ffffff` | `text-white`, `bg-white` | 背景、ボタン文字（teal背景時）、フッター文字 |
| Gray 200 | Tailwind 既定 | `bg-gray-200` | 画像プレースホルダー背景 |

### 不透明度バリエーション

| パターン | クラス例 | 用途 |
|---|---|---|
| `dark-text/60` | `text-dark-text/60` | サブテキスト、抜粋文 |
| `dark-text/50` | `text-dark-text/50` | 日付、メタ情報、ラベル |
| `dark-text/10` | `divide-dark-text/10`, `border-dark-text/10` | 区切り線、ボーダー |
| `dark-text/5` | `bg-dark-text/5` | 軽い背景色 |
| `white/70` | `text-white/70` | フッターナビ、スタッフ肩書き |
| `white/50` | `text-white/50`, `bg-white/50` | コピーライト、装飾 |
| `white/20` | `border-white/20`, `bg-white/20` | フッター区切り線、スタッフ写真背景 |
| `teal-primary/80` | `hover:bg-teal-primary/80` | ボタンホバー（塗りつぶし系） |
| `teal-primary/30` | `bg-teal-primary/30` | ローディングアニメーション |
| `teal-primary/20` | `border-teal-primary/20` | SNS投稿ボーダー |

## WCAG AA コントラスト比

WCAG AA 基準: 通常テキスト 4.5:1 以上、大テキスト（18px bold / 24px以上）3:1 以上。

| 前景色 | 背景色 | コントラスト比 | AA準拠 |
|---|---|---|---|
| `#231815` (dark-text) | `#ffffff` (white) | 約 15.3:1 | ✅ 合格 |
| `#0c7c7c` (teal-primary) | `#ffffff` (white) | 約 5.0:1 | ✅ 合格（通常テキスト含む） |
| `#ffffff` (white) | `#0c7c7c` (teal-primary) | 約 5.0:1 | ✅ 合格（ボタン文字） |
| `#ffffff` (white) | `#231815` (dark-text) | 約 15.3:1 | ✅ 合格 |
| `#231815` 60% opacity | `#ffffff` | 要検証 | 大テキストのみ推奨 |
| `#231815` 50% opacity | `#ffffff` | 要検証 | 大テキスト・補助情報のみ |

> **注意:** 不透明度を下げたテキストはコントラスト比が低下するため、本文テキストではなく日付やメタ情報など補助的な用途に限定すること。

## カラー使用箇所マップ

### Teal Primary (`#0c7c7c`)

- Header: ナビリンク hover 状態 (`hover:text-teal-primary`)
- Header: RESERVE ボタンのボーダー・文字色・hover 背景
- Hero: RESERVE ボタン hover 背景
- STYLE セクション: メニューラベル
- MENU セクション: カテゴリタイトル、RESERVE ボタン背景
- STAFF セクション: セクション全体の背景色
- SNS セクション: フォローボタン背景
- ACCESS セクション: 予約リンク色
- Footer: RESERVE ボタン hover 背景なし（白ベース）
- FloatingReserve: 固定バー背景
- ScrollToTop: ボタン背景
- フォーカスリング: `outline: 2px solid #0c7c7c`
- スキップリンク: 背景色
- リッチテキスト: リンク色、blockquote ボーダー

### Dark Text (`#231815`)

- body 全体のテキスト色 (`text-dark-text`)
- Footer 全体の背景色 (`bg-dark-text`)
- ACCESS セクション全体の背景色
- ハンバーガーメニューのライン色
- リッチテキスト: 見出し・本文色
- STYLE hover オーバーレイ (`bg-dark-text/60`)

---

*最終更新: 2026-03-06*
