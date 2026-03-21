import Link from "next/link";
import Image from "next/image";
import { getStyleDetail, getStyleList } from "@/lib/microcms";
import { notFound } from "next/navigation";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://teal.yokohama";

type Props = {
  params: Promise<{ id: string }>;
};

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const { contents } = await getStyleList(100, 0);
    return contents.map((style) => ({ id: style.id }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  try {
    const style = await getStyleDetail(id);
    const description = style.description ?? `横浜元町の美容院 teal. のスタイル作品: ${style.title}`;
    return {
      title: `${style.title} | STYLE | teal.`,
      description,
      openGraph: {
        title: `${style.title} | teal.`,
        description,
        ...(style.image ? { images: [{ url: style.image.url }] } : {}),
      },
    };
  } catch {
    return { title: "STYLE | teal." };
  }
}

export default async function StyleDetailPage({ params }: Props) {
  const { id } = await params;

  let style;
  try {
    style = await getStyleDetail(id);
  } catch {
    notFound();
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "HOME", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "STYLE", item: `${siteUrl}/style` },
      { "@type": "ListItem", position: 3, name: style.title, item: `${siteUrl}/style/${id}` },
    ],
  };

  return (
    <div className="min-h-screen bg-[#f8f6f4]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* パンくず */}
      <div className="bg-white px-6 py-4">
        <nav className="mx-auto max-w-screen-xl text-xs text-dark-text/50">
          <Link href="/" className="transition-colors hover:text-teal-primary">
            HOME
          </Link>
          <span className="mx-2">/</span>
          <Link href="/style" className="transition-colors hover:text-teal-primary">
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
                className="text-xs tracking-widest text-dark-text/40 transition-colors hover:text-teal-primary"
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
