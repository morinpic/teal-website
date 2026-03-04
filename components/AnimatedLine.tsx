"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function AnimatedLine() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="mt-2 h-0.5 bg-teal-primary"
      initial={{ width: 0 }}
      animate={inView ? { width: 64 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.3 }}
    />
  );
}
