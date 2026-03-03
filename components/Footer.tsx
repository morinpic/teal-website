import Link from "next/link";

const navLinks = [
  { label: "NEWS", href: "/#news" },
  { label: "STYLE", href: "/#style" },
  { label: "MENU", href: "/#menu" },
  { label: "STAFF", href: "/#staff" },
  { label: "BLOG", href: "/#blog" },
];

const RESERVE_URL = "https://beauty.hotpepper.jp/slnH000784195/";
const INSTAGRAM_URL = "https://www.instagram.com/";
const X_URL = "https://x.com/";

export default function Footer() {
  return (
    <footer className="bg-dark-text px-6 py-16 text-white">
      <div className="mx-auto max-w-screen-xl">
        {/* ロゴ + 予約ボタン */}
        <div className="flex flex-col items-center gap-8 border-b border-white/20 pb-12 lg:flex-row lg:justify-between">
          <Link
            href="/"
            className="text-3xl font-bold tracking-widest text-white"
          >
            teal.
          </Link>

          <div className="flex items-center gap-6">
            {/* SNSリンク */}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white/70 transition-colors hover:text-white"
            >
              {/* Instagram SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
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
            </a>

            <a
              href={X_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="text-white/70 transition-colors hover:text-white"
            >
              {/* X SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.261 5.633 5.903-5.633Zm-1.161 17.52h1.833L7.084 4.126H5.117Z" />
              </svg>
            </a>

            <a
              href={RESERVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white px-6 py-2 text-xs font-medium tracking-widest text-white transition-colors hover:bg-white hover:text-dark-text"
            >
              RESERVE
            </a>
          </div>
        </div>

        {/* ナビリンク */}
        <nav className="flex flex-wrap justify-center gap-6 py-10 lg:justify-start">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs font-medium tracking-widest text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* コピーライト */}
        <p className="text-center text-xs text-white/50 lg:text-left">
          © 2026 teal. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
