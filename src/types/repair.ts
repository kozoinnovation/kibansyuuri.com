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
// microCMSのAPIスキーマに合わせて、必須ではないフィールドには `?` を付けます
export type RepairCase = MicroCMSMeta & {
  title: string;
  slug: string;
  body: string;
  image?: EyeCatch;
  category?: Category;
  tags?: Tag[];
};
