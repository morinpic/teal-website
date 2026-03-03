export default function AccessSection() {
  return (
    <section id="access" className="bg-teal-primary/5 px-6 py-20 lg:py-32">
      <div className="mx-auto max-w-screen-xl">
        {/* セクションヘッダー */}
        <div className="mb-16 text-center">
          <h2 className="text-2xl font-bold tracking-widest text-dark-text md:text-3xl">
            ACCESS
          </h2>
          <p className="mt-2 text-sm text-gray-500">アクセス</p>
        </div>

        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          {/* Google Maps 埋め込み */}
          <div className="aspect-video w-full overflow-hidden lg:flex-1">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3249.6!2d139.6481!3d35.4435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60185db24d2de159%3A0x79af1d1e87bf5aab!2z5p2x5Lqs5YyX5Zut55S677yM5qiq5Lqr55S677yM5YyX5Lqs5biC5Lit5Yy65YWr55S65LiJ5LiB55uu77yT77yR77yT77yR4oiS77yR!5e0!3m2!1sja!2sjp!4v1000000000000!5m2!1sja!2sjp"
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
              <tbody className="divide-y divide-dark-text/10">
                <tr>
                  <th className="py-4 pr-6 text-left text-xs font-medium tracking-widest text-gray-500 align-top">
                    店舗名
                  </th>
                  <td className="py-4 text-dark-text">teal.</td>
                </tr>
                <tr>
                  <th className="py-4 pr-6 text-left text-xs font-medium tracking-widest text-gray-500 align-top">
                    住所
                  </th>
                  <td className="py-4 text-dark-text">
                    〒231-0861
                    <br />
                    神奈川県横浜市中区元町3-131-1
                    <br />
                    グローバル横浜元町4F
                  </td>
                </tr>
                <tr>
                  <th className="py-4 pr-6 text-left text-xs font-medium tracking-widest text-gray-500 align-top">
                    最寄り駅
                  </th>
                  <td className="py-4 text-dark-text">
                    みなとみらい線 元町・中華街駅から徒歩5分
                    <br />
                    JR根岸線 石川町駅から徒歩10分
                  </td>
                </tr>
                <tr>
                  <th className="py-4 pr-6 text-left text-xs font-medium tracking-widest text-gray-500 align-top">
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
