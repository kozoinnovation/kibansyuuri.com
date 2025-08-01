'use client';
import React from 'react';
import type { Category } from '@/types/category';

type FilterSectionProps = {
  selectedCategory: string;
  selectedSymptoms: Set<string>;
  handleCategorySelect: (category: string) => void;
  handleSymptomToggle: (symptom: string) => void;
  filteredCount: number;
  allSymptoms: string[];
  categories: Category[];
};

export default function FilterSection({
  selectedCategory,
  selectedSymptoms,
  handleCategorySelect,
  handleSymptomToggle,
  filteredCount,
  allSymptoms,
  categories, // このpropsをチェックします
}: FilterSectionProps) {

  // ✅ 原因特定のためのデバッグコードを追加
  if (!categories || !Array.isArray(categories)) {
    return (
      <div className="p-4 my-4 text-red-700 bg-red-100 border border-red-400 rounded-lg">
        <p className="font-bold">デバッグ情報 (エラー):</p>
        <p>「categories」プロップがコンポーネントに渡されていません。データ取得かPropsの受け渡しに問題があります。</p>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="p-4 my-4 text-yellow-700 bg-yellow-100 border border-yellow-400 rounded-lg">
        <p className="font-bold">デバッグ情報 (警告):</p>
        <p>「categories」データは渡されていますが、中身が0件です。microCMSでカテゴリが登録・公開されているか確認してください。</p>
      </div>
    );
  }
  // ✅ デバッグコードここまで

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          key="all"
          onClick={() => handleCategorySelect('all')}
          className={`px-4 py-2 rounded-full text-sm transition ${ selectedCategory === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800' }`}
        >
          すべて
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategorySelect(category.slug)}
            className={`px-4 py-2 rounded-full text-sm transition ${ selectedCategory === category.slug ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800' }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {allSymptoms.map((symptom) => (
          <button
            key={symptom}
            onClick={() => handleSymptomToggle(symptom)}
            className={`px-3 py-1 rounded-full text-sm border transition ${ selectedSymptoms.has(symptom) ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-700 border-gray-300' }`}
          >
            {symptom}
          </button>
        ))}
      </div>
      <div className="text-sm text-gray-600">{filteredCount} 件が該当しました。</div>
    </div>
  );
}