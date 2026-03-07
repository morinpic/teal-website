import { menuCategories, menuNote } from "@/lib/menu-data";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";

const RESERVE_URL = "https://beauty.hotpepper.jp/slnH000784195/";

export default function MenuSection() {
  return (
    <section id="menu" className="bg-white px-6 py-16 lg:py-24">
      <div className="mx-auto max-w-screen-xl">
        <SectionHeading title="MENU" subtitle="メニュー・料金表" />

        <div className="mx-auto max-w-2xl space-y-12">
          {menuCategories.map((category) => (
            <div key={category.id}>
              {/* カテゴリ見出し */}
              <div className="mb-6 flex items-center gap-6">
                <h3 className="font-urbanist text-xl font-normal tracking-widest text-teal-primary">
                  {category.title}
                </h3>
                {category.note && (
                  <span className="text-xs text-dark-text/50">{category.note}</span>
                )}
                <div className="flex-1 border-t border-dark-text/10" />
              </div>

              {/* 料金テーブル */}
              <table className="w-full border-collapse">
                <tbody className="divide-y divide-dark-text/5">
                  {category.items.map((item) => (
                    <tr key={item.name}>
                      <td className="py-4 pr-4 text-base leading-relaxed text-dark-text">
                        {item.name}
                      </td>
                      <td className="py-4 text-right text-base font-semibold text-teal-primary whitespace-nowrap">
                        {item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}

          {/* 注記 */}
          <p className="text-center text-xs text-dark-text/50">{menuNote}</p>
        </div>

        {/* 予約CTA */}
        <div className="mt-12 flex justify-center">
          <Button
            variant="primary"
            href={RESERVE_URL}
            external
            aria-label="ホットペッパービューティーで予約する"
          >
            RESERVE
          </Button>
        </div>
      </div>
    </section>
  );
}
