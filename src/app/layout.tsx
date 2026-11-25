import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AdSenseScript from '../components/AdSenseScript';
import CookieConsent from '../components/CookieConsent';
import { SITE_NAME, SITE_URL } from '../lib/siteConfig';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Free Client-Side 3D & AR File Converter`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Convert GLB to USDZ for Apple AR Quick Look, OBJ to GLB, and FBX to GLB directly in your browser. Inspect 3D models in WebGL with 100% client-side privacy and zero server uploads.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Client-Side 3D & AR File Converter`,
    description:
      'Convert GLB to USDZ, OBJ to GLB, and FBX to GLB locally in your browser using Three.js and WebGL.',
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Client-Side 3D & AR File Converter`,
    description:
      'Convert GLB to USDZ, OBJ to GLB, and FBX to GLB locally in your browser with zero server uploads.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-full flex flex-col bg-[#f8fafc] text-slate-900 font-sans`}
      >
        <AdSenseScript />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
