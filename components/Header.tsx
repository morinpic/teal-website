"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Button from "@/components/Button";

const navLinks = [
  { label: "ABOUT", href: "/#about" },
  { label: "STYLE", href: "/#style" },
  { label: "MENU", href: "/#menu" },
  { label: "STAFF", href: "/#staff" },
  { label: "FAQ", href: "/#faq" },
  { label: "NEWS", href: "/#news" },
  { label: "BLOG", href: "/#blog" },
  { label: "SNS", href: "/#sns" },
  { label: "ACCESS", href: "/#access" },
];

const RESERVE_URL = "https://beauty.hotpepper.jp/slnH000784195/";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    afterScroll?: () => void
  ) => {
    if (pathname === "/" && href.startsWith("/#")) {
      e.preventDefault();
      const id = href.slice(2);
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 64;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: elementPosition - headerOffset, behavior: "smooth" });
      }
      afterScroll?.();
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
          isScrolled ? "shadow-md" : ""
        }`}
      >
        <div className="mx-auto flex max-w-screen-xl items-center justify-between px-6 py-4">
          {/* ロゴ */}
          <Link
            href="/"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex items-center"
          >
            <Image src="/images/teal_t.svg" alt="teal." width={100} height={40} className="h-10 w-auto" priority />
          </Link>

          {/* PCナビゲーション */}
          <nav className="hidden items-center gap-6 lg:flex" aria-label="メインナビゲーション">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative text-xs font-semibold uppercase tracking-widest text-dark-text transition-colors hover:text-teal-primary after:absolute after:bottom-[-4px] after:left-0 after:h-px after:w-0 after:bg-teal-primary after:transition-[width] after:duration-200 hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* 予約ボタン（PC） + ハンバーガー（SP） */}
          <div className="flex items-center gap-4">
            <Button
              variant="primary"
              href={RESERVE_URL}
              external
              aria-label="ホットペッパービューティーで予約する"
              className="hidden lg:inline-block"
            >
              RESERVE
            </Button>

            {/* ハンバーガーボタン（SP/tablet） */}
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="flex flex-col items-center justify-center gap-1.5 p-2 lg:hidden"
              aria-label="メニューを開く"
              aria-expanded={isMenuOpen}
            >
              <span
                className={`block h-px w-6 bg-dark-text transition-transform duration-300 ${
                  isMenuOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-6 bg-dark-text transition-opacity duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-px w-6 bg-dark-text transition-transform duration-300 ${
                  isMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* モバイルフルスクリーンオーバーレイ */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col bg-white lg:hidden">
          <div className="flex items-center justify-between px-6 py-4">
            <Link
              href="/"
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
                closeMenu();
              }}
              className="flex items-center"
            >
              <Image src="/images/teal_t.svg" alt="teal." width={100} height={40} className="h-10 w-auto" />
            </Link>
            <button
              onClick={closeMenu}
              className="flex flex-col items-center justify-center gap-1.5 p-2"
              aria-label="メニューを閉じる"
            >
              <span className="block h-px w-6 translate-y-px rotate-45 bg-dark-text" />
              <span className="block h-px w-6 -translate-y-px -rotate-45 bg-dark-text" />
            </button>
          </div>

          <nav className="flex flex-1 items-center justify-center px-10" aria-label="モバイルナビゲーション">
            <div className="grid grid-cols-2 gap-x-12 gap-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, closeMenu)}
                  className="flex min-h-[44px] items-center justify-center text-center text-lg font-semibold uppercase tracking-widest text-dark-text transition-colors hover:text-teal-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
