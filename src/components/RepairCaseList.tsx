// src/components/RepairCaseList.tsx

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
  // allSymptomsを計算するロジックはFilterSectionに移動したため不要です
  
  const filteredCases = useMemo(() => {
    return allCases.filter((repair) => {
      const categoryMatch =
        selectedCategory === 'all' ||
        repair.categories?.some((cat) => cat.slug === selectedCategory);

      // vvvvvvvvvvvvvvvv ここから修正 vvvvvvvvvvvvvvvv
      // 絞り込みロジックを新しいsymptomsフィールドに対応させます
      const symptomsMatch =
        selectedSymptoms.size === 0 ||
        Array.from(selectedSymptoms).every((selectedSymptomName) =>
          repair.symptoms?.some((symptom) => symptom.name === selectedSymptomName)
        );
      
      // フィルター条件を返すreturn文を追加
      return categoryMatch && symptomsMatch;
      // ^^^^^^^^^^^^^^^^^^ ここまで修正 ^^^^^^^^^^^^^^^^^^
    });
  }, [allCases, selectedCategory, selectedSymptoms]);

  return (
    <div className="max-w-6xl mx-auto">
      <FilterSection
        selectedCategory={selectedCategory}
        selectedSymptoms={selectedSymptoms}
        // allSymptomsは不要になったため削除
        handleCategorySelect={handleCategorySelect}
        handleSymptomToggle={handleSymptomToggle}
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
  );
}