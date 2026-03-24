import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, Noto_Serif_JP, Cormorant_Garamond, Urbanist } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import FloatingReserve from "@/components/FloatingReserve";
import Script from "next/script";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-sans-jp",
});

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-serif-jp",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-accent",
});

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-urbanist",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://teal.yokohama";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

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
      <head>
        <link rel="preconnect" href="https://images.microcms-assets.io" />
        <link rel="dns-prefetch" href="https://images.microcms-assets.io" />
      </head>
      <body
        className={`${notoSansJP.variable} ${notoSerifJP.variable} ${cormorantGaramond.variable} ${urbanist.variable} bg-background font-sans text-dark-text antialiased`}
      >
        <a href="#main-content" className="skip-link">
          メインコンテンツへスキップ
        </a>
        <Header />
        {children}
        <Footer />
        <ScrollToTop />
        <FloatingReserve />
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="1c1b1ca4-8196-47c9-af2e-4859b25ae99a"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
