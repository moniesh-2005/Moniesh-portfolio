import { Component, ReactNode, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import { probeWebGLCapabilities } from '@/src/components/three/proceduralTextures';
import { dampVec3 } from '@/src/animations/springKinematics';

interface DecorativeSculpturesProps {
  isMobile: boolean;
}

class AboutWebGLErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

function DecorativeSculptures({ isMobile }: DecorativeSculpturesProps) {
  const clusterRef = useRef<THREE.Group>(null);
  const knotRef = useRef<THREE.Mesh>(null);
  const prismRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.1);
    const t = state.clock.getElapsedTime();
    const px = state.pointer.x;
    const py = state.pointer.y;

    if (clusterRef.current) {
      dampVec3(clusterRef.current.position, px * 0.25, py * 0.18, 0, 3.2, dt);
    }

    if (knotRef.current) {
      knotRef.current.rotation.x = t * 0.14 + py * 0.2;
      knotRef.current.rotation.y = t * 0.22 + px * 0.25;
    }

    if (prismRef.current) {
      prismRef.current.rotation.y = -t * 0.18 + px * 0.2;
      prismRef.current.rotation.z = t * 0.11;
    }

    if (ringRef.current) {
      ringRef.current.rotation.x = 0.65 + Math.sin(t * 0.35) * 0.14;
      ringRef.current.rotation.z = t * 0.12;
    }
  });

  return (
    <group ref={clusterRef}>
      {/* Upper-right lime architectural torus knot */}
      <Float speed={1.2} rotationIntensity={0.22} floatIntensity={0.35}>
        <mesh
          ref={knotRef}
          position={isMobile ? [1.35, 1.5, -1.6] : [2.85, 1.35, -1.4]}
          scale={isMobile ? 0.42 : 0.68}
        >
          <torusKnotGeometry args={[0.72, 0.21, 96, 20]} />
          <meshStandardMaterial
            color="#bce83b"
            roughness={0.28}
            metalness={0.42}
          />
        </mesh>
      </Float>

      {/* Mid-left deep olive faceted polyhedron */}
      <Float speed={1.0} rotationIntensity={0.28} floatIntensity={0.3}>
        <mesh
          ref={prismRef}
          position={isMobile ? [-1.35, -0.45, -1.9] : [-3.1, -0.25, -1.7]}
          scale={isMobile ? 0.5 : 0.78}
        >
          <icosahedronGeometry args={[0.75, 0]} />
          <meshPhysicalMaterial
            color="#3d6114"
            roughness={0.24}
            metalness={0.25}
            clearcoat={0.75}
            clearcoatRoughness={0.2}
          />
        </mesh>
      </Float>

      {/* Lower-right orbital ring */}
      <Float speed={1.1} rotationIntensity={0.18} floatIntensity={0.28}>
        <mesh
          ref={ringRef}
          position={isMobile ? [1.2, -1.6, -2.0] : [2.6, -1.55, -1.8]}
          scale={isMobile ? 0.5 : 0.72}
        >
          <torusGeometry args={[0.92, 0.085, 20, 64]} />
          <meshStandardMaterial
            color="#9bd628"
            roughness={0.32}
            metalness={0.55}
          />
        </mesh>
      </Float>
    </group>
  );
}

/**
 * Subtle, lazy-loaded 3D ambient sculpture canvas backing the About Me section.
 * Defers WebGL context creation until scrolled near the viewport and safely guards against WebGL unavailability.
 */
export default function AboutCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const webglCaps = useMemo(() => probeWebGLCapabilities(), []);
  const isSoftwareGl = webglCaps.isSoftware;
  const [isMobile, setIsMobile] = useState(false);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [contextLost, setContextLost] = useState(!webglCaps.supported);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !webglCaps.supported) return;
    if (typeof IntersectionObserver === 'undefined') {
      setIsNearViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: '320px 0px' },
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [webglCaps.supported]);

  if (contextLost) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-55"
    >
      {isNearViewport && (
        <AboutWebGLErrorBoundary>
          <Canvas
            dpr={isSoftwareGl ? 1 : [1, 1.5]}
            camera={{ position: [0, 0, 6.2], fov: 38, near: 0.1, far: 30 }}
            gl={{
              antialias: !isSoftwareGl,
              alpha: true,
              powerPreference: 'high-performance',
              failIfMajorPerformanceCaveat: false,
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.0,
            }}
            onCreated={({ gl }) => {
              const dom = gl.domElement;
              dom.addEventListener('webglcontextlost', (e) => {
                e.preventDefault();
                setContextLost(true);
              });
              dom.addEventListener('webglcontextrestored', () => {
                setContextLost(false);
              });
            }}
          >
            <ambientLight intensity={0.45} color="#dcf58b" />
            <directionalLight position={[4, 5, 4]} intensity={1.35} color="#f5fce0" />
            <directionalLight position={[-4, -3, 2]} intensity={0.65} color="#76a81c" />

            <Suspense fallback={null}>
              {!isSoftwareGl && (
                <Environment resolution={128} frames={1}>
                  <Lightformer
                    form="rect"
                    intensity={2.1}
                    color="#f5fce0"
                    scale={[6, 4, 1]}
                    position={[4, 4, 4]}
                    target={[0, 0, 0]}
                  />
                  <Lightformer
                    form="rect"
                    intensity={1.4}
                    color="#bce83b"
                    scale={[5, 5, 1]}
                    position={[-4, -2, 2]}
                    target={[0, 0, 0]}
                  />
                </Environment>
              )}
              <DecorativeSculptures isMobile={isMobile} />
            </Suspense>
          </Canvas>
        </AboutWebGLErrorBoundary>
      )}
    </div>
  );
}
