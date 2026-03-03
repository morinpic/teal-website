import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "teal. | 横浜元町の美容院",
  description:
    "横浜元町の美容院 teal.（ティール）。カット、カラー、パーマ、トリートメントなど、お客様一人ひとりに寄り添った施術をご提供します。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="text-dark-text antialiased">{children}</body>
    </html>
  );
}
