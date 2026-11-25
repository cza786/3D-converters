'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo3DCube } from './CardIllustrations';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getToolBreadcrumb = () => {
    if (pathname === '/glb-to-usdz') return 'GLB to USDZ';
    if (pathname === '/obj-to-glb') return 'OBJ to GLB';
    if (pathname === '/fbx-to-glb') return 'FBX to GLB';
    if (pathname?.startsWith('/guides')) return 'Guides';
    if (pathname === '/about') return 'About';
    if (pathname === '/contact') return 'Contact';
    if (pathname === '/privacy') return 'Privacy Policy';
    if (pathname === '/terms') return 'Terms of Service';
    if (pathname === '/cookies') return 'Cookie Policy';
    return null;
  };

  const toolBreadcrumb = getToolBreadcrumb();

  return (
    <header className="w-full bg-white border-b border-gray-100 shadow-2xs sticky top-0 z-40">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo & Breadcrumb */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <Logo3DCube className="h-6 w-6 transition-transform group-hover:scale-105" />
            <span className="text-lg font-extrabold tracking-tight text-gray-900">
              3DShift
            </span>
          </Link>

          {toolBreadcrumb && (
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <span className="text-gray-300">/</span>
              <span className="text-gray-900">{toolBreadcrumb}</span>
            </div>
          )}
        </div>

        {/* Desktop Navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600"
        >
          <Link
            href="/glb-to-usdz"
            className={`hover:text-gray-900 transition-colors ${
              pathname === '/glb-to-usdz' ? 'text-blue-600 font-semibold' : ''
            }`}
          >
            GLB to USDZ
          </Link>
          <Link
            href="/obj-to-glb"
            className={`hover:text-gray-900 transition-colors ${
              pathname === '/obj-to-glb' ? 'text-blue-600 font-semibold' : ''
            }`}
          >
            OBJ to GLB
          </Link>
          <Link
            href="/fbx-to-glb"
            className={`hover:text-gray-900 transition-colors ${
              pathname === '/fbx-to-glb' ? 'text-blue-600 font-semibold' : ''
            }`}
          >
            FBX to GLB
          </Link>
          <Link
            href="/guides"
            className={`hover:text-gray-900 transition-colors ${
              pathname?.startsWith('/guides') ? 'text-blue-600 font-semibold' : ''
            }`}
          >
            Guides
          </Link>
          <Link
            href="/about"
            className={`hover:text-gray-900 transition-colors ${
              pathname === '/about' ? 'text-blue-600 font-semibold' : ''
            }`}
          >
            About
          </Link>
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/contact"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/glb-to-usdz"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#0f172a] px-4 py-1.5 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-slate-800 transition-all active:scale-95"
          >
            <span>Convert 3D</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden">
          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-gray-600 hover:text-gray-900"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-3 md:hidden space-y-2 text-sm font-medium text-gray-700">
          <Link
            href="/glb-to-usdz"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 hover:text-blue-600"
          >
            GLB to USDZ Converter
          </Link>
          <Link
            href="/obj-to-glb"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 hover:text-blue-600"
          >
            OBJ to GLB Converter
          </Link>
          <Link
            href="/fbx-to-glb"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 hover:text-blue-600"
          >
            FBX to GLB Converter
          </Link>
          <Link
            href="/guides"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 hover:text-blue-600"
          >
            3D & AR Guides
          </Link>
          <div className="pt-2 border-t border-gray-100 flex items-center gap-4 text-xs text-gray-500">
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-gray-900">
              About
            </Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-gray-900">
              Contact
            </Link>
            <Link href="/privacy" onClick={() => setMobileMenuOpen(false)} className="hover:text-gray-900">
              Privacy
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
