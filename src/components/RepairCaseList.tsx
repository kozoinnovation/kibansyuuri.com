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
  allSymptoms: string[];
};

export default function RepairCaseList({
  allCases,
  selectedCategory,
  selectedSymptoms,
  handleCategorySelect,
  handleSymptomToggle,
  allSymptoms,
}: Props) {
  const filteredCases = allCases.filter((example) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      example.categories?.some((cat) => cat.slug === selectedCategory);

    const matchesSymptoms =
      selectedSymptoms.size === 0 ||
      Array.from(selectedSymptoms).every((symptom) =>
        example.symptoms?.some((s) => s.name === symptom)
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
        allSymptoms={allSymptoms}
      />
      <div className="grid md:grid-cols-2 gap-6">
        {filteredCases.map((repair) => (
          <RepairCaseCard key={repair.id} post={repair} />
        ))}
      </div>
    </>
  );
}
