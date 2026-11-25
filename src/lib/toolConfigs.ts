import { ToolConfig, ToolId } from './types';

export const TOOL_CONFIGS: Record<ToolId, ToolConfig> = {
  'glb-to-usdz': {
    id: 'glb-to-usdz',
    title: 'GLB to USDZ Converter',
    shortTitle: 'GLB to USDZ',
    badge: 'Apple AR Quick Look',
    accentColor: {
      primary: 'from-blue-600 to-indigo-600',
      secondary: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      border: 'hover:border-blue-500/50',
      glow: 'group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]',
      text: 'text-blue-400',
      lightBg: 'bg-blue-50 dark:bg-blue-950/30',
    },
    inputExtension: '.glb, .gltf',
    outputExtension: '.usdz',
    acceptedFileTypes: ['.glb', '.gltf'],
    maxFileSizeMB: 150,
    description:
      'Convert 3D GLB and glTF models directly into Apple USDZ format for instant AR Quick Look viewing on iPhone, iPad, Mac, and Apple Vision Pro.',
    metaDescription:
      'Free client-side GLB to USDZ converter. Transform GLTF / GLB 3D files to Apple AR Quick Look USDZ format in your browser. 100% private, no file uploads.',
    iconName: 'Apple',
    highlights: [
      'iOS AR Quick Look compatible',
      'Embedded PBR materials & textures',
      'Zero server upload (100% Client-side)',
      'Inspect before downloading in 3D',
    ],
    howItWorksSteps: [
      {
        step: 1,
        title: 'Upload your GLB or glTF',
        description: 'Drag and drop your .glb or .gltf 3D model into the converter zone or choose a file from your computer.',
      },
      {
        step: 2,
        title: 'Interactive 3D Inspection',
        description: 'Examine the live 3D preview using Orbit controls. Rotate, zoom, inspect wireframe mode, and check triangle and vertex counts.',
      },
      {
        step: 3,
        title: 'Instant Client-Side Conversion',
        description: 'Click Convert to USDZ. Our client-side Three.js engine packs geometry and textures into an Apple-compatible USDZ archive.',
      },
      {
        step: 4,
        title: 'Download & View in AR',
        description: 'Download the .usdz file immediately. Airdrop or open on any iPhone or iPad to view your model placed in real-world augmented reality.',
      },
    ],
    faqs: [
      {
        question: 'Can I view the generated USDZ model directly on an iPhone or iPad?',
        answer:
          'Yes! Apple iOS natively supports USDZ via AR Quick Look. You can Airdrop the downloaded .usdz file to an iPhone/iPad, send it via iMessage, or host it on a website with an <a rel="ar"> link to launch augmented reality without installing any app.',
      },
      {
        question: 'Does this converter preserve textures and materials?',
        answer:
          'Yes. The USDZ exporter packages standard PBR textures, diffuse colors, roughness, and metalness maps directly into the USDZ archive using Apple QuickLook compatibility presets.',
      },
      {
        question: 'Are my proprietary 3D CAD/model files uploaded to any servers?',
        answer:
          'No. Everything runs strictly inside your local browser using client-side WebAssembly and WebGL Three.js routines. Your 3D models never touch any external server.',
      },
      {
        question: 'What is the difference between GLB and USDZ?',
        answer:
          'GLB (binary glTF) is the universal open standard for WebGL, Three.js, and Android 3D. USDZ (Universal Scene Description Zip) is Apple and Pixar’s format optimized specifically for iOS AR Quick Look and macOS preview.',
      },
    ],
  },
  'obj-to-glb': {
    id: 'obj-to-glb',
    title: 'OBJ to GLB Converter',
    shortTitle: 'OBJ to GLB',
    badge: 'Web 3D Standard',
    accentColor: {
      primary: 'from-emerald-600 to-teal-600',
      secondary: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      border: 'hover:border-emerald-500/50',
      glow: 'group-hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]',
      text: 'text-emerald-400',
      lightBg: 'bg-emerald-50 dark:bg-emerald-950/30',
    },
    inputExtension: '.obj',
    outputExtension: '.glb',
    acceptedFileTypes: ['.obj'],
    maxFileSizeMB: 150,
    description:
      'Transform traditional Wavefront OBJ mesh files into lightweight, modern binary GLB files with optimized geometry buffers for Three.js, WebGL, and games.',
    metaDescription:
      'Free client-side OBJ to GLB converter. Convert Wavefront OBJ 3D meshes to binary GLB format directly in your browser. Fast, private, and SEO-ready.',
    iconName: 'Box',
    highlights: [
      'Converts Wavefront OBJ to binary GLB',
      'Drastic file size compression',
      'Optimized indexed buffer geometries',
      'Ready for WebGL, Three.js & game engines',
    ],
    howItWorksSteps: [
      {
        step: 1,
        title: 'Upload your OBJ file',
        description: 'Drag and drop your .obj file into the converter box. No file upload waiting times—it reads directly from your disk.',
      },
      {
        step: 2,
        title: 'Inspect in 3D Real-time',
        description: 'Verify your geometry, inspect polygon topology with wireframe mode, and review bounding box measurements.',
      },
      {
        step: 3,
        title: 'Automatic Normal Calculation & Export',
        description: 'The converter computes vertex normals, prepares standard PBR materials, and packages the model into single-file binary GLB.',
      },
      {
        step: 4,
        title: 'Download Optimized GLB',
        description: 'Download your ready-to-use GLB file, dramatically smaller and faster to load in WebGL applications than legacy OBJ files.',
      },
    ],
    faqs: [
      {
        question: 'Why should I convert OBJ to GLB?',
        answer:
          'Wavefront OBJ is an uncompressed ASCII text format from the 1980s that requires heavy parsing and can be tens or hundreds of megabytes. GLB is modern binary glTF: it stores GPU-ready typed arrays, loads up to 10x faster in browsers, and embeds all buffers into a single file.',
      },
      {
        question: 'Does the converter calculate vertex normals if missing?',
        answer:
          'Yes! If your OBJ file does not contain explicit vertex normals (`vn`), our converter automatically computes smooth vertex normals across polygon faces so the exported GLB shades cleanly under dynamic lighting.',
      },
      {
        question: 'Can I use the converted GLB in Three.js or React Three Fiber?',
        answer:
          'Absolutely! GLB is the gold standard for Three.js (`GLTFLoader`), React Three Fiber (`useGLTF`), Babylon.js, Blender, and Unity WebGL.',
      },
      {
        question: 'What if my OBJ references external MTL or image textures?',
        answer:
          'Stand-alone OBJ files will be generated with a high quality PBR standard material. For textured models, ensure textures are mapped or you can inspect geometry integrity directly in our live 3D viewport.',
      },
    ],
  },
  'fbx-to-glb': {
    id: 'fbx-to-glb',
    title: 'FBX to GLB Converter',
    shortTitle: 'FBX to GLB',
    badge: 'Autodesk to WebGL',
    accentColor: {
      primary: 'from-violet-600 to-purple-600',
      secondary: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
      border: 'hover:border-violet-500/50',
      glow: 'group-hover:shadow-[0_0_30px_rgba(139,92,246,0.2)]',
      text: 'text-violet-400',
      lightBg: 'bg-violet-50 dark:bg-violet-950/30',
    },
    inputExtension: '.fbx',
    outputExtension: '.glb',
    acceptedFileTypes: ['.fbx'],
    maxFileSizeMB: 150,
    description:
      'Convert Autodesk Filmbox FBX 3D models into clean binary GLB files. Perfect for moving game assets from Maya, 3ds Max, or Blender directly to the web.',
    metaDescription:
      'Free client-side FBX to GLB converter. Turn Autodesk FBX models into lightweight GLB files in your browser. Fast, 100% private, no cloud uploads.',
    iconName: 'Layers',
    highlights: [
      'Parses binary & ASCII FBX models',
      'Transforms complex Autodesk nodes to glTF',
      'Instant interactive 3D inspection',
      'Zero cloud storage or third-party tracking',
    ],
    howItWorksSteps: [
      {
        step: 1,
        title: 'Select your FBX file',
        description: 'Drop any FBX (binary or ASCII 7.0+) into the upload area or click browse.',
      },
      {
        step: 2,
        title: 'Examine in 3D Live Viewer',
        description: 'Inspect materials, check vertex counts, toggle turntable rotation, and verify model scaling in the viewport.',
      },
      {
        step: 3,
        title: 'Export to Binary GLB',
        description: 'Convert FBX node hierarchy into standardized glTF 2.0 binary chunks right inside browser memory.',
      },
      {
        step: 4,
        title: 'Download & Deploy',
        description: 'Get your game or web-ready GLB asset in 1 click, ready for Three.js, Godot, Unreal, or WebGL viewers.',
      },
    ],
    faqs: [
      {
        question: 'Which FBX versions are supported?',
        answer:
          'The converter supports both modern Binary FBX (version 6.4 through 7.5) and ASCII FBX format (version 7.0+), which encompasses the vast majority of exports from Blender, Autodesk Maya, 3ds Max, and Mixamo.',
      },
      {
        question: 'Why convert FBX to GLB instead of using FBX directly on the web?',
        answer:
          'FBX is a complex proprietary Autodesk format with large file sizes and heavy CPU parsing overhead. GLB is the Khronos Group official web standard: it is binary, compressed, GPU-ready, and parses orders of magnitude faster.',
      },
      {
        question: 'Does the converter handle model hierarchy and scaling?',
        answer:
          'Yes! Our loader respects transform hierarchies and automatically calculates scene bounding boxes to frame the camera correctly and output consistent scale coordinates.',
      },
    ],
  },
};
