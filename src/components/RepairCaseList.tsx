'use client';

import React from 'react';
import type { RepairCase } from '@/types/repair';
import type { Category } from '@/types/category';
import type { Symptom } from '@/types/symptom';
import FilterSection from './FilterSection';
import RepairCaseCard from './RepairCaseCard';

type Props = {
  allCases: RepairCase[];
  selectedCategory: string;
  selectedSymptoms: Set<string>;
  handleCategorySelect: (category: string) => void;
  handleSymptomToggle: (symptomId: string) => void;
  allSymptoms: Symptom[];
  categories: Category[];
};

export default function RepairCaseList({
  allCases,
  selectedCategory,
  selectedSymptoms,
  handleCategorySelect,
  handleSymptomToggle,
  allSymptoms,
  categories,
}: Props) {
  const filteredCases = allCases.filter((example) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      (Array.isArray(example.categories) &&
        example.categories.some((cat) => cat.slug === selectedCategory));

    const matchesSymptoms =
      selectedSymptoms.size === 0 ||
      (Array.isArray(example.symptoms) &&
        Array.from(selectedSymptoms).every((selectedId) =>
          example.symptoms!.some((sym) => sym.id === selectedId)
        ));

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
        categories={categories}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredCases.map((post) => (
          <RepairCaseCard key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}
