import {
  Component,
  ReactNode,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import { probeWebGLCapabilities } from '@/src/components/three/proceduralTextures';
import { dampVec3 } from '@/src/animations/springKinematics';

class ContactWebGLErrorBoundary extends Component<
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

function ContactSculptures({ isMobile }: { isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.1);
    const t = state.clock.getElapsedTime();
    const px = state.pointer.x;
    const py = state.pointer.y;

    if (groupRef.current) {
      dampVec3(
        groupRef.current.position,
        (isMobile ? 0.85 : 2.35) + px * 0.25,
        (isMobile ? 0.9 : 0.45) + py * 0.18,
        -1.2,
        3.2,
        dt,
      );
    }

    if (torusRef.current) {
      torusRef.current.rotation.x = 0.45 + t * 0.16 + py * 0.22;
      torusRef.current.rotation.y = t * 0.24 + px * 0.25;
    }

    if (coreRef.current) {
      coreRef.current.rotation.y = -t * 0.2 + px * 0.18;
      coreRef.current.rotation.z = t * 0.12;
    }

    if (haloRef.current) {
      haloRef.current.rotation.x = -0.5 + Math.sin(t * 0.3) * 0.12;
      haloRef.current.rotation.z = -t * 0.14;
    }
  });

  return (
    <group
      ref={groupRef}
      position={[isMobile ? 0.85 : 2.35, isMobile ? 0.9 : 0.45, -1.2]}
      scale={isMobile ? 0.56 : 0.88}
    >
      {/* Satin electric lime architectural torus knot echoing the hero palette */}
      <Float speed={1.2} rotationIntensity={0.22} floatIntensity={0.3}>
        <mesh ref={torusRef}>
          <torusKnotGeometry args={[0.82, 0.22, 110, 22]} />
          <meshStandardMaterial
            color="#ccf252"
            roughness={0.26}
            metalness={0.48}
          />
        </mesh>
      </Float>

      {/* Deep obsidian forest faceted core */}
      <Float speed={1.0} rotationIntensity={0.2} floatIntensity={0.2}>
        <mesh ref={coreRef} position={[-0.75, -0.55, 0.45]} scale={0.44}>
          <octahedronGeometry args={[0.8, 0]} />
          <meshPhysicalMaterial
            color="#123418"
            roughness={0.2}
            metalness={0.35}
            clearcoat={0.9}
            clearcoatRoughness={0.14}
          />
        </mesh>
      </Float>

      {/* Outer orbital ring */}
      <mesh ref={haloRef}>
        <torusGeometry args={[1.45, 0.032, 18, 72]} />
        <meshStandardMaterial
          color="#96cf24"
          roughness={0.32}
          metalness={0.62}
        />
      </mesh>
    </group>
  );
}

/**
 * Subtle pointer-reactive 3D sculptural backdrop for the Contact closing stage.
 * Defers WebGL creation via IntersectionObserver and guards cleanly against context loss.
 */
export default function ContactCanvas() {
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
      { rootMargin: '360px 0px' },
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
      className="pointer-events-none absolute inset-0 h-full w-full opacity-65"
    >
      {isNearViewport && (
        <ContactWebGLErrorBoundary>
          <Canvas
            dpr={isSoftwareGl ? 1 : [1, 1.5]}
            camera={{ position: [0, 0, 6.2], fov: 38, near: 0.1, far: 30 }}
            gl={{
              antialias: !isSoftwareGl,
              alpha: true,
              powerPreference: 'high-performance',
              failIfMajorPerformanceCaveat: false,
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.04,
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
            <ambientLight intensity={0.42} color="#dff794" />
            <directionalLight position={[4, 5, 4]} intensity={1.45} color="#f5fce0" />
            <directionalLight position={[-4, -3, 2]} intensity={0.75} color="#82b620" />

            <Suspense fallback={null}>
              {!isSoftwareGl && (
                <Environment resolution={128} frames={1}>
                  <Lightformer
                    form="rect"
                    intensity={2.2}
                    color="#f5fce0"
                    scale={[6, 4, 1]}
                    position={[4, 4, 4]}
                    target={[0, 0, 0]}
                  />
                  <Lightformer
                    form="rect"
                    intensity={1.5}
                    color="#ccf252"
                    scale={[5, 5, 1]}
                    position={[-4, -2, 2]}
                    target={[0, 0, 0]}
                  />
                </Environment>
              )}
              <ContactSculptures isMobile={isMobile} />
            </Suspense>
          </Canvas>
        </ContactWebGLErrorBoundary>
      )}
    </div>
  );
}
