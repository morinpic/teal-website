"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

type StyleItem = {
  id: string;
  slug: string;
  title: string;
  menu?: string;
  image?: { url: string };
};

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function StyleGridAnimated({ styles }: { styles: StyleItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="grid grid-cols-2 gap-4 tablet:gap-6 lg:grid-cols-3">
      {styles.map((style, i) => (
        <motion.div
          key={style.id}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
        >
          <Link
            href={`/style/${style.slug}`}
            className="group block overflow-hidden border-2 border-transparent hover:border-teal-primary transition-colors duration-300"
          >
            <div className="relative aspect-square w-full overflow-hidden bg-gray-200">
              {style.image?.url && (
                <Image
                  src={style.image.url}
                  alt={style.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}
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
