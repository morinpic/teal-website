import type { MetadataRoute } from "next";
import { getNewsList, getStaffList, getStyleList } from "@/lib/microcms";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://teal-website.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 固定ページ
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/news`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/style`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/menu`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/staff`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // NEWS 記事ページ
  const { contents: newsList } = await getNewsList(100, 0, "category[equals]news");
  const newsRoutes: MetadataRoute.Sitemap = newsList.map((item) => ({
    url: `${siteUrl}/news/${item.slug}`,
    lastModified: new Date(item.updatedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // BLOG 記事ページ
  const { contents: blogList } = await getNewsList(100, 0, "category[equals]blog");
  const blogRoutes: MetadataRoute.Sitemap = blogList.map((item) => ({
    url: `${siteUrl}/blog/${item.slug}`,
    lastModified: new Date(item.updatedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // STYLE 詳細ページ
  const { contents: styleList } = await getStyleList(100, 0);
  const styleRoutes: MetadataRoute.Sitemap = styleList.map((item) => ({
    url: `${siteUrl}/style/${item.slug}`,
    lastModified: new Date(item.updatedAt),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  // STAFF 詳細ページ
  const { contents: staffList } = await getStaffList();
  const staffRoutes: MetadataRoute.Sitemap = staffList.map((item) => ({
    url: `${siteUrl}/staff/${item.slug}`,
    lastModified: new Date(item.updatedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...newsRoutes, ...blogRoutes, ...styleRoutes, ...staffRoutes];
}
