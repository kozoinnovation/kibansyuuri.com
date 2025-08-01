'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { RepairCase } from '@/types/repair';
import FilterSection from '@/components/FilterSection';
import RepairCaseCard from '@/components/RepairCaseCard';

type Props = {
  initialRepairs: RepairCase[];
  totalCount: number;
};

export default function ClientPage({ initialRepairs, totalCount }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSymptoms, setSelectedSymptoms] = useState<Set<string>>(new Set());

  useEffect(() => {
    const category = searchParams.get('category') || 'all';
    const symptoms = searchParams.get('symptoms');
    setSelectedCategory(category);
    setSelectedSymptoms(
      symptoms
        ? new Set(decodeURIComponent(symptoms).split(',').filter((s) => s))
        : new Set()
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
    const params = new URLSearchParams();
    if (category !== 'all') params.set('category', category);
    if (symptoms.size > 0) params.set('symptoms', Array.from(symptoms).join(','));
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleCategorySelect = (category: string) => {
    const newSymptoms = new Set<string>();
    setSelectedCategory(category);
    setSelectedSymptoms(newSymptoms);
    updateQueryParams(category, newSymptoms);
  };

  const handleSymptomToggle = (symptom: string) => {
    const newSymptoms = new Set(selectedSymptoms);
    newSymptoms.has(symptom) ? newSymptoms.delete(symptom) : newSymptoms.add(symptom);
    setSelectedSymptoms(newSymptoms);
    updateQueryParams(selectedCategory, newSymptoms);
  };

  const filteredExamples = useMemo(() => {
    return initialRepairs.filter((ex) => {
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
        <p>
          全{totalCount}件の修理事例から、症状や機種で絞り込んで探すことができます。
        </p>
      </header>
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <FilterSection
          selectedCategory={selectedCategory}
          selectedSymptoms={selectedSymptoms}
          handleCategorySelect={handleCategorySelect}
          handleSymptomToggle={handleSymptomToggle}
          filteredCount={filteredExamples.length}
          allSymptoms={allSymptoms}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExamples.map((example) => (
            <RepairCaseCard key={example.id} post={example} />
          ))}
        </div>
      </div>
    </div>
  );
}
