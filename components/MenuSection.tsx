"use client";

import { useState } from "react";
import { menuCategories, menuNote } from "@/lib/menu-data";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";

const RESERVE_URL = "https://beauty.hotpepper.jp/slnH000784195/";

export default function MenuSection() {
  const [activeId, setActiveId] = useState(menuCategories[0].id);

  const activeCategory = menuCategories.find((c) => c.id === activeId)!;

  return (
    <section id="menu" className="bg-white px-6 py-20 lg:py-32">
      <div className="mx-auto max-w-screen-xl">
        <SectionHeading title="MENU" subtitle="メニュー・料金表" />

        {/* タブ */}
        <div
          className="mb-10 flex justify-center overflow-x-auto border-b border-dark-text/10"
          role="tablist"
          aria-label="メニューカテゴリ"
        >
          <div className="flex min-w-max">
            {menuCategories.map((category) => {
              const isActive = category.id === activeId;
              return (
                <button
                  key={category.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${category.id}`}
                  id={`tab-${category.id}`}
                  onClick={() => setActiveId(category.id)}
                  className={`cursor-pointer whitespace-nowrap border-b-2 -mb-px px-6 py-3 text-xs font-semibold uppercase tracking-widest transition-all duration-200
                    ${
                      isActive
                        ? "border-teal-primary text-teal-primary"
                        : "border-transparent text-dark-text/50 hover:text-teal-primary"
                    }`}
                >
                  {category.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* パネル */}
        {menuCategories.map((category) => (
          <div
            key={category.id}
            id={`panel-${category.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${category.id}`}
            hidden={category.id !== activeId}
            className="mx-auto max-w-2xl"
          >
            {activeCategory.note && (
              <p className="mb-4 text-center text-xs text-dark-text/50">
                {activeCategory.note}
              </p>
            )}
            <table className="w-full border-collapse">
              <tbody>
                {category.items.map((item) => (
                  <tr
                    key={item.name}
                    className="border-b border-dark-text/10 transition-colors hover:bg-teal-primary/5"
                  >
                    <td className="py-4 pr-4 text-sm leading-relaxed text-dark-text">
                      {item.name}
                    </td>
                    <td className="py-4 text-right text-sm font-semibold text-teal-primary whitespace-nowrap">
                      {item.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

        {/* 注記 */}
        <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-dark-text/50">
          {menuNote}
        </p>

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
