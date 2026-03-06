# teal. サイト改善プラン

## ステータス凡例

| マーク | 意味 |
|--------|------|
| ✅ | 対応完了 |
| 🔲 | 未対応 |
| ⏳ | オーナー対応待ち |
| ⚠️ | 一部対応済み・要追加修正 |

## 確認環境
- PC表示（1504×817）
- モバイル表示（390×844）
- NEWS一覧 → 詳細ページの遷移

---

## P0：リリース前に必ず対応（クリティカル）

| # | 項目 | 状態 |
|---|------|------|
| 1 | Hero セクションの背景画像設定 | ✅ |
| 2 | ページタイトル（title タグ）の重複修正 | ✅ |
| 3 | スタイル写真・スタッフ写真のプレースホルダー差し替え | ⏳ |
| 4 | NEWS一覧とトップページの表示データの不一致 | ✅ |
| 5 | Google Maps のピン位置の精度確認 | ✅ |
| 6 | SNSセクション・フッターからXアイコンを削除 | ✅ |

### 1. ✅ Hero セクションの背景画像設定
- **対応済み**: ホットペッパービューティーの暫定画像を背景に設定。暗めのオーバーレイで白ロゴとの視認性を確保
- **残作業**: オーナーから正式な高解像度写真が届き次第差し替え
- **暫定画像URL**: https://imgbp.hotp.jp/CSP/IMG_SRC/79/17/B252057917/B252057917.jpg?impolicy=HPB_policy_default&w=666&h=500

### 2. ✅ ページタイトル（title タグ）の重複修正
- **対応済み**: `NEWS | teal.` の形式に統一。全ページで重複なし

### 3. ⏳ スタイル写真・スタッフ写真のプレースホルダー差し替え
- **暫定対応**: スタッフ（橋本さん）のプロフィール写真にホットペッパービューティーの画像を暫定設定済み（`imgbp.hotp.jp` ドメインを `next.config.ts` に追加）
- **現状**: STYLEセクションの6枚はプレースホルダーのまま
- **対応者**: 正式な写真素材はオーナー（橋本さん）に依頼 → 届き次第 microCMS にアップロード

### 4. ✅ NEWS一覧とトップページの表示データの不一致
- **対応済み**: トップページとNEWS一覧で同じデータソース（microCMS）を参照するよう統一

### 5. ✅ Google Maps のピン位置の精度確認
- **対応済み**: 緯度経度ベース（35.4424, 139.6508）のURLに修正し、正確なピン位置を表示するように改善

### 6. ✅ SNSセクション・フッターからXアイコンを削除
- **対応済み**: Instagramのみに統一。ヘッダー、フッター、モバイルメニューすべてからX削除済み

---

## P1：品質向上（公開後早期に対応）

| # | 項目 | 状態 |
|---|------|------|
| 7 | SEO 対策の強化 | ✅ |
| 8 | パフォーマンス最適化 | ✅ |
| 9 | アクセシビリティ改善 | ✅ |
| 10 | STAFF 一覧ページの新規作成 | ✅ |
| 11 | ナビゲーションに「ACCESS」を追加 | ✅ |
| 12 | ページネーションの実装確認 | ✅ |
| 23 | ヘッダー・フッターのロゴをSVGに差し替え | ✅ |
| 24 | OG画像のURLが localhost になっている | ✅ |

### 7. ✅ SEO 対策の強化
- **対応済み**: meta description、OGP画像、JSON-LD（HairSalon スキーマ）、canonical URL を設定済み
- **追加対応**: sitemap.xml に `/staff` 一覧・詳細ページを追加。robots.txt 正常生成を確認。全URLを `NEXT_PUBLIC_SITE_URL` 環境変数で管理するよう統一

### 8. ✅ パフォーマンス最適化
- **対応済み**: Next.js `<Image>` コンポーネントによる遅延読み込み、next/font による Google Fonts 最適化
- **補足**: Lighthouse での最終スコア確認を推奨

### 9. ✅ アクセシビリティ改善
- **対応済み**: alt テキスト、aria-label、フォーカスアウトライン等を実装
- **補足**: Lighthouse Accessibility スコアでの最終確認を推奨

### 10. ✅ STAFF 一覧ページの新規作成
- **対応済み**: `/staff` にパンくずリスト付きの一覧ページを作成。ヘッダーナビの「STAFF」リンクも一覧ページに変更済み

### 11. ✅ ナビゲーションに「ACCESS」を追加
- **対応済み**: ヘッダー、モバイルメニュー、フッターすべてに ACCESS リンク追加済み

### 12. ✅ ページネーションの実装確認
- **対応済み**: NEWS（10件/ページ）、STYLE（12件/ページ）、BLOG（9件/ページ）すべてでページネーション実装を確認。searchParams の型、offset計算、ページネーションUI が正しく動作

### 23. ✅ ヘッダー・フッターのロゴをSVGに差し替え
- **対応済み**: ヘッダーに `teal_t.svg`（ティールカラー版）、フッターに `teal_w.svg`（ホワイト版）を next/image で配置。モバイルメニュー内のロゴも同様に差し替え済み

### 24. ✅ OG画像のURLが localhost になっている
- **対応済み**: `metadataBase` を `NEXT_PUBLIC_SITE_URL` 環境変数で設定するよう修正。layout.tsx、sitemap.ts、robots.ts、page.tsx のすべてのURL参照を環境変数化

---

## P2：デザイン・UX向上（余裕があれば対応）

| # | 項目 | 状態 |
|---|------|------|
| 13 | スクロールアニメーション | ✅ |
| 14 | 「トップに戻る」ボタンの追加 | ✅ |
| 15 | RESERVE ボタンのフローティング化（モバイル） | ✅ |
| 16 | ローディング / ページ遷移のアニメーション | ✅ |
| 17 | ダークモード対応 | 🔲 |
| 18 | Instagram投稿の埋め込み表示 | ✅ |
| 25 | モバイルのSTYLEセクションを2カラム化 | ✅ |
| 26 | カスタム404ページの作成 | ✅ |
| 27 | モバイルフッターのナビリンク折り返し | ✅ |
| 28 | Instagram埋め込みの表示サイズ最適化 | ✅ |
| 29 | ヘッダーロゴのサイズ拡大 | ✅ |
| 30 | MENUセクションの「VIEW ALL MENU」を予約導線に変更 | ✅ |
| 31 | ティールカラー（ブランドカラー）の差し色強化 | ✅ |
| 32 | ヘッダーナビのスムーズスクロール対応 | ✅ |
| 33 | アニメーションの品質向上（引き算の美学） | ✅ |
| 34 | Lenis + GSAP ScrollTrigger 導入（スクロール体験の改善） | 🔲 |
| 35 | ヘッダーSTAFFリンクをセクションスクロールに修正 | ✅ |
| 36 | トップページにBLOGセクションを追加 | ✅ |
| 37 | Instagram動画投稿のクリック不能問題の修正 | ✅ |
| 38 | トップページのセクション並び順をナビと統一 + 背景色リズム改善 | ✅ |
| 39 | ホバーエフェクトの統一（NEWS一覧・STYLE・BLOGカード） | ✅ |
| 40 | STYLEギャラリーのホバーを画像拡大+ティールボーダーに改善 | ✅ |
| 41 | Instagram画像にティールカラーの透過ボーダーを追加 | ✅ |
| 42 | トップページBLOGセクションに画像を表示 | ✅ |
| 43 | ブログにタグ機能を追加（タグ付け+タグ絞り込み） | ✅ |
| 44 | ブログ詳細ページにタグ表示を追加 | ✅ |

### 13. ✅ スクロールアニメーション
- **対応済み**: framer-motion を使用し、各セクションにフェードイン / スライドインアニメーションを実装

### 14. ✅ 「トップに戻る」ボタンの追加
- **対応済み**: モバイル表示時の位置を `bottom-28` に調整し、フローティングRESERVEバーとの重なりを解消

### 15. ✅ RESERVE ボタンのフローティング化（モバイル）
- **対応済み**: 画面下部に「ご予約はこちら / RESERVE」の固定バーを表示

### 16. ✅ ローディング / ページ遷移のアニメーション
- **対応済み**: framer-motion の template.tsx で opacity fade + Y軸スライド（8px）のスムーズなページ遷移を実装

### 17. 🔲 ダークモード対応
- ブランドカラー（ティール）と相性の良いダークモード
- `prefers-color-scheme` メディアクエリで自動切り替え
- 優先度は低いが、モダンなサイトとしての差別化に

### 18. ✅ Instagram投稿の埋め込み表示
- **対応済み**: Instagram公式 embed.js を使い、最新6投稿を `blockquote` + `useEffect` で動的埋め込み表示。グリッドレイアウト（モバイル2列、tablet以上3列）、aspect-square で統一
- **埋め込み投稿**: DS1yxDICTBe, DSBzQ3kCZIA, CyfqhGcvsuc, BmsrHENgAP4, BmnqJAWg_Ce, BkSVzyHgBia
- **フォールバック**: embed.js 読み込み失敗時はプロフィールへのリンクカードを表示
- **フッター・フォローボタン**: `https://www.instagram.com/hashimoto514yokohama` に設定済み

### 25. ✅ モバイルのSTYLEセクションを2カラム化
- **対応済み**: トップページのSTYLEグリッドを `grid-cols-2` に変更。モバイルでも2カラム表示でスクロール距離を短縮

### 26. ✅ カスタム404ページの作成
- **対応済み**: `app/not-found.tsx` を作成。teal_t.svg ロゴ、404表示、「ページが見つかりませんでした」メッセージ、TOP PAGEボタンをブランドデザインに合わせて実装

### 27. ✅ モバイルフッターのナビリンク折り返し
- **対応済み**: モバイル表示時にナビリンクを `grid-cols-3` の3列×2行グリッドに変更。PC表示時はflex横並びを維持

### 28. ✅ Instagram埋め込みの表示サイズ最適化
- **対応済み**: embed.js 方式を維持しつつ、`aspect-square` + `overflow-hidden` コンテナとネガティブマージン（`-mt-[54px]`）で写真部分のみ表示。プロフィールヘッダー・キャプション・いいね数を非表示にしてコンパクト化。embed.js 読み込み失敗時はグラデーション背景のフォールバックカードを表示

### 29. ✅ ヘッダーロゴのサイズ拡大
- **対応済み**: ヘッダーロゴを `h-8`（32px）→ `h-10`（40px）に拡大。PCヘッダー・モバイルメニュー両方に適用

### 30. ✅ MENUセクションの「VIEW ALL MENU」を予約導線に変更
- **対応済み**: 「VIEW ALL MENU」ボタンを「RESERVE」ボタンに変更し、ホットペッパービューティーの予約ページへ誘導。bg-teal-primary + text-white のスタイルで目立つデザインに。Linkインポートを削除してaタグに変更

### 31. ✅ ティールカラー（ブランドカラー）の差し色強化
- **対応済み**: 以下の箇所にteal-primaryの差し色を追加・強化
  - セクション見出しアンダーライン: h-px w-12 → h-0.5 w-16（太く・幅広に）
  - NEWSリスト: ホバー時に左ボーダー（border-l-2 border-teal-primary）追加
  - STYLEカード: ホバー時にtealリング（ring-2 ring-teal-primary/30）追加
  - MENUカテゴリカード: ホバー時にtealボーダー（hover:border-teal-primary/40）追加

### 32. ✅ ヘッダーナビのスムーズスクロール対応
- **対応済み**: usePathname で現在のパスを検出し、トップページ（pathname === "/"）でハッシュリンクをクリックした際はスムーズスクロールで移動。ヘッダー高さ（64px）のオフセットを考慮。モバイルメニューでもスムーズスクロール後にメニューを自動で閉じる

### 33. ✅ アニメーションの品質向上（引き算の美学）
- **対応済み**: 「シンプル・上品・ゆったり」なアニメーションに改善
  - Hero段階的フェードイン: ロゴ→テキスト→ボタン→スクロール示唆の順で `opacity: 0→1` + `y: 12→0`（`components/HeroContent.tsx`）
  - セクション装飾ラインアニメーション: `width: 0→64px` でスクロールインビュー時に伸びる（`components/AnimatedLine.tsx`）。NEWS、STYLE、SNS セクションに適用
  - NEWSリストスタガーアニメーション: 各アイテム `opacity: 0→1` + `y: 16→0`、stagger 0.06s（`components/NewsListAnimated.tsx`）
  - STYLEギャラリースタガーアニメーション: 6枚のグリッドアイテムに stagger 0.08s（`components/StyleGridAnimated.tsx`）
  - STYLEホバーエフェクト改善: `group-hover:opacity-90 group-hover:-translate-y-1 group-hover:shadow-lg` で微かに浮き上がる上品なエフェクト
  - イージング統一: 全体を `cubicBezier(0.16, 1, 0.3, 1)` に統一（ScrollAnimation、template.tsx、新規コンポーネント全て）

### 34. 🔲 Lenis + GSAP ScrollTrigger 導入（スクロール体験の改善）
- **目的**: スクロール自体を柔らかくし、スクロール連動アニメーションでより自然な表示演出を実現
- **導入ライブラリ**:
  - `lenis`（13.1K stars, ~2KB gzip）— 慣性スクロール（ぬるっとした手触り）
  - `gsap` + `@gsap/react`（22.5K stars）— ScrollTrigger によるスクロール連動アニメーション
- **改善内容**:
  - (a) Lenis によるスムーズスクロール導入（lerp: 0.1 程度の柔らかい慣性）
  - (b) 既存の framer-motion `useInView` ベースのスクロールアニメーションを GSAP ScrollTrigger に置き換え（ScrollAnimation、NewsListAnimated、StyleGridAnimated、AnimatedLine）
  - (c) framer-motion は Hero ページロードアニメーション（HeroContent.tsx）とページ遷移（template.tsx）のみに残す
- **方針**: 派手にしない。柔らかく自然な動きを追求

### 35. ✅ ヘッダーSTAFFリンクをセクションスクロールに修正
- **対応済み**: `components/Header.tsx` の navLinks で STAFF の href を `/staff` → `/#staff` に変更。トップページのSTAFFセクションにスムーズスクロールするように修正

### 36. ✅ トップページにBLOGセクションを追加
- **対応済み**: `app/page.tsx` にBLOGセクションを新規追加（STYLEとMENUの間に配置）。`getNewsList(3, 0, "category[equals]blog")` でブログ記事を取得し、カード形式（border + hover効果）で表示。セクションヘッダー（ScrollAnimation + AnimatedLine）、READ MOREボタン付き

### 37. ✅ Instagram動画投稿のクリック不能問題の修正
- **対応済み**: `components/SnsSection.tsx` の embed 表示時の各投稿コンテナに透明リンクオーバーレイ（`<a className="absolute inset-0 z-10">`）を追加。動画投稿を含む全投稿がクリックで元のInstagram投稿に遷移可能に

### 38. ✅ トップページのセクション並び順をナビと統一 + 背景色リズム改善
- **対応済み**: BLOGセクションをMENU・STAFFの後（SNSの前）に移動し、ナビ順（NEWS→STYLE→MENU→STAFF→BLOG→ACCESS）と完全一致。BLOGの背景色を `bg-white` → `bg-teal-primary/5` に変更し、白→薄ティール→白→ティール→薄ティール→白→白のリズムに改善

### 39. ✅ ホバーエフェクトの統一（NEWS一覧・STYLE・BLOGカード）
- **対応済み**: NEWSリストの `hover:pl-3 hover:border-l-2` を削除し `hover:bg-teal-primary/5` の背景色変化に変更。全セクション共通で「テキストがteal-primaryに変わる」+「背景色/ボーダーがtealに変わる」で統一

### 40. ✅ STYLEギャラリーのホバーを画像拡大+ティールボーダーに改善
- **対応済み**: `StyleGridAnimated.tsx` で画像に `group-hover:scale-105` による拡大エフェクト + カード全体に `border-2 border-transparent hover:border-teal-primary` でティールボーダー表示に変更

### 41. ✅ Instagram画像にティールカラーの透過ボーダーを追加
- **対応済み**: `SnsSection.tsx` の embed/fallback両方のコンテナに `border border-teal-primary/20` を追加

### 42. ✅ トップページBLOGセクションに画像を表示
- **対応済み**: `app/page.tsx` のBLOGカードにアイキャッチ画像を追加（aspect-video + Image + hover:scale-105）。ダミーデータに placehold.jp のティールカラー背景プレースホルダー画像を設定

### 43. ✅ ブログにタグ機能を追加（タグ付け+タグ絞り込み）
- **対応済み**: News型に `tags?: string[]` 追加、ダミーデータにタグ設定（ヘアカラー、トレンド、ヘアケア、パーマ・縮毛矯正）、ブログ一覧にタグフィルターUI追加（ALL/各タグボタン）、各カードにタグ表示追加、ページネーションでタグ引き継ぎ対応

### 44. ✅ ブログ詳細ページにタグ表示を追加
- **対応済み**: `app/blog/[slug]/page.tsx` の日付表示の下・タイトルの上にタグバッジを追加。クリックで `/blog?tag=タグ名` に遷移。スタイルはブログ一覧と統一（teal-primaryカラー、hover時に背景色変化）

---

## P3：コンテンツ（オーナー側の対応タスク）

| # | 項目 | 状態 |
|---|------|------|
| 19 | 写真素材の準備 | ⏳ |
| 20 | テキストコンテンツの準備 | ⏳ |
| 21 | SNSアカウント情報 | ✅ |
| 22 | ドメイン取得 | ⏳ |

### 19. ⏳ 写真素材の準備
- [ ] サロン内装写真（Hero用、高解像度）
- [ ] スタイル写真（最低6枚以上、カテゴリごと）
- [ ] スタッフ写真（橋本さんのプロフィール写真）
- [ ] 施術中・仕上がりのビフォーアフター写真

### 20. ⏳ テキストコンテンツの準備
- [ ] 橋本さんの自己紹介文（経歴・得意なスタイル・メッセージ）
- [ ] サロンのコンセプト文（こだわり・想い）
- [ ] 各メニューの説明文（どんな施術か、おすすめポイント）

### 21. ✅ SNSアカウント情報
- [x] Instagram アカウントURL: `https://www.instagram.com/hashimoto514yokohama`（設定済み）
- ※ X（Twitter）は未運用のためサイトから削除済み

### 22. ⏳ ドメイン取得
- [ ] 独自ドメインの候補選定（例: teal-salon.com、teal-hair.jp 等）
- [ ] ドメイン取得・DNS設定
- [ ] Vercelでのカスタムドメイン設定

### 45. ✅ デザインPolish Phase2 — #40/#41/#42 対応

**対応日:** 2026-03-07 / ブランチ: `feat/design-polish-phase2`

#### #42 背景色のクリームホワイト化
- `app/globals.css` の `@theme` に `--color-background: #fafaf8` を追加
- `app/layout.tsx` の body に `bg-background` クラスを適用
- 各セクションの `bg-white` はそのまま維持し、白セクションとのリズムを保持

#### #40 Cormorant Garamond（font-accent）の積極活用
- `components/SectionHeading.tsx` の h2 を `font-serif font-medium` → `font-accent font-normal` に変更（NEWS/STYLE/MENU/STAFF/BLOG/SNS/FAQ 全セクション共通）
- `components/AccessSection.tsx` の ACCESS h2 を `font-bold` → `font-accent font-normal` に変更
- `app/menu/page.tsx` のカテゴリ h2（CUT/COLOR等）を `font-bold` → `font-accent font-normal` に変更

#### #41 prefers-reduced-motion 対応の漏れ修正
- `components/NewsListAnimated.tsx`: `useReducedMotion` を追加し、true 時は `y: 0` の初期値に（opacity のみアニメーション）
- `components/AnimatedLine.tsx`: `useReducedMotion` を追加し、true 時は `initial: { width: 64 }`（アニメーションなしで即時表示）
- `app/template.tsx`: `useReducedMotion` を追加し、true 時は `initial: { opacity: 1, y: 0 }`（ページ遷移アニメーションをスキップ）

---

## 対応サマリー

| 優先度 | 合計 | ✅完了 | ⚠️一部 | 🔲未対応 | ⏳待ち |
|--------|------|--------|--------|----------|--------|
| P0 | 6 | 5 | 0 | 0 | 1 |
| P1 | 8 | 8 | 0 | 0 | 0 |
| P2 | 29 | 27 | 0 | 2 | 0 |
| P3 | 4 | 1 | 0 | 0 | 3 |
| **合計** | **47** | **41** | **0** | **2** | **4** |

## 対応スケジュール目安

| フェーズ | 内容 | 目安 |
|---------|------|------|
| Phase 1 | P0（クリティカル）+ 写真素材入れ | 1〜2日 |
| Phase 2 | P1（SEO・パフォーマンス・アクセシビリティ） | 2〜3日 |
| Phase 3 | P2（アニメーション・UX向上） | 3〜5日 |
| Phase 4 | P3（コンテンツ充実）+ ドメイン設定 + 公開 | 随時 |

---

*作成日: 2026年3月4日*
*最終更新: 2026年3月7日（#40/#41/#42 デザインPolish Phase2 対応完了）*
*このファイルを GitHub リポジトリの `docs/` に配置し、Claude Code で参照しながら改善を進めることを推奨*
