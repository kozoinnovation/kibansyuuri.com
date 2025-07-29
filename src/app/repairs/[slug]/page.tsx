import { notFound } from 'next/navigation';
import { client } from '@/libs/client';
import type { Repair } from '@/types/repair';

type Props = {
  params: { slug: string };
};

export default async function RepairDetailPage({ params }: Props) {
  try {
    const data = await client.get<Repair>({
      endpoint: 'repairs',
      contentId: params.slug,
    });

    return (
      <article className="prose prose-lg max-w-4xl mx-auto px-4 py-12">
        <h1>{data.title}</h1>

        {data.image && (
          <img
            src={data.image.url}
            width={data.image.width}
            height={data.image.height}
            alt={data.title}
          />
        )}

        <div
          dangerouslySetInnerHTML={{ __html: data.content }}
        />

        <p className="text-sm text-gray-500 mt-6">
          公開日: {new Date(data.publishedAt).toLocaleDateString()}
        </p>
      </article>
    );
  } catch (error) {
    return notFound();
  }
}
