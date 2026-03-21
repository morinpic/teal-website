"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Staff } from "@/lib/types";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Props = {
  staff: Staff;
  index: number;
};

export default function StaffCardAnimated({ staff, index }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.12 }}
    >
      <Link
        href={`/staff/${staff.id}`}
        className="group flex w-64 flex-col items-center text-center"
      >
        {/* 写真 */}
        <div className="relative mb-6 h-64 w-64 overflow-hidden bg-white/20">
          {staff.photo ? (
            <Image
              src={staff.photo.url}
              alt={staff.name}
              fill
              sizes="256px"
              quality={85}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
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
          {/* ホバーオーバーレイ */}
          <div className="absolute inset-0 bg-dark-text/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>

        {/* 名前・肩書き */}
        <p className="font-accent text-xs tracking-widest text-white/70">
          {staff.nameEn}
        </p>
        <h3 className="mt-1 text-xl font-medium tracking-wide text-white">
          {staff.name}
        </h3>
        <p className="mt-1 text-xs tracking-widest text-white/70">
          {staff.position}
        </p>
        {staff.specialty && (
          <p className="mt-3 max-w-[200px] text-xs leading-relaxed text-white/50">
            {staff.specialty}
          </p>
        )}
      </Link>
    </motion.div>
  );
}
