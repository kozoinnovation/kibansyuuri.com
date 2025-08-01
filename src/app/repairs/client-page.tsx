'use client';

import React, { useEffect, useMemo, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { RepairCase } from '@/types/repair';
import type { Category } from '@/types/category';
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

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSymptoms, setSelectedSymptoms] = useState<Set<string>>(new Set());

  useEffect(() => {
    const category = searchParams.get('category') || 'all';
    const symptoms = searchParams.get('symptoms');
    setSelectedCategory(category);
    setSelectedSymptoms(
      symptoms ? new Set(decodeURIComponent(symptoms).split(',').filter(Boolean)) : new Set()
    );
  }, [searchParams]);

  const allSymptoms = useMemo(() => {
    const set = new Set<string>();
    initialRepairs.forEach((item) => {
      item.symptoms?.forEach((s) => s.name && set.add(s.name));
    });
    return Array.from(set);
  }, [initialRepairs]);

  const updateQueryParams = (category: string, symptoms: Set<string>) => {
    const params = new URLSearchParams(window.location.search);
    if (category !== 'all') params.set('category', category);
    else params.delete('category');
    if (symptoms.size > 0) params.set('symptoms', Array.from(symptoms).join(','));
    else params.delete('symptoms');
    
    const newQuery = params.toString() ? `?${params.toString()}` : '';
    router.push(`/repairs${newQuery}`, { scroll: false });
  };

  const handleCategorySelect = (category: string) => {
    const newSymptoms = new Set<string>();
    setSelectedCategory(category);
    setSelectedSymptoms(newSymptoms);
    updateQueryParams(category, newSymptoms);
  };

  const handleSymptomToggle = (symptom: string) => {
    const newSymptoms = new Set(selectedSymptoms);
    if (newSymptoms.has(symptom)) newSymptoms.delete(symptom);
    else newSymptoms.add(symptom);
    setSelectedSymptoms(newSymptoms);
    updateQueryParams(selectedCategory, newSymptoms);
  };

  const filteredExamples = useMemo(() => {
    return initialRepairs.filter((ex) => {
      // ✅ 修正箇所: categories配列を正しくチェック
      const categoryMatch =
        selectedCategory === 'all' ||
        ex.categories?.some((cat) => cat.slug === selectedCategory);
      
      const symptomMatch =
        selectedSymptoms.size === 0 ||
        Array.from(selectedSymptoms).every((s) =>
          ex.symptoms?.some((sym) => sym.name === s)
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

// Suspenseでラップするためのラッパーコンポーネント
export default function ClientPage(props: Props) {
  return (
    <Suspense fallback={<div>読み込み中...</div>}>
      <RepairsClientContent {...props} />
    </Suspense>
  );
}