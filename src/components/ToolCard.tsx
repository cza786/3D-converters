import React from 'react';
import Link from 'next/link';
import {
  GlbToUsdzIllustration,
  ObjToGlbIllustration,
  FbxToGlbIllustration,
  CompressorIllustration,
  ArPreviewerIllustration,
  GaussianSplatIllustration,
} from './CardIllustrations';
import { QrCode } from 'lucide-react';

export interface CardData {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  badgeType?: 'green' | 'blue' | 'slate' | 'qr';
  href: string;
}

interface Props {
  card: CardData;
}

export default function ToolCard({ card }: Props) {
  const getIllustration = () => {
    switch (card.id) {
      case 'glb-to-usdz':
        return <GlbToUsdzIllustration className="w-32 h-20" />;
      case 'obj-to-glb':
        return <ObjToGlbIllustration className="w-32 h-20" />;
      case 'fbx-to-glb':
        return <FbxToGlbIllustration className="w-32 h-20" />;
      case 'compressor':
        return <CompressorIllustration className="w-28 h-20" />;
      case 'ar-previewer':
        return <ArPreviewerIllustration className="w-28 h-20" />;
      case 'gaussian-splat':
        return <GaussianSplatIllustration className="w-28 h-20" />;
      default:
        return <GlbToUsdzIllustration className="w-32 h-20" />;
    }
  };

  const getBadge = () => {
    if (!card.badge && card.badgeType !== 'qr') return null;

    if (card.badgeType === 'green') {
      return (
        <span className="rounded-full bg-[#22c55e] px-2.5 py-0.5 text-[11px] font-bold text-white shadow-2xs">
          {card.badge}
        </span>
      );
    }
    if (card.badgeType === 'blue') {
      return (
        <span className="rounded-full bg-[#2563eb] px-2.5 py-0.5 text-[11px] font-bold text-white shadow-2xs">
          {card.badge}
        </span>
      );
    }
    if (card.badgeType === 'slate') {
      return (
        <span className="rounded-full bg-[#334155] px-2.5 py-0.5 text-[11px] font-bold text-white shadow-2xs">
          {card.badge}
        </span>
      );
    }
    if (card.badgeType === 'qr') {
      return (
        <span className="rounded-md border border-gray-200 bg-gray-50 p-1 text-gray-700 shadow-2xs">
          <QrCode className="h-3.5 w-3.5" />
        </span>
      );
    }
    return null;
  };

  return (
    <Link
      href={card.href}
      className="group relative flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:border-gray-200 min-h-[220px]"
    >
      {/* Top Section with Illustration and Badge */}
      <div className="flex items-start justify-between">
        <div className="flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
          {getIllustration()}
        </div>
        <div className="shrink-0">{getBadge()}</div>
      </div>

      {/* Bottom Text Section */}
      <div className="mt-4">
        <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
          {card.title}
        </h3>
        <p className="mt-1 text-xs text-gray-500 leading-relaxed line-clamp-2">
          {card.subtitle}
        </p>
      </div>
    </Link>
  );
}
