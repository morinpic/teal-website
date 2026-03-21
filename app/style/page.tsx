import Link from "next/link";
import Image from "next/image";
import { getStyleList } from "@/lib/microcms";

const PER_PAGE = 12;

export const metadata = {
  title: "STYLE | teal.",
  description: "横浜元町の美容院 teal.（ティール）のスタイルギャラリー。カット・カラー・パーマなど、最新ヘアスタイル作品をご覧ください。",
};

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function StyleListPage({ searchParams }: Props) {
  const { page: pageParam } = await searchParams;
  const parsedPage = parseInt(pageParam ?? "1", 10);
  const page = Number.isNaN(parsedPage) ? 1 : Math.max(1, parsedPage);
  const offset = (page - 1) * PER_PAGE;

  const { contents: styles, totalCount } = await getStyleList(PER_PAGE, offset);
  const totalPages = Math.ceil(totalCount / PER_PAGE);

  return (
    <div className="min-h-screen">
      {/* パンくず */}
      <div className="bg-white px-6 py-4 border-b border-dark-text/5">
        <nav className="mx-auto max-w-screen-xl text-xs text-dark-text/50">
          <Link href="/" className="transition-colors hover:text-teal-primary">HOME</Link>
          <span className="mx-2">/</span>
          <span className="text-dark-text">STYLE</span>
        </nav>
      </div>

      {/* ページヘッダー */}
      <div className="bg-white px-6 py-16 text-center">
        <h1 className="text-3xl font-bold tracking-widest text-dark-text lg:text-4xl">
          STYLE
        </h1>
        <p className="mt-2 text-sm tracking-widest text-dark-text/50">
          スタイルギャラリー
        </p>
        <div className="mx-auto mt-4 h-px w-12 bg-teal-primary" />
      </div>

      {/* スタイルグリッド */}
      <div className="bg-[#f8f6f4] px-6 py-16">
        <div className="mx-auto max-w-screen-xl">
          {styles.length === 0 ? (
            <p className="py-12 text-center text-sm text-dark-text/40">
              スタイル写真は準備中です
            </p>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4 tablet:grid-cols-3 lg:grid-cols-4 lg:gap-6">
                {styles.map((style) => (
                  <Link
                    key={style.id}
                    href={`/style/${style.id}`}
                    className="group block overflow-hidden"
                  >
                    {/* 写真 */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-dark-text/10">
                      {style.image?.url ? (
                        <Image
                          src={style.image.url}
                          alt={style.title}
                          fill
                          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-dark-text/5 to-teal-primary/10">
                          <span className="text-xs tracking-widest text-dark-text/30">
                            PHOTO
                          </span>
                        </div>
                      )}
                      {/* ホバーオーバーレイ */}
                      <div className="absolute inset-0 flex items-center justify-center bg-dark-text/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <span className="text-xs font-medium tracking-[0.3em] text-white">
                          VIEW
                        </span>
                      </div>
                    </div>

                    {/* スタイル情報 */}
                    <div className="mt-3 px-1">
                      <p className="text-sm font-medium text-dark-text">
                        {style.title}
                      </p>
                      {style.stylist && (
                        <p className="mt-0.5 text-xs text-dark-text/50">
                          {style.stylist}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>

              {/* ページネーション */}
              {totalPages > 1 && (
                <nav
                  className="mt-16 flex items-center justify-center gap-4"
                  aria-label="ページネーション"
                >
                  {page > 1 ? (
                    <Link
                      href={`/style?page=${page - 1}`}
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
                    {page} / {totalPages}
                  </span>
                  {page < totalPages ? (
                    <Link
                      href={`/style?page=${page + 1}`}
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
      </div>
    </div>
  );
}
