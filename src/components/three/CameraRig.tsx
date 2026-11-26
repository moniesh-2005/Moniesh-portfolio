import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { dampVec3 } from '@/src/animations/springKinematics';

interface CameraRigProps {
  scrollProgressRef: React.MutableRefObject<number>;
  targetOffset: [number, number, number];
  isMobile: boolean;
  isTablet: boolean;
}

const _lookTarget = new THREE.Vector3();

/**
 * Smooth mouse-responsive and scroll-reactive damped camera rig.
 * Framed so the prominent seated character and sculptural seat remain 100% visible.
 */
export function CameraRig({
  scrollProgressRef,
  targetOffset,
  isMobile,
  isTablet,
}: CameraRigProps) {
  const { camera } = useThree();
  const basePos = useRef(
    new THREE.Vector3(0, 0.08, isMobile ? 7.9 : isTablet ? 7.0 : 6.45),
  );

  useFrame((state, delta) => {
    const scroll = scrollProgressRef.current;
    const pointerX = state.pointer.x;
    const pointerY = state.pointer.y;

    const baseZ = isMobile ? 8.0 : isTablet ? 7.0 : 6.45;
    const baseY = isMobile ? -0.15 : 0.08;

    const targetX =
      pointerX * (isMobile ? 0.2 : 0.4) + targetOffset[0] - scroll * 0.16;
    const targetY =
      baseY +
      pointerY * (isMobile ? 0.14 : 0.26) +
      targetOffset[1] +
      scroll * 0.22;
    const targetZ = baseZ + targetOffset[2] - scroll * 0.58;

    dampVec3(basePos.current, targetX, targetY, targetZ, 3.6, delta);
    camera.position.copy(basePos.current);

    const lookX =
      (isMobile ? 0 : isTablet ? 0.36 : 0.48) +
      pointerX * 0.11 +
      targetOffset[0] * 0.35;
    const lookY =
      (isMobile ? -0.56 : -0.08) + pointerY * 0.06 + scroll * 0.08;
    _lookTarget.set(lookX, lookY, 0);
    camera.lookAt(_lookTarget);
  });

  return null;
}
