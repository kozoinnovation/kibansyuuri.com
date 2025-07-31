export type RepairCase = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  image?: {
    url: string;
    width?: number;
    height?: number;
  };
  categories?: {
    id: string;
    name: string;
    slug: string;
  }[];
  tags?: {
    id: string;
    name: string;
    slug: string;
  }[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};