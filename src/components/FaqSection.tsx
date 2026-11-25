'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

interface Props {
  faqs: FaqItem[];
  title?: string;
  subtitle?: string;
}

export default function FaqSection({
  faqs,
  title = 'Frequently Asked Questions',
  subtitle = 'Find answers to common questions about client-side 3D conversion, supported formats, and privacy.',
}: Props) {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleIndex = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section className="py-12 border-t border-zinc-800/80">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400 border border-blue-500/20 mb-3">
          <HelpCircle className="h-3.5 w-3.5" />
          <span>Knowledge Base</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {title}
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          {subtitle}
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndices.includes(idx);
          return (
            <div
              key={idx}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-xs overflow-hidden transition-colors hover:border-zinc-700"
            >
              <button
                type="button"
                onClick={() => toggleIndex(idx)}
                className="flex w-full items-center justify-between p-5 text-left transition-colors"
                aria-expanded={isOpen}
              >
                <span className="text-sm font-semibold text-zinc-200 pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-blue-400' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs text-zinc-400 leading-relaxed border-t border-zinc-800/40">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
