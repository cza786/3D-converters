export interface GuideArticle {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  publishedAt: string;
  updatedAt: string;
  relatedToolHref: string;
  relatedToolLabel: string;
  sections: {
    heading: string;
    paragraphs: string[];
    bullets?: string[];
    codeSnippet?: string;
  }[];
}

export const GUIDE_ARTICLES: GuideArticle[] = [
  {
    slug: 'glb-vs-usdz-vs-fbx-vs-obj',
    title: 'GLB vs USDZ vs FBX vs OBJ: Which 3D Format Should You Use?',
    description:
      'A practical breakdown of GLB, USDZ, FBX, and Wavefront OBJ for web viewers, iOS AR Quick Look, e-commerce storefronts, and game engines.',
    category: '3D Format Standards',
    readTime: '6 min read',
    publishedAt: '2026-10-12',
    updatedAt: '2026-11-20',
    relatedToolHref: '/glb-to-usdz',
    relatedToolLabel: 'Open GLB to USDZ Converter',
    sections: [
      {
        heading: 'Why One 3D Format Does Not Fit Every Platform',
        paragraphs: [
          '3D asset pipelines span desktop DCC tools like Blender and Maya, real-time web engines such as Three.js, and native mobile augmented reality viewers. Choosing the wrong file container often results in slow page loads, missing textures, or broken AR previews on iOS.',
          'Understanding the trade-offs between GLB, USDZ, FBX, and OBJ helps teams deliver fast web experiences without maintaining redundant manual exports.',
        ],
      },
      {
        heading: 'GLB (Binary glTF 2.0): The Universal Web Standard',
        paragraphs: [
          'GLB is the single-file binary representation of the Khronos Group glTF 2.0 specification. It bundles geometry buffers, PBR materials, animations, and embedded PNG/JPEG/WebP textures into one compact binary file.',
        ],
        bullets: [
          'Best for Three.js, React Three Fiber, Babylon.js, <model-viewer>, and Android Scene Viewer.',
          'Stores GPU-friendly typed arrays so browsers parse scenes rapidly with minimal CPU overhead.',
          'Ideal target when converting legacy Wavefront OBJ or Autodesk FBX assets for web delivery.',
        ],
      },
      {
        heading: 'USDZ: Native Augmented Reality on iPhone, iPad, and Vision Pro',
        paragraphs: [
          'Developed by Pixar and Apple, USDZ is an uncompressed ZIP archive packaging Universal Scene Description (.usdc/.usda) geometry alongside textures. iOS Safari and Messages recognize USDZ natively via AR Quick Look without requiring a third-party app.',
        ],
        bullets: [
          'Required for native iOS AR Quick Look and Shopify AR previews on Safari.',
          'Supports metallic/roughness PBR workflows when exported with Apple Quick Look compatibility presets.',
          'Can be generated directly from an existing GLB asset inside the browser using 3DShift.',
        ],
      },
      {
        heading: 'OBJ and FBX: Source Interchange Formats',
        paragraphs: [
          'Wavefront OBJ is a plain-text ASCII format dating back decades. While easy to inspect, large OBJ meshes bloat to tens of megabytes and lack native PBR metalness/roughness support. Autodesk FBX remains popular in Maya, 3ds Max, and game engines, but its proprietary binary/ASCII structure requires heavy runtime parsing on the web.',
          'For production websites, convert OBJ and FBX source files to GLB for web rendering, and generate a companion USDZ when iOS AR support is needed.',
        ],
      },
    ],
  },
  {
    slug: 'apple-ar-quick-look-shopify-usdz-guide',
    title: 'How to Prepare GLB & USDZ Models for Shopify and Apple AR Quick Look',
    description:
      'Step-by-step instructions to convert product models to USDZ, cap texture resolutions for mobile Safari, and embed AR Quick Look links cleanly.',
    category: 'E-Commerce & AR',
    readTime: '5 min read',
    publishedAt: '2026-10-18',
    updatedAt: '2026-11-22',
    relatedToolHref: '/glb-to-usdz',
    relatedToolLabel: 'Convert GLB to USDZ Now',
    sections: [
      {
        heading: 'Preparing Your Product Model for Mobile AR',
        paragraphs: [
          'Mobile browsers enforce strict memory budgets for WebGL and AR Quick Look. A product model that looks crisp on a workstation can crash mobile Safari if it ships with 4K textures or hundreds of thousands of triangles.',
          'Before exporting to USDZ, verify that your model uses real-world meter scale (1 Three.js unit = 1 meter), has centered pivot coordinates near the base of the object, and uses PBR Standard materials.',
        ],
        bullets: [
          'Target 1024px max texture resolution for fast mobile loading over cellular networks.',
          'Keep total triangle count under 100,000 triangles for e-commerce product viewers.',
          'Verify front-facing normals so thin surfaces do not disappear in Quick Look.',
        ],
      },
      {
        heading: 'Embedding USDZ with rel="ar" in HTML',
        paragraphs: [
          'On iOS and iPadOS, Safari automatically displays an AR badge and opens the native Quick Look viewer when a user taps an anchor tag containing rel="ar" wrapped around a preview thumbnail image.',
        ],
        codeSnippet: `<a rel="ar" href="/assets/sneaker.usdz">\n  <img src="/assets/sneaker-preview.png" alt="View sneaker in AR" width="320" height="320" />\n</a>`,
      },
      {
        heading: 'Supporting Both Android and iOS Storefronts',
        paragraphs: [
          'Because Android devices use GLB (via Google Scene Viewer or WebXR) while Apple devices require USDZ, serving both formats ensures every shopper gets native AR. With 3DShift, you can inspect your GLB in the 3D viewport, choose 1024px texture resolution, and export a Quick Look-ready USDZ in seconds.',
        ],
      },
    ],
  },
  {
    slug: 'fix-missing-textures-obj-fbx-to-glb',
    title: 'Troubleshooting Missing Materials, Normals, and Scale in OBJ & FBX Conversions',
    description:
      'Learn why 3D models sometimes look flat, inside-out, or oversized after conversion and how to fix normals, double-sided materials, and transforms.',
    category: 'Troubleshooting',
    readTime: '5 min read',
    publishedAt: '2026-11-02',
    updatedAt: '2026-11-24',
    relatedToolHref: '/obj-to-glb',
    relatedToolLabel: 'Try OBJ to GLB Converter',
    sections: [
      {
        heading: '1. Flat or Faceted Shading on OBJ Meshes',
        paragraphs: [
          'Many CAD and 3D-scan exports omit vertex normal records (vn) from .obj files to save space. Without vertex normals, WebGL cannot interpolate surface curvature smoothly.',
          '3DShift automatically detects missing vertex normals during parsing and computes smooth vertex normals before writing the binary GLB buffer.',
        ],
      },
      {
        heading: '2. Invisible Faces & Inverted Winding Order',
        paragraphs: [
          'If parts of your converted mesh look transparent from certain angles, the source geometry likely has inverted face normals or mixed winding order. Inspecting the model in wireframe and orbit view before downloading helps catch these issues early.',
        ],
        bullets: [
          'In Blender, run Mesh > Normals > Recalculate Outside (Shift+N) before exporting.',
          'Enable double-sided rendering for single-plane foliage, labels, or fabric panels.',
          'Apply scale and rotation transforms (Ctrl+A in Blender) so bounding boxes stay consistent.',
        ],
      },
      {
        heading: '3. External Textures in OBJ and glTF',
        paragraphs: [
          'Unlike GLB (which embeds textures inside one binary container), standalone .obj and .gltf files frequently point to external .mtl, .bin, or .png files on disk. Whenever possible, pack textures directly into a .glb or binary .fbx inside your 3D editor before converting.',
        ],
      },
    ],
  },
  {
    slug: 'optimize-3d-models-webgl-performance',
    title: 'Optimizing 3D Models for WebGL: Texture Sizing, Triangle Budgets, and Core Web Vitals',
    description:
      'Practical guidelines to shrink 3D file sizes, prevent main-thread stalls, and keep interactive 3D canvases responsive on mobile and desktop.',
    category: 'WebGL Performance',
    readTime: '6 min read',
    publishedAt: '2026-11-10',
    updatedAt: '2026-11-25',
    relatedToolHref: '/fbx-to-glb',
    relatedToolLabel: 'Open FBX to GLB Converter',
    sections: [
      {
        heading: 'Why Texture Dimensions Dominate 3D File Size',
        paragraphs: [
          'In most real-world GLB and USDZ files, geometry accounts for less than 20% of the total download size—image textures make up the rest. Dropping a set of 4096×4096 PBR maps down to 1024×1024 reduces pixel count by 16× with minimal visual difference on phone or laptop screens.',
        ],
        bullets: [
          'Use 512px textures for small background props, icons, or ultra-light previews.',
          'Use 1024px textures as the default sweet spot for e-commerce and interactive web showcases.',
          'Reserve 2048px textures for hero close-up inspection where fine surface grain matters.',
        ],
      },
      {
        heading: 'Keep Draw Calls and Mesh Counts Low',
        paragraphs: [
          'Every separate mesh with a unique material triggers an extra WebGL draw call. Merging static meshes that share a material in your 3D editor dramatically boosts frame rates on mobile GPUs.',
        ],
      },
      {
        heading: 'Checking Stats Before Publishing',
        paragraphs: [
          'Always inspect triangle count, vertex count, mesh count, and bounding box dimensions in the 3DShift stats panel before deploying an asset to production.',
        ],
      },
    ],
  },
];

export function getGuideBySlug(slug: string): GuideArticle | undefined {
  return GUIDE_ARTICLES.find((g) => g.slug === slug);
}
