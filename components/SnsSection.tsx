"use client";

import { useEffect, useRef, useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import ScrollAnimation from "@/components/ScrollAnimation";

const INSTAGRAM_URL = "https://www.instagram.com/hashimoto514yokohama";

const posts = [
  { id: "DS1yxDICTBe", url: "https://www.instagram.com/p/DS1yxDICTBe/" },
  { id: "DSBzQ3kCZIA", url: "https://www.instagram.com/p/DSBzQ3kCZIA/" },
  { id: "CyfqhGcvsuc", url: "https://www.instagram.com/p/CyfqhGcvsuc/" },
  { id: "BmsrHENgAP4", url: "https://www.instagram.com/p/BmsrHENgAP4/" },
  { id: "BmnqJAWg_Ce", url: "https://www.instagram.com/p/BmnqJAWg_Ce/" },
  { id: "BkSVzyHgBia", url: "https://www.instagram.com/p/BkSVzyHgBia/" },
];

const fallbackStyles = [
  "from-teal-primary/10 to-teal-primary/5",
  "from-dark-text/5 to-dark-text/10",
  "from-teal-primary/15 to-teal-primary/8",
  "from-dark-text/8 to-dark-text/5",
  "from-teal-primary/8 to-teal-primary/12",
  "from-dark-text/5 to-teal-primary/5",
];

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
);

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

export default function SnsSection() {
  const [embedLoaded, setEmbedLoaded] = useState(false);
  const [embedFailed, setEmbedFailed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
      queueMicrotask(() => setEmbedLoaded(true));
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.onload = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
        setEmbedLoaded(true);
      }
    };
    script.onerror = () => {
      setEmbedFailed(true);
    };
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <section id="sns" className="bg-white px-6 py-16 lg:py-24">
      <div className="mx-auto max-w-screen-xl">
        <SectionHeading title="SNS" subtitle="ソーシャルメディア" />

        {/* Instagramグリッド（PC のみ表示） */}
        <ScrollAnimation className="hidden lg:block">
          <div
            ref={containerRef}
            className="mb-12 grid grid-cols-2 gap-2 tablet:grid-cols-3 lg:gap-3"
          >
            {embedFailed
              ? posts.map((post, i) => (
                  <a
                    key={post.id}
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative aspect-square w-full overflow-hidden bg-gradient-to-br ${fallbackStyles[i]} border border-teal-primary/20 transition-all hover:shadow-md`}
                    aria-label="Instagramで投稿を見る"
                  >
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-dark-text/25 transition-colors group-hover:text-teal-primary">
                      <InstagramIcon size={32} />
                      <p className="text-xs tracking-widest">VIEW POST</p>
                    </div>
                  </a>
                ))
              : posts.map((post) => (
                  <div
                    key={post.id}
                    className="relative aspect-square w-full overflow-hidden border border-teal-primary/20 bg-dark-text/5"
                  >
                    <div className="-mt-[54px]" style={{ width: "calc(100% + 2px)", marginLeft: "-1px" }}>
                      <blockquote
                        className="instagram-media"
                        data-instgrm-captioned={false}
                        data-instgrm-permalink={post.url}
                        data-instgrm-version="14"
                        style={{
                          background: "transparent",
                          border: 0,
                          margin: 0,
                          padding: 0,
                          width: "100%",
                          maxWidth: "none",
                        }}
                      />
                    </div>
                    {!embedLoaded && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-dark-text/25">
                        <InstagramIcon size={28} />
                        <div className="h-1 w-8 animate-pulse rounded bg-teal-primary/30" />
                      </div>
                    )}
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 z-10 bg-black/0 transition-colors duration-300 hover:bg-black/20"
                      aria-label="Instagramで投稿を見る"
                    />
                  </div>
                ))}
          </div>
        </ScrollAnimation>

        {/* Instagramフォローボタン */}
        <ScrollAnimation delay={0.15}>
          <div className="flex justify-center lg:mt-0">
            <Button
              variant="primary"
              href={INSTAGRAM_URL}
              external
              aria-label="Instagram をフォローする"
            >
              <span className="flex items-center gap-3">
                <InstagramIcon size={16} />
                INSTAGRAM をフォロー
              </span>
            </Button>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
