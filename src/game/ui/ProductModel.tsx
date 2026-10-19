import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import type { PremiumId } from "../shop";

export function ProductShape({ id }: { id: PremiumId }) {
  const horseshoe = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-1, 1); s.lineTo(-1, 0); s.absarc(0, 0, 1, Math.PI, 2 * Math.PI, false);
    s.lineTo(1, 1); s.lineTo(0.55, 1); s.lineTo(0.55, 0);
    s.absarc(0, 0, 0.55, 0, -Math.PI, true); s.lineTo(-0.55, 1); s.closePath();
    return new THREE.ExtrudeGeometry(s, { depth: 0.4, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.07, bevelThickness: 0.07, curveSegments: 32 });
  }, []);
  if (id === "magnet") return <group rotation={[0.2, -0.3, 0.15]} position-y={0.1}>
    <mesh geometry={horseshoe} position-z={-0.2}><meshStandardMaterial color="#e83538" metalness={0.55} roughness={0.22} /></mesh>
    {[-0.775, 0.775].map(x => <mesh key={x} position={[x, 0.82, 0]}><boxGeometry args={[0.46, 0.4, 0.42]} /><meshStandardMaterial color="#e6edf4" metalness={0.85} roughness={0.18} /></mesh>)}
    {[0, 1, 2].map(i => <mesh key={i} position={[(i - 1) * 0.75, 1.7 + (i % 2) * 0.3, 0.1]} rotation={[Math.PI / 2, 0.25, 0]}><torusGeometry args={[0.24, 0.08, 8, 24]} /><meshStandardMaterial color="#ffc928" metalness={0.8} roughness={0.23} /></mesh>)}
  </group>;
  if (id === "airbag") return <group rotation={[0.1, -0.3, 0]}>
    <mesh position={[0, -0.2, -0.35]} rotation-x={0.3}><torusGeometry args={[0.85, 0.14, 12, 48]} /><meshStandardMaterial color="#23262b" roughness={0.65} /></mesh>
    <mesh scale={[1.3, 1.1, 0.85]} position-y={0.35}><sphereGeometry args={[0.85, 40, 24]} /><meshStandardMaterial color="#f5f1e9" roughness={0.85} /></mesh>
    <mesh position={[0, 0.35, 0.72]}><torusGeometry args={[0.42, 0.013, 8, 48]} /><meshStandardMaterial color="#d7d2c9" /></mesh>
  </group>;
  return <group rotation={[0.05, -0.25, 0]}>
    <mesh rotation-x={Math.PI / 2}><cylinderGeometry args={[1.1, 1.1, 0.22, 6]} /><meshStandardMaterial color="#efbc36" metalness={0.8} roughness={0.23} /></mesh>
    <mesh position-z={0.14}><torusGeometry args={[0.72, 0.1, 12, 48]} /><meshStandardMaterial color="#ee3d42" roughness={0.3} /></mesh>
    <mesh position-z={0.16} rotation-z={-Math.PI / 4}><boxGeometry args={[0.15, 1.55, 0.1]} /><meshStandardMaterial color="#ee3d42" /></mesh>
    {[ -0.45, 0, 0.45 ].map((x,i) => <mesh key={x} position={[x, 1.25, 0]} rotation-z={(1-i)*0.35}><coneGeometry args={[0.25, 0.65, 4]} /><meshStandardMaterial color="#ffd45a" metalness={0.7} roughness={0.2} /></mesh>)}
  </group>;
}

export function ProductModel({ id }: { id: PremiumId }) {
  return <div className="h-full min-h-48 w-full" aria-label={`Rotatable ${id} model`}>
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 1.5, 5.5], fov: 40 }}>
      <ambientLight intensity={0.8} /><directionalLight position={[3, 5, 4]} intensity={3} />
      <Environment resolution={32}><Lightformer position={[0, 4, 0]} intensity={3} scale={[6, 6, 1]} /><Lightformer position={[-4, 0, 2]} intensity={2} scale={[3, 5, 1]} /></Environment>
      <ProductShape id={id} />
      <OrbitControls makeDefault enablePan={false} enableZoom={false} target={[0, 0.45, 0]} />
    </Canvas>
  </div>;
}