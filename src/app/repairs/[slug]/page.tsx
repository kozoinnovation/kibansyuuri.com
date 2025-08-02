import { getRepairCase, getRepairCases } from '@/lib/microcms';
import { notFound } from 'next/navigation';
import { Folder } from 'lucide-react';
import Image from 'next/image';
import type { RepairCase } from '@/types/repair';

export async function generateStaticParams() {
  const { contents } = await getRepairCases({ fields: ['slug'] });
  return contents.map((post) => ({ slug: post.slug }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function RepairCasePage(props: any) {
  const { slug } = props.params;
  const repair: RepairCase | null = await getRepairCase(slug);

  if (!repair) {
    notFound();
  }

  const hasCategories =
    Array.isArray(repair.categories) && repair.categories.length > 0;

  return (
    <article className="bg-white">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 border-b pb-2">
            {repair.title}
          </h1>

          {hasCategories && (
            <div className="flex items-center text-sm text-gray-600 mb-6">
              <Folder className="w-4 h-4 mr-2 text-gray-500" />
              {repair.categories!.map((cat, index) => (
                <span key={cat.id}>
                  {cat.name}
                  {index < repair.categories!.length - 1 && ', '}
                </span>
              ))}
            </div>
          )}

          {repair.mainImage && (
            <Image
              src={repair.mainImage.url}
              alt={repair.title}
              width={repair.mainImage.width || 800}
              height={repair.mainImage.height || 600}
              className="w-full h-auto rounded-xl shadow-md mb-10"
            />
          )}

          <div
            className="prose prose-neutral prose-lg max-w-none text-gray-800"
            dangerouslySetInnerHTML={{ __html: repair.body }}
          />
        </div>
      </section>
    </article>
  );
}
