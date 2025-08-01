import { getRepairCases, getCategories } from '@/lib/microcms';
import ClientPage from './client-page';

export const revalidate = 60;

export default async function RepairsPage() {
  const [repairRes, categoryRes] = await Promise.all([
    getRepairCases({ limit: 100 }),
    getCategories({ limit: 100 }),
  ]);

  return (
    <main>
      <ClientPage
        initialRepairs={repairRes.contents}
        totalCount={repairRes.totalCount}
        categories={categoryRes.contents}
      />
    </main>
  );
}