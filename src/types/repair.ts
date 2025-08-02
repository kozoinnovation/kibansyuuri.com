import type { Category } from './category';
import type { Symptom } from './symptom';

export type RepairCase = {
  id: string;
  slug: string;
  title: string;
  body: string;
  excerpt?: string;
  mainImage?: { url: string; width?: number; height?: number };
  categories?: Category[];
  symptoms?: Symptom[];
  tags?: { id: string; name: string; slug: string }[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};