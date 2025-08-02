'use client';

import React, { useEffect, useState } from 'react';
import { getRepairCases, getCategories, getSymptoms } from '@/lib/microcms';
import type { RepairCase } from '@/types/repair';
import type { Category } from '@/types/category';
import type { Symptom } from '@/types/symptom';
import RepairCaseList from './RepairCaseList';

export default function RepairExamplesClient() {
  const [allCases, setAllCases] = useState<RepairCase[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [allSymptoms, setAllSymptoms] = useState<Symptom[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSymptoms, setSelectedSymptoms] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [repairData, categoryData, symptomData] = await Promise.all([
          getRepairCases({ limit: 100 }),
          getCategories(),   // Category[] を返す想定
          getSymptoms(),     // Symptom[] を返す想定
        ]);

        setAllCases(repairData.contents);
        setCategories(categoryData);      // ✅ .contents を削除
        setAllSymptoms(symptomData);      // ✅ .contents を削除
      } catch (error) {
        console.error('データ取得エラー:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCategorySelect = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    setSelectedSymptoms(new Set());
  };

  const handleSymptomToggle = (symptomId: string) => {
    const updated = new Set(selectedSymptoms);
    if (updated.has(symptomId)) {
      updated.delete(symptomId);
    } else {
      updated.add(symptomId);
    }
    setSelectedSymptoms(updated);
  };

  if (isLoading) {
    return <div>読み込み中...</div>;
  }

  return (
    <RepairCaseList
      allCases={allCases}
      selectedCategory={selectedCategory}
      selectedSymptoms={selectedSymptoms}
      handleCategorySelect={handleCategorySelect}
      handleSymptomToggle={handleSymptomToggle}
      allSymptoms={allSymptoms}
      categories={categories}
    />
  );
}
