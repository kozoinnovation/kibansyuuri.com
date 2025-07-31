import { getRepairCases, getRepairCaseBySlug } from '@/lib/microcms';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { RepairCase } from '@/types/repair';

// ✅ generateStaticParams：Next.jsが要求する正しい形式
export async function generateStaticParams(): Promise<{ params: { slug: string } }[]> {
  const { contents } = await getRepairCases({ limit: 9999 });

  return contents
    .filter((post) => post.slug)
    .map((post) => ({
      params: {
        slug: post.slug,
      },
    }));
}

// ✅ dynamic routingを制限（SSG構成として明示）
export const dynamicParams = false;

// ✅ 型定義：Next.jsの構造に完全準拠
type Props = {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] };
};

// ✅ asyncコンポーネントでmicroCMSからデータ取得＆表示
async function DetailPageContent({ params }: { params: { slug: string } }) {
  const post: RepairCase | null = await getRepairCaseBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="bg-white rounded-lg shadow-lg overflow-hidden">
      {post.image && (
        <Image
          src={`${post.image.url}?w=1200&auto=format&fit=max`}
          alt={post.title}
          width={1200}
          height={630}
          className="w-full h-auto"
          priority
        />
      )}
      <div className="p-6 sm:p-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600">
          <span>
            公開日: {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
          </span>
          {post.categories?.map((cat) => (
            <span
              key={cat.id}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
            >
              {cat.name}
            </span>
          ))}
        </div>
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />
        {post.tags?.map((tag) => (
          <div key={tag.id} className="mt-8 pt-6 border-t">
            {/* Tag display logic here */}
          </div>
        ))}
      </div>
    </article>
  );
}

// ✅ default exportは同期関数。asyncを中で呼ぶ構造
export default function RepairCaseDetailPageWrapper({ params }: Props) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* @ts-expect-error Async Server Component */}
        <DetailPageContent params={params} />
      </div>
    </div>
  );
}
