'use client';

import React from 'react';
import type { RepairCase } from '@/types/repair';
import RepairCaseCard from './RepairCaseCard';
import FilterSection from './FilterSection';

type Props = {
  allCases: RepairCase[];
  selectedCategory: string;
  selectedSymptoms: Set<string>;
  handleCategorySelect: (category: string) => void;
  handleSymptomToggle: (symptom: string) => void;
};

const allSymptoms = [
  '起動不可',
  '水没',
  'リンゴループ',
  'バッテリー不良',
  '画面割れ',
  '充電できない',
  '基板ショート',
];

export default function RepairCaseList({
  allCases,
  selectedCategory,
  selectedSymptoms,
  handleCategorySelect,
  handleSymptomToggle,
}: Props) {
  const filteredCases = allCases.filter((example) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      example.categories?.some((cat) => cat.id === selectedCategory);
    const matchesSymptoms =
      selectedSymptoms.size === 0 ||
      Array.from(selectedSymptoms).every((symptom) =>
        example.tags?.some((tag) => tag.id === symptom)
      );
    return matchesCategory && matchesSymptoms;
  });

  return (
    <>
      <FilterSection
        selectedCategory={selectedCategory}
        selectedSymptoms={selectedSymptoms}
        handleCategorySelect={handleCategorySelect}
        handleSymptomToggle={handleSymptomToggle}
        filteredCount={filteredCases.length}
      />
      <div className="grid md:grid-cols-2 gap-6">
        {filteredCases.map((repair) => (
          <RepairCaseCard key={repair.id} post={repair} />
        ))}
      </div>
    </>
  );
}
