import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Cpu, Sparkles, ArrowRight } from 'lucide-react';
import { SITE_NAME } from '../../lib/siteConfig';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn how 3DShift converts GLB, glTF, OBJ, and FBX 3D assets directly inside your browser using Three.js and WebGL with zero server uploads.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
      <header className="space-y-3">
        <span className="inline-flex items-center rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-semibold text-blue-700">
          About {SITE_NAME}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Private, Browser-Native 3D & AR Asset Conversion
        </h1>
        <p className="text-base text-gray-600 leading-relaxed">
          {SITE_NAME} was built to give 3D artists, e-commerce teams, and web developers a fast way to inspect and convert 3D models without uploading proprietary geometry to third-party servers.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-2xs space-y-2">
          <ShieldCheck className="h-6 w-6 text-emerald-600" />
          <h2 className="text-base font-bold text-gray-900">Zero File Uploads</h2>
          <p className="text-xs text-gray-600 leading-relaxed">
            Your CAD, product, and game models stay inside your browser&apos;s local memory. No files are transmitted to or stored on remote servers.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-2xs space-y-2">
          <Cpu className="h-6 w-6 text-blue-600" />
          <h2 className="text-base font-bold text-gray-900">Powered by WebGL</h2>
          <p className="text-xs text-gray-600 leading-relaxed">
            Built on Three.js loaders and exporters, {SITE_NAME} computes missing vertex normals, checks PBR materials, and downscales oversized textures locally.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-2xs space-y-2">
          <Sparkles className="h-6 w-6 text-orange-600" />
          <h2 className="text-base font-bold text-gray-900">Built for Web & AR</h2>
          <p className="text-xs text-gray-600 leading-relaxed">
            Prepare binary GLB files for Three.js and Android, or package Apple AR Quick Look USDZ files ready for iOS Safari and Shopify storefronts.
          </p>
        </div>
      </div>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-2xs space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Our Architecture</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          Conventional online converters upload your files over HTTP, queue them on a shared server, and store temporary copies on cloud disks. That approach creates bandwidth bottlenecks for large meshes and raises IP concerns for unreleased product designs.
        </p>
        <p className="text-sm text-gray-600 leading-relaxed">
          {SITE_NAME} moves the entire pipeline—parsing, live 3D inspection, texture resizing via HTML5 Canvas, and binary glTF/USDZ packaging—into your local browser session. Once the page loads, conversions run directly on your CPU and GPU.
        </p>
        <div className="pt-2 flex flex-wrap gap-3">
          <Link
            href="/glb-to-usdz"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#0f172a] px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition-colors"
          >
            Try GLB to USDZ <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Contact Our Team
          </Link>
        </div>
      </section>
    </div>
  );
}
