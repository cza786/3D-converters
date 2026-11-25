import React from 'react';
import Link from 'next/link';
import { Logo3DCube } from './CardIllustrations';
import { Shield, Cpu, Lock, Sparkles } from 'lucide-react';

export default function Footer() {
  const currentYear = 2026;
  return (
    <footer className="border-t border-gray-200 bg-white text-gray-600 mt-16">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-10">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <Logo3DCube className="h-6 w-6" />
              <span className="text-lg font-extrabold text-gray-900 tracking-tight">
                3DShift
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-gray-500 max-w-md leading-relaxed">
              Browser-based 3D and AR model conversion tools powered by Three.js and WebGL. Convert GLB, glTF, OBJ, and FBX assets locally with zero server uploads.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1 text-[11px] text-gray-700 bg-gray-100 border border-gray-200 rounded-md px-2 py-0.5">
                <Lock className="h-3 w-3 text-emerald-600" />
                Zero Server Uploads
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] text-gray-700 bg-gray-100 border border-gray-200 rounded-md px-2 py-0.5">
                <Cpu className="h-3 w-3 text-blue-600" />
                Client-Side WebGL
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] text-gray-700 bg-gray-100 border border-gray-200 rounded-md px-2 py-0.5">
                <Sparkles className="h-3 w-3 text-orange-600" />
                Apple AR Quick Look
              </span>
            </div>
          </div>

          {/* 3D Converters */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3">
              3D Converters
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/glb-to-usdz" className="hover:text-blue-600 transition-colors">
                  GLB to USDZ (iOS AR)
                </Link>
              </li>
              <li>
                <Link href="/obj-to-glb" className="hover:text-blue-600 transition-colors">
                  OBJ to GLB (Web-Ready)
                </Link>
              </li>
              <li>
                <Link href="/fbx-to-glb" className="hover:text-blue-600 transition-colors">
                  FBX to GLB (Game & Studio)
                </Link>
              </li>
            </ul>
          </div>

          {/* Guides & Resources */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3">
              Guides & Docs
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/guides" className="hover:text-blue-600 transition-colors">
                  All 3D & AR Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/glb-vs-usdz-vs-fbx-vs-obj"
                  className="hover:text-blue-600 transition-colors"
                >
                  GLB vs USDZ vs FBX vs OBJ
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/apple-ar-quick-look-shopify-usdz-guide"
                  className="hover:text-blue-600 transition-colors"
                >
                  Shopify & AR Quick Look
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/optimize-3d-models-webgl-performance"
                  className="hover:text-blue-600 transition-colors"
                >
                  WebGL Optimization Tips
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3">
              Company & Legal
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-blue-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-600 transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-blue-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-blue-600 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-blue-600 transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-3">
          <p>© {currentYear} 3DShift. All rights reserved.</p>
          <div className="flex items-center gap-2 text-gray-500">
            <Shield className="h-3.5 w-3.5 text-emerald-600" />
            <span>100% Client-Side Privacy: files never leave your computer</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
