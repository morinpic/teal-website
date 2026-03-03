import Link from "next/link";
import { notFound } from "next/navigation";
import { getNewsDetail, getNewsList } from "@/lib/microcms";
import type { News } from "@/lib/types";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { contents } = await getNewsList(100, 0, "category[equals]news");
  return contents.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  try {
    const item = await getNewsDetail(slug);
    return {
      title: `${item.title} | NEWS | teal.`,
      description: item.excerpt ?? item.title,
    };
  } catch {
    return { title: "NEWS | teal." };
  }
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;

  let item: News;
  try {
    item = await getNewsDetail(slug);
  } catch {
    notFound();
  }

  if (item.category !== "news") {
    notFound();
  }

  // 前後記事取得
  const { contents: allNews } = await getNewsList(100, 0, "category[equals]news");
  const currentIndex = allNews.findIndex((n) => n.slug === slug);
  const prevItem = currentIndex < allNews.length - 1 ? allNews[currentIndex + 1] : null;
  const nextItem = currentIndex > 0 ? allNews[currentIndex - 1] : null;

  const publishedDate = new Date(item.publishedAt).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen">
      {/* ページヘッダー */}
      <div className="bg-teal-primary/5 py-20">
        <div className="mx-auto max-w-screen-lg px-6">
          <p className="mb-4 text-xs tracking-widest text-dark-text/50">
            {publishedDate}
          </p>
          <h1 className="text-2xl font-bold leading-relaxed text-dark-text lg:text-3xl">
            {item.title}
          </h1>
        </div>
      </div>

      {/* 記事本文 */}
      <article className="py-20">
        <div className="mx-auto max-w-screen-lg px-6">
          <div
            className="prose prose-sm max-w-none leading-relaxed text-dark-text lg:prose-base"
            dangerouslySetInnerHTML={{ __html: item.content }}
          />

          {/* 前後記事ナビ */}
          <div className="mt-20 border-t border-dark-text/10 pt-10">
            <div className="flex flex-col gap-6 tablet:flex-row tablet:justify-between">
              {/* 前の記事（古い記事） */}
              <div className="flex-1">
                {prevItem && (
                  <Link
                    href={`/news/${prevItem.slug}`}
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
                  href="/news"
                  className="text-xs tracking-widest text-dark-text/40 transition-colors hover:text-teal-primary"
                >
                  NEWS一覧
                </Link>
              </div>

              {/* 次の記事（新しい記事） */}
              <div className="flex flex-1 justify-end text-right">
                {nextItem && (
                  <Link
                    href={`/news/${nextItem.slug}`}
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
