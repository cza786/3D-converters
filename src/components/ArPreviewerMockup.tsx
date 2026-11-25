'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import QRCode from 'qrcode';
import { Wifi, Battery, Box, QrCode } from 'lucide-react';
import { SITE_URL } from '../lib/siteConfig';

interface Props {
  qrValue?: string;
  className?: string;
}

export default function ArPreviewerMockup({
  qrValue = `${SITE_URL}/guides/apple-ar-quick-look-shopify-usdz-guide`,
  className = '',
}: Props) {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  useEffect(() => {
    QRCode.toDataURL(qrValue, {
      width: 180,
      margin: 1,
      color: {
        dark: '#0f172a',
        light: '#ffffff',
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch(() => {});
  }, [qrValue]);

  return (
    <div
      className={`relative mx-auto w-[240px] shrink-0 rounded-[36px] bg-[#10131b] p-4 text-white shadow-2xl border-4 border-slate-800 select-none ${className}`}
    >
      {/* Top Camera Notch & Speaker */}
      <div className="absolute top-2.5 left-1/2 -translate-x-1/2 h-4 w-20 rounded-full bg-slate-900 flex items-center justify-center">
        <div className="h-1.5 w-1.5 rounded-full bg-slate-700 mr-2" />
        <div className="h-1 w-6 rounded-full bg-slate-800" />
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-3 px-2 mb-3">
        <span className="font-semibold text-white">9:41</span>
        <div className="flex items-center gap-1.5">
          <Wifi className="h-3 w-3" />
          <Battery className="h-3.5 w-3.5" />
        </div>
      </div>

      {/* App Header */}
      <div className="text-center px-1 mb-3">
        <h4 className="text-xs font-bold text-white tracking-tight">AR Quick Look Guide</h4>
        <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">
          Files stay local on your device. AirDrop your exported .USDZ to open in iOS AR.
        </p>
      </div>

      {/* QR Code Frame */}
      <div className="relative my-2 rounded-2xl bg-[#090c14] border border-slate-800/80 p-3 flex flex-col items-center justify-center">
        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-orange-500 rounded-tl-xs" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-400 rounded-tr-xs" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-400 rounded-bl-xs" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-orange-500 rounded-br-xs" />

        <div className="rounded-xl overflow-hidden bg-white p-2 shadow-inner">
          {qrDataUrl ? (
            <Image
              src={qrDataUrl}
              alt="AR Quick Look mobile setup QR code"
              width={112}
              height={112}
              unoptimized
              className="w-28 h-28 block"
            />
          ) : (
            <div className="w-28 h-28 flex items-center justify-center text-slate-800">
              <QrCode className="w-24 h-24" />
            </div>
          )}
        </div>

        <p className="text-[9px] text-slate-400 mt-2 text-center">
          Scan to open mobile AR setup instructions
        </p>
      </div>

      {/* Bottom AR Badge */}
      <div className="mt-3 text-center">
        <div className="inline-flex items-center justify-center gap-1.5 rounded-full bg-slate-900 border border-slate-700/80 px-3 py-1.5 text-[10px] font-semibold text-slate-200 shadow-sm">
          <Box className="h-3 w-3 text-orange-400" />
          <span>iOS AR Quick Look Ready</span>
        </div>
      </div>

      {/* Home Indicator Bar */}
      <div className="mt-3 mx-auto h-1 w-16 rounded-full bg-slate-700" />
    </div>
  );
}
