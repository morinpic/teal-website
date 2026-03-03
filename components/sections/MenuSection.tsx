import Link from "next/link";
import { menuCategories, menuNote } from "@/lib/menu-data";

export default function MenuSection() {
  return (
    <section id="menu" className="bg-white px-6 py-20 lg:py-32">
      <div className="mx-auto max-w-screen-xl">
        {/* セクションヘッダー */}
        <div className="mb-16 text-center">
          <h2 className="text-2xl font-bold tracking-widest text-dark-text md:text-3xl">
            MENU
          </h2>
          <p className="mt-2 text-sm text-gray-500">メニュー・料金</p>
        </div>

        {/* カテゴリ一覧 */}
        <div className="grid gap-8 tablet:grid-cols-2 lg:grid-cols-3">
          {menuCategories.map((category) => (
            <div key={category.id} className="border border-dark-text/10 p-8">
              <h3 className="mb-1 text-lg font-bold tracking-widest text-teal-primary">
                {category.title}
              </h3>
              {category.note && (
                <p className="mb-4 text-xs text-gray-400">{category.note}</p>
              )}
              <ul className="space-y-3">
                {category.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-start justify-between gap-4 text-sm text-dark-text"
                  >
                    <span className="flex-1">{item.name}</span>
                    <span className="shrink-0 font-medium">{item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 注記 */}
        <p className="mt-8 text-center text-sm text-gray-500">{menuNote}</p>

        {/* 詳細ページリンク */}
        <div className="mt-12 text-center">
          <Link
            href="/menu"
            className="inline-block border border-teal-primary px-10 py-3 text-xs font-medium tracking-widest text-teal-primary transition-colors hover:bg-teal-primary hover:text-white"
          >
            VIEW ALL MENU
          </Link>
        </div>
      </div>
    </section>
  );
}
