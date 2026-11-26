import { Component, ReactNode, Suspense, useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { dampEuler, dampVec3 } from '@/src/animations/springKinematics';
import { CharacterRigProps, ProceduralMonieshRig } from './ProceduralMonieshRig';

export interface MonieshCharacterProps extends CharacterRigProps {
  /**
   * Optional path or URL to a professionally rigged GLB/GLTF avatar.
   * When provided, loads the rigged GLB with automatic bone-driven head/eye tracking
   * and blink morph targets, falling back to ProceduralMonieshRig on load error.
   */
  glbUrl?: string;
}

class GlbErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function GlbMonieshRig({
  glbUrl,
  isMobile,
  isTablet,
  scrollProgressRef,
  onInteract,
}: CharacterRigProps & { glbUrl: string }) {
  const { scene } = useGLTF(glbUrl);
  const rootRef = useRef<THREE.Group>(null);
  const nextBlinkRef = useRef(2.2);
  const blinkRef = useRef(0);

  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  const rigRefs = useMemo(() => {
    const result: {
      headBone: THREE.Object3D | null;
      leftEye: THREE.Object3D | null;
      rightEye: THREE.Object3D | null;
      blinkMeshes: Array<{ mesh: THREE.Mesh; index: number }>;
    } = {
      headBone: null,
      leftEye: null,
      rightEye: null,
      blinkMeshes: [],
    };

    clonedScene.traverse((obj) => {
      const name = obj.name.toLowerCase();
      if (!result.headBone && (name === 'head' || name.includes('mixamorighead'))) {
        result.headBone = obj;
      }
      if (!result.leftEye && (name === 'lefteye' || name === 'eye_l')) {
        result.leftEye = obj;
      }
      if (!result.rightEye && (name === 'righteye' || name === 'eye_r')) {
        result.rightEye = obj;
      }
      if (obj instanceof THREE.Mesh && obj.morphTargetDictionary) {
        const blinkIdx =
          obj.morphTargetDictionary.eyesClosed ??
          obj.morphTargetDictionary.eyeBlinkLeft ??
          obj.morphTargetDictionary.blink;
        if (typeof blinkIdx === 'number') {
          result.blinkMeshes.push({ mesh: obj, index: blinkIdx });
        }
      }
    });

    return result;
  }, [clonedScene]);

  useEffect(() => {
    clonedScene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });
  }, [clonedScene]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.1);
    const t = state.clock.getElapsedTime();
    const px = state.pointer.x;
    const py = state.pointer.y;
    const scroll = scrollProgressRef.current;

    if (rootRef.current) {
      const baseX = isMobile ? 0 : isTablet ? 1.32 : 1.64;
      const baseY = (isMobile ? -0.9 : -0.16) + scroll * 0.14;
      const baseZ = isMobile ? 0.05 : 0.38;
      dampVec3(rootRef.current.position, baseX, baseY, baseZ, 6, dt);
    }

    if (rigRefs.headBone) {
      dampEuler(rigRefs.headBone.rotation, -py * 0.18, px * 0.32, 0, 7.5, dt);
    }
    if (rigRefs.leftEye) {
      dampEuler(rigRefs.leftEye.rotation, -py * 0.15, px * 0.22, 0, 12, dt);
    }
    if (rigRefs.rightEye) {
      dampEuler(rigRefs.rightEye.rotation, -py * 0.15, px * 0.22, 0, 12, dt);
    }

    if (t > nextBlinkRef.current) {
      blinkRef.current = 1;
      nextBlinkRef.current = t + 3.0;
    }
    blinkRef.current = THREE.MathUtils.damp(blinkRef.current, 0, 16, dt);
    for (const { mesh, index } of rigRefs.blinkMeshes) {
      if (mesh.morphTargetInfluences) {
        mesh.morphTargetInfluences[index] = blinkRef.current;
      }
    }
  });

  return (
    <group
      ref={rootRef}
      onClick={(e) => {
        e.stopPropagation();
        onInteract?.();
      }}
    >
      <primitive object={clonedScene} />
    </group>
  );
}

/**
 * Modular 3D character component supporting either a rigged GLB model (`glbUrl`)
 * or the reconstructed procedural Pixar-style avatar (`ProceduralMonieshRig`).
 */
export function MonieshCharacter({
  glbUrl,
  ...rigProps
}: MonieshCharacterProps) {
  if (!glbUrl) {
    return <ProceduralMonieshRig {...rigProps} />;
  }

  const fallback = <ProceduralMonieshRig {...rigProps} />;

  return (
    <GlbErrorBoundary fallback={fallback}>
      <Suspense fallback={fallback}>
        <GlbMonieshRig glbUrl={glbUrl} {...rigProps} />
      </Suspense>
    </GlbErrorBoundary>
  );
}
