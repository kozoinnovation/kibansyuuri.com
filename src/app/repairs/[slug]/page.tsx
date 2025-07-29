// src/app/repairs/[slug]/page.tsx
import type { Metadata } from 'next';
import { getRepairCases } from '@/libs/microcms';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Tag, Folder, ArrowLeft } from 'lucide-react';
import type { RepairCase } from '@/types/repair';

type Params = { slug: string };

// ── 1) SSG 用パスを一括生成 ───────────────────────────
export async function generateStaticParams(): Promise<Params[]> {
  const { contents } = await getRepairCases({ limit: 1000 });
  if (!contents || contents.length === 0) return [];
  return contents.map((post) => ({ slug: post.slug }));
}

// ── 2) SEOメタデータ生成 ───────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { contents } = await getRepairCases({
    filters: `slug[equals]${params.slug}`,
  });
  const post = contents?.[0];
  if (!post) {
    return {
      title: '修理事例 | Not Found',
      description: 'お探しの修理事例は見つかりませんでした。',
    };
  }
  const plain = post.body?.replace(/<[^>]+>/g, '') ?? '';
  return {
    title: `${post.title} | 修理事例`,
    description: plain.slice(0, 120),
  };
}

// ── 3) デフォルトエクスポートは同期ラッパー ───────────────
export default function RepairCaseDetailPageWrapper({
  params,
  searchParams,
}: {
  params: Params;
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  // 非同期コンポーネントを呼び出す
  return <RepairCaseDetailPage params={params} />;
}

// ── 4) 実際のフェッチ／描画は async コンポーネント ──────────
async function RepairCaseDetailPage({
  params,
}: {
  params: Params;
}) {
  const { contents } = await getRepairCases({
    filters: `slug[equals]${params.slug}`,
  });
  const post = contents?.[0] as RepairCase | undefined;
  if (!post) notFound();

  return (
    <div className="bg-white min-h-screen">
      <main className="container mx-auto px-4 py-8 sm:py-12">
        <article className="max-w-3xl mx-auto">
          <Link
            href="/repairs"
            className="inline-flex items-center gap-2 text-blue-600 hover:underline mb-6 text-sm"
          >
            <ArrowLeft size={16} />
            修理事例一覧へ戻る
          </Link>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 mb-6 border-b pb-4">
            <div className="flex items-center gap-1.5">
              <Calendar size={14} />
              <span>
                {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
              </span>
            </div>
            {post.category && (
              <div className="flex items-center gap-1.5">
                <Folder size={14} />
                <span>{post.category.name}</span>
              </div>
            )}
          </div>

          {post.image?.url && (
            <figure className="mb-8">
              <img
                src={`${post.image.url}?w=800&auto=format`}
                alt={post.title}
                width={800}
                height={450}
                className="w-full rounded-lg shadow-md object-cover"
              />
            </figure>
          )}

          <div
            className="prose lg:prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.body ?? '' }}
          />

          {post.tags?.length ? (
            <div className="mt-8 pt-6 border-t">
              <div className="flex flex-wrap items-center gap-2">
                <Tag size={16} className="text-gray-500" />
                {post.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="bg-gray-200 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </article>
      </main>
    </div>
  );
}
