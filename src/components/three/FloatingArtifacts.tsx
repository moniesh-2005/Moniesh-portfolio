import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
  dampNumber,
  dampVec3,
  orbitalFloat,
} from '@/src/animations/springKinematics';

interface FloatingArtifactsProps {
  isMobile: boolean;
  scrollProgressRef: React.MutableRefObject<number>;
}

interface ArtifactNodeProps {
  basePosition: [number, number, number];
  parallaxDepth: number;
  phase: number;
  speed?: number;
  amplitude?: number;
  scrollProgressRef: React.MutableRefObject<number>;
  children: React.ReactNode;
}

function ArtifactNode({
  basePosition,
  parallaxDepth,
  phase,
  speed = 0.65,
  amplitude = 0.09,
  scrollProgressRef,
  children,
}: ArtifactNodeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const dt = Math.min(delta, 0.1);
    const px = state.pointer.x;
    const py = state.pointer.y;
    const scroll = scrollProgressRef.current;

    const motion = orbitalFloat(t, phase, speed, amplitude);

    if (groupRef.current) {
      const targetX = basePosition[0] + px * parallaxDepth;
      const targetY =
        basePosition[1] +
        motion.y +
        py * parallaxDepth * 0.65 +
        scroll * parallaxDepth * 0.55;
      const targetZ = basePosition[2] - scroll * 0.25;

      dampVec3(groupRef.current.position, targetX, targetY, targetZ, 3.8, dt);

      groupRef.current.rotation.x = motion.rotX + py * 0.18;
      groupRef.current.rotation.y = motion.rotY + px * 0.25;
      groupRef.current.rotation.z = motion.rotZ;

      const s = dampNumber(groupRef.current.scale.x, hovered ? 1.12 : 1.0, 8, dt);
      groupRef.current.scale.setScalar(s);
    }
  });

  return (
    <group
      ref={groupRef}
      position={basePosition}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      {children}
    </group>
  );
}

/**
 * Minimal, curated floating abstract 3D accents providing subtle depth
 * and pointer parallax without visual clutter around the seated character.
 */
export function FloatingArtifacts({
  isMobile,
  scrollProgressRef,
}: FloatingArtifactsProps) {
  return (
    <group>
      {/* 1. Deep forest-green glossy Torus Knot (upper-right depth) */}
      <ArtifactNode
        basePosition={isMobile ? [1.35, 1.35, -1.9] : [3.45, 1.52, -1.75]}
        parallaxDepth={0.34}
        phase={0.6}
        speed={0.55}
        scrollProgressRef={scrollProgressRef}
      >
        <mesh castShadow>
          <torusKnotGeometry args={[0.28, 0.095, 84, 18]} />
          <meshPhysicalMaterial
            color="#0d2913"
            roughness={0.2}
            metalness={0.22}
            clearcoat={0.92}
            clearcoatRoughness={0.12}
          />
        </mesh>
      </ArtifactNode>

      {/* 2. Brushed Gold & Cream Minimal Orbital Ring (upper-center depth) */}
      <ArtifactNode
        basePosition={isMobile ? [-1.15, 1.1, -1.7] : [0.05, 1.55, -1.65]}
        parallaxDepth={0.26}
        phase={3.1}
        speed={0.65}
        scrollProgressRef={scrollProgressRef}
      >
        <group>
          <mesh castShadow>
            <dodecahedronGeometry args={[0.2, 0]} />
            <meshStandardMaterial color="#e6c84f" roughness={0.22} metalness={0.86} />
          </mesh>
          <mesh rotation={[Math.PI / 2.6, 0.4, 0]}>
            <torusGeometry args={[0.34, 0.018, 14, 44]} />
            <meshStandardMaterial color="#f5fce0" roughness={0.3} metalness={0.4} />
          </mesh>
        </group>
      </ArtifactNode>
    </group>
  );
}
