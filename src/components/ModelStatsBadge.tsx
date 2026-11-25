import React from 'react';
import type { ModelStats } from '../lib/types';
import { Triangle, Layers, Box, Database } from 'lucide-react';

interface Props {
  stats: ModelStats;
  compact?: boolean;
}

export default function ModelStatsBadge({ stats, compact = false }: Props) {
  if (compact) {
    return (
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 border border-slate-200 px-2.5 py-1 text-slate-700 font-medium">
          <Triangle className="h-3 w-3 text-indigo-600" />
          <span>{stats.triangles.toLocaleString()} tris</span>
        </span>
        <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 border border-slate-200 px-2.5 py-1 text-slate-700 font-medium">
          <Layers className="h-3 w-3 text-blue-600" />
          <span>
            {stats.meshes} {stats.meshes === 1 ? 'mesh' : 'meshes'}
          </span>
        </span>
        {stats.fileSizeFormatted && (
          <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 border border-slate-200 px-2.5 py-1 text-slate-700 font-medium">
            <Database className="h-3 w-3 text-emerald-600" />
            <span>{stats.fileSizeFormatted}</span>
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-2xs">
      <div className="flex flex-col">
        <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1">
          <Triangle className="h-3 w-3 text-indigo-500" />
          Triangles
        </span>
        <span className="text-sm font-bold text-gray-900 mt-0.5">
          {stats.triangles.toLocaleString()}
        </span>
      </div>

      <div className="flex flex-col">
        <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1">
          <Box className="h-3 w-3 text-blue-500" />
          Vertices
        </span>
        <span className="text-sm font-bold text-gray-900 mt-0.5">
          {stats.vertices.toLocaleString()}
        </span>
      </div>

      <div className="flex flex-col">
        <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1">
          <Layers className="h-3 w-3 text-purple-500" />
          Meshes
        </span>
        <span className="text-sm font-bold text-gray-900 mt-0.5">
          {stats.meshes}
        </span>
      </div>

      <div className="flex flex-col">
        <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1">
          <Box className="h-3 w-3 text-emerald-500" />
          Bounding Box
        </span>
        <span
          className="text-xs font-mono font-semibold text-gray-800 mt-1 truncate"
          title={`${stats.dimensions.x} × ${stats.dimensions.y} × ${stats.dimensions.z}`}
        >
          {stats.dimensions.x} × {stats.dimensions.y} × {stats.dimensions.z}
        </span>
      </div>
    </div>
  );
}
