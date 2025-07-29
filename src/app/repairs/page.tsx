// app/repairs/page.tsx
import React from 'react'
import Link from 'next/link'

const repairsList = [
  {
    title: 'AQUOS sense5G 起動不可修理',
    slug: 'aquos-sense5g-pmic-repair',
  },
  {
    title: 'iPhone 11 Pro Max NANDリボール',
    slug: 'iphone-11promax-nand-reball',
  },
  // microCMS連携したらAPIから取得に変更予定
]

export default function RepairsPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">修理事例一覧</h1>
      <ul className="space-y-2">
        {repairsList.map((repair) => (
          <li key={repair.slug}>
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
