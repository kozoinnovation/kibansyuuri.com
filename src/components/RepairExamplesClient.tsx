'use client';

import React, { useState } from 'react';
import FilterSection from './FilterSection';
import RepairCaseCard from './RepairCaseCard';
import type { RepairCase } from '@/types/repair';

export default function RepairExamplesClient({
  allRepairExamples,
}: {
  allRepairExamples: RepairCase[];
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSymptoms, setSelectedSymptoms] = useState<Set<string>>(
    new Set()
  );

  const allSymptoms = Array.from(
    new Set(allRepairExamples.flatMap((ex) => ex.tags?.map((tag) => tag.name) || []))
  );

  const filteredExamples = allRepairExamples.filter((example) => {
    const categoryMatch =
      selectedCategory === 'all' ||
      example.categories?.some((cat) => cat.slug === selectedCategory);
    const symptomsMatch =
      selectedSymptoms.size === 0 ||
      Array.from(selectedSymptoms).every((symptom) =>
        example.tags?.some((tag) => tag.name === symptom)
      );
    return categoryMatch && symptomsMatch;
  });

  const handleSymptomToggle = (symptom: string) => {
    const newSet = new Set(selectedSymptoms);
    if (newSet.has(symptom)) {
      newSet.delete(symptom);
    } else {
      newSet.add(symptom);
    }
    setSelectedSymptoms(newSet);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-inter p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
          修理事例一覧
        </h1>
      </header>
      <div className="max-w-6xl mx-auto bg-white p-4 sm:p-6 rounded-xl shadow-lg">
        <FilterSection
          selectedCategory={selectedCategory}
          selectedSymptoms={selectedSymptoms}
          allSymptoms={allSymptoms}
          handleCategorySelect={setSelectedCategory}
          handleSymptomToggle={handleSymptomToggle}
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