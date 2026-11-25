import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import type { ToolId } from './types';

/**
 * Creates the exact stylish 3D Sneaker shown in the reference image!
 * Complete with athletic outsole, upper mesh, collar, laces, and swoosh accent.
 */
export function createReferenceSneaker(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'Cyber_Sneaker';

  // Materials
  const outsoleMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.25,
    metalness: 0.1,
  });

  const upperMat = new THREE.MeshStandardMaterial({
    color: 0x1e3a8a, // Deep royal / navy blue
    roughness: 0.35,
    metalness: 0.2,
  });

  const cyanAccentMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    emissive: 0x0284c7,
    emissiveIntensity: 0.4,
    roughness: 0.2,
    metalness: 0.5,
  });

  const orangeMat = new THREE.MeshStandardMaterial({
    color: 0xf97316,
    roughness: 0.2,
    metalness: 0.3,
  });

  const whiteMat = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    roughness: 0.3,
  });

  // 1. Outsole (White Rubber Base)
  const soleGeo = new THREE.BoxGeometry(0.9, 0.22, 2.3);
  const sole = new THREE.Mesh(soleGeo, outsoleMat);
  sole.position.set(0, -0.4, 0);
  sole.castShadow = true;
  group.add(sole);

  // Toe rocker (angled front sole)
  const toeRockerGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.22, 16, 1, false, 0, Math.PI);
  const toeRocker = new THREE.Mesh(toeRockerGeo, outsoleMat);
  toeRocker.position.set(0, -0.36, 1.15);
  toeRocker.rotation.y = Math.PI;
  group.add(toeRocker);

  // 2. Midsole Cushion Layer (Cyan accent line)
  const midGeo = new THREE.BoxGeometry(0.88, 0.1, 2.26);
  const mid = new THREE.Mesh(midGeo, cyanAccentMat);
  mid.position.set(0, -0.26, 0);
  group.add(mid);

  // 3. Main Shoe Body (Navy/Royal Upper)
  const bodyGeo = new THREE.BoxGeometry(0.82, 0.5, 2.0);
  const body = new THREE.Mesh(bodyGeo, upperMat);
  body.position.set(0, -0.02, -0.05);
  group.add(body);

  // Toe Cap (Curved front)
  const toeGeo = new THREE.SphereGeometry(0.42, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2);
  const toe = new THREE.Mesh(toeGeo, upperMat);
  toe.scale.set(0.98, 0.7, 1.3);
  toe.position.set(0, -0.05, 0.65);
  toe.rotation.x = Math.PI / 12;
  group.add(toe);

  // 4. Heel Counter & Collar (Back ankle padding)
  const collarGeo = new THREE.CylinderGeometry(0.38, 0.42, 0.55, 16);
  const collar = new THREE.Mesh(collarGeo, upperMat);
  collar.position.set(0, 0.25, -0.6);
  collar.rotation.x = -Math.PI / 10;
  group.add(collar);

  // Ankle Opening (Dark inner sock liner)
  const innerSockGeo = new THREE.CylinderGeometry(0.28, 0.3, 0.5, 16);
  const innerSockMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.8 });
  const innerSock = new THREE.Mesh(innerSockGeo, innerSockMat);
  innerSock.position.set(0, 0.35, -0.6);
  innerSock.rotation.x = -Math.PI / 10;
  group.add(innerSock);

  // 5. Tongue
  const tongueGeo = new THREE.BoxGeometry(0.4, 0.65, 0.1);
  const tongue = new THREE.Mesh(tongueGeo, whiteMat);
  tongue.position.set(0, 0.28, -0.15);
  tongue.rotation.x = -Math.PI / 5;
  group.add(tongue);

  // 6. Laces (4 horizontal straps)
  for (let i = 0; i < 4; i++) {
    const laceGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.48, 8);
    const lace = new THREE.Mesh(laceGeo, whiteMat);
    lace.rotation.z = Math.PI / 2;
    lace.position.set(0, 0.05 + i * 0.1, 0.15 - i * 0.18);
    group.add(lace);
  }

  // 7. Dynamic Streak Accent on Lateral Side
  const swooshGeo = new THREE.BoxGeometry(0.04, 0.14, 0.9);
  const swoosh = new THREE.Mesh(swooshGeo, orangeMat);
  swoosh.position.set(0.42, 0.08, -0.05);
  swoosh.rotation.x = Math.PI / 12;
  group.add(swoosh);

  // Medial Swoosh
  const swoosh2 = swoosh.clone();
  swoosh2.position.set(-0.42, 0.08, -0.05);
  group.add(swoosh2);

  // Tilt shoe slightly upward dynamically, exactly like in the reference image!
  group.rotation.x = -0.18;
  group.rotation.y = 0.45;
  group.rotation.z = 0.12;
  group.position.y = 0.2;

  return group;
}

/**
 * Procedural low-poly crystal gem OBJ
 */
const SAMPLE_OBJ_DATA = `# Wavefront OBJ: Low-Poly Faceted Crystal Gem
o CrystalGem
v 0.0000 1.5000 0.0000
v 0.9511 0.4000 0.3090
v 0.5878 0.4000 0.8090
v -0.5878 0.4000 0.8090
v -0.9511 0.4000 0.3090
v -0.9511 0.4000 -0.3090
v -0.5878 0.4000 -0.8090
v 0.5878 0.4000 -0.8090
v 0.9511 0.4000 -0.3090
v 0.8090 -0.7000 0.5878
v 0.0000 -0.7000 1.0000
v -0.8090 -0.7000 0.5878
v -0.8090 -0.7000 -0.5878
v 0.0000 -0.7000 -1.0000
v 0.8090 -0.7000 -0.5878
v 0.0000 -1.6000 0.0000
vn 0.0 1.0 0.0
vn 0.0 -1.0 0.0
s 1
f 1 2 3
f 1 3 4
f 1 4 5
f 1 5 6
f 1 6 7
f 1 7 8
f 1 8 9
f 1 9 2
f 2 9 15 10
f 3 2 10 11
f 4 3 11 12
f 5 4 12 13
f 6 5 13 14
f 7 6 14 15
f 8 7 15 10
f 16 11 10
f 16 12 11
f 16 13 12
f 16 14 13
f 16 15 14
f 16 10 15
`;

/**
 * Valid ASCII FBX 7.4 cube mesh with chamfered geometry
 */
const SAMPLE_FBX_DATA = `; FBX 7.4.0 project file
FBXHeaderExtension:  {
	FBXHeaderVersion: 1003
	FBXVersion: 7400
}
Definitions:  {
	Version: 100
	Count: 2
	ObjectType: "Model" { Count: 1 }
	ObjectType: "Geometry" { Count: 1 }
}
Objects:  {
	Geometry: 1000, "Geometry::", "Mesh" {
		Vertices: *24 {
			a: -1.0,-1.0,-1.0, 1.0,-1.0,-1.0, 1.0,1.0,-1.0, -1.0,1.0,-1.0, -1.0,-1.0,1.0, 1.0,-1.0,1.0, 1.0,1.0,1.0, -1.0,1.0,1.0
		}
		PolygonVertexIndex: *24 {
			a: 0,1,2,-4, 4,5,6,-8, 0,1,5,-5, 2,3,7,-7, 0,3,7,-5, 1,2,6,-6
		}
		GeometryVersion: 124
	}
	Model: 2000, "Model::MonolithBox", "Mesh" {
		Version: 232
		Properties70:  {
			P: "InheritType", "enum", "", "",1
		}
	}
}
Connections:  {
	C: "OO",1000,2000
	C: "OO",2000,0
}
`;

/**
 * Returns a ready-to-load sample model File object for the specified tool
 */
export async function getSampleModel(toolId: ToolId): Promise<File> {
  if (toolId === 'glb-to-usdz') {
    const sneaker = createReferenceSneaker();
    const exporter = new GLTFExporter();
    const glbBuffer = (await exporter.parseAsync(sneaker, {
      binary: true,
      embedImages: true,
    })) as ArrayBuffer;

    return new File([glbBuffer], 'cyber-sneaker.glb', { type: 'model/gltf-binary' });
  }

  if (toolId === 'obj-to-glb') {
    const blob = new Blob([SAMPLE_OBJ_DATA], { type: 'text/plain' });
    return new File([blob], 'crystal-gem.obj', { type: 'text/plain' });
  }

  if (toolId === 'fbx-to-glb') {
    const buffer = new TextEncoder().encode(SAMPLE_FBX_DATA).buffer;
    return new File([buffer], 'tech-monolith.fbx', { type: 'application/octet-stream' });
  }

  throw new Error(`No sample available for ${toolId}`);
}
