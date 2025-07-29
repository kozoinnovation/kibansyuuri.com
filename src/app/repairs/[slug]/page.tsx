// src/app/repairs/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { client } from '@/libs/client'
import type { Repair } from '@/types/repair'
import type { Metadata } from 'next'

type Params = { slug: string }

// 1) SSG 用パスを生成
export async function generateStaticParams(): Promise<Params[]> {
  const res = await client.getList<Repair>({
    endpoint: 'repairs',
    queries: { limit: 1000 },
  })
  return res.contents.map((item) => ({ slug: item.id }))
}

// 2) ページメタデータを生成
export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  try {
    const data = await client.get<Repair>({
      endpoint: 'repairs',
      contentId: params.slug,
    })
    return {
      title: data.title,
      description:
        data.content
          .slice(0, 120)
          .replace(/<[^>]+>/g, '') ?? '修理事例の詳細ページです。',
    }
  } catch {
    return {
      title: '修理事例 | Not Found',
      description: '該当する修理事例は見つかりませんでした。',
    }
  }
}

// 3) デフォルトエクスポートは必ず「Page」という名前で
export default async function Page({
  params,
  searchParams,
}: {
  params: Params
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const data = await client.get<Repair>({
    endpoint: 'repairs',
    contentId: params.slug,
  })
  if (!data) return notFound()

  return (
    <article className="prose prose-lg max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">{data.title}</h1>

      {data.image?.url && (
        <img
          src={data.image.url}
          width={data.image.width}
          height={data.image.height}
          alt={data.title}
        />
      )}

      <div
        className="mt-8"
        dangerouslySetInnerHTML={{ __html: data.content }}
      />

      <p className="text-sm text-gray-500 mt-6">
        公開日:{' '}
        {new Date(data.publishedAt).toLocaleDateString('ja-JP')}
      </p>
    </article>
  )
}
