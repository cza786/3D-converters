import React from 'react';
import Link from 'next/link';
import { Lock, ShieldCheck, BookOpen } from 'lucide-react';
import AdSlot from './AdSlot';
import { ADSENSE_CLIENT_ID, ADSENSE_SIDEBAR_SLOT } from '../lib/siteConfig';

export default function AdSenseSidebar({ className = '' }: { className?: string }) {
  // When live AdSense credentials are configured, render the real ad unit
  if (ADSENSE_CLIENT_ID && ADSENSE_SIDEBAR_SLOT) {
    return (
      <AdSlot
        slotId={ADSENSE_SIDEBAR_SLOT}
        format="rectangle"
        minHeightClass="min-h-[280px]"
        className={className}
      />
    );
  }

  // Before AdSense approval / without env vars, render an honest privacy & guide card (no fake ad UI)
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white p-5 shadow-2xs space-y-3 ${className}`}
    >
      <div className="flex items-center gap-2 text-xs font-bold text-gray-900">
        <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
        <span>100% Browser-Based Processing</span>
      </div>
      <p className="text-xs text-gray-600 leading-relaxed">
        Your 3D meshes and textures are converted locally in browser memory using WebGL. Nothing is ever uploaded to external servers.
      </p>
      <div className="pt-1 flex flex-col gap-2">
        <Link
          href="/guides/apple-ar-quick-look-shopify-usdz-guide"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700"
        >
          <BookOpen className="h-3.5 w-3.5" />
          Shopify & Apple AR Quick Look Guide
        </Link>
        <Link
          href="/privacy"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-800"
        >
          <Lock className="h-3.5 w-3.5" />
          Read Privacy Guarantee
        </Link>
      </div>
    </div>
  );
}
