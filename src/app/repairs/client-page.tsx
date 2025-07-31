'use client';

// vvvvvvvvv ここを修正しました vvvvvvvvv
import React, { useState, useEffect } from 'react'; // 不要な useMemo を削除
// ^^^^^^^^^ ここを修正しました ^^^^^^^^^
import Image from 'next/image';
import type { RepairCase } from '@/types/repair';

const RepairCard = ({ repairCase }: { repairCase: RepairCase }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden group">
    <a href={`/repairs/${repairCase.slug}`} className="block">
      <div className="relative">
        {repairCase.image?.url ? (
          <Image
            src={`${repairCase.image.url}?w=400&auto=format&fit=max`}
            alt={repairCase.title}
            width={400}
            height={250}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200" />
        )}
        {repairCase.categories && repairCase.categories.length > 0 && (
          <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
            {repairCase.categories[0].name}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800">{repairCase.title}</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {repairCase.tags
            ?.filter((tag) => tag && tag.id)
            .map((tag) => (
              <span
                key={tag.id}
                className="text-xs bg-gray-200 px-2 py-1 rounded-full"
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
  const [filteredExamples, setFilteredExamples] =
    useState<RepairCase[]>(initialRepairs);

  useEffect(() => {
    setFilteredExamples(initialRepairs);
  }, [initialRepairs]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">修理事例一覧</h1>
        <p>
          全{totalCount}件の修理事例から、症状や機種で絞り込んで探すことができます。
        </p>
      </header>
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExamples.map((example) => (
            <RepairCard key={example.id} repairCase={example} />
          ))}
        </div>
      </div>
    </div>
  );
}