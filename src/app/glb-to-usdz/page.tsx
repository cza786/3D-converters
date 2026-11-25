import React from 'react';
import type { Metadata } from 'next';
import { TOOL_CONFIGS } from '../../lib/toolConfigs';
import { SITE_URL } from '../../lib/siteConfig';
import ConverterWorkspace from '../../components/ConverterWorkspace';
import ToolPageBottom from '../../components/ToolPageBottom';

const config = TOOL_CONFIGS['glb-to-usdz'];

export const metadata: Metadata = {
  title: 'GLB to USDZ Converter — Apple AR Quick Look',
  description: config.metaDescription,
  alternates: {
    canonical: '/glb-to-usdz',
  },
  openGraph: {
    title: 'GLB to USDZ Converter | 3DShift',
    description: config.metaDescription,
    url: `${SITE_URL}/glb-to-usdz`,
  },
};

export default function GlbToUsdzPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `3DShift ${config.title}`,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any (Web Browser)',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: config.metaDescription,
    url: `${SITE_URL}/glb-to-usdz`,
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: config.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="w-full bg-[#f8fafc] py-6 sm:py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqLd).replace(/</g, '\\u003c'),
        }}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ConverterWorkspace config={config} />
        <ToolPageBottom config={config} />
      </div>
    </div>
  );
}
