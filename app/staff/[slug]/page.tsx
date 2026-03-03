import Link from "next/link";
import { getStaffDetail, getStaffList } from "@/lib/microcms";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { contents } = await getStaffList();
  return contents.map((staff) => ({ slug: staff.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  try {
    const staff = await getStaffDetail(slug);
    return {
      title: `${staff.name} | STAFF | teal.`,
      description: `teal. スタッフ紹介: ${staff.name}（${staff.position}）`,
    };
  } catch {
    return { title: "STAFF | teal." };
  }
}

export default async function StaffDetailPage({ params }: Props) {
  const { slug } = await params;

  let staff;
  try {
    staff = await getStaffDetail(slug);
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
          <span className="text-dark-text">STAFF</span>
          <span className="mx-2">/</span>
          <span className="text-dark-text">{staff.name}</span>
        </nav>
      </div>

      <div className="mx-auto max-w-screen-xl px-6 py-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
          {/* スタッフ写真 */}
          <div className="shrink-0 lg:w-80">
            <div className="aspect-square overflow-hidden bg-dark-text/10 lg:aspect-[3/4]">
              {staff.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={staff.photo.url}
                  alt={staff.name}
                  width={staff.photo.width}
                  height={staff.photo.height}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-dark-text/5 to-teal-primary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="80"
                    height="80"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.8"
                    className="text-dark-text/20"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* スタッフ情報 */}
          <div className="flex-1">
            {/* 名前・肩書き */}
            <p className="text-xs tracking-[0.3em] text-dark-text/50">
              {staff.nameEn}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-wide text-dark-text lg:text-4xl">
              {staff.name}
            </h1>
            <p className="mt-2 text-sm tracking-widest text-teal-primary">
              {staff.position}
            </p>

            {/* 自己紹介文 */}
            {staff.profile && (
              <div className="mt-10 border-t border-dark-text/10 pt-10">
                <h2 className="mb-4 text-xs font-medium tracking-widest text-dark-text/50">
                  PROFILE
                </h2>
                <div
                  className="prose prose-sm max-w-none text-dark-text/80 leading-loose"
                  dangerouslySetInnerHTML={{ __html: staff.profile }}
                />
              </div>
            )}

            {/* メッセージ */}
            {staff.message && (
              <div className="mt-10 border-t border-dark-text/10 pt-10">
                <h2 className="mb-4 text-xs font-medium tracking-widest text-dark-text/50">
                  MESSAGE
                </h2>
                <p className="text-sm leading-loose text-dark-text/80">
                  {staff.message}
                </p>
              </div>
            )}

            {/* 予約CTA */}
            <div className="mt-12">
              <a
                href="https://beauty.hotpepper.jp/slnH000784195/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-teal-primary px-10 py-3 text-xs font-medium tracking-widest text-teal-primary transition-colors hover:bg-teal-primary hover:text-white"
              >
                RESERVE
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 一覧に戻る */}
      <div className="bg-white px-6 py-10 text-center">
        <Link
          href="/#staff"
          className="text-xs tracking-widest text-dark-text/50 transition-colors hover:text-teal-primary"
        >
          ← BACK TO TOP
        </Link>
      </div>
    </div>
  );
}
