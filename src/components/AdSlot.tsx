'use client';

import React, { useEffect, useRef } from 'react';
import { ADSENSE_CLIENT_ID } from '../lib/siteConfig';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface AdSlotProps {
  slotId: string;
  format?: 'auto' | 'rectangle' | 'horizontal';
  minHeightClass?: string;
  className?: string;
}

/**
 * Policy-compliant Google AdSense unit wrapper.
 * Renders nothing when AdSense client/slot environment variables are not configured,
 * preventing fake ad placeholders that violate AdSense policies.
 */
export default function AdSlot({
  slotId,
  format = 'auto',
  minHeightClass = 'min-h-[250px]',
  className = '',
}: AdSlotProps) {
  const pushedRef = useRef(false);

  useEffect(() => {
    if (!ADSENSE_CLIENT_ID || !slotId || pushedRef.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushedRef.current = true;
    } catch {
      // Ignore AdSense initialization errors (e.g., blocked by ad blocker)
    }
  }, [slotId]);

  if (!ADSENSE_CLIENT_ID || !slotId) {
    return null;
  }

  return (
    <aside
      aria-label="Advertisement"
      className={`rounded-2xl border border-gray-200 bg-white p-3 shadow-2xs ${minHeightClass} ${className}`}
    >
      <div className="mb-1.5 text-center text-[10px] font-medium uppercase tracking-wider text-gray-400">
        Advertisement
      </div>
      <ins
        className="adsbygoogle block w-full"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </aside>
  );
}
