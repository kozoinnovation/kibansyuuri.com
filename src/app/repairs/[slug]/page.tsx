// src/app/repairs/[slug]/page.tsx

import { getRepairCases } from '@/libs/microcms';
import { notFound } from 'next/navigation';
import Link from 'next/link'; // Linkコンポーネントをインポート
import { Calendar, Tag, Folder, ArrowLeft } from 'lucide-react';

// --- 静的サイト生成のための設定 (SSG) ---
export async function generateStaticParams() {
  const { contents } = await getRepairCases({ limit: 1000 });

  const paths = contents.map((post) => {
    return {
      slug: post.slug,
    };
  });

  return [...paths];
}


// --- メインのページコンポーネント ---
export default async function RepairCaseDetailPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const { contents } = await getRepairCases({
    filters: `slug[equals]${slug}`,
  });

  if (contents.length === 0) {
    notFound();
  }

  const post = contents[0];

  return (
    <div className="bg-white min-h-screen">
      <main className="container mx-auto px-4 py-8 sm:py-12">
        <article className="max-w-3xl mx-auto">
          {/* <a>タグを<Link>コンポーネントに修正 */}
          <Link href="/repairs" className="inline-flex items-center gap-2 text-blue-600 hover:underline mb-6 text-sm">
            <ArrowLeft size={16} />
            修理事例一覧へ戻る
          </Link>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 mb-6 border-b pb-4">
            <div className="flex items-center gap-1.5">
              <Calendar size={14} />
              <span>{new Date(post.publishedAt).toLocaleDateString('ja-JP')}</span>
            </div>
            {post.category && (
              <div className="flex items-center gap-1.5">
                <Folder size={14} />
                <span>{post.category.name}</span>
              </div>
            )}
          </div>

          <figure className="mb-8">
            <img
              src={`${post.image.url}?w=800&auto=format`}
              alt={post.title}
              width={800}
              height={450}
              className="w-full rounded-lg shadow-md object-cover"
            />
          </figure>

          <div
            className="prose lg:prose-lg max-w-none"
            dangerouslySetInnerHTML={{
              __html: post.body,
            }}
          />

          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t">
              <div className="flex flex-wrap items-center gap-2">
                <Tag size={16} className="text-gray-500" />
                {post.tags.map((tag) => (
                  <span key={tag.id} className="bg-gray-200 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full">
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
