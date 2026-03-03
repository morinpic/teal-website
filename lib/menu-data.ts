export type MenuItem = {
  name: string;
  price: string;
};

export type MenuCategory = {
  id: string;
  title: string;
  items: MenuItem[];
  note?: string;
};

export const menuCategories: MenuCategory[] = [
  {
    id: "cut",
    title: "CUT",
    items: [
      { name: "カット（デトックスケア付き、プラスメニューにより割引有）", price: "¥9,900" },
      { name: "メンズカット", price: "¥8,250" },
      { name: "大学生以下カット", price: "¥6,600" },
      { name: "ロング料金", price: "+¥1,000" },
      { name: "お子様カット", price: "¥4,400" },
    ],
    note: "シャンプーブロー込み",
  },
  {
    id: "color",
    title: "COLOR",
    items: [
      { name: "ヘアカラーリタッチ", price: "¥7,700〜" },
      { name: "ヘアカラーオール", price: "¥8,800〜" },
      { name: "オールハイライト", price: "¥11,000〜" },
      { name: "プラスハイライト（別途カラー料金）", price: "¥4,400〜" },
      { name: "ヘナ", price: "¥7,700〜" },
      { name: "ヘアマニキュア", price: "¥7,700〜" },
    ],
  },
  {
    id: "perm",
    title: "PERM",
    items: [
      { name: "デザインパーマ", price: "¥8,800〜" },
      { name: "ストレートパーマ（アイロンなし）", price: "¥11,000〜" },
      { name: "髪質改善縮毛矯正", price: "¥22,000〜" },
    ],
  },
  {
    id: "treatment",
    title: "TREATMENT",
    items: [
      { name: "リペアトリートメント", price: "¥3,300〜" },
      { name: "髪質改善水素ケアトリートメント", price: "¥5,000〜" },
      { name: "5ステップシステムトリートメント", price: "¥7,700〜" },
    ],
  },
  {
    id: "other",
    title: "OTHER",
    items: [
      { name: "セットアップ", price: "¥6,600〜" },
      { name: "シャンプーブロー（他メニューなし）", price: "¥5,500" },
    ],
  },
];

export const menuNote = "※ カットなしの場合各メニューに +¥3,500";
