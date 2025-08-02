'use client';

import React from 'react';
import type { Symptom } from '@/types/symptom';
import type { Category } from '@/types/category';

type Props = {
  selectedCategory: string;
  selectedSymptoms: Set<string>;
  filteredCount: number;
  allSymptoms: Symptom[];
  categories: Category[];
  handleCategorySelect: (category: string) => void;
  handleSymptomToggle: (symptomId: string) => void;
};

export default function FilterSection({
  selectedCategory,
  selectedSymptoms,
  filteredCount,
  allSymptoms,
  categories,
  handleCategorySelect,
  handleSymptomToggle,
}: Props) {
  return (
    <div className="space-y-6">
      {/* カテゴリ絞り込み */}
      <div>
        <h2 className="text-lg font-semibold mb-2">カテゴリで絞り込み</h2>
        <div className="flex flex-wrap gap-2">
          <button
            className={`px-4 py-2 rounded border ${
              selectedCategory === 'all'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700'
            }`}
            onClick={() => handleCategorySelect('all')}
          >
            すべて
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`px-4 py-2 rounded border ${
                selectedCategory === cat.slug
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700'
              }`}
              onClick={() => handleCategorySelect(cat.slug)}
            >
              {cat.name ?? cat.slug ?? 'カテゴリ'}
            </button>
          ))}
        </div>
      </div>

      {/* 症状絞り込み */}
      <div>
        <h2 className="text-lg font-semibold mb-2">症状で絞り込み</h2>
        <div className="flex flex-wrap gap-2">
          {allSymptoms.map((sym) => (
            <button
              key={sym.id}
              className={`px-4 py-2 rounded border ${
                selectedSymptoms.has(sym.id)
                  ? 'bg-green-500 text-white'
                  : 'bg-white text-gray-700'
              }`}
              onClick={() => handleSymptomToggle(sym.id)}
            >
              {sym.name ?? '症状'}
            </button>
          ))}
        </div>
      </div>

      {/* 件数表示 */}
      <div className="text-right text-sm text-gray-500">
        該当件数：{filteredCount} 件
      </div>
    </div>
  );
}
