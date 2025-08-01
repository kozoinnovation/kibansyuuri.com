import { createClient, type MicroCMSQueries } from 'microcms-js-sdk';
import type { RepairCase } from '@/types/repair';
import type { Category } from '@/types/category';
import type { Symptom } from '@/types/symptom';

export const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN!,
  apiKey: process.env.NEXT_PUBLIC_MICROCMS_API_KEY!,
});

export const getRepairCases = (queries?: MicroCMSQueries) => {
  return client.getList<RepairCase>({ endpoint: 'repair', queries });
};

export const getRepairCase = async (slug: string) => {
  try {
    const data = await client.getList<RepairCase>({
      endpoint: 'repair',
      queries: { filters: `slug[equals]${slug}` },
    });
    return data.contents[0] || null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getCategories = (queries?: MicroCMSQueries) => {
  return client.getList<Category>({ endpoint: 'category', queries });
};

export const getSymptoms = (queries?: MicroCMSQueries) => {
  return client.getList<Symptom>({ endpoint: 'symptoms', queries });
};