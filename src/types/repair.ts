// src/types/repair.ts

import type { Symptom } from './symptom';

export interface RepairCase {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  body: string;
  mainImage?: {
    url: string;
    width?: number;
    height?: number;
  };
  categories?: {
    id: string;
    name: string;
    slug: string;
  }[];
  // vvvvvvvvvvvvvvvv ここから追加 vvvvvvvvvvvvvvvv
  // microCMSのコンテンツ参照に対応するため、symptomsフィールドを追加
  symptoms?: Symptom[];
  // ^^^^^^^^^^^^^^^^^^ ここまで追加 ^^^^^^^^^^^^^^^^^^
  tags?: {
    id: string;
    name: string;
    slug: string;
  }[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
}