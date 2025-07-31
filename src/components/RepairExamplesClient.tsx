'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import RepairCaseList from '@/components/RepairCaseList';
import { getRepairCases } from '@/lib/microcms';
import type { RepairCase } from '@/types/repair';

export default function RepairExamplesClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get('category') || 'all';
  const selectedSymptoms = useMemo(() => {
    const symptomsParam = searchParams.get('symptoms');
    return new Set<string>(symptomsParam ? symptomsParam.split(',') : []);
  }, [searchParams]);

  const [allRepairExamples, setAllRepairExamples] = useState<RepairCase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndSetRepairExamples = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { contents } = await getRepairCases({ limit: 9999 });
        setAllRepairExamples(contents);
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : String(e);
        setError(errorMessage);
        console.error('Failed to fetch repair examples from microCMS:', e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAndSetRepairExamples();
  }, []);

  const handleCategorySelect = (category: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (category === 'all') {
      newSearchParams.delete('category');
    } else {
      newSearchParams.set('category', category);
    }
    newSearchParams.delete('symptoms');
    router.push(`?${newSearchParams.toString()}`);
  };

  const handleSymptomToggle = (symptom: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    const currentSymptoms = new Set<string>(
      selectedSymptoms ? Array.from(selectedSymptoms) : []
    );

    if (currentSymptoms.has(symptom)) {
      currentSymptoms.delete(symptom);
    } else {
      currentSymptoms.add(symptom);
    }

    if (currentSymptoms.size > 0) {
      newSearchParams.set('symptoms', Array.from(currentSymptoms).join(','));
    } else {
      newSearchParams.delete('symptoms');
    }
    router.push(`?${newSearchParams.toString()}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>読み込み中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>エラーが発生しました: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">修理事例一覧</h1>
      </header>
      <div className="max-w-6xl mx-auto bg-white p-4 sm:p-6 rounded-xl shadow-lg">
        <RepairCaseList
          allCases={allRepairExamples}
          selectedCategory={selectedCategory}
          selectedSymptoms={selectedSymptoms}
          handleCategorySelect={handleCategorySelect}
          handleSymptomToggle={handleSymptomToggle}
        />
      </div>
    </div>
  );
}
