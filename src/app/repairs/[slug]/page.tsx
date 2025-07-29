// src/app/repairs/[slug]/page.tsx

import { getRepairCases } from '@/libs/microcms';
import { notFound } from 'next/navigation';
import { Calendar, Tag, Folder, ArrowLeft } from 'lucide-react';

// --- 静的サイト生成のための設定 (SSG) ---
// ビルド時に、microCMSにある全ての修理事例のページを事前に生成します。
// これにより、表示速度が非常に速くなります。
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
  // URLのslugを元に、microCMSから該当する記事を1件だけフィルタリングして取得
  const { contents } = await getRepairCases({
    filters: `slug[equals]${slug}`,
  });

  // 記事が見つからなかった場合は、404ページを表示
  if (contents.length === 0) {
    notFound();
  }

  const post = contents[0];

  return (
    <div className="bg-white min-h-screen">
      <main className="container mx-auto px-4 py-8 sm:py-12">
        <article className="max-w-3xl mx-auto">
          {/* 一覧へ戻るリンク */}
          <a href="/repairs" className="inline-flex items-center gap-2 text-blue-600 hover:underline mb-6 text-sm">
            <ArrowLeft size={16} />
            修理事例一覧へ戻る
          </a>

          {/* タイトル */}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>

          {/* 投稿日・カテゴリ */}
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

          {/* アイキャッチ画像 */}
          <figure className="mb-8">
            <img
              src={`${post.image.url}?w=800&auto=format`}
              alt={post.title}
              width={800}
              height={450}
              className="w-full rounded-lg shadow-md object-cover"
            />
          </figure>

          {/* 本文 (microCMSのリッチテキストをHTMLとして表示) */}
          <div
            className="prose lg:prose-lg max-w-none"
            dangerouslySetInnerHTML={{
              __html: post.body,
            }}
          />

          {/* タグ */}
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

// Tailwind CSSの `prose` クラスを有効にするためのスタイル
// globals.cssに追記するか、このコンポーネントに直接スタイルを適用します
const styles = `
  .prose h2 {
    font-size: 1.5em;
    margin-top: 2em;
    margin-bottom: 1em;
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 0.5em;
  }
  .prose p {
    line-height: 1.8;
  }
  .prose a {
    color: #2563eb;
  }
  .prose ul {
    list-style: disc;
    padding-left: 1.5em;
  }
`;

// スタイルを適用するためのコンポーネント
// Next.js 13以降では、<style jsx>がサーバーコンポーネントで直接使えないため、
// このようにするか、globals.cssに追記するのが一般的です。
// 今回は簡単のため、このファイル内では定義のみに留めます。
// 上記のスタイルを `src/app/globals.css` に追記することをお勧めします。