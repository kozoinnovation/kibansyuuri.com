// src/types/symptom.ts

export type Symptom = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  name: string;
  // slugなど、microCMS側で追加したフィールドがあればここにも定義します
};