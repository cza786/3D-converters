import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, MessageSquare, ShieldCheck } from 'lucide-react';
import { CONTACT_EMAIL, SITE_NAME } from '../../lib/siteConfig';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: `Get in touch with the ${SITE_NAME} team for bug reports, format feature requests, or partnership inquiries.`,
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      <header className="space-y-3">
        <span className="inline-flex items-center rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-semibold text-blue-700">
          Contact & Support
        </span>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Get in Touch with {SITE_NAME}
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          Have a question about 3D format compatibility, encountered a parsing error on a specific mesh, or want to reach our team? Use the contact channels below.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-2xs space-y-3">
          <Mail className="h-6 w-6 text-blue-600" />
          <h2 className="text-base font-bold text-gray-900">Email Support</h2>
          <p className="text-xs text-gray-600 leading-relaxed">
            For technical support, privacy inquiries, or advertising questions, reach us directly by email.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-block text-sm font-bold text-blue-600 hover:text-blue-700 underline"
          >
            {CONTACT_EMAIL}
          </a>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-2xs space-y-3">
          <MessageSquare className="h-6 w-6 text-orange-600" />
          <h2 className="text-base font-bold text-gray-900">Troubleshooting Tips</h2>
          <p className="text-xs text-gray-600 leading-relaxed">
            Before reporting a missing texture or shading issue, check our troubleshooting guide for OBJ, FBX, and USDZ exports.
          </p>
          <Link
            href="/guides/fix-missing-textures-obj-fbx-to-glb"
            className="inline-block text-xs font-bold text-blue-600 hover:text-blue-700 underline"
          >
            Read Troubleshooting Guide
          </Link>
        </div>
      </div>

      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 flex items-start gap-3">
        <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
        <p className="text-xs text-emerald-900 leading-relaxed">
          <strong>Privacy Note:</strong> Please do not attach confidential or proprietary 3D CAD files to support emails unless necessary—describe the exporter (e.g., Blender 4.2, Maya) and error message shown in the workspace first.
        </p>
      </div>
    </div>
  );
}
