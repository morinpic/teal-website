import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import MenuSection from "@/components/MenuSection";
import StaffSection from "@/components/StaffSection";
import SnsSection from "@/components/SnsSection";
import AccessSection from "@/components/AccessSection";
import ScrollAnimation from "@/components/ScrollAnimation";
import HeroContent from "@/components/HeroContent";
import HeroSlideshow from "@/components/HeroSlideshow";
import NewsListAnimated from "@/components/NewsListAnimated";
import StyleGridAnimated from "@/components/StyleGridAnimated";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import AboutSection from "@/components/AboutSection";
import FaqSection from "@/components/FaqSection";
import { getNewsList, getStyleList } from "@/lib/microcms";
import { extractExcerpt } from "@/lib/utils";

export const metadata: Metadata = {
  title: "teal. | 横浜元町の美容院",
  description:
    "横浜元町の美容院 teal.（ティール）。カット、カラー、パーマ、トリートメントなど、お客様一人ひとりに寄り添った施術をご提供します。",
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://teal-website.vercel.app",
  },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://teal-website.vercel.app";

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: "teal.",
  description:
    "横浜元町の美容院 teal.（ティール）。カット、カラー、パーマ、トリートメントなど、お客様一人ひとりに寄り添った施術をご提供します。",
  url: siteUrl,
  image: `${siteUrl}/ogp.jpg`,
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
    latitude: 35.4424,
    longitude: 139.6508,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "10:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday"],
      opens: "10:00",
      closes: "19:00",
    },
  ],
  priceRange: "¥¥",
  sameAs: [
    "https://www.instagram.com/hashimoto514yokohama",
    "https://beauty.hotpepper.jp/slnH000784195/",
  ],
};

export default async function Home() {
  const { contents: newsList } = await getNewsList(6, 0, "category[contains]news");
  const { contents: blogList } = await getNewsList(3, 0, "category[contains]blog");
  const { contents: styles } = await getStyleList(6, 0);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <main id="main-content">

        {/* Hero セクション */}
        <section className="hero-min-height relative flex items-center justify-center overflow-hidden">
          <HeroSlideshow />
          <div className="absolute inset-0 bg-black/60" style={{ zIndex: 2 }} />
          <HeroContent />
        </section>

        {/* ABOUT セクション */}
        <AboutSection />

        {/* STYLE セクション */}
        <section id="style" className="bg-teal-primary/5 py-32 lg:py-48">
          <div className="mx-auto max-w-screen-2xl px-4 lg:px-8">
            <SectionHeading title="STYLE" subtitle="スタイルギャラリー" size="lg" />
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
          </div>
        </section>

        {/* MENU セクション */}
        <ScrollAnimation>
          <MenuSection />
        </ScrollAnimation>

        {/* STAFF セクション */}
        <ScrollAnimation>
          <StaffSection />
        </ScrollAnimation>

        {/* FAQ セクション */}
        <FaqSection />

        {/* NEWS セクション */}
        <section id="news" className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-screen-xl px-6">
            <SectionHeading title="NEWS" subtitle="お知らせ" />
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
          </div>
        </section>

        {/* BLOG セクション */}
        <section id="blog" className="bg-teal-primary/5 py-16 lg:py-24">
          <div className="mx-auto max-w-screen-xl px-6">
            <SectionHeading title="BLOG" subtitle="ブログ" />

            {blogList.length > 0 ? (
              <>
                <div className="grid grid-cols-1 gap-6 tablet:grid-cols-2 lg:grid-cols-3">
                  {blogList.map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.id}`}
                      className="group block overflow-hidden border border-dark-text/10 transition-colors hover:border-teal-primary/40"
                    >
                      <div className="relative aspect-video w-full overflow-hidden bg-gray-200">
                        {post.eyecatch ? (
                          <Image
                            src={post.eyecatch.url}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full animate-pulse items-center justify-center bg-gray-200">
                            <span className="text-xs text-dark-text/30">No Image</span>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        {post.tags && post.tags.length > 0 && (
                          <div className="mb-2 flex flex-wrap gap-1">
                            {post.tags.map((t) => (
                              <span
                                key={t}
                                className="border border-teal-primary/30 px-2 py-0.5 text-[10px] tracking-wider text-teal-primary"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
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
                        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-dark-text/60">
                          {post.excerpt || extractExcerpt(post.content)}
                        </p>
                        <p className="mt-4 text-xs tracking-widest text-teal-primary">
                          READ MORE →
                        </p>
                      </div>
                    </Link>
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
