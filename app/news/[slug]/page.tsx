import Link from "next/link";
import { notFound } from "next/navigation";
import { getNewsDetail, getNewsList } from "@/lib/microcms";

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

  let item;
  try {
    item = await getNewsDetail(slug);
  } catch {
    notFound();
  }

  // category が news 以外はnotFound
  if (item.category !== "news") {
    notFound();
  }

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

          {/* 戻るリンク */}
          <div className="mt-20 border-t border-dark-text/10 pt-10">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm tracking-widest text-dark-text/50 transition-colors hover:text-teal-primary"
            >
              <span className="text-xs">←</span>
              NEWS一覧へ戻る
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
