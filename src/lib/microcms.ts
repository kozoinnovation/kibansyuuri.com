// src/libs/microcms.ts

import { createClient } from "microcms-js-sdk";
import type { MicroCMSQueries } from "microcms-js-sdk";

// 型定義
export type RepairCase = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  slug: string;
  body: string;
  image: {
    url: string;
    height: number;
    width: number;
  };
  category: {
    id: string;
    name: string;
  };
  tags: {
    id: string;
    name: string;
  }[];
};

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is required");
}

// APIクライアントの初期化
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

// 修理事例一覧を取得
export const getRepairCases = async (queries?: MicroCMSQueries) => {
  try {
    const listData = await client.getList<RepairCase>({
      endpoint: "repairs", // microCMSのAPIエンドポイント名
      queries,
    });
    return listData;
  } catch (err) {
    console.error("修理事例の取得に失敗:", err);
    // エラー発生時は空の配列を返すことで、サイトがクラッシュするのを防ぐ
    return { contents: [], totalCount: 0, limit: 0, offset: 0 };
  }
};

// 修理事例詳細を取得
export const getRepairCaseDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  try {
    const detailData = await client.get<RepairCase>({
      endpoint: "repairs",
      contentId,
      queries,
    });
    return detailData;
  } catch (err) {
    console.error("修理事例の詳細取得に失敗:", err);
    // エラー発生時はnullを返すことで、ページ側でエラーハンドリングしやすくする
    return null;
  }
};