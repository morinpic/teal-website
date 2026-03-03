import Link from "next/link";
import { dummyStaffList } from "@/lib/dummy-data";

export default function StaffSection() {
  return (
    <section id="staff" className="bg-teal-primary/5 px-6 py-20 lg:py-32">
      <div className="mx-auto max-w-screen-xl">
        {/* セクションヘッダー */}
        <div className="mb-16 text-center">
          <h2 className="text-2xl font-bold tracking-widest text-dark-text md:text-3xl">
            STAFF
          </h2>
          <p className="mt-2 text-sm text-gray-500">スタイリスト</p>
        </div>

        {/* スタッフ一覧 */}
        <div className="flex flex-wrap justify-center gap-12">
          {dummyStaffList.map((staff) => (
            <Link
              key={staff.id}
              href="/staff/hashimoto-takahiro"
              className="group flex flex-col items-center text-center"
            >
              {/* 写真プレースホルダー */}
              <div className="mb-6 h-48 w-48 rounded-full bg-gray-300 overflow-hidden transition-opacity duration-300 group-hover:opacity-80" />

              {/* 名前・肩書き */}
              <h3 className="text-lg font-medium tracking-wide text-dark-text">
                {staff.name}
              </h3>
              <p className="mt-1 text-sm tracking-widest text-gray-500">
                {staff.nameEn}
              </p>
              <p className="mt-1 text-xs tracking-widest text-teal-primary">
                {staff.position}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
