import { createClient, type MicroCMSQueries } from 'microcms-js-sdk';
import type { RepairCase } from '@/types/repair';
import type { Category } from '@/types/category';
import type { Symptom } from '@/types/symptom';

// ✅ NEXT_PUBLIC環境変数を使用（クライアント側でも安全）
const serviceDomain = process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN!;
const apiKey = process.env.NEXT_PUBLIC_MICROCMS_API_KEY!;

const client = createClient({
  serviceDomain,
  apiKey,
});

/**
 * 修理事例を複数取得（一覧用）
 */
export const getRepairCases = async (
  queries?: MicroCMSQueries
): Promise<{ contents: RepairCase[] }> => {
  return await client.getList<RepairCase>({
    endpoint: 'repair', // ✅ エンドポイント名：修理事例
    queries,
  });
};

/**
 * slugに基づいて修理事例を1件取得（詳細用）
 */
export const getRepairCase = async (
  slug: string
): Promise<RepairCase | null> => {
  try {
    const { contents } = await client.getList<RepairCase>({
      endpoint: 'repair',
      queries: { filters: `slug[equals]${slug}` },
    });
    return contents[0] || null;
  } catch (err: unknown) {
    console.error(
      'getRepairCase error:',
      err instanceof Error ? err.message : err
    );
    return null;
  }
};

/**
 * カテゴリ一覧を取得
 */
export const getCategories = async (
  queries?: MicroCMSQueries
): Promise<Category[]> => {
  const { contents } = await client.getList<Category>({
    endpoint: 'category', // ✅ カテゴリエンドポイント（単数）
    queries,
  });
  return contents;
};

/**
 * 症状一覧を取得
 */
export const getSymptoms = async (
  queries?: MicroCMSQueries
): Promise<Symptom[]> => {
  const { contents } = await client.getList<Symptom>({
    endpoint: 'symptoms', // ✅ 症状エンドポイント（複数）
    queries,
  });
  return contents;
};
