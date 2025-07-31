'use client';

import React, { useMemo } from 'react';
import FilterSection from './FilterSection';
import RepairCaseCard from './RepairCaseCard';
import type { RepairCase } from '@/types/repair';

type Props = {
  allCases: RepairCase[];
  selectedCategory: string;
  selectedSymptoms: Set<string>;
  handleCategorySelect: (category: string) => void;
  handleSymptomToggle: (symptom: string) => void;
};

export default function RepairCaseList({
  allCases,
  selectedCategory,
  selectedSymptoms,
  handleCategorySelect,
  handleSymptomToggle,
}: Props) {
  const allSymptoms = useMemo(() => {
    const symptoms = allCases.flatMap((c) => c.tags?.map((t) => t.name) || []);
    return Array.from(new Set(symptoms));
  }, [allCases]);

  const filteredCases = useMemo(() => {
    return allCases.filter((repair) => {
      const categoryMatch =
        selectedCategory === 'all' ||
        repair.categories?.some((cat) => cat.slug === selectedCategory);

      const symptomsMatch =
        selectedSymptoms.size === 0 ||
        Array.from(selectedSymptoms).every((symptom) =>
          repair.tags?.some((tag) => tag.name === symptom)
        );

      return categoryMatch && symptomsMatch;
    });
  }, [allCases, selectedCategory, selectedSymptoms]);

  return (
    <div className="space-y-8">
      <FilterSection
        selectedCategory={selectedCategory}
        selectedSymptoms={selectedSymptoms}
        allSymptoms={allSymptoms}
        handleCategorySelect={handleCategorySelect}
        handleSymptomToggle={handleSymptomToggle}
      />

      {filteredCases.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCases.map((repair) => (
            <RepairCaseCard key={repair.id} post={repair} />
          ))}
        </div>
      ) : (
        <p className="col-span-full text-center text-gray-600 text-lg py-10">
          選択された条件に一致する修理事例は見つかりませんでした。
        </p>
      )}
    </div>
  );
}