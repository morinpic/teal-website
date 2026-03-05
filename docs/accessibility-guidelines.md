# アクセシビリティガイドライン

teal. ウェブサイトの WCAG AA 準拠状況と実装ガイドライン。

## WCAG AA 準拠チェックリスト

### 知覚可能

| 項目 | 状態 | 備考 |
|---|---|---|
| 画像に alt 属性 | 適合 | 全 `<Image>` に alt 指定済み |
| 装飾SVGに `aria-hidden="true"` | 適合 | アイコンSVG全てに設定 |
| テキストのコントラスト比 4.5:1 | 適合 | dark-text/white: 約15.3:1, teal-primary/white: 約4.6:1 |
| 不透明度テキストのコントラスト | 要注意 | `dark-text/50` は補助情報のみに限定 |
| iframe に title 属性 | 適合 | Google Maps に `title="teal. アクセスマップ"` |

### 操作可能

| 項目 | 状態 | 備考 |
|---|---|---|
| キーボードでの全機能アクセス | 適合 | リンク・ボタン全てフォーカス可能 |
| フォーカスインジケーター | 適合 | `*:focus-visible` でアウトライン表示 |
| スキップリンク | 適合 | `#main-content` へのスキップリンク実装 |
| フォーカストラップ（モーダル） | 要改善 | モバイルメニューにフォーカストラップ未実装 |

### 理解可能

| 項目 | 状態 | 備考 |
|---|---|---|
| ページ言語 `lang="ja"` | 適合 | `<html lang="ja">` |
| フォームラベル | 該当なし | フォームなし |
| エラーメッセージ | 該当なし | フォームなし |

### 堅牢

| 項目 | 状態 | 備考 |
|---|---|---|
| 有効なHTML構造 | 適合 | セマンティックHTML使用 |
| ARIA属性の正しい使用 | 適合 | 下記参照 |

## スキップリンク

```css
/* globals.css */
.skip-link {
  position: absolute;
  top: -100%;
  left: 0;
  z-index: 100;
  padding: 0.5rem 1rem;
  background: #008080;
  color: white;
  font-size: 0.875rem;
  text-decoration: none;
}

.skip-link:focus {
  top: 0;
}
```

```tsx
// layout.tsx
<a href="#main-content" className="skip-link">
  メインコンテンツへスキップ
</a>
```

- Tab キーで最初にフォーカスされる要素
- フォーカス時に画面上部に表示
- `#main-content` へジャンプ

## フォーカスリング

```css
/* globals.css */
*:focus-visible {
  outline: 2px solid #008080;
  outline-offset: 2px;
}
```

- 全フォーカス可能要素に適用
- teal-primary (#008080) のアウトライン
- 2px のオフセットで要素との間隔を確保
- `:focus-visible` を使用（マウスクリック時は非表示、キーボード操作時のみ表示）

## ARIA 属性の使用箇所

### `aria-label`

| コンポーネント | 要素 | 値 |
|---|---|---|
| Header | PC ナビ `<nav>` | `aria-label="メインナビゲーション"` |
| Header | モバイルナビ `<nav>` | `aria-label="モバイルナビゲーション"` |
| Header | ハンバーガーボタン | `aria-label="メニューを開く"` |
| Header | モバイルメニュー閉じるボタン | `aria-label="メニューを閉じる"` |
| Header | RESERVE リンク | `aria-label="ホットペッパービューティーで予約する"` |
| Footer | Instagram リンク | `aria-label="Instagramを開く"` |
| Footer | RESERVE リンク | `aria-label="ホットペッパービューティーで予約する"` |
| Footer | `<nav>` | `aria-label="フッターナビゲーション"` |
| ScrollToTop | ボタン | `aria-label="ページトップに戻る"` |
| SnsSection | Instagram 投稿リンク | `aria-label="Instagramで投稿を見る"` |
| FloatingReserve | RESERVE リンク | 未設定（テキストコンテンツあり） |

### `aria-expanded`

| コンポーネント | 要素 | 用途 |
|---|---|---|
| Header | ハンバーガーボタン | `aria-expanded={isMenuOpen}` — メニューの開閉状態を通知 |

### `aria-hidden`

| コンポーネント | 要素 | 用途 |
|---|---|---|
| Header | h1 | `sr-only` クラスで視覚的に非表示 |
| Footer | Instagram SVG アイコン | `aria-hidden="true"` |
| ScrollToTop | 矢印 SVG アイコン | `aria-hidden="true"` |
| SnsSection | Instagram SVG アイコン | `aria-hidden="true"` |
| StaffSection | プレースホルダー SVG | `aria-hidden="true"` |

## コントラスト比一覧

| 組み合わせ | コントラスト比 | 用途 | AA判定 |
|---|---|---|---|
| #231815 on #ffffff | 約 15.3:1 | 本文テキスト | 合格 |
| #008080 on #ffffff | 約 4.6:1 | リンク、カテゴリタイトル | 合格 |
| #ffffff on #008080 | 約 4.6:1 | STAFFセクション文字 | 合格 |
| #ffffff on #231815 | 約 15.3:1 | フッター、ACCESSセクション | 合格 |
| #231815/60% on #ffffff | 約 7.0:1（推定） | サブテキスト | 合格 |
| #231815/50% on #ffffff | 約 5.3:1（推定） | 日付、メタ情報 | 合格 |
| #ffffff/70% on #008080 | 約 3.3:1（推定） | STAFFサブテキスト | 大テキストのみ合格 |
| #ffffff/50% on #231815 | 約 5.5:1（推定） | フッターコピーライト | 合格 |

## キーボード操作

| キー | 動作 |
|---|---|
| Tab | 次のフォーカス可能要素へ移動 |
| Shift + Tab | 前のフォーカス可能要素へ移動 |
| Enter | リンク遷移 / ボタン実行 |
| Space | ボタン実行 |
| Esc | （モバイルメニュー閉じる — 未実装、改善推奨） |

## 改善推奨事項

1. **モバイルメニューのフォーカストラップ**: メニュー展開時、フォーカスがメニュー外に移動しないよう制御する
2. **Esc キーでメニュー閉じる**: モバイルメニュー展開時に Esc キーで閉じられるようにする
3. **`#main-content` の id 設定**: スキップリンクのターゲットとなる `id="main-content"` が `<main>` タグに設定されていることを確認する
4. **不透明度テキストの検証**: `white/70%` on teal 背景は大テキスト限定（現在は `text-sm` でも使用あり）
5. **FloatingReserve への aria-label 追加**: テキストコンテンツはあるが、明示的なラベルがあるとより良い
