import type { ReactNode } from 'react'; // ✅ 追加

export type Category = {
  id: string;
  name: string;
  slug: string;
  icon?: ReactNode; // 例えばこんな用途で使っている場合
};
