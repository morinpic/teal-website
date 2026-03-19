"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const images = ["/images/hero-salon.png", "/images/salon-reception.png"];
const INTERVAL = 6000;
const FADE_DURATION = 1.5;

export default function HeroSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const id = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, INTERVAL);

    return () => clearInterval(id);
  }, [prefersReducedMotion]);

  return (
    <>
      {images.map((src, index) => (
        <motion.div
          key={src}
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: index === currentIndex ? 1 : 0 }}
          transition={{ duration: FADE_DURATION, ease: "easeInOut" }}
          style={{ zIndex: index === currentIndex ? 1 : 0 }}
        >
          <Image
            src={src}
            alt=""
            fill
            className="object-cover"
            priority={index === 0}
            loading={index === 0 ? undefined : "eager"}
            aria-hidden="true"
          />
        </motion.div>
      ))}
    </>
  );
}
