import { createClient, type MicroCMSQueries } from 'microcms-js-sdk';
import type { RepairCase } from '@/types/repair';
import type { Category } from '@/types/category';
import type { Symptom } from '@/types/symptom';

// ✅ NEXT_PUBLIC環境変数対応
const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN!,
  apiKey: process.env.NEXT_PUBLIC_MICROCMS_API_KEY!,
});

/**
 * 修理事例を複数取得（一覧用）
 */
export const getRepairCases = async (queries?: MicroCMSQueries) => {
  return await client.getList<RepairCase>({
    endpoint: 'repair', // ← ✅ エンドポイント名確認済み
    queries,
  });
};

/**
 * slugに基づいて修理事例を1件取得（詳細用）
 */
export const getRepairCase = async (slug: string): Promise<RepairCase | null> => {
  try {
    const data = await client.getList<RepairCase>({
      endpoint: 'repair',
      queries: { filters: `slug[equals]${slug}` },
    });
    return data.contents[0] || null;
  } catch (err: any) {
    console.error('getRepairCase error:', err.message);
    console.error('詳細:', err);
    return null;
  }
};

/**
 * カテゴリ一覧を取得（Category[] で返却）
 */
export const getCategories = async (queries?: MicroCMSQueries): Promise<Category[]> => {
  const data = await client.getList<Category>({
    endpoint: 'category', // ← ✅ 単数形に注意
    queries,
  });
  return data.contents;
};

/**
 * 症状一覧を取得（Symptom[] で返却）
 */
export const getSymptoms = async (queries?: MicroCMSQueries): Promise<Symptom[]> => {
  const data = await client.getList<Symptom>({
    endpoint: 'symptoms', // ← ✅ 複数形
    queries,
  });
  return data.contents;
};
