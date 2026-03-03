import { menuCategories, menuNote } from "@/lib/menu-data";

export const metadata = {
  title: "MENU | teal.",
  description: "横浜元町の美容院 teal. のメニュー・料金表。カット、カラー、パーマ、トリートメントなど。",
};

export default function MenuPage() {
  return (
    <div className="min-h-screen">
      {/* ページヘッダー */}
      <div className="bg-white px-6 py-16 text-center">
        <h1 className="text-3xl font-bold tracking-widest text-dark-text lg:text-4xl">
          MENU
        </h1>
        <p className="mt-2 text-sm tracking-widest text-dark-text/50">
          メニュー・料金表
        </p>
        <div className="mx-auto mt-4 h-px w-12 bg-teal-primary" />
      </div>

      {/* 料金表 */}
      <div className="bg-[#f8f6f4] px-6 py-16">
        <div className="mx-auto max-w-screen-xl space-y-16">
          {menuCategories.map((category) => (
            <section key={category.id} id={category.id}>
              {/* カテゴリ見出し */}
              <div className="mb-8 flex items-center gap-6">
                <h2 className="text-2xl font-bold tracking-widest text-teal-primary lg:text-3xl">
                  {category.title}
                </h2>
                {category.note && (
                  <span className="text-xs text-dark-text/50">
                    {category.note}
                  </span>
                )}
                <div className="flex-1 border-t border-dark-text/10" />
              </div>

              {/* 料金テーブル */}
              <div className="overflow-hidden bg-white">
                <table className="w-full">
                  <tbody className="divide-y divide-dark-text/5">
                    {category.items.map((item) => (
                      <tr key={item.name} className="transition-colors hover:bg-teal-primary/5">
                        <td className="px-8 py-5 text-sm text-dark-text">
                          {item.name}
                        </td>
                        <td className="px-8 py-5 text-right text-sm font-medium text-dark-text">
                          {item.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}

          {/* 注記 */}
          <p className="text-center text-sm text-dark-text/60">{menuNote}</p>

          {/* 予約CTA */}
          <div className="rounded bg-teal-primary px-8 py-10 text-center text-white">
            <p className="mb-2 text-sm tracking-widest text-white/80">
              ご予約はこちらから
            </p>
            <h3 className="mb-6 text-xl font-bold tracking-widest">
              ホットペッパービューティーで予約
            </h3>
            <a
              href="https://beauty.hotpepper.jp/slnH000784195/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-white px-10 py-3 text-xs font-medium tracking-widest text-white transition-colors hover:bg-white hover:text-teal-primary"
            >
              RESERVE NOW
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
