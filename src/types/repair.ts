// src/types/repair.ts

// microCMSから返却される基本的なメタデータ
export type MicroCMSMeta = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

// 画像の型定義
export type EyeCatch = {
  url: string;
  height: number;
  width: number;
};

// カテゴリの型定義
export type Category = MicroCMSMeta & {
  name: string;
};

// タグの型定義
export type Tag = MicroCMSMeta & {
  name: string;
};

// 修理事例記事の型定義
export type RepairCase = MicroCMSMeta & {
  title: string;
  slug: string;
  body: string;
  image?: EyeCatch; // 画像はオプショナル（任意）に変更
  category?: Category; // カテゴリはオプショナル（任意）に変更
  tags?: Tag[]; // タグはオプショナル（任意）に変更
};
