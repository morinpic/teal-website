import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24">
      <Image
        src="/images/teal_t.svg"
        alt="teal."
        width={120}
        height={48}
        className="mb-8 h-12 w-auto"
      />
      <p className="mb-2 text-6xl font-bold tracking-widest text-dark-text/20">
        404
      </p>
      <p className="mb-8 text-sm tracking-widest text-dark-text/60">
        ページが見つかりませんでした
      </p>
      <Link
        href="/"
        className="border border-teal-primary px-8 py-3 text-xs font-medium tracking-[0.3em] text-teal-primary transition-colors hover:bg-teal-primary hover:text-white"
      >
        TOP PAGE
      </Link>
    </main>
  );
}
