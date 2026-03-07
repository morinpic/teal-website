"use client";

import { useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import ScrollAnimation from "@/components/ScrollAnimation";

const faqs = [
  {
    question: "予約はどのようにすればいいですか？",
    answer:
      "ホットペッパービューティーからご予約いただけます。当日のご予約はお電話でも承っております。",
  },
  {
    question: "施術時間の目安を教えてください。",
    answer:
      "カットのみ: 約60分 / カット＋カラー: 約150分 / パーマ: 約180分（スタイルにより異なります）",
  },
  {
    question: "キャンセルはできますか？",
    answer:
      "ご予約日の前日までにご連絡をお願いしております。当日のキャンセルはご遠慮ください。",
  },
  {
    question: "駐車場はありますか？",
    answer:
      "お近くのコインパーキングをご利用ください。元町・中華街エリアには複数の駐車場がございます。",
  },
  {
    question: "子連れでの来店は可能ですか？",
    answer: "お子様連れも歓迎しております。お気軽にご相談ください。",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="bg-gray-100 px-6 py-16 lg:py-24">
      <div className="mx-auto max-w-screen-xl">
        <SectionHeading title="FAQ" subtitle="よくある質問" />

        <div className="mx-auto max-w-2xl">
          {faqs.map((faq, i) => (
            <ScrollAnimation key={i} delay={i * 0.05}>
              <div className="border-b border-dark-text/10">
                <button
                  onClick={() => toggle(i)}
                  aria-expanded={openIndex === i}
                  aria-controls={`faq-answer-${i}`}
                  id={`faq-question-${i}`}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="text-sm font-medium leading-relaxed text-dark-text lg:text-base">
                    {faq.question}
                  </span>
                  <span
                    className={`flex-shrink-0 text-teal-primary transition-transform duration-200 ${
                      openIndex === i ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>
                <div
                  id={`faq-answer-${i}`}
                  role="region"
                  aria-labelledby={`faq-question-${i}`}
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === i ? "max-h-48 pb-5" : "max-h-0"
                  }`}
                >
                  <p className="text-sm leading-loose text-dark-text/70 lg:text-base">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
