import * as THREE from 'three';

/**
 * Frame-rate independent exponential damping for scalar values.
 */
export function dampNumber(
  current: number,
  target: number,
  lambda: number,
  delta: number,
): number {
  return THREE.MathUtils.damp(current, target, lambda, Math.min(delta, 0.1));
}

/**
 * Frame-rate independent exponential damping for a Vector3 in-place (zero GC).
 */
export function dampVec3(
  current: THREE.Vector3,
  targetX: number,
  targetY: number,
  targetZ: number,
  lambda: number,
  delta: number,
): void {
  const dt = Math.min(delta, 0.1);
  current.x = THREE.MathUtils.damp(current.x, targetX, lambda, dt);
  current.y = THREE.MathUtils.damp(current.y, targetY, lambda, dt);
  current.z = THREE.MathUtils.damp(current.z, targetZ, lambda, dt);
}

/**
 * Frame-rate independent exponential damping for an Euler rotation in-place.
 */
export function dampEuler(
  current: THREE.Euler,
  targetX: number,
  targetY: number,
  targetZ: number,
  lambda: number,
  delta: number,
): void {
  const dt = Math.min(delta, 0.1);
  current.x = THREE.MathUtils.damp(current.x, targetX, lambda, dt);
  current.y = THREE.MathUtils.damp(current.y, targetY, lambda, dt);
  current.z = THREE.MathUtils.damp(current.z, targetZ, lambda, dt);
}

/**
 * Organic breathing curve combining primary and harmonic sine waves.
 */
export function breathingWave(elapsed: number, speed = 1.6, amplitude = 0.04): number {
  return (
    (Math.sin(elapsed * speed) * 0.72 + Math.sin(elapsed * speed * 2.0 + 0.6) * 0.28) *
    amplitude
  );
}

/**
 * Smooth multi-axis orbital drift for floating abstract artifacts.
 */
export function orbitalFloat(
  elapsed: number,
  phase: number,
  speed = 0.85,
  amplitude = 0.16,
): { y: number; rotX: number; rotY: number; rotZ: number } {
  const t = elapsed * speed + phase;
  return {
    y: Math.sin(t) * amplitude,
    rotX: Math.sin(t * 0.7) * 0.18,
    rotY: t * 0.32,
    rotZ: Math.cos(t * 0.6) * 0.14,
  };
}
