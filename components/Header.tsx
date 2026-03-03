"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "NEWS", href: "/#news" },
  { label: "STYLE", href: "/#style" },
  { label: "MENU", href: "/#menu" },
  { label: "STAFF", href: "/staff" },
  { label: "BLOG", href: "/#blog" },
  { label: "ACCESS", href: "/#access" },
];

const RESERVE_URL = "https://beauty.hotpepper.jp/slnH000784195/";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

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
            className="text-2xl font-bold tracking-widest text-dark-text"
          >
            teal.
          </Link>

          {/* PCナビゲーション */}
          <nav className="hidden items-center gap-8 lg:flex" aria-label="メインナビゲーション">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium tracking-widest text-dark-text transition-colors hover:text-teal-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* 予約ボタン（PC） + ハンバーガー（SP） */}
          <div className="flex items-center gap-4">
            <a
              href={RESERVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ホットペッパービューティーで予約する"
              className="hidden rounded-none border border-teal-primary px-5 py-2 text-xs font-medium tracking-widest text-teal-primary transition-colors hover:bg-teal-primary hover:text-white lg:block"
            >
              RESERVE
            </a>

            {/* ハンバーガーボタン（SP/tablet） */}
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="flex flex-col items-center justify-center gap-1.5 p-2 lg:hidden"
              aria-label="メニューを開く"
              aria-expanded={isMenuOpen}
            >
              <span
                className={`block h-px w-6 bg-dark-text transition-transform duration-300 ${
                  isMenuOpen ? "translate-y-2.5 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-6 bg-dark-text transition-opacity duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-px w-6 bg-dark-text transition-transform duration-300 ${
                  isMenuOpen ? "-translate-y-2.5 -rotate-45" : ""
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
              onClick={closeMenu}
              className="text-2xl font-bold tracking-widest text-dark-text"
            >
              teal.
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

          <nav className="flex flex-1 flex-col items-center justify-center gap-10" aria-label="モバイルナビゲーション">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className="text-xl font-medium tracking-widest text-dark-text transition-colors hover:text-teal-primary"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={RESERVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ホットペッパービューティーで予約する"
              className="mt-4 border border-teal-primary px-8 py-3 text-sm font-medium tracking-widest text-teal-primary transition-colors hover:bg-teal-primary hover:text-white"
            >
              RESERVE
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
