import { createClient } from 'microcms-js-sdk';
import type { RepairCase } from '@/types/repair';
import type { Symptom } from '@/types/symptom';
import type { Category } from '@/types/category'; // ← 追加

export const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN || '',
  apiKey: process.env.NEXT_PUBLIC_MICROCMS_API_KEY || '',
});

// 複数記事取得
export const getRepairCases = async ({
  limit = 10,
  offset = 0,
  filters = '',
  orders = '-createdAt',
} = {}): Promise<{ contents: RepairCase[]; totalCount: number }> => {
  const safeLimit = Math.min(limit, 100);

  return await client.get({
    endpoint: 'repair',
    queries: {
      limit: safeLimit,
      offset,
      filters,
      orders,
    },
  });
};

// 個別記事取得 (slug指定)
export const getRepairCaseBySlug = async (
  slug: string
): Promise<RepairCase | null> => {
  try {
    const res = await client.get({
      endpoint: 'repair',
      queries: {
        filters: `slug[equals]${slug}`,
      },
    });
    return res.contents[0] || null;
  } catch (error) {
    console.error('Failed to fetch repair case by slug:', error);
    return null;
  }
};

// microCMSから症状一覧を取得する関数
export const getSymptoms = async (): Promise<{ contents: Symptom[] }> => {
  return await client.get({
    endpoint: 'symptoms',
    queries: {
      limit: 100,
    },
  });
};

// ✅ 追加：microCMSからカテゴリ一覧を取得する関数
export const getCategories = async (): Promise<{ contents: Category[] }> => {
  return await client.get({
    endpoint: 'category', // ← microCMSのエンドポイント名に注意（単数系）
    queries: {
      limit: 100,
    },
  });
};
