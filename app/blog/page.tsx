import Link from "next/link";
import Image from "next/image";
import { getNewsList } from "@/lib/microcms";

const PER_PAGE = 9;

export const metadata = {
  title: "BLOG",
  description: "横浜元町の美容院teal.のブログ。ヘアケアやスタイリングのお役立ち情報を発信しています。",
};

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function BlogPage({ searchParams }: Props) {
  const { page } = await searchParams;
  const parsed = parseInt(page ?? "1", 10);
  const currentPage = Number.isNaN(parsed) ? 1 : Math.max(1, parsed);
  const offset = (currentPage - 1) * PER_PAGE;

  const { contents: blogList, totalCount } = await getNewsList(
    PER_PAGE,
    offset,
    "category[equals]blog"
  );
  const totalPages = Math.ceil(totalCount / PER_PAGE);

  return (
    <main className="min-h-screen">
      {/* ページヘッダー */}
      <div className="bg-[#f8f6f4] py-16">
        <div className="mx-auto max-w-screen-lg px-6">
          {/* パンくずリスト */}
          <nav className="mb-6 flex items-center gap-2 text-xs tracking-widest text-dark-text/40">
            <Link href="/" className="transition-colors hover:text-teal-primary">
              HOME
            </Link>
            <span>/</span>
            <span className="text-dark-text/70">BLOG</span>
          </nav>
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-[0.2em] text-dark-text lg:text-4xl">
              BLOG
            </h1>
            <p className="mt-3 text-sm tracking-widest text-dark-text/50">
              ブログ
            </p>
          </div>
        </div>
      </div>

      {/* 記事一覧 */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-screen-lg px-6">
          {blogList.length === 0 ? (
            <p className="text-center text-dark-text/50">
              現在ブログ記事はありません。
            </p>
          ) : (
            <>
              <ul className="grid gap-10 tablet:grid-cols-2 lg:grid-cols-3">
                {blogList.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`/blog/${item.slug}`}
                      className="group flex flex-col gap-4"
                    >
                      {/* サムネイル */}
                      <div className="relative aspect-video w-full overflow-hidden bg-gray-200">
                        {item.eyecatch && (
                          <Image
                            src={item.eyecatch.url}
                            alt={item.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-opacity duration-300 group-hover:opacity-80"
                          />
                        )}
                      </div>

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

              {/* ページネーション */}
              {totalPages > 1 && (
                <nav
                  className="mt-16 flex items-center justify-center gap-4"
                  aria-label="ページネーション"
                >
                  {currentPage > 1 ? (
                    <Link
                      href={`/blog?page=${currentPage - 1}`}
                      className="border border-dark-text/20 px-6 py-2 text-xs tracking-widest text-dark-text/50 transition-colors hover:border-teal-primary hover:text-teal-primary"
                    >
                      ← 前へ
                    </Link>
                  ) : (
                    <span className="border border-dark-text/10 px-6 py-2 text-xs tracking-widest text-dark-text/20">
                      ← 前へ
                    </span>
                  )}
                  <span className="text-xs tracking-widest text-dark-text/50">
                    {currentPage} / {totalPages}
                  </span>
                  {currentPage < totalPages ? (
                    <Link
                      href={`/blog?page=${currentPage + 1}`}
                      className="border border-dark-text/20 px-6 py-2 text-xs tracking-widest text-dark-text/50 transition-colors hover:border-teal-primary hover:text-teal-primary"
                    >
                      次へ →
                    </Link>
                  ) : (
                    <span className="border border-dark-text/10 px-6 py-2 text-xs tracking-widest text-dark-text/20">
                      次へ →
                    </span>
                  )}
                </nav>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
