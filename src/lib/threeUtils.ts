import * as THREE from 'three';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { ModelStats } from './types';

/**
 * Format raw byte size into human readable string
 */
export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * Calculate geometry statistics for any Three.js Object3D hierarchy
 */
export function computeModelStats(object: THREE.Object3D, fileSize?: number): ModelStats {
  let triangles = 0;
  let vertices = 0;
  let meshes = 0;

  object.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      meshes++;
      const mesh = child as THREE.Mesh;
      const geom = mesh.geometry;
      if (geom) {
        if (geom.index) {
          triangles += geom.index.count / 3;
        } else if (geom.attributes.position) {
          triangles += geom.attributes.position.count / 3;
        }
        if (geom.attributes.position) {
          vertices += geom.attributes.position.count;
        }
      }
    }
  });

  const box = new THREE.Box3().setFromObject(object);
  const size = new THREE.Vector3();
  box.getSize(size);

  return {
    triangles: Math.round(triangles),
    vertices: Math.round(vertices),
    meshes,
    dimensions: {
      x: Number((isNaN(size.x) ? 0 : size.x).toFixed(2)),
      y: Number((isNaN(size.y) ? 0 : size.y).toFixed(2)),
      z: Number((isNaN(size.z) ? 0 : size.z).toFixed(2)),
    },
    fileSizeFormatted: fileSize !== undefined ? formatBytes(fileSize) : undefined,
  };
}

/**
 * Standardize and sanitize mesh geometries and materials before export
 */
export function prepareObjectForExport(object: THREE.Object3D): THREE.Object3D {
  object.updateMatrixWorld(true);

  // Traverse and ensure normals and materials are intact
  object.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      if (mesh.geometry) {
        if (!mesh.geometry.attributes.normal) {
          mesh.geometry.computeVertexNormals();
        }
        mesh.geometry.computeBoundingBox();
        mesh.geometry.computeBoundingSphere();
      }

      // If mesh material is absent, default to a clean PBR Standard Material
      if (!mesh.material) {
        mesh.material = new THREE.MeshStandardMaterial({
          color: 0x6366f1,
          roughness: 0.35,
          metalness: 0.25,
          side: THREE.DoubleSide,
        });
      } else if (Array.isArray(mesh.material)) {
        mesh.material.forEach((mat) => {
          mat.side = THREE.DoubleSide;
        });
      } else {
        mesh.material.side = THREE.DoubleSide;
      }
    }
  });

  return object;
}

/**
 * Check whether an Object3D uses PBR materials or image texture maps
 */
export function detectPbrMaterials(object: THREE.Object3D): boolean {
  let detected = false;
  object.traverse((child) => {
    if (detected) return;
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      for (const mat of mats) {
        if (!mat) continue;
        if (
          mat instanceof THREE.MeshStandardMaterial ||
          mat instanceof THREE.MeshPhysicalMaterial
        ) {
          if (
            mat.map ||
            mat.normalMap ||
            mat.roughnessMap ||
            mat.metalnessMap ||
            mat.emissiveMap ||
            mat.aoMap ||
            mat.roughness !== 1 ||
            mat.metalness !== 0
          ) {
            detected = true;
            return;
          }
        }
      }
    }
  });
  return detected;
}

/**
 * Downscale embedded canvas/image textures on a cloned scene to cap max dimension
 */
export function downscaleSceneTextures(
  object: THREE.Object3D,
  maxSize: number
): void {
  if (!maxSize || maxSize <= 0) return;
  const processed = new WeakSet<THREE.Texture>();
  const textureKeys = [
    'map',
    'normalMap',
    'roughnessMap',
    'metalnessMap',
    'emissiveMap',
    'aoMap',
    'alphaMap',
    'bumpMap',
  ] as const;

  object.traverse((child) => {
    if (!(child as THREE.Mesh).isMesh) return;
    const mesh = child as THREE.Mesh;
    const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];

    for (const mat of mats) {
      if (!mat) continue;
      for (const key of textureKeys) {
        const tex = (mat as unknown as Record<string, unknown>)[key];
        if (!(tex instanceof THREE.Texture) || processed.has(tex)) continue;
        processed.add(tex);

        const img = tex.image as
          | HTMLImageElement
          | HTMLCanvasElement
          | ImageBitmap
          | { width?: number; height?: number }
          | undefined;
        if (!img || typeof img.width !== 'number' || typeof img.height !== 'number') {
          continue;
        }
        const maxDim = Math.max(img.width, img.height);
        if (maxDim <= maxSize) continue;

        const scale = maxSize / maxDim;
        const targetW = Math.max(1, Math.round(img.width * scale));
        const targetH = Math.max(1, Math.round(img.height * scale));

        if (typeof document === 'undefined') continue;
        const canvas = document.createElement('canvas');
        canvas.width = targetW;
        canvas.height = targetH;
        const ctx = canvas.getContext('2d');
        if (!ctx) continue;

        try {
          ctx.drawImage(img as CanvasImageSource, 0, 0, targetW, targetH);
          tex.image = canvas;
          tex.needsUpdate = true;
        } catch {
          // Ignore tainted/unreadable images
        }
      }
    }
  });
}

/**
 * Auto-center an object and frame camera with optimal depth and angle
 */
export function fitCameraToObject(
  camera: THREE.PerspectiveCamera,
  object: THREE.Object3D,
  controls?: OrbitControls,
  offset = 1.35
) {
  const box = new THREE.Box3().setFromObject(object);
  if (box.isEmpty()) return;

  const center = new THREE.Vector3();
  box.getCenter(center);
  const size = new THREE.Vector3();
  box.getSize(size);

  // Re-center object to (0, 0, 0)
  object.position.x -= center.x;
  object.position.y -= center.y;
  object.position.z -= center.z;

  const maxDim = Math.max(size.x, size.y, size.z);
  const fov = camera.fov * (Math.PI / 180);
  let cameraDistance = Math.abs((maxDim / 2) / Math.tan(fov / 2)) * offset;
  cameraDistance = Math.max(cameraDistance, 1.5);

  // Isometric-ish angle for best 3D perspective
  camera.position.set(cameraDistance * 0.9, cameraDistance * 0.65, cameraDistance * 1.1);
  camera.near = Math.max(cameraDistance / 100, 0.01);
  camera.far = Math.max(cameraDistance * 100, 1000);
  camera.updateProjectionMatrix();

  if (controls) {
    controls.target.set(0, 0, 0);
    controls.maxDistance = cameraDistance * 8;
    controls.minDistance = Math.max(cameraDistance * 0.1, 0.1);
    controls.update();
  }
}
