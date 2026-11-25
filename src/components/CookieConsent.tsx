'use client';

import React, { useSyncExternalStore } from 'react';
import Link from 'next/link';
import { Cookie } from 'lucide-react';

const CONSENT_STORAGE_KEY = '3dshift_cookie_consent_v1';
const CONSENT_EVENT = '3dshift-consent-change';

function subscribe(callback: () => void) {
  window.addEventListener(CONSENT_EVENT, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(CONSENT_EVENT, callback);
    window.removeEventListener('storage', callback);
  };
}

function getSnapshot(): string {
  try {
    return window.localStorage.getItem(CONSENT_STORAGE_KEY) ?? 'unset';
  } catch {
    return 'dismissed';
  }
}

function getServerSnapshot(): string {
  return 'ssr';
}

export default function CookieConsent() {
  const consentStatus = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const handleChoice = (choice: 'accepted' | 'essential') => {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
      window.dispatchEvent(new Event(CONSENT_EVENT));
    } catch {
      // Ignore storage errors
    }
  };

  if (consentStatus !== 'unset') return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white/95 p-4 shadow-xl backdrop-blur-md"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <Cookie className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
          <p className="text-xs text-gray-600 leading-relaxed">
            3DShift processes your 3D files locally on your device. We use essential storage for site preferences and, when advertising is active, Google AdSense cookies to deliver relevant ads. Read our{' '}
            <Link href="/privacy" className="font-semibold text-blue-600 underline hover:text-blue-700">
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link href="/cookies" className="font-semibold text-blue-600 underline hover:text-blue-700">
              Cookie Policy
            </Link>
            .
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
          <button
            type="button"
            onClick={() => handleChoice('essential')}
            className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Essential Only
          </button>
          <button
            type="button"
            onClick={() => handleChoice('accepted')}
            className="rounded-lg bg-[#0f172a] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 transition-colors"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
