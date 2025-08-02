'use client';

import React, { useMemo, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { RepairCase } from '@/types/repair';
import type { Category } from '@/types/category';
import type { Symptom } from '@/types/symptom';
import FilterSection from '@/components/FilterSection';
import RepairCaseCard from '@/components/RepairCaseCard';

type Props = {
  initialRepairs: RepairCase[];
  totalCount: number;
  categories: Category[];
};

function RepairsClientContent({ initialRepairs, totalCount, categories }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get('category') || 'all';
  const selectedSymptoms = useMemo(() => {
    const symptomsParam = searchParams.get('symptoms');
    return new Set<string>(symptomsParam ? symptomsParam.split(',').filter(Boolean) : []);
  }, [searchParams]);

  const allSymptoms = useMemo(() => {
    const symptomsMap = new Map<string, Symptom>();
    initialRepairs.forEach((item) => {
      item.symptoms?.forEach((s) => {
        if (s && s.id && s.name) {
          symptomsMap.set(s.id, s);
        }
      });
    });
    return Array.from(symptomsMap.values());
  }, [initialRepairs]);

  const handleCategorySelect = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category !== 'all') {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    params.delete('symptoms'); // カテゴリ変更時は症状リセット
    router.push(`/repairs?${params.toString()}`);
  };

  const handleSymptomToggle = (symptomId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentSymptoms = new Set(selectedSymptoms);

    if (currentSymptoms.has(symptomId)) {
      currentSymptoms.delete(symptomId);
    } else {
      currentSymptoms.add(symptomId);
    }

    if (currentSymptoms.size > 0) {
      params.set('symptoms', Array.from(currentSymptoms).join(','));
    } else {
      params.delete('symptoms');
    }

    router.push(`/repairs?${params.toString()}`);
  };

  const filteredExamples = useMemo(() => {
    return initialRepairs.filter((ex) => {
      const categoryMatch =
        selectedCategory === 'all' ||
        ex.categories?.some((cat) => cat.slug === selectedCategory);

      const symptomMatch =
        selectedSymptoms.size === 0 ||
        (
          ex.symptoms &&
          Array.from(selectedSymptoms).every((symptomId) =>
            ex.symptoms!.some((sym) => sym.id === symptomId)
          )
        );

      return categoryMatch && symptomMatch;
    });
  }, [initialRepairs, selectedCategory, selectedSymptoms]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">修理事例一覧</h1>
        <p>全{totalCount}件の修理事例から、症状や機種で絞り込んで探すことができます。</p>
      </header>
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <FilterSection
          selectedCategory={selectedCategory}
          selectedSymptoms={selectedSymptoms}
          handleCategorySelect={handleCategorySelect}
          handleSymptomToggle={handleSymptomToggle}
          filteredCount={filteredExamples.length}
          allSymptoms={allSymptoms}
          categories={categories}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredExamples.map((example) => (
            <RepairCaseCard key={example.id} post={example} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ClientPage(props: Props) {
  return (
    <Suspense>
      <RepairsClientContent {...props} />
    </Suspense>
  );
}
