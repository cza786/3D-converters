import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { GUIDE_ARTICLES, getGuideBySlug } from '../../../lib/guidesData';
import { SITE_URL } from '../../../lib/siteConfig';
import { ArrowLeft, ArrowRight, Calendar, Clock } from 'lucide-react';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return GUIDE_ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getGuideBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: `/guides/${article.slug}`,
    },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.description,
      url: `${SITE_URL}/guides/${article.slug}`,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
    },
  };
}

export default async function GuideDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = getGuideBySlug(slug);
  if (!article) {
    notFound();
  }

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    url: `${SITE_URL}/guides/${article.slug}`,
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleLd).replace(/</g, '\\u003c'),
        }}
      />

      <div>
        <Link
          href="/guides"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to all guides
        </Link>

        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-3">
          <span className="rounded-full bg-blue-50 border border-blue-200 px-2.5 py-0.5 font-semibold text-blue-700">
            {article.category}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {article.readTime}
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            Updated {article.updatedAt}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
          {article.title}
        </h1>
        <p className="mt-3 text-base text-gray-600 leading-relaxed">
          {article.description}
        </p>
      </div>

      <div className="space-y-8 border-t border-gray-200 pt-8">
        {article.sections.map((sec) => (
          <section key={sec.heading} className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">{sec.heading}</h2>
            {sec.paragraphs.map((p, i) => (
              <p key={i} className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {p}
              </p>
            ))}
            {sec.bullets && (
              <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-700">
                {sec.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            )}
            {sec.codeSnippet && (
              <pre className="overflow-x-auto rounded-xl bg-slate-900 p-4 text-xs text-slate-100 font-mono leading-relaxed">
                {sec.codeSnippet}
              </pre>
            )}
          </section>
        ))}
      </div>

      {/* Related Tool Callout */}
      <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-gray-900">Ready to convert your 3D file?</h3>
          <p className="text-xs text-gray-600 mt-1">
            Run everything locally in your browser with instant WebGL inspection.
          </p>
        </div>
        <Link
          href={article.relatedToolHref}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#0f172a] px-5 py-2.5 text-xs font-semibold text-white hover:bg-slate-800 transition-colors shrink-0"
        >
          <span>{article.relatedToolLabel}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}
