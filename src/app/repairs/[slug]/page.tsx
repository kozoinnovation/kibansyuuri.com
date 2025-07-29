// src/app/repairs/[slug]/page.tsx
import { getRepairCases } from '@/libs/microcms';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Tag, Folder, ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import type { RepairCase } from '@/types/repair';

type Props = {
  params: {
    slug: string;
  };
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
};

export async function generateStaticParams() {
  try {
    const { contents } = await getRepairCases({ limit: 1000 });
    if (!contents || contents.length === 0) {
      return [];
    }
    return contents.map((post) => ({ slug: post.slug }));
  } catch (error) {
    console.error("Failed to generate static params:", error);
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const { contents } = await getRepairCases({ filters: `slug[equals]${slug}` });
  const post = contents?.[0];

  if (!post) {
    return {
      title: '修理事例 | Not Found',
      description: '該当する修理事例は見つかりませんでした。',
    };
  }
  return {
    title: `${post.title} | 修理事例`,
    description: post.body?.slice(0, 120).replace(/<[^>]+>/g, '') ?? '修理事例の詳細ページです。',
  };
}

export default async function RepairCaseDetailPage({ params }: Props) {
  const { slug } = params;
  const { contents } = await getRepairCases({ filters: `slug[equals]${slug}` });
  const post = contents?.[0] as RepairCase | undefined;

  if (!post) {
    notFound();
  }

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

          {post.image && (
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
            dangerouslySetInnerHTML={{ __html: post.body }}
          />

          {post.tags && post.tags.length > 0 && (
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
          )}
        </article>
      </main>
    </div>
  );
}
