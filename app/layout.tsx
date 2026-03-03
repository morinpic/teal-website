import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

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
      <body className={`${notoSansJP.className} text-dark-text antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
