import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import MenuSection from "@/components/MenuSection";
import StaffSection from "@/components/StaffSection";
import SnsSection from "@/components/SnsSection";
import AccessSection from "@/components/AccessSection";
import ScrollAnimation from "@/components/ScrollAnimation";
import HeroContent from "@/components/HeroContent";
import NewsListAnimated from "@/components/NewsListAnimated";
import StyleGridAnimated from "@/components/StyleGridAnimated";
import AnimatedLine from "@/components/AnimatedLine";
import { getNewsList, getStyleList } from "@/lib/microcms";

export const metadata: Metadata = {
  title: "teal. | 横浜元町の美容院",
  description:
    "横浜元町の美容院 teal.（ティール）。カット、カラー、パーマ、トリートメントなど、お客様一人ひとりに寄り添った施術をご提供します。",
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://teal-website.vercel.app",
  },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://teal-website.vercel.app";

// LocalBusiness 構造化データ
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: "teal.",
  description:
    "横浜元町の美容院 teal.（ティール）。カット、カラー、パーマ、トリートメントなど、お客様一人ひとりに寄り添った施術をご提供します。",
  url: siteUrl,
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

export default async function Home() {
  const { contents: newsList } = await getNewsList(6, 0, "category[equals]news");
  const { contents: blogList } = await getNewsList(3, 0, "category[equals]blog");
  const { contents: styles } = await getStyleList(6, 0);
  return (
    <>
      {/* LocalBusiness 構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <main id="main-content">
      {/* Hero セクション */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* 背景画像 */}
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          className="object-cover"
          priority
          aria-hidden="true"
        />
        {/* オーバーレイ */}
        <div className="absolute inset-0 bg-black/60" />

        <HeroContent />
      </section>

      {/* NEWS セクション */}
      <section id="news" className="bg-white py-24">
        <div className="mx-auto max-w-screen-xl px-6">
          {/* セクションヘッダー */}
          <ScrollAnimation className="mb-16 flex flex-col items-center gap-3">
            <h2 className="text-3xl font-bold tracking-[0.2em] text-dark-text lg:text-4xl">
              NEWS
            </h2>
            <p className="text-sm tracking-widest text-dark-text/50">
              お知らせ
            </p>
            <AnimatedLine />
          </ScrollAnimation>

          {/* ニュースリスト */}
          <NewsListAnimated items={newsList} />

          {/* READ MORE ボタン */}
          <ScrollAnimation className="mt-16 flex justify-center" delay={0.1}>
            <Link
              href="/news"
              className="border border-teal-primary px-12 py-3 text-xs font-medium tracking-[0.3em] text-teal-primary transition-colors hover:bg-teal-primary hover:text-white"
            >
              READ MORE
            </Link>
          </ScrollAnimation>
        </div>
      </section>

      {/* STYLE セクション */}
      <section id="style" className="bg-teal-primary/5 py-24">
        <div className="mx-auto max-w-screen-xl px-6">
          {/* セクションヘッダー */}
          <ScrollAnimation className="mb-16 flex flex-col items-center gap-3">
            <h2 className="text-3xl font-bold tracking-[0.2em] text-dark-text lg:text-4xl">
              STYLE
            </h2>
            <p className="text-sm tracking-widest text-dark-text/50">
              スタイルギャラリー
            </p>
            <AnimatedLine />
          </ScrollAnimation>

          {/* スタイルグリッド（PC:3列×2行、tablet:2列×3行、SP:2列） */}
          <StyleGridAnimated styles={styles} />

          {/* READ MORE ボタン */}
          <ScrollAnimation className="mt-16 flex justify-center" delay={0.1}>
            <Link
              href="/style"
              className="border border-teal-primary px-12 py-3 text-xs font-medium tracking-[0.3em] text-teal-primary transition-colors hover:bg-teal-primary hover:text-white"
            >
              READ MORE
            </Link>
          </ScrollAnimation>
        </div>
      </section>

      <ScrollAnimation>
        <MenuSection />
      </ScrollAnimation>
      <ScrollAnimation>
        <StaffSection />
      </ScrollAnimation>

      {/* BLOG セクション */}
      <section id="blog" className="bg-teal-primary/5 py-24">
        <div className="mx-auto max-w-screen-xl px-6">
          <ScrollAnimation className="mb-16 flex flex-col items-center gap-3">
            <h2 className="text-3xl font-bold tracking-[0.2em] text-dark-text lg:text-4xl">
              BLOG
            </h2>
            <p className="text-sm tracking-widest text-dark-text/50">
              ブログ
            </p>
            <AnimatedLine />
          </ScrollAnimation>

          <div className="grid grid-cols-1 gap-6 tablet:grid-cols-2 lg:grid-cols-3">
            {blogList.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group border border-dark-text/10 p-6 transition-colors hover:border-teal-primary/40"
              >
                <time className="text-xs tracking-widest text-dark-text/50">
                  {new Date(post.publishedAt).toLocaleDateString("ja-JP", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </time>
                <p className="mt-2 font-medium leading-relaxed text-dark-text transition-colors group-hover:text-teal-primary">
                  {post.title}
                </p>
                {post.excerpt && (
                  <p className="mt-2 text-sm leading-relaxed text-dark-text/60 line-clamp-3">
                    {post.excerpt}
                  </p>
                )}
                <p className="mt-4 text-xs tracking-widest text-teal-primary">
                  READ MORE →
                </p>
              </Link>
            ))}
          </div>

          <ScrollAnimation className="mt-16 flex justify-center" delay={0.1}>
            <Link
              href="/blog"
              className="border border-teal-primary px-12 py-3 text-xs font-medium tracking-[0.3em] text-teal-primary transition-colors hover:bg-teal-primary hover:text-white"
            >
              READ MORE
            </Link>
          </ScrollAnimation>
        </div>
      </section>
      <ScrollAnimation>
        <SnsSection />
      </ScrollAnimation>
      <ScrollAnimation>
        <AccessSection />
      </ScrollAnimation>
    </main>
    </>
  );
}
