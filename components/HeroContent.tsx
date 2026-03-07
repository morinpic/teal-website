"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function HeroContent() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center text-white">
        <h1 className="sr-only">teal.</h1>
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
        >
          <Image
            src="/images/teal_w.svg"
            alt="teal."
            width={240}
            height={240}
            className="lg:w-[360px] lg:h-[360px]"
            priority
          />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
          className="font-accent text-sm font-light tracking-[0.4em] text-white/80"
        >
          hair salon / yokohama motomachi
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.9 }}
          className="mt-6 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href="https://beauty.hotpepper.jp/slnH000784195/"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white px-10 py-3 text-xs font-medium tracking-[0.3em] text-white transition-colors hover:bg-white hover:text-teal-primary"
          >
            RESERVE
          </a>
          <a
            href="#about"
            className="text-xs font-medium tracking-[0.3em] text-white/60 transition-colors hover:text-white/90"
          >
            SCROLL DOWN
          </a>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <div className="h-12 w-px animate-pulse bg-white/50" />
      </motion.div>
    </>
  );
}
