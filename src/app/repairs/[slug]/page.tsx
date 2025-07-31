import { getRepairCases } from '@/lib/microcms';
import { notFound } from 'next/navigation';
import { Calendar, Tag, Folder, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  params: { slug: string };
};

export default async function Page({ params }: Props) {
  const { slug } = params;
  const { contents } = await getRepairCases({ limit: 100 });
  const repair = contents.find((item) => item.slug === slug);

  if (!repair) {
    notFound();
  }

  return (
    <div className="prose prose-neutral max-w-3xl mx-auto p-4">
      <Link href="/repairs" className="flex items-center mb-4 text-sm text-gray-600 hover:underline">
        <ArrowLeft className="w-4 h-4 mr-1" /> 修理事例一覧に戻る
      </Link>
      <h1>{repair.title}</h1>

      {repair.mainImage?.url && (
        <Image
          src={repair.mainImage.url}
          alt="Repair image"
          width={repair.mainImage.width ?? 800}
          height={repair.mainImage.height ?? 600}
          className="rounded-lg my-4"
        />
      )}

      <div className="flex gap-4 text-sm text-gray-500 my-2">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          {new Date(repair.publishedAt).toLocaleDateString()}
        </div>

        {!!repair.categories?.length && (
          <div className="flex items-center gap-1">
            <Folder className="w-4 h-4" />
            {repair.categories.map((cat: { name: string }) => cat.name).join(', ')}
          </div>
        )}

        {!!repair.tags?.length && (
          <div className="flex items-center gap-1">
            <Tag className="w-4 h-4" />
            {repair.tags.map((tag: { name: string }) => tag.name).join(', ')}
          </div>
        )}
      </div>

      <div dangerouslySetInnerHTML={{ __html: repair.body ?? '' }} />
    </div>
  );
}

export async function generateStaticParams() {
  const { contents } = await getRepairCases({ limit: 100 });
  return contents.map((item) => ({ slug: item.slug }));
}
