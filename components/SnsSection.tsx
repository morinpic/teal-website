"use client";

const INSTAGRAM_URL = "https://www.instagram.com/hashimoto514yokohama";

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

const cards = [
  { id: 1, bg: "from-teal-primary/10 to-teal-primary/5" },
  { id: 2, bg: "from-dark-text/5 to-dark-text/10" },
  { id: 3, bg: "from-teal-primary/15 to-teal-primary/8" },
  { id: 4, bg: "from-dark-text/8 to-dark-text/5" },
  { id: 5, bg: "from-teal-primary/8 to-teal-primary/12" },
  { id: 6, bg: "from-dark-text/5 to-teal-primary/5" },
];

export default function SnsSection() {
  return (
    <section id="sns" className="bg-white px-6 py-20 lg:py-32">
      <div className="mx-auto max-w-screen-xl">
        {/* セクションヘッダー */}
        <div className="mb-16 flex flex-col items-center gap-3 text-center">
          <h2 className="text-3xl font-bold tracking-[0.2em] text-dark-text lg:text-4xl">
            SNS
          </h2>
          <p className="text-sm tracking-widest text-dark-text/50">
            ソーシャルメディア
          </p>
          <div className="mt-2 h-px w-12 bg-teal-primary" />
        </div>

        {/* Instagramカードグリッド */}
        <div className="mb-12 grid grid-cols-2 gap-2 tablet:grid-cols-3 lg:gap-3">
          {cards.map((card) => (
            <a
              key={card.id}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative aspect-square w-full overflow-hidden bg-gradient-to-br ${card.bg} transition-opacity hover:opacity-80`}
              aria-label="Instagramで投稿を見る"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-dark-text/30 transition-colors group-hover:text-teal-primary">
                <InstagramIcon size={32} />
                <p className="text-xs tracking-widest">Instagram で見る</p>
              </div>
            </a>
          ))}
        </div>

        {/* Instagramフォローボタン */}
        <div className="flex justify-center">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-teal-primary px-10 py-4 text-xs font-medium tracking-[0.3em] text-white transition-colors hover:bg-teal-primary/80"
          >
            <InstagramIcon size={18} />
            INSTAGRAM をフォロー
          </a>
        </div>
      </div>
    </section>
  );
}
