'use client';

import React, { useState, useEffect } from 'react';
import { getSymptoms, getCategories } from '@/lib/microcms';
import type { Symptom } from '@/types/symptom';
import type { Category } from '@/types/category';

type Props = {
  selectedCategory: string;
  selectedSymptoms: Set<string>;
  handleCategorySelect: (category: string) => void;
  handleSymptomToggle: (symptom: string) => void;
  filteredCount: number;
};

export default function FilterSection({
  selectedCategory,
  selectedSymptoms,
  handleCategorySelect,
  handleSymptomToggle,
  filteredCount,
}: Props) {
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  // CMSから症状一覧を取得
  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const { contents } = await getSymptoms();
        setSymptoms(contents);
      } catch (error) {
        console.error('❌ 症状データの取得に失敗しました:', error);
      }
    };
    fetchSymptoms();
  }, []);

  // CMSからカテゴリ一覧を取得
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { contents } = await getCategories();
        console.log('✅ カテゴリーデータ取得:', contents);
        const safeCategories = contents.filter(
          (cat): cat is Category => typeof cat.name === 'string' && typeof cat.slug === 'string'
        );
        setCategories([{ id: 'all', name: '全て', slug: 'all' }, ...safeCategories]);
      } catch (error) {
        console.error('❌ カテゴリーデータの取得に失敗しました:', error);
      }
    };
    fetchCategories();
  }, []);

  return (
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
              {category.name || '（名前未設定）'}
            </button>
          ))}
        </div>
      </div>

      {/* 症状フィルター */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 pl-1">症状</h3>
        <div className="flex flex-wrap gap-3">
          {symptoms.map((symptom) => (
            <label
              key={symptom.id}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-full border cursor-pointer transition-colors duration-200 ${
                selectedSymptoms.has(symptom.name)
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              <input
                type="checkbox"
                checked={selectedSymptoms.has(symptom.name)}
                onChange={() => handleSymptomToggle(symptom.name)}
                className="absolute opacity-0 w-0 h-0"
              />
              <span>{symptom.name || '（名前未設定）'}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 件数表示 */}
      <div className="text-right text-sm sm:text-base text-gray-600 font-medium pt-4 border-t border-gray-200">
        <span className="text-blue-500 text-lg sm:text-xl font-bold">{filteredCount}</span>{' '}
        件の事例が見つかりました
      </div>
    </section>
  );
}
