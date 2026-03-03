import type { Metadata } from "next";
import Link from "next/link";
import MenuSection from "@/components/MenuSection";
import StaffSection from "@/components/StaffSection";
import SnsSection from "@/components/SnsSection";
import AccessSection from "@/components/AccessSection";

export const metadata: Metadata = {
  title: "teal. | 横浜元町の美容院",
  description:
    "横浜元町の美容院 teal.（ティール）。カット、カラー、パーマ、トリートメントなど、お客様一人ひとりに寄り添った施術をご提供します。",
  alternates: {
    canonical: "https://teal-website.vercel.app",
  },
};

// LocalBusiness 構造化データ
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: "teal.",
  description:
    "横浜元町の美容院 teal.（ティール）。カット、カラー、パーマ、トリートメントなど、お客様一人ひとりに寄り添った施術をご提供します。",
  url: "https://teal-website.vercel.app",
  telephone: "",
  address: {
    "@type": "PostalAddress",
    streetAddress: "元町3-131-1 グローバル横浜元町4F",
    addressLocality: "横浜市中区",
    addressRegion: "神奈川県",
    postalCode: "231-0861",
    addressCountry: "JP",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 35.4438,
    longitude: 139.6422,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    },
  ],
  priceRange: "¥¥",
  sameAs: [],
};

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
    <>
      {/* LocalBusiness 構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <main>
      {/* Hero セクション */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* 背景グラデーション（ティール系） */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#006666] to-[#008080]" />

        {/* コンテンツ */}
        <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center text-white">
          <h1 className="text-7xl font-bold tracking-widest text-white lg:text-9xl">
            teal.
          </h1>
          <p className="text-xs font-light tracking-[0.4em] text-white/80">
            hair salon / yokohama motomachi
          </p>
          <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row">
            <a
              href="https://beauty.hotpepper.jp/slnH000784195/"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white px-10 py-3 text-xs font-medium tracking-[0.3em] text-white transition-colors hover:bg-white hover:text-teal-primary"
            >
              RESERVE
            </a>
            <Link
              href="#news"
              className="px-10 py-3 text-xs font-medium tracking-[0.3em] text-white/70 transition-colors hover:text-white"
            >
              SCROLL DOWN
            </Link>
          </div>
        </div>

        {/* 下部スクロール示唆 */}
        <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
          <div className="h-12 w-px animate-pulse bg-white/50" />
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
              className="border border-teal-primary px-12 py-3 text-xs font-medium tracking-[0.3em] text-teal-primary transition-colors hover:bg-teal-primary hover:text-white"
            >
              READ MORE
            </Link>
          </div>
        </div>
      </section>

      {/* STYLE セクション */}
      <section id="style" className="bg-teal-primary/5 py-24">
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

          {/* スタイルグリッド（PC:3列×2行、tablet:2列×3行、SP:1列） */}
          <div className="grid grid-cols-1 gap-6 tablet:grid-cols-2 lg:grid-cols-3">
            {dummyStyles.map((style) => (
              <Link
                key={style.id}
                href={`/style/${style.id}`}
                className="group block overflow-hidden"
              >
                {/* プレースホルダー画像 */}
                <div className="aspect-square w-full bg-gray-200 transition-opacity duration-300 group-hover:opacity-80" />
                {/* スタイル情報 */}
                <div className="mt-3 flex flex-col gap-1">
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
              className="border border-teal-primary px-12 py-3 text-xs font-medium tracking-[0.3em] text-teal-primary transition-colors hover:bg-teal-primary hover:text-white"
            >
              READ MORE
            </Link>
          </div>
        </div>
      </section>

      <MenuSection />
      <StaffSection />
      <SnsSection />
      <AccessSection />
    </main>
    </>
  );
}
