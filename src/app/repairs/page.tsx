import { Suspense } from 'react';
import RepairExamplesClient from '@/components/RepairExamplesClient';

export default function RepairExamplesPage() {
  return (
    <Suspense fallback={<div>読み込み中...</div>}>
      <RepairExamplesClient />
    </Suspense>
  );
}
