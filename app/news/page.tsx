import Link from "next/link";
import { getNewsList } from "@/lib/microcms";
import { extractExcerpt } from "@/lib/utils";

const PER_PAGE = 10;

export const metadata = {
  title: "NEWS | teal.",
  description: "横浜元町の美容院 teal.（ティール）からのお知らせ一覧。サロンの最新情報・キャンペーン・イベント情報をお届けします。",
};

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function NewsPage({ searchParams }: Props) {
  const { page } = await searchParams;
  const parsed = parseInt(page ?? "1", 10);
  const currentPage = Number.isNaN(parsed) ? 1 : Math.max(1, parsed);
  const offset = (currentPage - 1) * PER_PAGE;

  const { contents: newsList, totalCount } = await getNewsList(
    PER_PAGE,
    offset,
    "category[contains]news"
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
            <span className="text-dark-text/70">NEWS</span>
          </nav>
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-[0.2em] text-dark-text lg:text-4xl">
              NEWS
            </h1>
            <p className="mt-3 text-sm tracking-widest text-dark-text/50">
              お知らせ
            </p>
          </div>
        </div>
      </div>

      {/* 記事一覧 */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-screen-lg px-6">
          {newsList.length === 0 ? (
            <p className="py-12 text-center text-sm text-dark-text/40">
              お知らせはまだありません
            </p>
          ) : (
            <>
              <ul className="divide-y divide-dark-text/10">
                {newsList.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`/news/${item.id}`}
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
                      href={`/news?page=${currentPage - 1}`}
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
                      href={`/news?page=${currentPage + 1}`}
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
