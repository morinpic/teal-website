"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

type StyleItem = {
  id: string;
  title: string;
  menu?: string;
  image?: { url: string };
};

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function StyleGridAnimated({ styles }: { styles: StyleItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <div ref={ref} className="grid grid-cols-2 gap-4 tablet:gap-6 lg:grid-cols-3">
      {styles.map((style, i) => (
        <motion.div
          key={style.id}
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
        >
          <Link
            href={`/style/${style.id}`}
            className="group block overflow-hidden"
          >
            <div className="relative aspect-square w-full overflow-hidden bg-gray-200">
              {style.image?.url && (
                <Image
                  src={style.image.url}
                  alt={style.title}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 33vw"
                  quality={85}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
              {/* ホバーオーバーレイ */}
              <div className="absolute inset-0 flex items-center justify-center bg-dark-text/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="text-xs font-medium tracking-[0.3em] text-white">
                  VIEW
                </span>
              </div>
            </div>
            <div className="mt-3 flex flex-col gap-1">
              {style.menu && (
                <p className="text-xs tracking-widest text-teal-primary">
                  {style.menu}
                </p>
              )}
              <p className="text-sm font-medium text-dark-text">
                {style.title}
              </p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
