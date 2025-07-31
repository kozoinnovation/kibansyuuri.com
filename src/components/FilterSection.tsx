'use client';

import React from 'react';

type Props = {
  selectedCategory: string;
  selectedSymptoms: Set<string>;
  allSymptoms: string[];
  handleCategorySelect: (category: string) => void;
  handleSymptomToggle: (symptom: string) => void;
  filteredCount: number; // UI再現のために追加
};

const categories = [
  { slug: 'all', label: '全て' },
  { slug: 'iphone', label: 'iPhone基板修理' },
  { slug: 'android', label: 'Android基板修理' },
  { slug: 'pc_other', label: 'PC/iPad/その他' },
];

export default function FilterSection({
  selectedCategory,
  selectedSymptoms,
  allSymptoms,
  handleCategorySelect,
  handleSymptomToggle,
  filteredCount,
}: Props) {
  const uniqueSymptoms = React.useMemo(() => [...new Set(allSymptoms)], [allSymptoms]);

  return (
    // vvvvvvvvvv UI構造をここから変更 vvvvvvvvvv
    <section className="bg-white p-4 sm:p-6 rounded-xl shadow-md mb-8">
      {/* カテゴリーフィルター */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 pl-1">カテゴリー</h3>
        <div className="flex items-center space-x-2 pb-2 -mx-1 px-1 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category.slug}
              onClick={() => handleCategorySelect(category.slug)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 transform hover:scale-105 ${
                selectedCategory === category.slug
                  ? 'bg-blue-500 text-white border-blue-500 shadow-sm'
                  : 'bg-gray-200 text-gray-700 border-transparent hover:bg-gray-300'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* 症状フィルター */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 pl-1">症状</h3>
        <div className="flex flex-wrap gap-3">
          {uniqueSymptoms.map((symptom, index) => (
            <label
              key={`${symptom}-${index}`}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-full border cursor-pointer transition-colors duration-200 ${
                selectedSymptoms.has(symptom)
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              <input
                type="checkbox"
                checked={selectedSymptoms.has(symptom)}
                onChange={() => handleSymptomToggle(symptom)}
                className="absolute opacity-0 w-0 h-0" // チェックボックスを完全に隠す
              />
              <span>{symptom}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 該当件数表示 */}
      <div className="text-right text-sm sm:text-base text-gray-600 font-medium pt-4 border-t border-gray-200">
        <span className="text-blue-500 text-lg sm:text-xl font-bold">{filteredCount}</span> 件の事例が見つかりました
      </div>
    </section>
    // ^^^^^^^^^^ UI構造をここまで変更 ^^^^^^^^^^
  );
}
