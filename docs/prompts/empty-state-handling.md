# コンテンツ0件時の空状態ハンドリング

## ブランチ名

`feat/empty-state`

## 概要

microCMS にコンテンツが未投入の状態でリリースした場合に、空のセクションが表示されないよう「コンテンツがありません」メッセージを表示し、READ MORE ボタンを非表示にする。

## 背景

- リリース直後は美容師（クライアント）がまだデータを入力できない状態が想定される
- 空のグリッドやリストが表示されると未完成な印象を与えてしまう
- データが入った段階で自動的に通常表示に切り替わるようにする

## 空メッセージのデザイン方針

- テキスト: `text-sm text-dark-text/40`
- 中央寄せ: `text-center py-12`
- メッセージ文言はセクションごとに適切なものを使う
- ダーク/teal 背景のセクション（STAFF）では `text-white/40` を使う

## 実装手順

### 1. トップページ (`app/page.tsx`)

#### STYLE セクション

`<StyleGridAnimated>` と READ MORE ボタンの部分を条件分岐する:

```tsx
{styles.length > 0 ? (
  <>
    <StyleGridAnimated styles={styles} />
    <ScrollAnimation className="mt-16 flex justify-center" delay={0.1}>
      <Button variant="secondary" href="/style">
        READ MORE
      </Button>
    </ScrollAnimation>
  </>
) : (
  <p className="py-12 text-center text-sm text-dark-text/40">
    スタイル写真は準備中です
  </p>
)}
```

#### NEWS セクション

```tsx
{newsList.length > 0 ? (
  <>
    <NewsListAnimated items={newsList} />
    <ScrollAnimation className="mt-16 flex justify-center" delay={0.1}>
      <Button variant="secondary" href="/news">
        READ MORE
      </Button>
    </ScrollAnimation>
  </>
) : (
  <p className="py-12 text-center text-sm text-dark-text/40">
    お知らせはまだありません
  </p>
)}
```

#### BLOG セクション

ブログカードの `grid` div と READ MORE ボタンを条件分岐する:

```tsx
{blogList.length > 0 ? (
  <>
    <div className="grid grid-cols-1 gap-6 tablet:grid-cols-2 lg:grid-cols-3">
      {blogList.map((post) => (
        ...既存のカード...
      ))}
    </div>
    <ScrollAnimation className="mt-16 flex justify-center" delay={0.1}>
      <Button variant="secondary" href="/blog">
        READ MORE
      </Button>
    </ScrollAnimation>
  </>
) : (
  <p className="py-12 text-center text-sm text-dark-text/40">
    ブログ記事は準備中です
  </p>
)}
```

### 2. StaffSection (`components/StaffSection.tsx`)

スタッフ一覧と READ MORE ボタンを条件分岐する:

```tsx
{staffList.length > 0 ? (
  <>
    <div className="flex flex-wrap justify-center gap-10">
      {staffList.map((staff, index) => (
        <StaffCardAnimated key={staff.id} staff={staff} index={index} />
      ))}
    </div>
    <div className="mt-16 flex justify-center">
      <Button variant="ghost-white" href="/staff">
        READ MORE
      </Button>
    </div>
  </>
) : (
  <p className="py-12 text-center text-sm text-white/40">
    スタッフ情報は準備中です
  </p>
)}
```

> 注意: STAFF セクションは `bg-teal-primary` 背景なので `text-white/40` を使うこと。

### 3. 一覧ページ（4ファイル）

`app/news/page.tsx`, `app/blog/page.tsx`, `app/style/page.tsx`, `app/staff/page.tsx`:

各ページで、コンテンツリストが0件の場合に空メッセージを表示する。既存のリスト/グリッド表示部分を条件分岐で囲む:

```tsx
{contents.length > 0 ? (
  <>
    ...既存のリスト/グリッド表示...
    ...ページネーション...
  </>
) : (
  <p className="py-12 text-center text-sm text-dark-text/40">
    （セクションに応じたメッセージ）
  </p>
)}
```

空メッセージの文言:
- `/news`: `お知らせはまだありません`
- `/blog`: `ブログ記事は準備中です`
- `/style`: `スタイル写真は準備中です`
- `/staff`: `スタッフ情報は準備中です`

### 4. 動作確認

```bash
npm run build
```

ビルドが成功することを確認する。

## テスト方針

- `npm run build` が成功すること

## 手動テストチェックリスト

- [ ] microCMS に接続した状態（コンテンツ0件）でトップページの各セクションに空メッセージが表示される
- [ ] 空メッセージが表示されているセクションで READ MORE ボタンが非表示になっている
- [ ] STAFF セクションの空メッセージが白文字で表示されている（teal 背景上）
- [ ] 一覧ページ（/news, /blog, /style, /staff）に空メッセージが表示される
- [ ] microCMS にデータを1件投入すると、通常表示に切り替わる（空メッセージが消える）
- [ ] `npm run build` が成功する
