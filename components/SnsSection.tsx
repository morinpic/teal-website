// Instagram Graph API または oEmbed URL による投稿取得が必要
// 環境変数: INSTAGRAM_ACCESS_TOKEN（未設定）
// 参考: https://developers.facebook.com/docs/instagram-basic-display-api

const INSTAGRAM_URL = "https://www.instagram.com/";

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

// 6枚のプレースホルダーカード（3列×2行）
const placeholders = [
  { id: 1, tone: "bg-teal-primary/10" },
  { id: 2, tone: "bg-dark-text/5" },
  { id: 3, tone: "bg-teal-primary/15" },
  { id: 4, tone: "bg-dark-text/8" },
  { id: 5, tone: "bg-teal-primary/8" },
  { id: 6, tone: "bg-dark-text/5" },
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

        {/* Instagram投稿風プレースホルダーグリッド（3列×2行） */}
        <div className="mb-12 grid grid-cols-2 gap-2 tablet:grid-cols-3 lg:gap-3">
          {placeholders.map((item) => (
            <a
              key={item.id}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative aspect-square w-full overflow-hidden ${item.tone} transition-opacity hover:opacity-80`}
              aria-label="Instagramの投稿を見る"
            >
              {/* Instagramアイコン（中央） */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-dark-text/25 transition-colors group-hover:text-teal-primary/60">
                <InstagramIcon size={32} />
                <p className="text-xs tracking-widest">準備中</p>
              </div>
            </a>
          ))}
        </div>

        {/* Instagramをフォローボタン（強調） */}
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
