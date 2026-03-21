import Link from "next/link";
import Image from "next/image";
import { getNewsList } from "@/lib/microcms";
import { extractExcerpt } from "@/lib/utils";

const PER_PAGE = 9;

export const metadata = {
  title: "BLOG | teal.",
  description: "横浜元町の美容院 teal.（ティール）スタイリストによるブログ。ヘアケア・カラー・トレンドスタイルなど、お役立ち情報を発信しています。",
};

const ALL_TAGS = ["ヘアカラー", "トレンド", "ヘアケア", "パーマ・縮毛矯正"];

type Props = {
  searchParams: Promise<{ page?: string; tag?: string }>;
};

export default async function BlogPage({ searchParams }: Props) {
  const { page, tag } = await searchParams;
  const parsed = parseInt(page ?? "1", 10);
  const currentPage = Number.isNaN(parsed) ? 1 : Math.max(1, parsed);
  const offset = (currentPage - 1) * PER_PAGE;

  const filters = tag
    ? `category[equals]blog[and]tags[contains]${tag}`
    : "category[equals]blog";

  const { contents: blogList, totalCount } = await getNewsList(
    PER_PAGE,
    offset,
    filters
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
          {/* タグフィルター */}
          <div className="mb-12 flex flex-wrap items-center gap-2">
            <Link
              href="/blog"
              className={`px-4 py-1.5 text-xs tracking-widest transition-colors ${
                !tag
                  ? "bg-teal-primary text-white"
                  : "border border-dark-text/20 text-dark-text/60 hover:border-teal-primary hover:text-teal-primary"
              }`}
            >
              ALL
            </Link>
            {ALL_TAGS.map((t) => (
              <Link
                key={t}
                href={`/blog?tag=${t}`}
                className={`px-4 py-1.5 text-xs tracking-widest transition-colors ${
                  tag === t
                    ? "bg-teal-primary text-white"
                    : "border border-dark-text/20 text-dark-text/60 hover:border-teal-primary hover:text-teal-primary"
                }`}
              >
                {t}
              </Link>
            ))}
          </div>

          {blogList.length === 0 ? (
            <p className="py-12 text-center text-sm text-dark-text/40">
              ブログ記事は準備中です
            </p>
          ) : (
            <>
              <ul className="grid gap-10 tablet:grid-cols-2 lg:grid-cols-3">
                {blogList.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`/blog/${item.id}`}
                      className="group flex flex-col gap-4"
                    >
                      {/* サムネイル */}
                      <div className="relative aspect-video w-full overflow-hidden bg-gray-200">
                        {item.eyecatch ? (
                          <Image
                            src={item.eyecatch.url}
                            alt={item.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-opacity duration-300 group-hover:opacity-80"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gray-200">
                            <span className="text-xs text-dark-text/30">No Image</span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-2">
                        {/* タグ */}
                        {item.tags && item.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {item.tags.map((t) => (
                              <span
                                key={t}
                                className="text-[10px] tracking-wider text-teal-primary border border-teal-primary/30 px-2 py-0.5"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
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
                        <p className="text-sm leading-relaxed text-dark-text/60">
                          {item.excerpt || extractExcerpt(item.content)}
                        </p>
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
                      href={`/blog?page=${currentPage - 1}${tag ? `&tag=${tag}` : ''}`}
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
                      href={`/blog?page=${currentPage + 1}${tag ? `&tag=${tag}` : ''}`}
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
          {/* トップページへ戻る */}
          <div className="mt-16 flex justify-center">
            <Link
              href="/"
              className="text-xs tracking-widest text-dark-text/40 transition-colors hover:text-teal-primary"
            >
              ← トップページへ戻る
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
