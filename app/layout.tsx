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

const siteUrl = "https://teal-website.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "teal. | 横浜元町の美容院",
    template: "%s | teal.",
  },
  description:
    "横浜元町の美容院 teal.（ティール）。カット、カラー、パーマ、トリートメントなど、お客様一人ひとりに寄り添った施術をご提供します。",
  keywords: ["美容院", "美容室", "横浜", "元町", "カット", "カラー", "パーマ", "teal"],
  authors: [{ name: "teal." }],
  creator: "teal.",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    siteName: "teal.",
    title: "teal. | 横浜元町の美容院",
    description:
      "横浜元町の美容院 teal.（ティール）。カット、カラー、パーマ、トリートメントなど、お客様一人ひとりに寄り添った施術をご提供します。",
    images: [
      {
        url: "/ogp.jpg",
        width: 1200,
        height: 630,
        alt: "teal. | 横浜元町の美容院",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "teal. | 横浜元町の美容院",
    description:
      "横浜元町の美容院 teal.（ティール）。カット、カラー、パーマ、トリートメントなど、お客様一人ひとりに寄り添った施術をご提供します。",
    images: ["/ogp.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
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
