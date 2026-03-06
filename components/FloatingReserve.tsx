"use client";

export default function FloatingReserve() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a
        href="https://beauty.hotpepper.jp/slnH000784195/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-[44px] w-full items-center justify-center bg-teal-primary py-4 text-sm font-medium tracking-[0.25em] text-white shadow-[0_-2px_12px_rgba(12,124,124,0.25)] transition-opacity hover:opacity-90"
      >
        ご予約はこちら &nbsp;／&nbsp; RESERVE
      </a>
    </div>
  );
}
