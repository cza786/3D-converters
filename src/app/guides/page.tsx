import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { GUIDE_ARTICLES } from '../../lib/guidesData';
import { ArrowRight, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: '3D & AR Guides — Formats, Shopify Quick Look & WebGL Optimization',
  description:
    'Technical guides on converting GLB to USDZ, optimizing OBJ and FBX assets for WebGL, fixing normals and textures, and deploying Apple AR Quick Look.',
  alternates: { canonical: '/guides' },
};

export default function GuidesIndexPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
      <header className="space-y-3 max-w-2xl">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-semibold text-blue-700">
          <BookOpen className="h-3.5 w-3.5" />
          3DShift Knowledge Base
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          3D Conversion & AR Optimization Guides
        </h1>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          Practical engineering guides for preparing GLB, USDZ, OBJ, and FBX assets for fast web viewers, Shopify storefronts, and iOS AR Quick Look.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {GUIDE_ARTICLES.map((article) => (
          <Link
            key={article.slug}
            href={`/guides/${article.slug}`}
            className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-2xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-gray-400 mb-3">
                <span className="text-blue-600">{article.category}</span>
                <span>{article.readTime}</span>
              </div>
              <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {article.title}
              </h2>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {article.description}
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-blue-600">
              <span>Read full guide</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
