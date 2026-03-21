# slug → id 移行（microCMS コンテンツID直接使用）

## ブランチ名

`refactor/slug-to-id`

## 概要

microCMS の自動生成 `id` を URL パラメータとして使用するように変更する。
これまで独自の `slug` フィールドで管理していたが、運用負荷軽減のため microCMS のコンテンツ ID をそのまま使う方式に移行する。

## 背景

- microCMS のコンテンツには自動で `id`（ランダム文字列）が付与される
- `slug` は毎回手入力が必要で、スマホからの運用でストレスになる
- 小規模サロンサイトでは slug による SEO メリットはほぼない
- コード側の型定義 `MicroCMSBase` に `id: string` は既に含まれている

## 実装手順

### 1. 型定義の変更 (`lib/types.ts`)

3つの型から `slug: string` を削除する:

- `News` から `slug: string;` を削除
- `Style` から `slug: string;` を削除
- `Staff` から `slug: string;` を削除

> `id` は `MicroCMSBase` に既に定義されているので追加不要。

### 2. ダミーデータの変更 (`lib/dummy-data.ts`)

- 全ダミーデータの `slug: "xxx"` プロパティを削除
- `id` プロパティは既に存在するはずだが、なければ追加する

### 3. API 取得関数の変更 (`lib/microcms.ts`)

#### 詳細取得関数（`getNewsDetail`, `getStyleDetail`, `getStaffDetail`）

引数名を `slug` → `id` に変更し、取得方法を変更する:

**変更前（slug でフィルタ検索）:**
```typescript
export async function getNewsDetail(slug: string): Promise<News> {
  // ...
  const res = await client.getList<News>({
    endpoint: "news",
    queries: { filters: `slug[equals]${slug}`, limit: 1 },
  });
```

**変更後（id で直接取得）:**
```typescript
export async function getNewsDetail(id: string): Promise<News> {
  // ...
  const res = await client.getListDetail<News>({
    endpoint: "news",
    contentId: id,
  });
```

- `getList` + `filters: slug[equals]` → `getListDetail` + `contentId` に変更
- 戻り値が直接コンテンツオブジェクト（配列ではない）になるので `res.contents[0]` のアクセスは不要
- ダミーデータのフォールバックも `n.slug === slug` → `n.id === id` に変更
- 3つの詳細取得関数すべてに同じ変更を適用

### 4. ディレクトリリネーム

以下の動的ルートディレクトリを `[slug]` → `[id]` にリネーム:

```bash
mv app/news/[slug] app/news/[id]
mv app/blog/[slug] app/blog/[id]
mv app/style/[slug] app/style/[id]
mv app/staff/[slug] app/staff/[id]
```

### 5. 詳細ページの変更（4ファイル）

`app/news/[id]/page.tsx`, `app/blog/[id]/page.tsx`, `app/style/[id]/page.tsx`, `app/staff/[id]/page.tsx`:

- `params.slug` → `params.id` に変更
- `generateStaticParams` の戻り値: `{ slug: item.slug }` → `{ id: item.id }` に変更
- `getNewsDetail(slug)` → `getNewsDetail(id)` 等の呼び出し引数を変更
- 前後記事リンク: `item.slug` → `item.id` に変更
- 同一記事の検索: `n.slug === slug` → `n.id === id` に変更

### 6. 一覧ページ・コンポーネントのリンク変更

以下のファイルで `.slug` → `.id` に変更:

- `app/news/page.tsx`: `href={/news/${item.slug}}` → `href={/news/${item.id}}`
- `app/blog/page.tsx`: `href={/blog/${item.slug}}` → `href={/blog/${item.id}}`
- `app/style/page.tsx`: `href={/style/${style.slug}}` → `href={/style/${style.id}}`
- `app/staff/page.tsx`: `href={/staff/${staff.slug}}` → `href={/staff/${staff.id}}`
- `app/page.tsx`: `href={/blog/${post.slug}}` → `href={/blog/${post.id}}`
- `components/NewsListAnimated.tsx`: `href={/news/${item.slug}}` → `href={/news/${item.id}}`
- `components/StyleGridAnimated.tsx`: `href={/style/${style.slug}}` → `href={/style/${style.id}}`
- `components/StaffCardAnimated.tsx`: `href={/staff/${staff.slug}}` → `href={/staff/${staff.id}}`
- `app/sitemap.ts`: 全4箇所の `.slug` → `.id`

### 7. ブログ一覧の eyecatch プレースホルダー追加

`app/blog/page.tsx` のサムネイル部分で、eyecatch がない場合にグレー背景のみで寂しいので、トップページと同じプレースホルダーを追加する:

**変更前:**
```tsx
{item.eyecatch && (
  <Image ... />
)}
```

**変更後:**
```tsx
{item.eyecatch ? (
  <Image ... />
) : (
  <div className="flex h-full w-full items-center justify-center bg-gray-200">
    <span className="text-xs text-dark-text/30">No Image</span>
  </div>
)}
```

### 8. excerpt 自動生成フォールバック

`excerpt` が未入力の場合に `content`（リッチエディタ HTML）からプレーンテキストを抽出して概要文として使用する。

#### 8-1. ユーティリティ関数を追加 (`lib/utils.ts` を新規作成、または既存ファイルに追加)

```typescript
/** HTML タグを除去してプレーンテキスト化し、指定文字数で切り詰める */
export function extractExcerpt(html: string, maxLength = 120): string {
  const text = html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "…";
}
```

#### 8-2. excerpt 表示箇所を変更

以下のファイルで `item.excerpt` の表示を変更する:

- `app/page.tsx`（トップページ BLOG カード）
- `app/news/page.tsx`（NEWS 一覧）
- `app/blog/page.tsx`（BLOG 一覧）
- `components/NewsListAnimated.tsx`（トップページ NEWS リスト）

**変更前:**
```tsx
{item.excerpt && (
  <p className="...">{item.excerpt}</p>
)}
```

**変更後:**
```tsx
<p className="...">{item.excerpt || extractExcerpt(item.content)}</p>
```

- `extractExcerpt` を各ファイルで import する
- `item.excerpt` がある場合はそちらを優先、なければ本文から自動抽出
- 条件分岐 `&&` を外して常に概要文を表示するようにする

#### 8-3. OGP description のフォールバック

`app/news/[id]/page.tsx` と `app/blog/[id]/page.tsx` の `generateMetadata` 内:

**変更前:**
```typescript
const description = item.excerpt ?? `横浜元町の美容院 teal. ...`;
```

**変更後:**
```typescript
const description = item.excerpt || extractExcerpt(item.content);
```

### 9. 動作確認

```bash
npm run build
```

ビルドが成功することを確認する。

## 既存コードとの整合性

- `MicroCMSBase` 型に `id: string` が定義済み。slug を消しても id は使える
- ダミーデータの `id` フィールドが既存のものと一致しているか確認すること
- `microcms-js-sdk` の `getListDetail` メソッドは `contentId` でコンテンツを直接取得できる（`getList` + filter より効率的）

## テスト方針

- `npm run build` が成功すること
- TypeScript の型エラーがないこと

## 手動テストチェックリスト

- [ ] トップページの NEWS / BLOG / STYLE リンクが正しく詳細ページに遷移する
- [ ] 各詳細ページで前後記事ナビゲーションが動作する
- [ ] サイトマップ (`/sitemap.xml`) に正しい URL が出力される
- [ ] 404 ページが正しく表示される（存在しない id でアクセス時）
- [ ] `npm run build` が成功する
