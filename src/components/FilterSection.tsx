'use client';

import React from 'react';

type Props = {
  selectedCategory: string;
  selectedSymptoms: Set<string>;
  allSymptoms: string[];
  handleCategorySelect: (category: string) => void;
  handleSymptomToggle: (symptom: string) => void;
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
}: Props) {
  // 重複がないことが期待されるが、念のためindexもkeyに含めて堅牢にする
  const uniqueSymptoms = React.useMemo(() => [...new Set(allSymptoms)], [allSymptoms]);

  return (
    <section className="mb-8">
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category.slug}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
              selectedCategory === category.slug
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
            }`}
            onClick={() => handleCategorySelect(category.slug)}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {uniqueSymptoms.map((symptom, index) => (
          <label
            key={`${symptom}-${index}`} // より確実にユニークなキーを設定
            className="flex items-center space-x-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-300 text-sm cursor-pointer hover:bg-gray-100"
          >
            <input
              type="checkbox"
              checked={selectedSymptoms.has(symptom)}
              onChange={() => handleSymptomToggle(symptom)}
              className="form-checkbox text-blue-600"
            />
            <span>{symptom}</span>
          </label>
        ))}
      </div>
    </section>
  );
}