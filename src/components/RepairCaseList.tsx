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
  // 以下のロジックは一切変更していません
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
    // vvvvvvvvvv UI構造をここから変更 vvvvvvvvvv
    <div className="max-w-6xl mx-auto">
      <FilterSection
        selectedCategory={selectedCategory}
        selectedSymptoms={selectedSymptoms}
        allSymptoms={allSymptoms}
        handleCategorySelect={handleCategorySelect}
        handleSymptomToggle={handleSymptomToggle}
        // 「該当件数」表示のためにpropsを一つ追加
        filteredCount={filteredCases.length}
      />

      {filteredCases.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCases.map((repair) => (
            <RepairCaseCard key={repair.id} post={repair} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
          <p className="text-gray-600 text-lg">
            選択された条件に一致する修理事例は見つかりませんでした。
          </p>
          <p className="text-gray-500 mt-2">
            他のフィルター条件をお試しください。
          </p>
        </div>
      )}
    </div>
    // ^^^^^^^^^^ UI構造をここまで変更 ^^^^^^^^^^
  );
}