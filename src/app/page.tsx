import React from 'react';
import Link from 'next/link';
import ToolCard, { CardData } from '../components/ToolCard';
import DeskWorkplaceIllustration from '../components/DeskWorkplaceIllustration';
import FormatComparison from '../components/FormatComparison';
import { GUIDE_ARTICLES } from '../lib/guidesData';
import { ArrowRight, CheckCircle2, ShieldCheck, BookOpen } from 'lucide-react';

export default function HomePage() {
  const cards: CardData[] = [
    {
      id: 'glb-to-usdz',
      title: 'GLB to USDZ',
      subtitle: 'Convert glTF / GLB models into Apple AR Quick Look USDZ files.',
      badge: 'iOS AR',
      badgeType: 'green',
      href: '/glb-to-usdz',
    },
    {
      id: 'obj-to-glb',
      title: 'OBJ to GLB',
      subtitle: 'Turn Wavefront OBJ meshes into compact, GPU-ready binary GLB.',
      badge: 'Web-Ready',
      badgeType: 'blue',
      href: '/obj-to-glb',
    },
    {
      id: 'fbx-to-glb',
      title: 'FBX to GLB',
      subtitle: 'Convert binary or ASCII Autodesk FBX assets for Three.js and WebGL.',
      badge: 'Game & Studio',
      badgeType: 'slate',
      href: '/fbx-to-glb',
    },
    {
      id: 'compressor',
      title: 'Texture Optimizer',
      subtitle: 'Downscale textures (512px, 1024px, 2048px) during export.',
      href: '/glb-to-usdz',
    },
    {
      id: 'ar-previewer',
      title: 'AR Quick Look Guide',
      subtitle: 'Embed USDZ & GLB models for iOS Safari and Shopify storefronts.',
      badgeType: 'qr',
      href: '/guides/apple-ar-quick-look-shopify-usdz-guide',
    },
    {
      id: 'gaussian-splat',
      title: '3D Format Comparison',
      subtitle: 'Compare GLB, USDZ, FBX, and OBJ speed, PBR support, and AR.',
      href: '/guides/glb-vs-usdz-vs-fbx-vs-obj',
    },
  ];

  return (
    <div className="w-full bg-[#f8fafc]">
      {/* 1. Deep Midnight Navy Hero Section */}
      <section className="w-full bg-[#0c1322] pt-14 pb-28 px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-3.5 py-1 text-xs font-semibold text-emerald-400">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>100% Client-Side · Files Never Leave Your Browser</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            All Your 3D & AR File
            <br />
            Conversions In One Place
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Convert GLB to USDZ for Apple AR Quick Look, optimize Wavefront OBJ and Autodesk FBX models to binary GLB, and inspect meshes live in WebGL.
          </p>
        </div>
      </section>

      {/* 2. Floating 6-Card Grid */}
      <section id="tools" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card) => (
            <ToolCard key={card.id} card={card} />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-7 py-2.5 text-xs font-semibold text-gray-700 shadow-2xs hover:bg-gray-50 transition-all active:scale-95"
          >
            <span>Explore 3D & AR Guides</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* 3. Feature Section: Desk Workplace Illustration + How It Works */}
      <section
        id="how-it-works"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-200"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 flex justify-center">
            <DeskWorkplaceIllustration className="w-full max-w-sm" />
          </div>

          <div className="md:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">
              <span>How It Works</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
              Optimize textures and inspect meshes for Apple AR Quick Look, Shopify, and WebGL without losing visual quality.
            </h2>

            <p className="text-sm text-gray-600 leading-relaxed">
              Every file is parsed locally using Three.js WebGL loaders. Inspect wireframe topology, verify triangle budgets, pick a target texture resolution, and download clean GLB or USDZ output in seconds.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
              <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-2xs">
                <span className="text-gray-400 font-semibold block text-[10px]">Step 1</span>
                <span className="font-bold text-gray-800">Drop GLB, OBJ, or FBX</span>
              </div>

              <ArrowRight className="h-4 w-4 text-gray-400 shrink-0" />

              <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-2xs">
                <span className="text-gray-400 font-semibold block text-[10px]">Step 2</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Inspect PBR & Normals
                </span>
              </div>

              <ArrowRight className="h-4 w-4 text-gray-400 shrink-0" />

              <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-2xs">
                <span className="text-gray-400 font-semibold block text-[10px]">Step 3</span>
                <span className="font-bold text-gray-800">Export USDZ or GLB</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Format Comparison Table */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FormatComparison />
      </div>

      {/* 5. Technical Guides Showcase (Editorial Value) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-wider">
              <BookOpen className="h-3.5 w-3.5" />
              Knowledge Base
            </span>
            <h2 className="text-2xl font-extrabold text-gray-900 mt-1">
              3D Conversion & AR Guides
            </h2>
          </div>
          <Link
            href="/guides"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
          >
            View all guides <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {GUIDE_ARTICLES.map((article) => (
            <Link
              key={article.slug}
              href={`/guides/${article.slug}`}
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-2xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-semibold text-gray-400 mb-2">
                  <span className="text-blue-600">{article.category}</span>
                  <span>{article.readTime}</span>
                </div>
                <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h3>
                <p className="mt-2 text-xs text-gray-600 leading-relaxed">
                  {article.description}
                </p>
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-blue-600">
                Read guide <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
