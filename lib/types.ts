// microCMS の画像型
export type MicroCMSImage = {
  url: string;
  height: number;
  width: number;
};

// 共通フィールド
export type MicroCMSBase = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

// News (お知らせ + ブログ)
export type News = MicroCMSBase & {
  title: string;
  content: string; // リッチテキスト
  category: "news" | "blog";
  eyecatch?: MicroCMSImage;
  slug: string;
  excerpt?: string; // 概要
  tags?: string[];
};

// Style (スタイルギャラリー)
export type Style = MicroCMSBase & {
  title: string;
  image: MicroCMSImage;
  stylist?: string;
  menu?: string;
  description?: string;
  slug: string;
};

// Staff (スタッフ)
export type Staff = MicroCMSBase & {
  name: string;
  nameEn: string;
  position: string;
  photo?: MicroCMSImage;
  profile?: string; // リッチテキスト
  message?: string;
  specialty?: string; // 得意なスタイル・施術
  slug: string;
};
