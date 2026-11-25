'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, CheckCircle2, ArrowRight, BookOpen, Code2 } from 'lucide-react';
import type { ToolConfig } from '../lib/types';
import FormatComparison from './FormatComparison';

interface Props {
  config: ToolConfig;
}

export default function ToolPageBottom({ config }: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="mt-16 space-y-12 border-t border-gray-200 pt-12">
      {/* 1. Per-Tool 4-Step Workflow */}
      <section aria-labelledby="how-to-use-heading">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center rounded-full bg-orange-50 border border-orange-200 px-3 py-1 text-xs font-bold text-orange-700 mb-3">
            Step-by-Step Workflow
          </span>
          <h2
            id="how-to-use-heading"
            className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight"
          >
            How to Convert {config.shortTitle}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Inspect geometry, optimize texture resolution, and export directly inside your browser without uploading files.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {config.howItWorksSteps.map((step) => (
            <div
              key={step.step}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-xs font-extrabold text-blue-700 border border-blue-100">
                    0{step.step}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Key Technical Highlights + Implementation Notes */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-t border-gray-200 pt-12">
        <div className="lg:col-span-6 space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">
            Why Use 3DShift for {config.shortTitle}?
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Traditional online 3D converters require uploading proprietary CAD or game assets to remote servers, creating privacy risks and slow upload queues. 3DShift parses, validates, and exports your 3D scene directly in browser memory using WebGL and Three.js.
          </p>
          <ul className="space-y-2.5 pt-1">
            {config.highlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-sm text-gray-700 font-medium"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="pt-2">
            <Link
              href="/guides"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
            >
              <BookOpen className="h-4 w-4" />
              <span>Read our full 3D & AR preparation guides</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
            <Code2 className="h-4 w-4 text-indigo-600" />
            <span>
              {config.id === 'glb-to-usdz'
                ? 'Embedding USDZ for iOS AR Quick Look'
                : 'Loading Exported GLB in Three.js / Web'}
            </span>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            {config.id === 'glb-to-usdz'
              ? 'Once your .usdz file is downloaded, you can launch iOS AR Quick Look directly from Safari on iPhone or iPad using a standard anchor link with rel="ar":'
              : 'Binary .glb files embed geometry buffers, normals, and textures in a single HTTP request. Load your converted asset directly in Three.js or <model-viewer>:'}
          </p>
          <pre className="overflow-x-auto rounded-xl bg-slate-900 p-4 text-[11px] text-slate-100 leading-relaxed font-mono">
            {config.id === 'glb-to-usdz'
              ? `<a rel="ar" href="/models/product.usdz">\n  <img src="/models/product-thumb.png" alt="View in AR" />\n</a>`
              : `<script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>\n<model-viewer\n  src="/models/asset.glb"\n  ar\n  camera-controls\n  auto-rotate\n></model-viewer>`}
          </pre>
          <p className="text-[11px] text-gray-500">
            Tip: Keep texture resolution at <strong>1024px</strong> for mobile storefronts like Shopify to stay under mobile memory limits.
          </p>
        </div>
      </section>

      {/* 3. Format Comparison Table */}
      <FormatComparison />

      {/* 4. Per-Tool FAQ Accordion */}
      <section id="faq" className="border-t border-gray-200 pt-12">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            {config.shortTitle} Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Common technical questions about converting {config.inputExtension} to {config.outputExtension} in the browser.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-2.5">
          {config.faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.question}
                className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-2xs transition-colors"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between p-4 text-left font-semibold text-xs sm:text-sm text-gray-800 hover:text-gray-900"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-gray-400 transition-transform duration-200 shrink-0 ml-2 ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-50">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
