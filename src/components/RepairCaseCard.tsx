'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Tag, Folder } from 'lucide-react';
import type { RepairCase } from '@/types/repair';

interface Props {
  post: RepairCase;
}

const RepairCaseCard: React.FC<Props> = ({ post }) => {
  const date = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString()
    : '日付不明';

  return (
    <Link
      href={`/repairs/${post.slug}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-4 h-full flex flex-col"
    >
      <div className="flex-grow">
        {post.mainImage?.url ? (
          <Image
            src={post.mainImage.url}
            alt={post.title}
            width={400}
            height={240}
            className="w-full h-48 object-cover rounded-md mb-3"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 rounded-md mb-3" />
        )}
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          {post.title}
        </h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {post.excerpt}
        </p>
      </div>

      <div className="flex flex-wrap text-xs text-gray-500 gap-x-3 gap-y-1 mt-2 pt-2 border-t">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{date}</span>
        </div>
        {post.categories
          ?.filter((cat) => cat && cat.id)
          .map((cat) => (
            <div key={cat.id} className="flex items-center gap-1">
              <Folder className="w-4 h-4" />
              <span>{cat.name}</span>
            </div>
          ))}
        {post.tags
          ?.filter((tag) => tag && tag.id)
          .map((tag) => (
            <div key={tag.id} className="flex items-center gap-1">
              <Tag className="w-4 h-4" />
              <span>{tag.name}</span>
            </div>
          ))}
      </div>
    </Link>
  );
};

export default RepairCaseCard;