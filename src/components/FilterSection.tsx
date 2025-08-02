'use client';

import React from 'react';
import { Folder, HeartPulse } from 'lucide-react';
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

// ✅ カテゴリ表示名補正
const formatCategoryName = (name: string) => {
  const map: Record<string, string> = {
    iphone: 'iPhone',
    android: 'Android',
    pc: 'PC',
    garake: 'ガラケー',
    'game-console': 'ゲーム機',
    other: 'その他',
  };
  return map[name.toLowerCase()] ?? name;
};

// ✅ カテゴリの表示順
const CATEGORY_ORDER = [
  'iphone',
  'android',
  'pc',
  'garake',
  'game-console',
  'other',
];

// ✅ 症状の表示順
const SYMPTOM_ORDER = [
  '起動不可',
  'リンゴループ',
  '充電できない',
  'タッチ不良',
  '画面映らない',
  '水没',
  '熱暴走',
  'バッテリー異常',
  'ゴーストタッチ',
  'SIM認識しない',
  'その他',
];

export default function FilterSection({
  selectedCategory,
  selectedSymptoms,
  filteredCount,
  allSymptoms,
  categories,
  handleCategorySelect,
  handleSymptomToggle,
}: Props) {
  const sortedCategories = [...categories].sort((a, b) => {
    const indexA = CATEGORY_ORDER.indexOf(a.slug);
    const indexB = CATEGORY_ORDER.indexOf(b.slug);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  const sortedSymptoms = [...allSymptoms].sort((a, b) => {
    const indexA = SYMPTOM_ORDER.indexOf(a.name);
    const indexB = SYMPTOM_ORDER.indexOf(b.name);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  return (
    <div className="space-y-8 bg-white rounded-xl p-6 shadow-md">
      {/* カテゴリ絞り込み */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Folder className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-800">カテゴリで絞り込み</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
            }`}
            onClick={() => handleCategorySelect('all')}
          >
            すべて
          </button>
          {sortedCategories.map((cat) => (
            <button
              key={cat.id}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                selectedCategory === cat.slug
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
              }`}
              onClick={() => handleCategorySelect(cat.slug)}
            >
              {formatCategoryName(cat.name ?? cat.slug ?? 'カテゴリ')}
            </button>
          ))}
        </div>
      </div>

      {/* 症状絞り込み */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <HeartPulse className="w-5 h-5 text-green-600" />
          <h2 className="text-lg font-semibold text-gray-800">症状で絞り込み</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {sortedSymptoms.map((sym) => (
            <button
              key={sym.id}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                selectedSymptoms.has(sym.id)
                  ? 'bg-green-600 text-white border-green-600'
                  : 'bg-green-50 text-green-700 hover:bg-green-100'
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
        該当件数：<span className="font-semibold text-gray-800">{filteredCount}</span> 件
      </div>
    </div>
  );
}
