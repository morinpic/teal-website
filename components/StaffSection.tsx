import Link from "next/link";
import { getStaffList } from "@/lib/microcms";

export default async function StaffSection() {
  const { contents: staffList } = await getStaffList();

  return (
    <section id="staff" className="bg-teal-primary px-6 py-20 lg:py-32">
      <div className="mx-auto max-w-screen-xl">
        {/* セクションヘッダー */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-widest text-white lg:text-4xl">
            STAFF
          </h2>
          <p className="mt-2 text-sm tracking-widest text-white/70">
            スタッフ紹介
          </p>
        </div>

        {/* スタッフ一覧 */}
        <div className="flex flex-wrap justify-center gap-10">
          {staffList.map((staff) => (
            <Link
              key={staff.id}
              href={`/staff/${staff.slug}`}
              className="group flex w-64 flex-col items-center text-center"
            >
              {/* 写真プレースホルダー */}
              <div className="mb-6 h-64 w-64 overflow-hidden bg-white/20">
                {staff.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={staff.photo.url}
                    alt={staff.name}
                    width={staff.photo.width}
                    height={staff.photo.height}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-white/40">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="64"
                      height="64"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                    </svg>
                  </div>
                )}
              </div>

              {/* 名前・肩書き */}
              <p className="text-xs tracking-widest text-white/70">
                {staff.nameEn}
              </p>
              <h3 className="mt-1 text-xl font-medium tracking-wide text-white">
                {staff.name}
              </h3>
              <p className="mt-1 text-xs tracking-widest text-white/70">
                {staff.position}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
