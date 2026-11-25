'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { fitCameraToObject } from '../lib/threeUtils';
import {
  RotateCw,
  Maximize2,
  Minimize2,
  Grid,
  Eye,
  Camera,
  Compass,
} from 'lucide-react';

interface ThreeCanvasProps {
  object: THREE.Object3D | null;
  className?: string;
  autoRotateDefault?: boolean;
  fileSizeText?: string;
  pbrDetected?: boolean;
}

export default function ThreeCanvas({
  object,
  className = '',
  autoRotateDefault = false,
  fileSizeText = '12.4 MB',
  pbrDetected = true,
}: ThreeCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Three.js instances refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const modelWrapperRef = useRef<THREE.Group | null>(null);
  const ringsGroupRef = useRef<THREE.Group | null>(null);

  // UI state
  const [isAutoRotating, setIsAutoRotating] = useState(autoRotateDefault);
  const [isWireframe, setIsWireframe] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Initialize Three.js scene once
  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const width = container.clientWidth || 550;
    const height = container.clientHeight || 380;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x070c18);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(3.2, 2.4, 4.0);
    cameraRef.current = camera;

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;

    // 4. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = true;
    controls.autoRotate = autoRotateDefault;
    controls.autoRotateSpeed = 2.0;
    controlsRef.current = controls;

    // 5. Studio Lighting with cybernetic blue rim
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.6);
    keyLight.position.set(5, 10, 7);
    scene.add(keyLight);

    const cyanRimLight = new THREE.DirectionalLight(0x38bdf8, 1.4);
    cyanRimLight.position.set(-6, -2, -6);
    scene.add(cyanRimLight);

    const blueUnderLight = new THREE.PointLight(0x0284c7, 1.8, 15);
    blueUnderLight.position.set(0, -1.2, 0);
    scene.add(blueUnderLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x1e293b, 0.7);
    scene.add(hemiLight);

    // 6. Concentric Neon Orbital Rings Platform (matching the reference image!)
    const ringsGroup = new THREE.Group();
    scene.add(ringsGroup);
    ringsGroupRef.current = ringsGroup;

    // Outer faint ring
    const ring1Geo = new THREE.RingGeometry(2.0, 2.02, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ringMat);
    ring1.rotation.x = Math.PI / 2;
    ring1.position.y = -0.55;
    ringsGroup.add(ring1);

    // Inner bright ring
    const ring2Geo = new THREE.RingGeometry(1.4, 1.42, 64);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 2;
    ring2.position.y = -0.55;
    ringsGroup.add(ring2);

    // Small center ring
    const ring3Geo = new THREE.RingGeometry(0.8, 0.81, 48);
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: 0x0ea5e9,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.x = Math.PI / 2;
    ring3.position.y = -0.55;
    ringsGroup.add(ring3);

    // Orbital satellite node on the ring
    const nodeGeo = new THREE.SphereGeometry(0.06, 12, 12);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const node1 = new THREE.Mesh(nodeGeo, nodeMat);
    node1.position.set(1.41, -0.55, 0);
    ringsGroup.add(node1);

    const node2 = new THREE.Mesh(nodeGeo, nodeMat);
    node2.position.set(-1.0, -0.55, 1.0);
    ringsGroup.add(node2);

    // Subtle dark circular platform beneath
    const discGeo = new THREE.CircleGeometry(2.2, 48);
    const discMat = new THREE.MeshBasicMaterial({
      color: 0x0b1528,
      transparent: true,
      opacity: 0.6,
    });
    const disc = new THREE.Mesh(discGeo, discMat);
    disc.rotation.x = -Math.PI / 2;
    disc.position.y = -0.56;
    ringsGroup.add(disc);

    // 7. Model container group
    const modelWrapper = new THREE.Group();
    scene.add(modelWrapper);
    modelWrapperRef.current = modelWrapper;

    // Animation Loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // Cleanup on unmount
    return () => {
      resizeObserver.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      controls.dispose();
      renderer.dispose();
      modelWrapper.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.geometry?.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => m.dispose());
          } else {
            mesh.material?.dispose();
          }
        }
      });
    };
  }, [autoRotateDefault]);

  // Update object when prop changes
  useEffect(() => {
    const modelWrapper = modelWrapperRef.current;
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    const rings = ringsGroupRef.current;
    if (!modelWrapper || !camera) return;

    // Clear previous model
    while (modelWrapper.children.length > 0) {
      const child = modelWrapper.children[0];
      modelWrapper.remove(child);
    }

    if (!object) return;

    // Clone or add object
    const clonedObject = object.clone();
    modelWrapper.add(clonedObject);

    // Center and auto-fit camera
    fitCameraToObject(camera, clonedObject, controls || undefined, 1.4);

    // Adjust ring position to sit right under model
    if (rings) {
      const box = new THREE.Box3().setFromObject(clonedObject);
      if (!box.isEmpty()) {
        rings.position.y = box.min.y;
        const maxDim = Math.max(box.max.x - box.min.x, box.max.z - box.min.z);
        const scale = Math.max(maxDim * 0.9, 1.2);
        rings.scale.set(scale, 1, scale);
      }
    }
  }, [object]);

  // Handle Auto Rotate toggle
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = isAutoRotating;
    }
  }, [isAutoRotating]);

  // Handle Wireframe toggle
  useEffect(() => {
    if (!modelWrapperRef.current) return;
    modelWrapperRef.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m) => {
            if (m && 'wireframe' in m) {
              (m as unknown as { wireframe: boolean }).wireframe = isWireframe;
            }
          });
        } else if (mesh.material && 'wireframe' in mesh.material) {
          (mesh.material as unknown as { wireframe: boolean }).wireframe = isWireframe;
        }
      }
    });
  }, [isWireframe]);

  // Handle Grid toggle
  useEffect(() => {
    if (ringsGroupRef.current) {
      ringsGroupRef.current.visible = showGrid;
    }
  }, [showGrid]);

  const handleResetCamera = useCallback(() => {
    if (!cameraRef.current || !modelWrapperRef.current) return;
    fitCameraToObject(cameraRef.current, modelWrapperRef.current, controlsRef.current || undefined);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[360px] sm:h-[400px] overflow-hidden rounded-2xl bg-[#070c18] border border-slate-800 shadow-xl select-none group ${className}`}
    >
      {/* Three.js Canvas Element */}
      <canvas ref={canvasRef} className="h-full w-full block cursor-grab active:cursor-grabbing outline-none" />

      {/* Top Left Title Overlay: Exactly matching reference "Interactive 3D Live Preview" */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <h3 className="text-xs sm:text-sm font-semibold tracking-wide text-white drop-shadow-md">
          Interactive 3D Live Preview
        </h3>
      </div>

      {/* Top Right Floating Toolbar */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1 rounded-xl bg-slate-900/80 border border-slate-700/60 p-1 backdrop-blur-md shadow-lg">
        <button
          type="button"
          onClick={handleResetCamera}
          title="Reset Camera View"
          className="rounded-lg p-1.5 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <Camera className="h-3.5 w-3.5" />
        </button>

        <button
          type="button"
          onClick={() => setIsWireframe(!isWireframe)}
          title={isWireframe ? 'Shaded View' : 'Wireframe View'}
          className={`rounded-lg p-1.5 transition-colors ${
            isWireframe ? 'bg-blue-600/30 text-blue-400' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <Eye className="h-3.5 w-3.5" />
        </button>

        <button
          type="button"
          onClick={() => setShowGrid(!showGrid)}
          title="Toggle Rings Platform"
          className={`rounded-lg p-1.5 transition-colors ${
            showGrid ? 'bg-cyan-600/30 text-cyan-400' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <Grid className="h-3.5 w-3.5" />
        </button>

        <button
          type="button"
          onClick={() => setIsAutoRotating(!isAutoRotating)}
          title="Auto Rotate Turntable"
          className={`rounded-lg p-1.5 transition-colors ${
            isAutoRotating ? 'bg-purple-600/30 text-purple-400' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <RotateCw className={`h-3.5 w-3.5 ${isAutoRotating ? 'animate-spin' : ''}`} />
        </button>

        <button
          type="button"
          onClick={toggleFullscreen}
          title="Fullscreen"
          className="rounded-lg p-1.5 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
        >
          {isFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
        </button>
      </div>

      {/* Bottom Left Info Text: Exactly matching reference "File Size: 12.4 MB", "Textures: Detected (PBR)" */}
      <div className="absolute bottom-4 left-4 z-10 pointer-events-none space-y-0.5">
        <p className="text-[11px] font-medium text-slate-300 drop-shadow-sm">
          File Size: <span className="text-white font-semibold">{fileSizeText}</span>
        </p>
        <p className="text-[11px] font-medium text-slate-300 drop-shadow-sm">
          Textures:{' '}
          <span className="text-emerald-400 font-semibold">
            {pbrDetected ? 'Detected (PBR)' : 'Basic'}
          </span>
        </p>
      </div>

      {/* Bottom Right Orientation Compass Gizmo: Exactly matching reference */}
      <div className="absolute bottom-4 right-4 z-10 pointer-events-none flex items-center justify-center">
        <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900/80 border border-slate-700/60 backdrop-blur-xs text-[10px] font-bold text-slate-400">
          <Compass className="h-5 w-5 text-cyan-400 opacity-80" />
          <span className="absolute -top-1.5 text-[9px] text-red-400 font-extrabold">N</span>
        </div>
      </div>
    </div>
  );
}
