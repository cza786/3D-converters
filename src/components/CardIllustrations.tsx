import React from 'react';

/**
 * Exact 3D Isometric Cube Logo matching the reference
 */
export function Logo3DCube({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Top Face - Orange */}
      <polygon points="20,4 36,13 20,22 4,13" fill="#f97316" />
      {/* Left Face - Dark Red/Crimson */}
      <polygon points="4,13 20,22 20,38 4,29" fill="#dc2626" />
      {/* Right Face - Royal Blue */}
      <polygon points="20,22 36,13 36,29 20,38" fill="#2563eb" />
      {/* Highlight strokes */}
      <polygon points="20,4 36,13 20,22 4,13" stroke="white" strokeWidth="0.8" strokeOpacity="0.4" />
      <polygon points="4,13 20,22 20,38 4,29" stroke="white" strokeWidth="0.8" strokeOpacity="0.3" />
      <polygon points="20,22 36,13 36,29 20,38" stroke="white" strokeWidth="0.8" strokeOpacity="0.3" />
    </svg>
  );
}

/**
 * Card 1: GLB to USDZ (Orange GLB Cube connected to Green USDZ Cube)
 */
export function GlbToUsdzIllustration({ className = 'w-28 h-20' }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Shadow */}
      <ellipse cx="70" cy="85" rx="55" ry="12" fill="#000000" fillOpacity="0.06" />

      {/* Left Cube - GLB (Orange) */}
      <g transform="translate(15, 15)">
        {/* Top Face */}
        <polygon points="35,5 65,22 35,39 5,22" fill="#fb923c" />
        {/* Left Face */}
        <polygon points="5,22 35,39 35,69 5,52" fill="#ea580c" />
        {/* Right Face */}
        <polygon points="35,39 65,22 65,52 35,69" fill="#c2410c" />
        {/* Inner label on left face */}
        <text
          x="20"
          y="48"
          fill="#ffffff"
          fontSize="11"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
          transform="skewY(22) rotate(-10 20 48)"
          textAnchor="middle"
        >
          GLB
        </text>
      </g>

      {/* Right Cube - USDZ (Green) */}
      <g transform="translate(58, 25)">
        {/* Top Face */}
        <polygon points="35,5 65,22 35,39 5,22" fill="#4ade80" />
        {/* Left Face */}
        <polygon points="5,22 35,39 35,69 5,52" fill="#16a34a" />
        {/* Right Face */}
        <polygon points="35,39 65,22 65,52 35,69" fill="#15803d" />
        {/* Inner label on left face */}
        <text
          x="20"
          y="50"
          fill="#ffffff"
          fontSize="9.5"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
          transform="skewY(22) rotate(-10 20 50)"
          textAnchor="middle"
        >
          USDZ
        </text>
      </g>
    </svg>
  );
}

/**
 * Card 2: OBJ to GLB (Orange OBJ Cube connected to Blue GLB Cube)
 */
export function ObjToGlbIllustration({ className = 'w-28 h-20' }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Shadow */}
      <ellipse cx="70" cy="85" rx="55" ry="12" fill="#000000" fillOpacity="0.06" />

      {/* Left Cube - OBJ (Orange) */}
      <g transform="translate(15, 15)">
        {/* Top Face */}
        <polygon points="35,5 65,22 35,39 5,22" fill="#fb923c" />
        {/* Left Face */}
        <polygon points="5,22 35,39 35,69 5,52" fill="#ea580c" />
        {/* Right Face */}
        <polygon points="35,39 65,22 65,52 35,69" fill="#c2410c" />
        <text
          x="20"
          y="48"
          fill="#ffffff"
          fontSize="11"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
          transform="skewY(22) rotate(-10 20 48)"
          textAnchor="middle"
        >
          OBJ
        </text>
      </g>

      {/* Right Cube - GLB (Blue) */}
      <g transform="translate(58, 25)">
        {/* Top Face */}
        <polygon points="35,5 65,22 35,39 5,22" fill="#60a5fa" />
        {/* Left Face */}
        <polygon points="5,22 35,39 35,69 5,52" fill="#2563eb" />
        {/* Right Face */}
        <polygon points="35,39 65,22 65,52 35,69" fill="#1d4ed8" />
        <text
          x="20"
          y="50"
          fill="#ffffff"
          fontSize="11"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
          transform="skewY(22) rotate(-10 20 50)"
          textAnchor="middle"
        >
          GLB
        </text>
      </g>
    </svg>
  );
}

/**
 * Card 3: FBX to GLB (Orange FBX Cube connected to Blue GLB Cube)
 */
export function FbxToGlbIllustration({ className = 'w-28 h-20' }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Shadow */}
      <ellipse cx="70" cy="85" rx="55" ry="12" fill="#000000" fillOpacity="0.06" />

      {/* Left Cube - FBX (Orange) */}
      <g transform="translate(15, 15)">
        {/* Top Face */}
        <polygon points="35,5 65,22 35,39 5,22" fill="#fb923c" />
        {/* Left Face */}
        <polygon points="5,22 35,39 35,69 5,52" fill="#ea580c" />
        {/* Right Face */}
        <polygon points="35,39 65,22 65,52 35,69" fill="#c2410c" />
        <text
          x="20"
          y="48"
          fill="#ffffff"
          fontSize="11"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
          transform="skewY(22) rotate(-10 20 48)"
          textAnchor="middle"
        >
          FBX
        </text>
      </g>

      {/* Right Cube - GLB (Blue) */}
      <g transform="translate(58, 25)">
        {/* Top Face */}
        <polygon points="35,5 65,22 35,39 5,22" fill="#60a5fa" />
        {/* Left Face */}
        <polygon points="5,22 35,39 35,69 5,52" fill="#2563eb" />
        {/* Right Face */}
        <polygon points="35,39 65,22 65,52 35,69" fill="#1d4ed8" />
        <text
          x="20"
          y="50"
          fill="#ffffff"
          fontSize="11"
          fontWeight="bold"
          fontFamily="system-ui, sans-serif"
          transform="skewY(22) rotate(-10 20 50)"
          textAnchor="middle"
        >
          GLB
        </text>
      </g>
    </svg>
  );
}

/**
 * Card 4: 3D Compressor (Blue box with orange ribbon and pink/orange gear)
 */
export function CompressorIllustration({ className = 'w-24 h-20' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="85" rx="45" ry="10" fill="#000000" fillOpacity="0.06" />

      {/* Box */}
      <g transform="translate(20, 15)">
        {/* Top */}
        <polygon points="38,8 70,26 38,44 6,26" fill="#60a5fa" />
        <polygon points="38,8 70,26 38,44 6,26" stroke="#3b82f6" strokeWidth="1" />
        {/* Ribbon on top */}
        <polygon points="32,11 44,18 44,38 32,31" fill="#f97316" />
        {/* Left */}
        <polygon points="6,26 38,44 38,72 6,54" fill="#2563eb" />
        {/* Right */}
        <polygon points="38,44 70,26 70,54 38,72" fill="#1d4ed8" />
        {/* Orange Ribbon wrapped around */}
        <polygon points="6,38 38,56 38,64 6,46" fill="#fb923c" />
        <polygon points="38,56 70,38 70,46 38,64" fill="#ea580c" />
      </g>

      {/* Industrial Gear on bottom right */}
      <g transform="translate(68, 48)">
        <circle cx="20" cy="20" r="14" fill="#f43f5e" />
        <circle cx="20" cy="20" r="8" fill="#fbbf24" />
        <circle cx="20" cy="20" r="4" fill="#881337" />
        {/* Gear teeth */}
        <rect x="18" y="3" width="4" height="6" rx="1" fill="#f43f5e" />
        <rect x="18" y="31" width="4" height="6" rx="1" fill="#f43f5e" />
        <rect x="3" y="18" width="6" height="4" rx="1" fill="#f43f5e" />
        <rect x="31" y="18" width="6" height="4" rx="1" fill="#f43f5e" />
      </g>
    </svg>
  );
}

/**
 * Card 5: AR Previewer (3D Tablet/Screen with stylized QR code)
 */
export function ArPreviewerIllustration({ className = 'w-24 h-20' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="85" rx="45" ry="10" fill="#000000" fillOpacity="0.06" />

      {/* Tablet base / 3D screen */}
      <g transform="translate(22, 10)">
        {/* Screen back / depth */}
        <rect x="10" y="5" width="60" height="70" rx="8" fill="#1e293b" />
        <rect x="12" y="7" width="60" height="70" rx="8" fill="#0284c7" />
        {/* Front screen */}
        <rect x="6" y="2" width="60" height="70" rx="8" fill="#ffffff" stroke="#f97316" strokeWidth="2.5" />

        {/* QR Code graphic */}
        <g transform="translate(16, 12)">
          {/* QR squares */}
          <rect x="0" y="0" width="12" height="12" fill="#0f172a" rx="1" />
          <rect x="2" y="2" width="8" height="8" fill="#ffffff" />
          <rect x="4" y="4" width="4" height="4" fill="#0f172a" />

          <rect x="28" y="0" width="12" height="12" fill="#0f172a" rx="1" />
          <rect x="30" y="2" width="8" height="8" fill="#ffffff" />
          <rect x="32" y="4" width="4" height="4" fill="#0f172a" />

          <rect x="0" y="28" width="12" height="12" fill="#0f172a" rx="1" />
          <rect x="2" y="30" width="8" height="8" fill="#ffffff" />
          <rect x="4" y="32" width="4" height="4" fill="#0f172a" />

          {/* Random QR bits */}
          <rect x="16" y="4" width="4" height="4" fill="#0f172a" />
          <rect x="20" y="8" width="4" height="4" fill="#0f172a" />
          <rect x="16" y="16" width="8" height="8" fill="#0f172a" />
          <rect x="28" y="16" width="4" height="4" fill="#0f172a" />
          <rect x="8" y="18" width="4" height="4" fill="#0f172a" />
          <rect x="18" y="28" width="8" height="4" fill="#0f172a" />
          <rect x="30" y="30" width="6" height="6" fill="#0f172a" />
        </g>
      </g>
    </svg>
  );
}

/**
 * Card 6: Gaussian Splatting Viewer (Rainbow 3D Gaussian cone/splat mountain)
 */
export function GaussianSplatIllustration({ className = 'w-24 h-20' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="85" rx="45" ry="10" fill="#000000" fillOpacity="0.06" />

      {/* Splat Mountain / Cone */}
      <defs>
        <radialGradient id="splatGrad" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="25%" stopColor="#f59e0b" />
          <stop offset="50%" stopColor="#10b981" />
          <stop offset="75%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#3b82f6" />
        </radialGradient>
      </defs>

      <path
        d="M60 16 C 54 36, 32 60, 22 74 C 20 77, 24 82, 34 83 C 50 84, 70 84, 86 83 C 96 82, 100 77, 98 74 C 88 60, 66 36, 60 16 Z"
        fill="url(#splatGrad)"
      />

      {/* Floating gaussian point particles */}
      <circle cx="60" cy="14" r="2.5" fill="#f87171" />
      <circle cx="48" cy="38" r="2" fill="#fbbf24" />
      <circle cx="72" cy="40" r="2" fill="#34d399" />
      <circle cx="38" cy="58" r="2.5" fill="#38bdf8" />
      <circle cx="82" cy="62" r="2.5" fill="#818cf8" />
      <circle cx="60" cy="52" r="3" fill="#a78bfa" />
    </svg>
  );
}
