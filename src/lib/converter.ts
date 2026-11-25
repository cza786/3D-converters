import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { USDZExporter } from 'three/examples/jsm/exporters/USDZExporter.js';
import {
  prepareObjectForExport,
  computeModelStats,
  detectPbrMaterials,
  downscaleSceneTextures,
} from './threeUtils';
import type { ConversionPhase, OutputFormat, ToolId } from './types';

export interface ParseResult {
  object: THREE.Object3D;
  stats: ReturnType<typeof computeModelStats>;
  pbrDetected: boolean;
}

export interface ConvertOptions {
  targetFormat?: OutputFormat;
  maxTextureSize?: 512 | 1024 | 2048;
}

export interface ConvertResult {
  blob: Blob;
  downloadUrl: string;
  outputFileName: string;
  outputSize: number;
  previewObject: THREE.Object3D;
  stats: ReturnType<typeof computeModelStats>;
  pbrDetected: boolean;
}

type ProgressCallback = (phase: ConversionPhase, pct: number, message: string) => void;

/**
 * Parses an uploaded file into a Three.js Object3D for live 3D preview
 */
export async function parseModelForPreview(
  file: File | { name: string; buffer: ArrayBuffer },
  format: 'glb' | 'gltf' | 'obj' | 'fbx'
): Promise<ParseResult> {
  const buffer = 'buffer' in file ? file.buffer : await file.arrayBuffer();
  const fileSize = 'size' in file ? file.size : buffer.byteLength;

  let object: THREE.Object3D;

  if (format === 'glb' || format === 'gltf') {
    const loader = new GLTFLoader();
    const gltf = await loader.parseAsync(buffer, '');
    object = gltf.scene || gltf.scenes[0];
  } else if (format === 'obj') {
    const loader = new OBJLoader();
    const text = new TextDecoder().decode(buffer);
    object = loader.parse(text);
  } else if (format === 'fbx') {
    const loader = new FBXLoader();
    object = loader.parse(buffer, '');
  } else {
    throw new Error(`Unsupported 3D file format: .${format}`);
  }

  if (!object) {
    throw new Error('Failed to generate 3D scene from model data.');
  }

  prepareObjectForExport(object);
  const stats = computeModelStats(object, fileSize);
  const pbrDetected = detectPbrMaterials(object);

  return { object, stats, pbrDetected };
}

/**
 * Universal 3D client-side conversion pipeline
 */
export async function convert3DModel(
  toolId: ToolId,
  file: File | { name: string; buffer: ArrayBuffer },
  onProgress?: ProgressCallback,
  options?: ConvertOptions
): Promise<ConvertResult> {
  const fileName = file.name;
  const baseName = fileName.replace(/\.[^/.]+$/, '');
  const ext = fileName.split('.').pop()?.toLowerCase();
  const buffer = 'buffer' in file ? file.buffer : await file.arrayBuffer();
  const sourceSize = 'size' in file ? file.size : buffer.byteLength;

  const targetFormat: OutputFormat =
    options?.targetFormat ?? (toolId === 'glb-to-usdz' ? 'usdz' : 'glb');
  const maxTextureSize = options?.maxTextureSize ?? 1024;

  onProgress?.('reading', 15, 'Reading file into memory buffer...');
  await new Promise((r) => setTimeout(r, 40));

  let sceneObject: THREE.Object3D;
  let parsedStats: ReturnType<typeof computeModelStats>;
  let pbrDetected = false;

  try {
    onProgress?.('parsing', 35, 'Parsing 3D scene geometry & textures...');
    await new Promise((r) => setTimeout(r, 40));

    if (ext === 'glb' || ext === 'gltf' || (!ext && toolId === 'glb-to-usdz')) {
      const loader = new GLTFLoader();
      const gltf = await loader.parseAsync(buffer, '');
      sceneObject = gltf.scene || gltf.scenes[0];
    } else if (ext === 'obj' || (!ext && toolId === 'obj-to-glb')) {
      const loader = new OBJLoader();
      const text = new TextDecoder().decode(buffer);
      sceneObject = loader.parse(text);
    } else if (ext === 'fbx' || (!ext && toolId === 'fbx-to-glb')) {
      const loader = new FBXLoader();
      sceneObject = loader.parse(buffer, '');
    } else {
      throw new Error(`Unsupported input extension: .${ext || 'unknown'}`);
    }

    if (!sceneObject) {
      throw new Error('Failed to parse 3D scene geometry from the uploaded file.');
    }

    onProgress?.(
      'optimizing',
      60,
      `Optimizing materials, normals, and ${maxTextureSize}px textures...`
    );
    prepareObjectForExport(sceneObject);
    downscaleSceneTextures(sceneObject, maxTextureSize);
    parsedStats = computeModelStats(sceneObject, sourceSize);
    pbrDetected = detectPbrMaterials(sceneObject);

    await new Promise((r) => setTimeout(r, 40));
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to parse model';
    throw new Error(
      `Parsing Error: ${message}. Make sure your file is a valid 3D model and not corrupted.`
    );
  }

  onProgress?.('exporting', 80, `Packaging into .${targetFormat.toUpperCase()}...`);
  let resultBlob: Blob;
  let outputFileName: string;

  try {
    if (targetFormat === 'usdz') {
      const exporter = new USDZExporter();
      const exportScene = new THREE.Scene();
      exportScene.add(sceneObject.clone());

      const usdzArray = await exporter.parseAsync(exportScene, {
        quickLookCompatible: true,
        maxTextureSize,
      });

      resultBlob = new Blob([usdzArray], { type: 'model/vnd.usdz+zip' });
      outputFileName = `${baseName}.usdz`;
    } else {
      const exporter = new GLTFExporter();
      const exportGroup = sceneObject.clone();

      const glbBuffer = (await exporter.parseAsync(exportGroup, {
        binary: true,
        embedImages: true,
        onlyVisible: true,
      })) as ArrayBuffer;

      resultBlob = new Blob([glbBuffer], { type: 'model/gltf-binary' });
      outputFileName = `${baseName}.glb`;
    }

    onProgress?.('completed', 100, 'Conversion completed successfully!');

    const downloadUrl = URL.createObjectURL(resultBlob);

    return {
      blob: resultBlob,
      downloadUrl,
      outputFileName,
      outputSize: resultBlob.size,
      previewObject: sceneObject,
      stats: parsedStats,
      pbrDetected,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown export error';
    throw new Error(`Export Failed: ${message}`);
  }
}
