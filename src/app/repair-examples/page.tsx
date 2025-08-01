'use client';

import React, { useState, useEffect, useMemo } from 'react';
import RepairCaseCard from '@/components/RepairCaseCard';
import FilterSection from '@/components/FilterSection';
import { getRepairCases } from '@/lib/microcms';
import type { RepairCase } from '@/types/repair';

export default function RepairExamplesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSymptoms, setSelectedSymptoms] = useState(new Set<string>());
  const [allRepairExamples, setAllRepairExamples] = useState<RepairCase[]>([]);
  const [filteredExamples, setFilteredExamples] = useState<RepairCase[]>([]);
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

  const allSymptoms = useMemo(
    () =>
      Array.from(
        new Set(
          allRepairExamples.flatMap((ex) => ex.symptoms?.map((s) => s.name) || [])
        )
      ),
    [allRepairExamples]
  );

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSelectedSymptoms(new Set<string>());
  };

  const handleSymptomToggle = (symptom: string) => {
    const newSelectedSymptoms = new Set(selectedSymptoms);
    if (newSelectedSymptoms.has(symptom)) {
      newSelectedSymptoms.delete(symptom);
    } else {
      newSelectedSymptoms.add(symptom);
    }
    setSelectedSymptoms(newSelectedSymptoms);
  };

  useEffect(() => {
    let currentFiltered = allRepairExamples;

    if (selectedCategory !== 'all') {
      currentFiltered = currentFiltered.filter((example) =>
        example.categories?.some((cat) => cat.slug === selectedCategory)
      );
    }

    if (selectedSymptoms.size > 0) {
      currentFiltered = currentFiltered.filter((example) =>
        Array.from(selectedSymptoms).every((symptomName) =>
          example.symptoms?.some((s) => s.name === symptomName)
        )
      );
    }

    setFilteredExamples(currentFiltered);
  }, [allRepairExamples, selectedCategory, selectedSymptoms]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 font-inter p-8 flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 font-inter p-8 flex items-center justify-center">
        <div className="text-center p-6 bg-red-100 border-red-400 text-red-700">
          <p>エラー: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-inter p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
          修理事例一覧
        </h1>
      </header>
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <FilterSection
          selectedCategory={selectedCategory}
          selectedSymptoms={selectedSymptoms}
          handleCategorySelect={handleCategorySelect}
          handleSymptomToggle={handleSymptomToggle}
          filteredCount={filteredExamples.length}
          allSymptoms={allSymptoms}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredExamples.map((post) => (
            <RepairCaseCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
