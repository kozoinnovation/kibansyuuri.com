// app/repairs/page.tsx
import React from 'react'
import Link from 'next/link'
import { getRepairCases } from '@/lib/microcms'

export default async function RepairsPage() {
  const data = await getRepairCases()

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">修理事例一覧</h1>
      <ul className="space-y-2">
        {data.contents.map((repair) => (
          <li key={repair.id}>
            <Link href={`/repairs/${repair.slug}`}>
              <span className="text-blue-600 hover:underline">
                {repair.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
