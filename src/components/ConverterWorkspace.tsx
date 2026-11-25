'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Download,
  AlertCircle,
  Loader2,
  CheckCircle2,
  ChevronDown,
  QrCode,
  FileCheck2,
  RotateCcw,
} from 'lucide-react';
import type { ToolConfig, ConversionState, OutputFormat } from '../lib/types';
import { convert3DModel, parseModelForPreview } from '../lib/converter';
import { getSampleModel, createReferenceSneaker } from '../lib/sampleModels';
import ThreeCanvas from './ThreeCanvas';
import ModelStatsBadge from './ModelStatsBadge';
import ArPreviewerMockup from './ArPreviewerMockup';
import AdSenseSidebar from './AdSenseSidebar';
import { computeModelStats, detectPbrMaterials, formatBytes } from '../lib/threeUtils';
import * as THREE from 'three';

interface Props {
  config: ToolConfig;
}

type TextureResolution = 512 | 1024 | 2048;

export default function ConverterWorkspace({ config }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previousDownloadUrlRef = useRef<string | undefined>(undefined);

  // Active loaded file (from choose, drag-and-drop, or Sample Model button)
  const [activeFile, setActiveFile] = useState<File | null>(null);
  const [previewObject, setPreviewObject] = useState<THREE.Object3D | null>(null);
  const [pbrDetected, setPbrDetected] = useState<boolean>(true);

  const [conversionState, setConversionState] = useState<ConversionState>({
    phase: 'idle',
    progress: 0,
    statusMessage: '',
  });

  const [isDragOver, setIsDragOver] = useState(false);
  const [targetFormat, setTargetFormat] = useState<OutputFormat>(
    config.outputExtension.replace('.', '') as OutputFormat
  );
  const [textureQuality, setTextureQuality] = useState<TextureResolution>(1024);
  const [showQrModal, setShowQrModal] = useState<boolean>(false);
  const [fileSizeDisplay, setFileSizeDisplay] = useState<string>('Sample Preview');

  // Revoke previous blob URL when replaced or unmounted
  const revokePreviousUrl = useCallback(() => {
    if (previousDownloadUrlRef.current) {
      URL.revokeObjectURL(previousDownloadUrlRef.current);
      previousDownloadUrlRef.current = undefined;
    }
  }, []);

  useEffect(() => {
    return () => revokePreviousUrl();
  }, [revokePreviousUrl]);

  // Defer Three.js sample preview creation to client-side frame so Next.js prerender never hits THREE.MathUtils.generateUUID()
  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      try {
        const sneaker = createReferenceSneaker();
        const stats = computeModelStats(sneaker);
        setPreviewObject(sneaker);
        setPbrDetected(detectPbrMaterials(sneaker));
        setFileSizeDisplay('Sample Preview');
        setConversionState((prev) => ({
          ...prev,
          stats,
        }));
      } catch {
        // Ignore preview error
      }
    });
    return () => window.cancelAnimationFrame(frameId);
  }, []);

  // Handle file selection (Choose File, Drag & Drop, or Sample Model)
  const handleFile = useCallback(
    async (file: File) => {
      const ext = '.' + (file.name.split('.').pop()?.toLowerCase() ?? '');
      const isValid = config.acceptedFileTypes.some(
        (allowed) => allowed.toLowerCase() === ext
      );

      if (!isValid) {
        setConversionState({
          phase: 'error',
          progress: 0,
          statusMessage: 'Invalid file format',
          errorMessage: `Please select a valid ${config.inputExtension} file. You selected: ${file.name}`,
        });
        return;
      }

      const maxBytes = config.maxFileSizeMB * 1024 * 1024;
      if (file.size > maxBytes) {
        setConversionState({
          phase: 'error',
          progress: 0,
          statusMessage: 'File exceeds size limit',
          errorMessage: `File size (${formatBytes(file.size)}) exceeds the ${config.maxFileSizeMB} MB browser memory limit.`,
        });
        return;
      }

      revokePreviousUrl();
      setActiveFile(file);
      setConversionState({
        phase: 'reading',
        progress: 10,
        statusMessage: `Reading ${file.name}...`,
        sourceFile: {
          name: file.name,
          size: file.size,
          extension: ext,
        },
      });

      try {
        const formatKey = ext.replace('.', '') as 'glb' | 'gltf' | 'obj' | 'fbx';
        const parsed = await parseModelForPreview(file, formatKey);

        setPreviewObject(parsed.object);
        setPbrDetected(parsed.pbrDetected);
        setFileSizeDisplay(formatBytes(file.size));
        setConversionState({
          phase: 'idle',
          progress: 0,
          statusMessage: `${file.name} loaded and ready to convert.`,
          sourceFile: {
            name: file.name,
            size: file.size,
            extension: ext,
          },
          stats: parsed.stats,
        });
      } catch (err: unknown) {
        const errorMsg =
          err instanceof Error
            ? err.message
            : 'Failed to parse 3D file. Please ensure it is not corrupt.';
        setConversionState({
          phase: 'error',
          progress: 0,
          statusMessage: 'Failed to inspect model',
          errorMessage: errorMsg,
          sourceFile: {
            name: file.name,
            size: file.size,
            extension: ext,
          },
        });
      }
    },
    [config, revokePreviousUrl]
  );

  // Load procedural sample model
  const handleLoadSample = useCallback(async () => {
    try {
      const sampleFile = await getSampleModel(config.id);
      await handleFile(sampleFile);
    } catch (err) {
      console.error(err);
    }
  }, [config.id, handleFile]);

  // Reset workspace back to idle
  const handleReset = useCallback(() => {
    revokePreviousUrl();
    setActiveFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    const sneaker = createReferenceSneaker();
    setPreviewObject(sneaker);
    setPbrDetected(detectPbrMaterials(sneaker));
    setFileSizeDisplay('Sample Preview');
    setConversionState({
      phase: 'idle',
      progress: 0,
      statusMessage: '',
      stats: computeModelStats(sneaker),
    });
  }, [revokePreviousUrl]);

  // Trigger conversion using activeFile (or sample fallback if user clicks Convert directly)
  const handleStartConversion = useCallback(async () => {
    let file = activeFile;
    if (!file) {
      file = await getSampleModel(config.id);
      setActiveFile(file);
    }

    try {
      revokePreviousUrl();
      setConversionState((prev) => ({
        ...prev,
        phase: 'parsing',
        progress: 25,
        statusMessage: 'Processing model geometry and textures...',
        errorMessage: undefined,
      }));

      const result = await convert3DModel(
        config.id,
        file,
        (phase, pct, msg) => {
          setConversionState((prev) => ({
            ...prev,
            phase,
            progress: pct,
            statusMessage: msg,
          }));
        },
        {
          targetFormat,
          maxTextureSize: textureQuality,
        }
      );

      previousDownloadUrlRef.current = result.downloadUrl;
      setPreviewObject(result.previewObject);
      setPbrDetected(result.pbrDetected);
      setFileSizeDisplay(formatBytes(result.outputSize));

      setConversionState({
        phase: 'completed',
        progress: 100,
        statusMessage: 'Conversion completed!',
        sourceFile: {
          name: file.name,
          size: file.size,
          extension: '.' + (file.name.split('.').pop()?.toLowerCase() ?? ''),
        },
        resultBlob: result.blob,
        downloadUrl: result.downloadUrl,
        outputFileName: result.outputFileName,
        outputSize: result.outputSize,
        stats: result.stats,
      });

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f97316', '#3b82f6', '#10b981', '#6366f1'],
      });

      // Trigger automatic browser download
      const a = document.createElement('a');
      a.href = result.downloadUrl;
      a.download = result.outputFileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error
          ? err.message
          : 'Conversion failed unexpectedly. Please check your model geometry.';
      setConversionState((prev) => ({
        ...prev,
        phase: 'error',
        statusMessage: 'Conversion failed',
        errorMessage: errorMsg,
      }));
    }
  }, [activeFile, config.id, revokePreviousUrl, targetFormat, textureQuality]);

  const isConverting =
    conversionState.phase === 'reading' ||
    conversionState.phase === 'parsing' ||
    conversionState.phase === 'optimizing' ||
    conversionState.phase === 'exporting';

  return (
    <div className="w-full space-y-6">
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
          }
        }}
        accept={config.acceptedFileTypes.join(',')}
        className="hidden"
      />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <span className="inline-flex items-center rounded-full bg-blue-50 border border-blue-200 px-3 py-0.5 text-xs font-semibold text-blue-700 mb-2">
            {config.badge} · 100% Client-Side
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            {config.title}
          </h1>
          <p className="text-sm text-gray-600 mt-1 max-w-2xl">
            {config.description}
          </p>
        </div>

        {activeFile && (
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset Workspace
          </button>
        )}
      </div>

      {/* 1. Drag & Drop Box */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragOver(false);
          if (e.dataTransfer.files?.[0]) {
            handleFile(e.dataTransfer.files[0]);
          }
        }}
        onClick={() => fileInputRef.current?.click()}
        className={`w-full rounded-2xl border-2 border-dashed bg-white p-8 text-center cursor-pointer transition-all shadow-2xs ${
          isDragOver
            ? 'border-blue-500 bg-blue-50/50 scale-[1.005]'
            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/50'
        }`}
      >
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="text-gray-800 mb-1">
            <svg
              className="h-9 w-9 text-gray-800"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            </svg>
          </div>

          <h2 className="text-base sm:text-lg font-bold text-gray-900">
            {activeFile ? (
              <span className="inline-flex items-center gap-2 text-emerald-700">
                <FileCheck2 className="h-5 w-5" />
                Loaded: {activeFile.name} ({formatBytes(activeFile.size)})
              </span>
            ) : (
              `Drag & Drop ${config.inputExtension.toUpperCase()} file here (Max ${config.maxFileSizeMB}MB)`
            )}
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <span className="text-xs text-gray-400 font-medium">or</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              className="rounded-lg bg-[#0f172a] hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm px-6 py-2 shadow-xs transition-all active:scale-95"
            >
              Choose File
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleLoadSample();
              }}
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold underline ml-1"
            >
              Try Sample Model
            </button>
          </div>
        </div>
      </div>

      {/* 2. Middle Section: 3D Live Preview + Optimizer & Target */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive 3D Live Preview + Real Mesh Stats */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <ThreeCanvas
            object={previewObject}
            fileSizeText={fileSizeDisplay}
            pbrDetected={pbrDetected}
          />

          {conversionState.stats && (
            <ModelStatsBadge stats={conversionState.stats} />
          )}
        </div>

        {/* Right Column: Optimizer & Target */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-gray-900">
              Optimizer & Target
            </h3>

            {/* Target Format dropdown */}
            <div className="space-y-1.5">
              <label
                htmlFor="target-format-select"
                className="text-xs font-semibold text-gray-600"
              >
                Target Format
              </label>
              <div className="relative">
                <select
                  id="target-format-select"
                  value={targetFormat}
                  onChange={(e) => setTargetFormat(e.target.value as OutputFormat)}
                  className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-gray-800 shadow-2xs focus:border-blue-500 focus:outline-none"
                >
                  <option value="usdz">.USDZ (Apple AR Quick Look)</option>
                  <option value="glb">.GLB (Web Standard glTF)</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Texture Quality dropdown */}
            <div className="space-y-1.5">
              <label
                htmlFor="texture-quality-select"
                className="text-xs font-semibold text-gray-600"
              >
                Max Texture Resolution
              </label>
              <div className="relative">
                <select
                  id="texture-quality-select"
                  value={textureQuality}
                  onChange={(e) =>
                    setTextureQuality(Number(e.target.value) as TextureResolution)
                  }
                  className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-gray-800 shadow-2xs focus:border-blue-500 focus:outline-none"
                >
                  <option value={1024}>1024px (Balanced / Web AR)</option>
                  <option value={2048}>2048px (High Detail)</option>
                  <option value={512}>512px (Ultra-light)</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Progress indicator when converting */}
            {isConverting && (
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-[11px] text-gray-600 font-medium">
                  <span className="flex items-center gap-1">
                    <Loader2 className="h-3 w-3 animate-spin text-orange-500" />
                    {conversionState.statusMessage}
                  </span>
                  <span>{conversionState.progress}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full bg-orange-500 transition-all duration-300"
                    style={{ width: `${conversionState.progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Completion banner with manual re-download */}
            {conversionState.phase === 'completed' && conversionState.downloadUrl && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800 space-y-2">
                <div className="flex items-center justify-between font-bold">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    Ready: {conversionState.outputFileName}
                  </span>
                  {conversionState.outputSize !== undefined && (
                    <span className="text-[11px] font-semibold bg-emerald-100 px-2 py-0.5 rounded-md">
                      {formatBytes(conversionState.outputSize)}
                    </span>
                  )}
                </div>
                <a
                  href={conversionState.downloadUrl}
                  download={conversionState.outputFileName}
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-3 transition-colors"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download Again
                </a>
              </div>
            )}

            {/* Error banner if any */}
            {conversionState.errorMessage && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700 space-y-1">
                <span className="font-bold flex items-center gap-1">
                  <AlertCircle className="h-3.5 w-3.5 text-red-500" />
                  Conversion Error
                </span>
                <p>{conversionState.errorMessage}</p>
              </div>
            )}

            {/* Big Orange Button */}
            <button
              type="button"
              disabled={isConverting}
              onClick={() => handleStartConversion()}
              className={`w-full rounded-xl py-3.5 px-4 text-sm font-bold text-white shadow-md transition-all active:scale-98 ${
                isConverting
                  ? 'bg-orange-400 cursor-not-allowed'
                  : 'bg-[#ff6b00] hover:bg-[#ea580c] shadow-orange-500/25'
              }`}
            >
              {isConverting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Converting...
                </span>
              ) : (
                `Convert & Download (.${targetFormat.toUpperCase()})`
              )}
            </button>

            {/* Secondary Button: Mobile AR Guide QR */}
            <button
              type="button"
              onClick={() => setShowQrModal(!showQrModal)}
              className="w-full rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-2.5 px-4 text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <QrCode className="h-3.5 w-3.5 text-slate-600" />
              <span>{showQrModal ? 'Hide Mobile AR Guide' : 'Mobile AR Setup QR'}</span>
            </button>
          </div>

          {/* AR Phone Mockup & Real AdSense Slot (only active when configured) */}
          <div className="space-y-4">
            {showQrModal && (
              <div className="animate-in fade-in zoom-in-95 duration-200">
                <ArPreviewerMockup />
              </div>
            )}
            <AdSenseSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
