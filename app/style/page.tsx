import Link from "next/link";
import { getStyleList } from "@/lib/microcms";

const PER_PAGE = 12;

export const metadata = {
  title: "STYLE",
  description: "横浜元町の美容院 teal. のスタイルギャラリー。",
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
          <Link href="/" className="hover:text-teal-primary">HOME</Link>
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
            <p className="text-center text-dark-text/50">スタイルはまだありません。</p>
          ) : (
            <div className="grid grid-cols-2 gap-4 tablet:grid-cols-3 lg:grid-cols-4 lg:gap-6">
              {styles.map((style) => (
                <Link
                  key={style.id}
                  href={`/style/${style.slug}`}
                  className="group block overflow-hidden"
                >
                  {/* 写真 */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-dark-text/10">
                    {style.image?.url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={style.image.url}
                        alt={style.title}
                        width={style.image.width}
                        height={style.image.height}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
          )}

          {/* ページネーション */}
          {totalPages > 1 && (
            <nav
              className="mt-16 flex justify-center gap-2"
              aria-label="ページネーション"
            >
              {page > 1 && (
                <Link
                  href={`/style?page=${page - 1}`}
                  className="flex h-10 w-10 items-center justify-center border border-dark-text/20 text-sm text-dark-text transition-colors hover:border-teal-primary hover:text-teal-primary"
                >
                  &lt;
                </Link>
              )}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={`/style?page=${p}`}
                  className={`flex h-10 w-10 items-center justify-center border text-sm transition-colors ${
                    p === page
                      ? "border-teal-primary bg-teal-primary text-white"
                      : "border-dark-text/20 text-dark-text hover:border-teal-primary hover:text-teal-primary"
                  }`}
                >
                  {p}
                </Link>
              ))}
              {page < totalPages && (
                <Link
                  href={`/style?page=${page + 1}`}
                  className="flex h-10 w-10 items-center justify-center border border-dark-text/20 text-sm text-dark-text transition-colors hover:border-teal-primary hover:text-teal-primary"
                >
                  &gt;
                </Link>
              )}
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}
