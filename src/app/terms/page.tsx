import React from 'react';
import type { Metadata } from 'next';
import { CONTACT_EMAIL, SITE_NAME } from '../../lib/siteConfig';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `Terms of Service governing the use of ${SITE_NAME} client-side 3D conversion tools and guides.`,
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 space-y-8 text-gray-700">
      <header className="space-y-2 border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs text-gray-500">Last Updated: November 25, 2026</p>
      </header>

      <section className="space-y-3 text-sm leading-relaxed">
        <h2 className="text-lg font-bold text-gray-900">1. Acceptance of Terms</h2>
        <p>
          By accessing or using {SITE_NAME}, you agree to be bound by these Terms of Service. If you do not agree with these terms, please discontinue use of the website.
        </p>
      </section>

      <section className="space-y-3 text-sm leading-relaxed">
        <h2 className="text-lg font-bold text-gray-900">2. Intellectual Property & Your 3D Assets</h2>
        <p>
          You retain 100% ownership and all intellectual property rights to any 3D models, textures, and materials you load into or export from {SITE_NAME}. All conversions take place locally inside your browser, and {SITE_NAME} claims no license or rights over your assets.
        </p>
      </section>

      <section className="space-y-3 text-sm leading-relaxed">
        <h2 className="text-lg font-bold text-gray-900">3. Acceptable Use</h2>
        <p>
          You agree not to misuse the site, attempt automated scraping or denial-of-service attacks, or interfere with advertising or security mechanisms.
        </p>
      </section>

      <section className="space-y-3 text-sm leading-relaxed">
        <h2 className="text-lg font-bold text-gray-900">4. Disclaimer of Warranties</h2>
        <p>
          {SITE_NAME} is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind. Always inspect converted 3D files (geometry, normals, UV coordinates, and scale) before deploying them in production storefronts, games, or manufacturing workflows.
        </p>
      </section>

      <section className="space-y-3 text-sm leading-relaxed">
        <h2 className="text-lg font-bold text-gray-900">5. Contact</h2>
        <p>
          Questions regarding these Terms may be sent to{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 underline font-semibold">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </section>
    </article>
  );
}
