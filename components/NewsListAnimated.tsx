"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

type NewsItem = {
  id: string;
  slug: string;
  title: string;
  publishedAt: string;
  excerpt?: string;
};

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function NewsListAnimated({ items }: { items: NewsItem[] }) {
  const ref = useRef<HTMLUListElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <ul ref={ref} className="divide-y divide-dark-text/10">
      {items.map((item, i) => (
        <motion.li
          key={item.id}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE, delay: i * 0.06 }}
        >
          <Link
            href={`/news/${item.slug}`}
            className="group flex flex-col gap-2 py-6 transition-colors hover:text-teal-primary hover:pl-3 hover:border-l-2 hover:border-teal-primary tablet:flex-row tablet:items-start tablet:gap-8"
          >
            <time className="shrink-0 text-xs tracking-widest text-dark-text/50 tablet:w-28 tablet:pt-0.5">
              {new Date(item.publishedAt).toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </time>
            <div className="flex flex-col gap-1">
              <p className="font-medium leading-relaxed text-dark-text transition-colors group-hover:text-teal-primary">
                {item.title}
              </p>
              {item.excerpt && (
                <p className="text-sm leading-relaxed text-dark-text/60">
                  {item.excerpt}
                </p>
              )}
            </div>
          </Link>
        </motion.li>
      ))}
    </ul>
  );
}
