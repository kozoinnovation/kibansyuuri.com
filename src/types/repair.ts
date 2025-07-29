export type Repair = {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
  image?: {
    url: string;
    width: number;
    height: number;
  };
};
