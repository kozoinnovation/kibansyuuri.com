'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { RepairCase } from '@/lib/microcms';

const RepairCard = ({ repairCase }: { repairCase: RepairCase }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden group transition-shadow hover:shadow-xl">
    <a href={`/repairs/${repairCase.slug}`} className="block">
      <div className="relative">
        {repairCase.image?.url ? (
          <Image
            src={`${repairCase.image.url}?w=400&auto=format&fit=max`}
            alt={repairCase.title}
            width={400}
            height={250}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <Image
            src="https://placehold.co/400x250/E0E0E0/333333?text=No+Image"
            alt="No image"
            width={400}
            height={250}
            className="w-full h-48 object-cover"
            loading="lazy"
          />
        )}
        {repairCase.category && (
          <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
            {repairCase.category.name}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">
          {repairCase.title}
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {repairCase.tags?.map((tag) => (
            <span
              key={tag.id}
              className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full"
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    </a>
  </div>
);

type Props = {
  initialRepairs: RepairCase[];
  totalCount: number;
};

export default function ClientPage({ initialRepairs, totalCount }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSymptoms, setSelectedSymptoms] = useState(new Set<string>());
  const [filteredExamples, setFilteredExamples] = useState<RepairCase[]>(initialRepairs);

  const allCategories = useMemo(
    () => Array.from(new Set(initialRepairs.map((ex) => ex.category?.name).filter(Boolean))),
    [initialRepairs]
  );

  const allSymptoms = useMemo(
    () => Array.from(new Set(initialRepairs.flatMap((ex) => ex.tags?.map((tag) => tag.name).filter(Boolean) || []))),
    [initialRepairs]
  );

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
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
    let currentFiltered = initialRepairs;

    if (selectedCategory !== 'all') {
      currentFiltered = currentFiltered.filter(
        (example) => example.category?.name === selectedCategory
      );
    }

    if (selectedSymptoms.size > 0) {
      currentFiltered = currentFiltered.filter((example) =>
        Array.from(selectedSymptoms).every((symptom) =>
          example.tags?.some((tag) => tag.name === symptom)
        )
      );
    }

    setFilteredExamples(currentFiltered);
  }, [initialRepairs, selectedCategory, selectedSymptoms]);

  return (
    <div className="min-h-screen bg-gray-100 font-sans p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">修理事例一覧</h1>
        <p className="text-md sm:text-lg text-gray-600">
          全{totalCount}件の修理事例から、症状や機種で絞り込んで探すことができます。
        </p>
      </header>

      <div className="max-w-6xl mx-auto bg-white p-4 sm:p-6 rounded-xl shadow-lg">
        <div className="mb-6 border-b pb-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">ジャンルで絞り込む</h2>
          <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
            <button
              onClick={() => handleCategorySelect('all')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-in-out ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-blue-100 hover:text-blue-700'
              }`}
            >
              全て
            </button>
            {allCategories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-in-out ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-200 text-gray-700 hover:bg-blue-100 hover:text-blue-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">症状で絞り込む</h2>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {allSymptoms.map((symptom) => (
              <label key={symptom} className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600 rounded-md border-gray-300 focus:ring-blue-500"
                  checked={selectedSymptoms.has(symptom)}
                  onChange={() => handleSymptomToggle(symptom)}
                />
                <span className="ml-2 text-gray-700 text-sm">{symptom}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExamples.length > 0 ? (
            filteredExamples.map((example) => (
              <RepairCard key={example.id} repairCase={example} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600 text-lg py-10 bg-gray-50 rounded-xl shadow-inner">
              選択された条件に一致する修理事例は見つかりませんでした。
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
