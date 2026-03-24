import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getStaffList } from "@/lib/microcms";

export const metadata: Metadata = {
  title: "STAFF | teal.",
  description: "横浜元町の美容院 teal.（ティール）のスタッフ紹介。経験豊富なスタイリストが、お客様一人ひとりのご要望に丁寧に対応いたします。",
};

export default async function StaffPage() {
  const { contents: staffList } = await getStaffList();

  return (
    <div className="min-h-screen bg-[#f8f6f4]">
      {/* パンくず */}
      <div className="bg-white px-6 py-4">
        <nav className="mx-auto max-w-screen-xl text-xs text-dark-text/50">
          <Link href="/" className="transition-colors hover:text-teal-primary">
            HOME
          </Link>
          <span className="mx-2">/</span>
          <span className="text-dark-text">STAFF</span>
        </nav>
      </div>

      <div className="mx-auto max-w-screen-xl px-6 py-20 lg:py-32">
        {/* セクションヘッダー */}
        <div className="mb-16 flex flex-col items-center gap-3">
          <h1 className="text-3xl font-bold tracking-[0.2em] text-dark-text lg:text-4xl">
            STAFF
          </h1>
          <p className="text-sm tracking-widest text-dark-text/50">
            スタッフ紹介
          </p>
          <div className="mt-2 h-px w-12 bg-teal-primary" />
        </div>

        {/* スタッフ一覧グリッド */}
        {staffList.length > 0 ? (
          <div className="grid grid-cols-2 gap-8 tablet:grid-cols-3 lg:grid-cols-4">
            {staffList.map((staff) => (
              <Link
                key={staff.id}
                href={`/staff/${staff.id}`}
                className="group flex flex-col items-center text-center"
              >
                {/* 写真 */}
                <div className="relative mb-4 aspect-square w-full overflow-hidden bg-dark-text/10">
                  {staff.photo ? (
                    <Image
                      src={staff.photo.url}
                      alt={staff.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 300px"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-dark-text/5 to-teal-primary/10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="64"
                        height="64"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        className="text-dark-text/20"
                        aria-hidden="true"
                      >
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-dark-text/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>

                {/* 名前・肩書き */}
                <p className="text-xs tracking-[0.2em] text-dark-text/50">
                  {staff.nameEn}
                </p>
                <h2 className="mt-1 text-lg font-medium tracking-wide text-dark-text transition-colors group-hover:text-teal-primary">
                  {staff.name}
                </h2>
                <p className="mt-1 text-xs tracking-widest text-teal-primary">
                  {staff.position}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="py-12 text-center text-sm text-dark-text/40">
            スタッフ情報は準備中です
          </p>
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
  );
}
