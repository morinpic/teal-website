import { createClient } from "microcms-js-sdk";
import type { News, Style, Staff } from "@/lib/types";
import {
  dummyNewsList,
  dummyStyleList,
  dummyStaffList,
} from "@/lib/dummy-data";

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;

const useDummy = !serviceDomain || !apiKey;

const client = useDummy
  ? null
  : createClient({ serviceDomain, apiKey });

// News一覧取得
export async function getNewsList(
  limit = 10,
  offset = 0,
  filters?: string
): Promise<{ contents: News[]; totalCount: number }> {
  if (useDummy || !client) {
    let contents = dummyNewsList;
    if (filters) {
      // filters例: "category[equals]blog"
      const match = filters.match(/category\[equals\](\w+)/);
      if (match) {
        contents = contents.filter((n) => n.category === match[1]);
      }
      const tagMatch = filters.match(/tags\[contains\](.+)/);
      if (tagMatch) {
        contents = contents.filter((n) => n.tags?.includes(tagMatch[1]));
      }
    }
    const sliced = contents.slice(offset, offset + limit);
    return { contents: sliced, totalCount: contents.length };
  }

  try {
    return await client.getList<News>({
      endpoint: "news",
      queries: { limit, offset, filters },
    });
  } catch {
    let contents = dummyNewsList;
    if (filters) {
      const match = filters.match(/category\[equals\](\w+)/);
      if (match) contents = contents.filter((n) => n.category === match[1]);
      const tagMatch = filters.match(/tags\[contains\](.+)/);
      if (tagMatch) contents = contents.filter((n) => n.tags?.includes(tagMatch[1]));
    }
    const sliced = contents.slice(offset, offset + limit);
    return { contents: sliced, totalCount: contents.length };
  }
}

// News詳細取得（slugで検索）
export async function getNewsDetail(slug: string): Promise<News> {
  if (useDummy || !client) {
    const found = dummyNewsList.find((n) => n.slug === slug);
    if (!found) throw new Error(`News not found: ${slug}`);
    return found;
  }

  try {
    const res = await client.getList<News>({
      endpoint: "news",
      queries: { filters: `slug[equals]${slug}`, limit: 1 },
    });
    if (!res.contents[0]) throw new Error(`News not found: ${slug}`);
    return res.contents[0];
  } catch (e) {
    const found = dummyNewsList.find((n) => n.slug === slug);
    if (!found) throw e;
    return found;
  }
}

// Style一覧取得
export async function getStyleList(
  limit = 10,
  offset = 0
): Promise<{ contents: Style[]; totalCount: number }> {
  if (useDummy || !client) {
    const sliced = dummyStyleList.slice(offset, offset + limit);
    return { contents: sliced, totalCount: dummyStyleList.length };
  }

  try {
    return await client.getList<Style>({
      endpoint: "style",
      queries: { limit, offset },
    });
  } catch {
    const sliced = dummyStyleList.slice(offset, offset + limit);
    return { contents: sliced, totalCount: dummyStyleList.length };
  }
}

// Style詳細取得（slugで検索）
export async function getStyleDetail(slug: string): Promise<Style> {
  if (useDummy || !client) {
    const found = dummyStyleList.find((s) => s.slug === slug);
    if (!found) throw new Error(`Style not found: ${slug}`);
    return found;
  }

  try {
    const res = await client.getList<Style>({
      endpoint: "style",
      queries: { filters: `slug[equals]${slug}`, limit: 1 },
    });
    if (!res.contents[0]) throw new Error(`Style not found: ${slug}`);
    return res.contents[0];
  } catch (e) {
    const found = dummyStyleList.find((s) => s.slug === slug);
    if (!found) throw e;
    return found;
  }
}

// Staff一覧取得
export async function getStaffList(): Promise<{ contents: Staff[]; totalCount: number }> {
  if (useDummy || !client) {
    return { contents: dummyStaffList, totalCount: dummyStaffList.length };
  }

  try {
    return await client.getList<Staff>({
      endpoint: "staff",
      queries: { limit: 100 },
    });
  } catch {
    return { contents: dummyStaffList, totalCount: dummyStaffList.length };
  }
}

// Staff詳細取得（slugで検索）
export async function getStaffDetail(slug: string): Promise<Staff> {
  if (useDummy || !client) {
    const found = dummyStaffList.find((s) => s.slug === slug);
    if (!found) throw new Error(`Staff not found: ${slug}`);
    return found;
  }

  try {
    const res = await client.getList<Staff>({
      endpoint: "staff",
      queries: { filters: `slug[equals]${slug}`, limit: 1 },
    });
    if (!res.contents[0]) throw new Error(`Staff not found: ${slug}`);
    return res.contents[0];
  } catch (e) {
    const found = dummyStaffList.find((s) => s.slug === slug);
    if (!found) throw e;
    return found;
  }
}
