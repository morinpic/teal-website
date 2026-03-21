import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getNewsDetail, getNewsList } from "@/lib/microcms";
import { extractExcerpt, normalizeCategory } from "@/lib/utils";
import type { News } from "@/lib/types";

type Props = {
  params: Promise<{ id: string }>;
};

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const { contents } = await getNewsList(100, 0, "category[contains]blog");
    return contents.map((item) => ({ id: item.id }));
  } catch {
    return [];
  }
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://teal.yokohama";

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  try {
    const item = await getNewsDetail(id);
    const description = item.excerpt || extractExcerpt(item.content);
    return {
      title: `${item.title} | BLOG | teal.`,
      description,
      openGraph: {
        title: `${item.title} | teal.`,
        description,
        ...(item.eyecatch ? { images: [{ url: item.eyecatch.url }] } : {}),
      },
    };
  } catch {
    return { title: "BLOG | teal." };
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { id } = await params;

  let item: News;
  try {
    item = await getNewsDetail(id);
  } catch {
    notFound();
  }

  if (normalizeCategory(item.category) !== "blog") {
    notFound();
  }

  // 前後記事取得
  const { contents: allBlog } = await getNewsList(100, 0, "category[contains]blog");
  const currentIndex = allBlog.findIndex((n) => n.id === id);
  const prevItem = currentIndex < allBlog.length - 1 ? allBlog[currentIndex + 1] : null;
  const nextItem = currentIndex > 0 ? allBlog[currentIndex - 1] : null;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "HOME", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "BLOG", item: `${siteUrl}/blog` },
      { "@type": "ListItem", position: 3, name: item.title, item: `${siteUrl}/blog/${id}` },
    ],
  };

  const publishedDate = new Date(item.publishedAt).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* ページヘッダー */}
      <div className="bg-[#f8f6f4] py-16">
        <div className="mx-auto max-w-screen-lg px-6">
          {/* パンくずリスト */}
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs tracking-widest text-dark-text/40">
            <Link href="/" className="transition-colors hover:text-teal-primary">
              HOME
            </Link>
            <span>/</span>
            <Link href="/blog" className="transition-colors hover:text-teal-primary">
              BLOG
            </Link>
            <span>/</span>
            <span className="line-clamp-1 text-dark-text/70">{item.title}</span>
          </nav>
          <p className="mb-2 text-xs tracking-widest text-teal-primary">
            BLOG
          </p>
          <h1 className="mb-4 text-2xl font-bold leading-relaxed text-dark-text lg:text-3xl">
            {item.title}
          </h1>
          <p className="mb-2 text-xs tracking-widest text-dark-text/50">
            {publishedDate}
          </p>
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {item.tags.map((t) => (
                <Link
                  key={t}
                  href={`/blog?tag=${t}`}
                  className="text-[10px] tracking-wider text-teal-primary border border-teal-primary/30 px-2 py-0.5 transition-colors hover:bg-teal-primary hover:text-white"
                >
                  {t}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* eyecatch */}
      {item.eyecatch && (
        <div className="mx-auto max-w-screen-lg px-6 pt-10">
          <Image
            src={item.eyecatch.url}
            alt={item.title}
            width={item.eyecatch.width ?? 800}
            height={item.eyecatch.height ?? 450}
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="w-full object-cover"
          />
        </div>
      )}

      {/* 記事本文 */}
      <article className="bg-white py-20">
        <div className="mx-auto max-w-screen-lg px-6">
          <div
            className="rich-text"
            dangerouslySetInnerHTML={{ __html: item.content }}
          />

          {/* 前後記事ナビ */}
          <div className="mt-20 border-t border-dark-text/10 pt-10">
            <div className="flex flex-col gap-6 tablet:flex-row tablet:justify-between">
              {/* 前の記事（古い記事） */}
              <div className="flex-1">
                {prevItem && (
                  <Link
                    href={`/blog/${prevItem.id}`}
                    className="group flex flex-col gap-1"
                  >
                    <span className="text-xs tracking-widest text-dark-text/40">
                      ← PREV
                    </span>
                    <span className="text-sm text-dark-text transition-colors group-hover:text-teal-primary">
                      {prevItem.title}
                    </span>
                  </Link>
                )}
              </div>

              {/* 一覧に戻る */}
              <div className="flex items-center justify-center">
                <Link
                  href="/blog"
                  className="text-xs tracking-widest text-dark-text/40 transition-colors hover:text-teal-primary"
                >
                  ← BLOG一覧に戻る
                </Link>
              </div>

              {/* 次の記事（新しい記事） */}
              <div className="flex flex-1 justify-end text-right">
                {nextItem && (
                  <Link
                    href={`/blog/${nextItem.id}`}
                    className="group flex flex-col gap-1"
                  >
                    <span className="text-xs tracking-widest text-dark-text/40">
                      NEXT →
                    </span>
                    <span className="text-sm text-dark-text transition-colors group-hover:text-teal-primary">
                      {nextItem.title}
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
