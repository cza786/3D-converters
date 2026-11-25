import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_NAME } from '../../lib/siteConfig';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: `How ${SITE_NAME} uses essential browser storage and third-party advertising cookies.`,
  alternates: { canonical: '/cookies' },
};

export default function CookiesPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 space-y-8 text-gray-700">
      <header className="space-y-2 border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Cookie Policy
        </h1>
        <p className="text-xs text-gray-500">Last Updated: November 25, 2026</p>
      </header>

      <section className="space-y-3 text-sm leading-relaxed">
        <h2 className="text-lg font-bold text-gray-900">1. Essential Browser Storage</h2>
        <p>
          {SITE_NAME} uses minimal local browser storage (<code>localStorage</code>) to remember your cookie consent choice so the notice does not reappear on every page load. No 3D file data is stored in cookies.
        </p>
      </section>

      <section className="space-y-3 text-sm leading-relaxed">
        <h2 className="text-lg font-bold text-gray-900">2. Advertising Cookies (Google AdSense)</h2>
        <p>
          When Google AdSense is enabled, Google and its certified ad partners may set cookies in your browser to measure ad performance, prevent ad fraud, limit repetitive ad impressions, and—where permitted by your consent settings—display ads relevant to your interests.
        </p>
      </section>

      <section className="space-y-3 text-sm leading-relaxed">
        <h2 className="text-lg font-bold text-gray-900">3. Managing Your Cookie Preferences</h2>
        <p>
          You can clear or block cookies at any time through your browser settings, or opt out of personalized Google ads via{' '}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Google Ads Settings
          </a>
          . For more information, see our{' '}
          <Link href="/privacy" className="text-blue-600 underline font-semibold">
            Privacy Policy
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
