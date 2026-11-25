export type ToolId = 'glb-to-usdz' | 'obj-to-glb' | 'fbx-to-glb';

export type InputFormat = 'glb' | 'gltf' | 'obj' | 'fbx';
export type OutputFormat = 'usdz' | 'glb';

export interface ToolConfig {
  id: ToolId;
  title: string;
  shortTitle: string;
  badge: string;
  accentColor: {
    primary: string; // Tailwind class
    secondary: string;
    border: string;
    glow: string;
    text: string;
    lightBg: string;
  };
  inputExtension: string;
  outputExtension: string;
  acceptedFileTypes: string[];
  maxFileSizeMB: number;
  description: string;
  metaDescription: string;
  iconName: 'Apple' | 'Box' | 'Layers';
  howItWorksSteps: {
    step: number;
    title: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  highlights: string[];
}

export interface ModelStats {
  triangles: number;
  vertices: number;
  meshes: number;
  dimensions: {
    x: number;
    y: number;
    z: number;
  };
  fileSizeFormatted?: string;
  format?: string;
}

export type ConversionPhase = 
  | 'idle' 
  | 'reading' 
  | 'parsing' 
  | 'optimizing' 
  | 'exporting' 
  | 'completed' 
  | 'error';

export interface ConversionState {
  phase: ConversionPhase;
  progress: number; // 0 to 100
  statusMessage: string;
  errorMessage?: string;
  sourceFile?: {
    name: string;
    size: number;
    extension: string;
  };
  resultBlob?: Blob;
  downloadUrl?: string;
  outputFileName?: string;
  outputSize?: number;
  stats?: ModelStats;
}
