import React from 'react';
import { Check, X, Sparkles } from 'lucide-react';

export default function FormatComparison() {
  const formats = [
    {
      name: 'GLB / glTF 2.0',
      badge: 'Web Standard',
      bestFor: 'WebGL, Three.js, React Three Fiber, Android Scene Viewer',
      appleAr: false,
      pbr: true,
      binary: true,
      loadSpeed: 'Ultra Fast',
    },
    {
      name: 'USDZ',
      badge: 'Apple AR',
      bestFor: 'iOS AR Quick Look, Safari, macOS, Apple Vision Pro',
      appleAr: true,
      pbr: true,
      binary: true,
      loadSpeed: 'Fast',
    },
    {
      name: 'Wavefront OBJ',
      badge: 'Legacy Mesh',
      bestFor: 'Basic 3D printing, CAD mesh interchange & archiving',
      appleAr: false,
      pbr: false,
      binary: false,
      loadSpeed: 'Slow (ASCII Text)',
    },
    {
      name: 'Autodesk FBX',
      badge: 'DCC & Games',
      bestFor: 'Maya, 3ds Max, Blender, Unity & Unreal pipelines',
      appleAr: false,
      pbr: true,
      binary: true,
      loadSpeed: 'Medium',
    },
  ];

  return (
    <section id="format-comparison" className="py-12 border-t border-gray-200">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 border border-indigo-100 mb-3">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Format Comparison</span>
        </div>
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          3D Formats at a Glance
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Compare web performance, PBR material support, and AR compatibility across popular 3D containers.
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-2xs">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-gray-700">
              <th className="p-4 font-bold">Format</th>
              <th className="p-4 font-bold">Primary Use Case</th>
              <th className="p-4 font-bold">Apple AR Quick Look</th>
              <th className="p-4 font-bold">PBR Materials</th>
              <th className="p-4 font-bold">Packaging</th>
              <th className="p-4 font-bold">Web Load Speed</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700">
            {formats.map((fmt) => (
              <tr key={fmt.name} className="hover:bg-gray-50/70 transition-colors">
                <td className="p-4 font-semibold text-gray-900 flex items-center gap-2 whitespace-nowrap">
                  <span>{fmt.name}</span>
                  <span className="rounded-md bg-gray-100 border border-gray-200 px-1.5 py-0.5 text-[10px] text-gray-600 font-semibold">
                    {fmt.badge}
                  </span>
                </td>
                <td className="p-4 text-gray-600">{fmt.bestFor}</td>
                <td className="p-4 whitespace-nowrap">
                  {fmt.appleAr ? (
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                      <Check className="h-3.5 w-3.5" /> Native iOS
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-gray-400">
                      <X className="h-3.5 w-3.5" /> Needs USDZ
                    </span>
                  )}
                </td>
                <td className="p-4 whitespace-nowrap">
                  {fmt.pbr ? (
                    <span className="text-emerald-700 inline-flex items-center gap-1 font-medium">
                      <Check className="h-3.5 w-3.5" /> Supported
                    </span>
                  ) : (
                    <span className="text-gray-500 inline-flex items-center gap-1">
                      <X className="h-3.5 w-3.5" /> Basic Phong/MTL
                    </span>
                  )}
                </td>
                <td className="p-4 whitespace-nowrap">
                  {fmt.binary ? (
                    <span className="text-blue-700 font-semibold">Binary / Zip</span>
                  ) : (
                    <span className="text-amber-700 font-semibold">ASCII Text</span>
                  )}
                </td>
                <td className="p-4 font-semibold text-gray-900 whitespace-nowrap">
                  {fmt.loadSpeed}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
