# 3DShift — 100% Client-Side 3D File Converter MVP

A modern, fast, "iLovePDF-style" 3D file conversion suite built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Three.js**.

Everything runs **100% client-side** inside the user's browser—no 3D files or geometry data are ever uploaded to any server.

---

## 🚀 Features

- **GLB to USDZ (`/glb-to-usdz`)**: Convert glTF / GLB models into Apple AR Quick Look USDZ files ready for iPhone, iPad, Mac, and Apple Vision Pro.
- **OBJ to GLB (`/obj-to-glb`)**: Convert classic Wavefront OBJ mesh files into compact, GPU-ready binary GLB files with calculated vertex normals.
- **FBX to GLB (`/fbx-to-glb`)**: Convert complex Autodesk Filmbox (binary & ASCII) models into standardized web-ready GLB containers.
- **Interactive 3D Viewport**:
  - Full Three.js WebGL canvas with `OrbitControls` (smooth damping, pan, rotate, zoom).
  - Studio lighting setup (ambient, key light, fill light, rim light, hemisphere light).
  - Auto-centering & camera depth framing for any scale model.
  - Viewport toolbar: Reset Camera, Shaded/Wireframe toggle, Floor Grid toggle, Auto-Turntable spin, and Background themes (Dark, Slate, Studio Light, Grid).
  - Live Model Stats HUD: Triangle count, Vertex count, Mesh count, Bounding Box dimensions, and formatted file size.
- **Instant Client-Side Conversion**:
  - Drag-and-drop file upload with format validation.
  - "Try Sample Model" one-click button on each converter page for instant testing.
  - Progress feedback states (`reading` ➔ `parsing` ➔ `optimizing` ➔ `exporting` ➔ `completed`).
  - Celebratory confetti burst upon completion.
  - Instant local download link with output file size badge.
- **SEO & Information Rich**:
  - Step-by-step "How to Use" section.
  - In-depth format comparison table (GLB vs USDZ vs OBJ vs FBX).
  - Interactive FAQ accordions for each route.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **3D Engine**: [Three.js](https://threejs.org/) (`GLTFLoader`, `OBJLoader`, `FBXLoader`, `GLTFExporter`, `USDZExporter`, `OrbitControls`)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animation & Effects**: `canvas-confetti`

---

## 📦 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to explore the app.

### 3. Build for production
```bash
npm run build
npm run start
```

---

## 🔒 Privacy & Security

Unlike conventional 3D converters that transmit your files to cloud servers, **3DShift processes all 3D files locally in browser memory** using WebGL and WebAssembly. Your proprietary CAD, gaming, and 3D assets never leave your device.
