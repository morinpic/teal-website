import Link from "next/link";
import Image from "next/image";
import { getStyleDetail, getStyleList } from "@/lib/microcms";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { contents } = await getStyleList(100, 0);
  return contents.map((style) => ({ slug: style.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  try {
    const style = await getStyleDetail(slug);
    return {
      title: `${style.title} | STYLE`,
      description: style.description ?? `teal. のスタイルギャラリー: ${style.title}`,
    };
  } catch {
    return { title: "STYLE" };
  }
}

export default async function StyleDetailPage({ params }: Props) {
  const { slug } = await params;

  let style;
  try {
    style = await getStyleDetail(slug);
  } catch {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#f8f6f4]">
      {/* パンくず */}
      <div className="bg-white px-6 py-4">
        <nav className="mx-auto max-w-screen-xl text-xs text-dark-text/50">
          <Link href="/" className="hover:text-teal-primary">
            HOME
          </Link>
          <span className="mx-2">/</span>
          <Link href="/style" className="hover:text-teal-primary">
            STYLE
          </Link>
          <span className="mx-2">/</span>
          <span className="text-dark-text">{style.title}</span>
        </nav>
      </div>

      <div className="mx-auto max-w-screen-xl px-6 py-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          {/* スタイル写真 */}
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-[3/4] overflow-hidden bg-dark-text/10">
              {style.image?.url ? (
                <Image
                  src={style.image.url}
                  alt={style.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={90}
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-dark-text/5 to-teal-primary/10">
                  <span className="text-xs tracking-widest text-dark-text/30">
                    PHOTO
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* スタイル情報 */}
          <div className="flex flex-col justify-center lg:w-1/2">
            <h1 className="font-serif text-2xl font-medium tracking-wide text-dark-text lg:text-3xl">
              {style.title}
            </h1>

            <div className="mt-8 space-y-4 border-t border-dark-text/10 pt-8">
              {style.stylist && (
                <div className="flex gap-6">
                  <span className="w-28 shrink-0 text-xs tracking-widest text-dark-text/50">
                    STYLIST
                  </span>
                  <span className="text-sm text-dark-text">{style.stylist}</span>
                </div>
              )}
              {style.menu && (
                <div className="flex gap-6">
                  <span className="w-28 shrink-0 text-xs tracking-widest text-dark-text/50">
                    MENU
                  </span>
                  <span className="text-sm text-dark-text">{style.menu}</span>
                </div>
              )}
              {style.description && (
                <div className="flex gap-6">
                  <span className="w-28 shrink-0 text-xs tracking-widest text-dark-text/50">
                    DESCRIPTION
                  </span>
                  <p className="text-sm leading-relaxed text-dark-text">
                    {style.description}
                  </p>
                </div>
              )}
            </div>

            {/* 一覧に戻る */}
            <div className="mt-12">
              <Link
                href="/style"
                className="inline-block border border-dark-text px-10 py-3 text-xs font-medium tracking-widest text-dark-text transition-colors hover:bg-dark-text hover:text-white"
              >
                ← BACK TO STYLE
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
