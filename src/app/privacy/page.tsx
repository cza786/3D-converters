import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CONTACT_EMAIL, SITE_NAME, SITE_URL } from '../../lib/siteConfig';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy Policy for ${SITE_NAME}, explaining client-side 3D file processing, analytics, cookies, and Google AdSense advertising practices.`,
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 space-y-8 text-gray-700">
      <header className="space-y-2 border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-gray-500">
          Effective Date: November 25, 2026 · Website: {SITE_URL}
        </p>
      </header>

      <section className="space-y-3 text-sm leading-relaxed">
        <h2 className="text-lg font-bold text-gray-900">1. Client-Side 3D File Processing</h2>
        <p>
          {SITE_NAME} operates as a 100% client-side 3D conversion utility. When you select or drag-and-drop a <code>.glb</code>, <code>.gltf</code>, <code>.obj</code>, or <code>.fbx</code> file into any converter on this website, the file is read directly into your browser&apos;s local memory using the HTML5 File API, WebGL, and Three.js.
        </p>
        <p>
          <strong>We do not upload, transmit, inspect, or store your 3D models on any server.</strong> All converted files are generated locally as in-memory Blobs on your device.
        </p>
      </section>

      <section className="space-y-3 text-sm leading-relaxed">
        <h2 className="text-lg font-bold text-gray-900">2. Cookies, Local Storage & Consent</h2>
        <p>
          We store minimal preference data (such as your cookie consent selection) in your browser&apos;s <code>localStorage</code>. For full details on cookies used on this site, please review our{' '}
          <Link href="/cookies" className="text-blue-600 underline font-semibold">
            Cookie Policy
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3 text-sm leading-relaxed">
        <h2 className="text-lg font-bold text-gray-900">3. Google AdSense & Third-Party Advertising</h2>
        <p>
          To keep {SITE_NAME} free to use, we display advertisements served by Google AdSense.
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>
            Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to this website or other websites.
          </li>
          <li>
            Google&apos;s use of advertising cookies enables it and its partners to serve ads to users based on their visit to {SITE_NAME} and/or other sites on the Internet.
          </li>
          <li>
            Users may opt out of personalized advertising by visiting{' '}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Google Ads Settings
            </a>{' '}
            or by visiting{' '}
            <a
              href="https://www.aboutads.info/choices/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              www.aboutads.info
            </a>
            .
          </li>
        </ul>
      </section>

      <section className="space-y-3 text-sm leading-relaxed">
        <h2 className="text-lg font-bold text-gray-900">4. Server Logs & Security</h2>
        <p>
          Like most web hosts, our hosting provider may automatically record standard technical request metadata (such as IP address, browser type, requested URL, and timestamp) in server access logs for security, DDoS mitigation, and uptime monitoring.
        </p>
      </section>

      <section className="space-y-3 text-sm leading-relaxed">
        <h2 className="text-lg font-bold text-gray-900">5. Your Rights (GDPR & CCPA)</h2>
        <p>
          Depending on your region (including the EEA, UK, Switzerland, and California), you have the right to opt out of personalized advertising cookies and request information about any personal data collected. Because {SITE_NAME} does not require accounts and does not upload user 3D files, we hold no user-uploaded content.
        </p>
      </section>

      <section className="space-y-3 text-sm leading-relaxed">
        <h2 className="text-lg font-bold text-gray-900">6. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, email us at{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 underline font-semibold">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </section>
    </article>
  );
}
