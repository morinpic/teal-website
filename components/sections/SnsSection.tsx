const INSTAGRAM_URL = "https://www.instagram.com/";
const X_URL = "https://x.com/";

export default function SnsSection() {
  return (
    <section id="sns" className="bg-white px-6 py-20 lg:py-32">
      <div className="mx-auto max-w-screen-xl">
        {/* セクションヘッダー */}
        <div className="mb-16 text-center">
          <h2 className="text-2xl font-bold tracking-widest text-dark-text md:text-3xl">
            SNS
          </h2>
          <p className="mt-2 text-sm text-gray-500">ソーシャルメディア</p>
        </div>

        {/* Instagram プレースホルダー */}
        <div className="mb-10 flex h-80 w-full items-center justify-center rounded border border-dashed border-gray-300 bg-gray-50">
          <div className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mx-auto mb-4 text-gray-300"
              aria-hidden="true"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
            </svg>
            <p className="text-sm tracking-widest text-gray-400">
              Instagram投稿がここに表示されます
            </p>
          </div>
        </div>

        {/* SNSリンクボタン */}
        <div className="flex flex-wrap justify-center gap-6">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-teal-primary px-8 py-3 text-xs font-medium tracking-widest text-teal-primary transition-colors hover:bg-teal-primary hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
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
            INSTAGRAM
          </a>

          <a
            href={X_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-teal-primary px-8 py-3 text-xs font-medium tracking-widest text-teal-primary transition-colors hover:bg-teal-primary hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.261 5.633 5.903-5.633Zm-1.161 17.52h1.833L7.084 4.126H5.117Z" />
            </svg>
            X (TWITTER)
          </a>
        </div>
      </div>
    </section>
  );
}
