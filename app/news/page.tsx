import Link from "next/link";
import { getNewsList } from "@/lib/microcms";

export const metadata = {
  title: "NEWS | teal.",
  description: "teal.からのお知らせ一覧です。",
};

export default async function NewsPage() {
  const { contents: newsList } = await getNewsList(100, 0, "category[equals]news");

  return (
    <main className="min-h-screen">
      {/* ページヘッダー */}
      <div className="bg-teal-primary/5 py-20">
        <div className="mx-auto max-w-screen-xl px-6 text-center">
          <h1 className="text-3xl font-bold tracking-[0.2em] text-dark-text lg:text-4xl">
            NEWS
          </h1>
          <p className="mt-3 text-sm tracking-widest text-dark-text/50">
            お知らせ
          </p>
        </div>
      </div>

      {/* 記事一覧 */}
      <section className="py-20">
        <div className="mx-auto max-w-screen-lg px-6">
          {newsList.length === 0 ? (
            <p className="text-center text-dark-text/50">
              現在お知らせはありません。
            </p>
          ) : (
            <ul className="divide-y divide-dark-text/10">
              {newsList.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/news/${item.slug}`}
                    className="group flex flex-col gap-2 py-8 transition-colors tablet:flex-row tablet:items-start tablet:gap-10"
                  >
                    <time className="shrink-0 text-xs tracking-widest text-dark-text/50 tablet:w-32 tablet:pt-1">
                      {new Date(item.publishedAt).toLocaleDateString("ja-JP", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </time>
                    <div className="flex flex-col gap-1">
                      <p className="font-medium leading-relaxed text-dark-text transition-colors group-hover:text-teal-primary">
                        {item.title}
                      </p>
                      {item.excerpt && (
                        <p className="text-sm leading-relaxed text-dark-text/60">
                          {item.excerpt}
                        </p>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}
