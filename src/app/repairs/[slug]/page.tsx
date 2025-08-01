import { getRepairCase, getRepairCases } from '@/lib/microcms';
import { notFound } from 'next/navigation';
import { Folder } from 'lucide-react';
import Image from 'next/image';

export async function generateStaticParams() {
  const { contents } = await getRepairCases({ fields: ['slug'] });
  const paths = contents.map((post) => ({ slug: post.slug }));
  return [...paths];
}

type Props = {
  params: {
    slug: string;
  };
};

export default async function RepairCasePage({ params }: Props) {
  const { slug } = params;
  const repair = await getRepairCase(slug);

  if (!repair) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{repair.title}</h1>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 mb-6">
        {repair.categories && repair.categories.length > 0 && (
          <div className="flex items-center gap-2">
            <Folder className="w-4 h-4" />
            {repair.categories.map((cat, index) => (
              <span key={cat.id}>
                {cat.name}
                {index < repair.categories!.length - 1 && ', '}
              </span>
            ))}
          </div>
        )}
      </div>
      {repair.mainImage && (
        <Image
          src={repair.mainImage.url}
          alt={repair.title}
          width={repair.mainImage.width || 800}
          height={repair.mainImage.height || 600}
          className="w-full h-auto rounded-lg mb-8"
        />
      )}
      <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: repair.body }} />
    </article>
  );
}