import Script from 'next/script';
import { ADSENSE_CLIENT_ID } from '../lib/siteConfig';

/**
 * Loads the official Google AdSense script only when NEXT_PUBLIC_ADSENSE_CLIENT_ID is set.
 * Safe to leave unconfigured during local development or before AdSense review approval.
 */
export default function AdSenseScript() {
  if (!ADSENSE_CLIENT_ID) return null;

  return (
    <Script
      id="google-adsense-script"
      async
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
      crossOrigin="anonymous"
    />
  );
}
