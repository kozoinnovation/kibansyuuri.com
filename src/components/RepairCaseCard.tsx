'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar } from 'lucide-react';
import type { RepairCase } from '@/types/repair';

type Props = {
  post: RepairCase;
  priority?: boolean; // 🔑 LCP画像判定用（親から渡す）
};

export default function RepairCaseCard({ post, priority = false }: Props) {
  return (
    <Link
      href={`/repairs/${post.slug}`}
      className="block border rounded-lg shadow-md hover:shadow-xl transition duration-200 overflow-hidden"
    >
      {post.mainImage?.url && (
        <Image
          src={post.mainImage.url}
          alt={post.title}
          width={600}
          height={400}
          quality={75}
          className="w-full h-48 object-cover"
          loading={priority ? 'eager' : 'lazy'} // ✅ 最初の画像のみ eager
          priority={priority} // ✅ LCP対象に最適化
          sizes="(max-width: 768px) 100vw, 600px" // ✅ レスポンシブ対応
        />
      )}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{post.title}</h2>
        {post.excerpt && <p className="text-sm text-gray-600 mt-1 line-clamp-2">{post.excerpt}</p>}
        <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
          <Calendar className="w-4 h-4" />
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </Link>
  );
}
