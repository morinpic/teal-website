export default function AccessSection() {
  return (
    <section id="access" className="bg-dark-text px-6 py-20 lg:py-32">
      <div className="mx-auto max-w-screen-xl">
        {/* セクションヘッダー */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-widest text-white lg:text-4xl">
            ACCESS
          </h2>
          <p className="mt-2 text-sm tracking-widest text-white/60">
            アクセス
          </p>
        </div>

        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          {/* Google Maps 埋め込み */}
          <div className="aspect-video w-full overflow-hidden lg:flex-1">
            <iframe
              src="https://maps.google.com/maps?q=35.4424,139.6508&z=17&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="teal. アクセスマップ"
              className="h-full w-full"
            />
          </div>

          {/* 店舗情報テーブル */}
          <div className="lg:w-96">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-white/10">
                <tr>
                  <th className="py-4 pr-6 text-left text-xs font-medium tracking-widest text-white/50 align-top">
                    店舗名
                  </th>
                  <td className="py-4 text-white">teal.</td>
                </tr>
                <tr>
                  <th className="py-4 pr-6 text-left text-xs font-medium tracking-widest text-white/50 align-top">
                    住所
                  </th>
                  <td className="py-4 text-white">
                    〒231-0861
                    <br />
                    神奈川県横浜市中区元町3-131-1
                    <br />
                    グローバル横浜元町4F
                  </td>
                </tr>
                <tr>
                  <th className="py-4 pr-6 text-left text-xs font-medium tracking-widest text-white/50 align-top">
                    最寄り駅
                  </th>
                  <td className="py-4 text-white">
                    みなとみらい線 元町・中華街駅
                    <br />
                    徒歩5分
                    <br />
                    <br />
                    JR根岸線 石川町駅
                    <br />
                    徒歩10分
                  </td>
                </tr>
                <tr>
                  <th className="py-4 pr-6 text-left text-xs font-medium tracking-widest text-white/50 align-top">
                    予約
                  </th>
                  <td className="py-4">
                    <a
                      href="https://beauty.hotpepper.jp/slnH000784195/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-primary underline underline-offset-4 hover:opacity-80"
                    >
                      ホットペッパービューティー
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
