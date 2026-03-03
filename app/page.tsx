import Link from "next/link";

// ダミーデータ（microCMS 未接続時）
const dummyNews = [
  {
    id: "1",
    date: "2026.02.20",
    title: "春のキャンペーンのお知らせ",
    excerpt:
      "3月・4月限定でカラーとトリートメントのセットメニューをご用意しました。ぜひこの機会にご利用ください。",
  },
  {
    id: "2",
    date: "2026.02.10",
    title: "スタッフ紹介を更新しました",
    excerpt:
      "新しいスタッフが加わりました。各スタッフのプロフィールをぜひご覧ください。",
  },
  {
    id: "3",
    date: "2026.01.25",
    title: "2月の定休日について",
    excerpt:
      "2月の定休日・営業時間変更についてお知らせします。ご来店の際は事前にご確認ください。",
  },
  {
    id: "4",
    date: "2026.01.15",
    title: "新メニュー「ケアカラー」登場",
    excerpt:
      "髪へのダメージを最小限に抑えた新しいカラーメニューをご用意しました。",
  },
  {
    id: "5",
    date: "2025.12.20",
    title: "年末年始の営業について",
    excerpt:
      "年末年始の営業時間・休業日についてお知らせします。ご予約はお早めにどうぞ。",
  },
  {
    id: "6",
    date: "2025.12.01",
    title: "冬のヘアケアセミナー開催",
    excerpt:
      "乾燥しやすい冬の季節に向けたヘアケアセミナーを開催します。参加無料です。",
  },
];

const dummyStyles = [
  { id: "1", name: "ナチュラルウェーブ", category: "パーマ" },
  { id: "2", name: "アッシュベージュ", category: "カラー" },
  { id: "3", name: "ショートボブ", category: "カット" },
  { id: "4", name: "ハイライトカラー", category: "カラー" },
  { id: "5", name: "ゆるふわパーマ", category: "パーマ" },
  { id: "6", name: "インナーカラー", category: "カラー" },
];

export default function Home() {
  return (
    <main>
      {/* Hero セクション */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-dark-text">
        {/* 背景グラデーション */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-text via-[#3a2e2b] to-[#1a2a2a]" />

        {/* 装飾ライン */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="h-[600px] w-[600px] rounded-full border border-white" />
          <div className="absolute h-[400px] w-[400px] rounded-full border border-white" />
        </div>

        {/* コンテンツ */}
        <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center text-white">
          <p className="text-xs font-light tracking-[0.4em] text-white/60">
            HAIR SALON IN YOKOHAMA MOTOMACHI
          </p>
          <h1 className="text-7xl font-bold tracking-widest text-white lg:text-9xl">
            teal.
          </h1>
          <p className="text-sm font-light tracking-widest text-white/70">
            あなたらしい美しさを、ともに。
          </p>
          <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row">
            <a
              href="https://beauty.hotpepper.jp/slnH000784195/"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white px-10 py-3 text-xs font-medium tracking-[0.3em] text-white transition-colors hover:bg-white hover:text-dark-text"
            >
              RESERVE
            </a>
            <Link
              href="#news"
              className="px-10 py-3 text-xs font-medium tracking-[0.3em] text-white/60 transition-colors hover:text-white"
            >
              SCROLL DOWN
            </Link>
          </div>
        </div>

        {/* 下部スクロール示唆 */}
        <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
          <div className="h-12 w-px animate-pulse bg-white/30" />
        </div>
      </section>

      {/* NEWS セクション */}
      <section id="news" className="bg-white py-24">
        <div className="mx-auto max-w-screen-xl px-6">
          {/* セクションヘッダー */}
          <div className="mb-16 flex flex-col items-center gap-3">
            <h2 className="text-3xl font-bold tracking-[0.2em] text-dark-text lg:text-4xl">
              NEWS
            </h2>
            <p className="text-sm tracking-widest text-dark-text/50">
              お知らせ
            </p>
            <div className="mt-2 h-px w-12 bg-teal-primary" />
          </div>

          {/* ニュースリスト */}
          <ul className="divide-y divide-dark-text/10">
            {dummyNews.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/news/${item.id}`}
                  className="group flex flex-col gap-2 py-6 transition-colors hover:text-teal-primary tablet:flex-row tablet:items-start tablet:gap-8"
                >
                  <time className="shrink-0 text-xs tracking-widest text-dark-text/50 tablet:w-28 tablet:pt-0.5">
                    {item.date}
                  </time>
                  <div className="flex flex-col gap-1">
                    <p className="font-medium leading-relaxed text-dark-text transition-colors group-hover:text-teal-primary">
                      {item.title}
                    </p>
                    <p className="text-sm leading-relaxed text-dark-text/60">
                      {item.excerpt}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {/* READ MORE ボタン */}
          <div className="mt-16 flex justify-center">
            <Link
              href="/news"
              className="border border-dark-text px-12 py-3 text-xs font-medium tracking-[0.3em] text-dark-text transition-colors hover:bg-dark-text hover:text-white"
            >
              READ MORE
            </Link>
          </div>
        </div>
      </section>

      {/* STYLE セクション */}
      <section id="style" className="bg-[#f8f6f4] py-24">
        <div className="mx-auto max-w-screen-xl px-6">
          {/* セクションヘッダー */}
          <div className="mb-16 flex flex-col items-center gap-3">
            <h2 className="text-3xl font-bold tracking-[0.2em] text-dark-text lg:text-4xl">
              STYLE
            </h2>
            <p className="text-sm tracking-widest text-dark-text/50">
              スタイルギャラリー
            </p>
            <div className="mt-2 h-px w-12 bg-teal-primary" />
          </div>

          {/* スタイルグリッド（3×2） */}
          <div className="grid grid-cols-2 gap-4 tablet:grid-cols-3 lg:gap-6">
            {dummyStyles.map((style) => (
              <Link
                key={style.id}
                href={`/style/${style.id}`}
                className="group block overflow-hidden"
              >
                {/* プレースホルダー画像 */}
                <div className="relative aspect-[3/4] overflow-hidden bg-dark-text/10">
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-dark-text/5 to-teal-primary/10 transition-transform duration-500 group-hover:scale-105">
                    <div className="h-16 w-16 rounded-full border border-dark-text/20" />
                    <span className="text-xs tracking-widest text-dark-text/30">
                      PHOTO
                    </span>
                  </div>
                  {/* ホバーオーバーレイ */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-dark-text/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="text-xs font-medium tracking-[0.3em] text-white">
                      VIEW
                    </span>
                  </div>
                </div>
                {/* スタイル情報 */}
                <div className="mt-3 flex flex-col gap-1 px-1">
                  <p className="text-xs tracking-widest text-teal-primary">
                    {style.category}
                  </p>
                  <p className="text-sm font-medium text-dark-text">
                    {style.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* READ MORE ボタン */}
          <div className="mt-16 flex justify-center">
            <Link
              href="/style"
              className="border border-dark-text px-12 py-3 text-xs font-medium tracking-[0.3em] text-dark-text transition-colors hover:bg-dark-text hover:text-white"
            >
              READ MORE
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
