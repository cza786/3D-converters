import React from 'react';

export default function DeskWorkplaceIllustration({ className = 'w-full max-w-sm' }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 220" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background shadow */}
      <ellipse cx="160" cy="205" rx="140" ry="12" fill="#000000" fillOpacity="0.04" />

      {/* Modern Desk */}
      <rect x="70" y="150" width="180" height="8" rx="3" fill="#cbd5e1" />
      <line x1="85" y1="158" x2="85" y2="205" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
      <line x1="235" y1="158" x2="235" y2="205" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />

      {/* Computer Monitor */}
      <rect x="110" y="60" width="110" height="75" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="3" />
      <rect x="115" y="65" width="100" height="65" rx="4" fill="#0f172a" />
      {/* Monitor Stand */}
      <rect x="160" y="135" width="10" height="15" fill="#64748b" />
      <ellipse cx="165" cy="150" rx="20" ry="3" fill="#94a3b8" />

      {/* 3D Sneaker on Monitor Screen */}
      <g transform="translate(135, 75) scale(0.6)">
        {/* White sole */}
        <path d="M5 40 Q25 45 60 40 L70 32 L55 30 L5 38 Z" fill="#ffffff" />
        {/* Blue shoe body */}
        <path d="M10 38 Q25 35 40 25 Q50 15 58 22 L65 30 L10 38 Z" fill="#2563eb" />
        {/* Orange swoosh streak */}
        <path d="M20 32 Q35 30 50 25" stroke="#f97316" strokeWidth="4" strokeLinecap="round" />
        {/* Glow rings */}
        <ellipse cx="40" cy="42" rx="30" ry="6" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />
      </g>

      {/* Floating 3D Editor UI windows on screen */}
      <rect x="30" y="65" width="65" height="50" rx="4" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.05))" />
      <rect x="36" y="72" width="25" height="4" rx="2" fill="#3b82f6" />
      <rect x="36" y="80" width="45" height="2" rx="1" fill="#cbd5e1" />
      <rect x="36" y="86" width="35" height="2" rx="1" fill="#cbd5e1" />
      <rect x="36" y="94" width="20" height="8" rx="2" fill="#f97316" />

      {/* Person sitting at desk (stylized designer) */}
      <g transform="translate(50, 95)">
        {/* Chair back */}
        <rect x="5" y="25" width="8" height="50" rx="4" fill="#475569" />
        <ellipse cx="15" cy="78" rx="12" ry="4" fill="#334155" />
        {/* Person Head */}
        <circle cx="28" cy="8" r="10" fill="#fbcfe8" />
        {/* Hair */}
        <path d="M22 6 Q28 -2 36 4 Q38 12 32 14 Z" fill="#ea580c" />
        {/* Body (orange shirt) */}
        <path d="M20 18 Q28 16 36 20 L42 50 L16 50 Z" fill="#f97316" />
        {/* Arm reaching for mouse */}
        <path d="M30 26 Q46 32 58 40" stroke="#fbcfe8" strokeWidth="6" strokeLinecap="round" />
      </g>
    </svg>
  );
}
