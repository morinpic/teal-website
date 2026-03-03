import Link from "next/link";
import { getNewsList } from "@/lib/microcms";

export const metadata = {
  title: "BLOG | teal.",
  description: "teal.スタッフによるブログです。ヘアケアやトレンド情報をお届けします。",
};

export default async function BlogPage() {
  const { contents: blogList } = await getNewsList(100, 0, "category[equals]blog");

  return (
    <main className="min-h-screen">
      {/* ページヘッダー */}
      <div className="bg-teal-primary/5 py-20">
        <div className="mx-auto max-w-screen-xl px-6 text-center">
          <h1 className="text-3xl font-bold tracking-[0.2em] text-dark-text lg:text-4xl">
            BLOG
          </h1>
          <p className="mt-3 text-sm tracking-widest text-dark-text/50">
            ブログ
          </p>
        </div>
      </div>

      {/* 記事一覧 */}
      <section className="py-20">
        <div className="mx-auto max-w-screen-lg px-6">
          {blogList.length === 0 ? (
            <p className="text-center text-dark-text/50">
              現在ブログ記事はありません。
            </p>
          ) : (
            <ul className="grid gap-10 tablet:grid-cols-2 lg:grid-cols-3">
              {blogList.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/blog/${item.slug}`}
                    className="group flex flex-col gap-4"
                  >
                    {/* サムネイルプレースホルダー */}
                    <div className="aspect-video w-full overflow-hidden bg-gray-200 transition-opacity duration-300 group-hover:opacity-80" />

                    <div className="flex flex-col gap-2">
                      <time className="text-xs tracking-widest text-dark-text/50">
                        {new Date(item.publishedAt).toLocaleDateString("ja-JP", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })}
                      </time>
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
