import { Component, ReactNode, Suspense, useEffect, useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { probeWebGLCapabilities } from './proceduralTextures';
import { StudioLighting } from './StudioLighting';
import { CameraRig } from './CameraRig';
import { MonieshCharacter } from './MonieshCharacter';
import { FloatingArtifacts } from './FloatingArtifacts';

interface HeroCanvasProps {
  scrollProgressRef: React.MutableRefObject<number>;
  cameraOffset: [number, number, number];
  onCharacterInteract?: () => void;
}

class WebGLErrorBoundary extends Component<
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

/**
 * Dynamically loaded React Three Fiber 3D stage for the MONIESH® Hero section.
 */
export default function HeroCanvas({
  scrollProgressRef,
  cameraOffset,
  onCharacterInteract,
}: HeroCanvasProps) {
  const webglCaps = useMemo(() => probeWebGLCapabilities(), []);
  const isSoftwareGl = webglCaps.isSoftware;
  const [viewportMode, setViewportMode] = useState<'mobile' | 'tablet' | 'desktop'>(
    'desktop',
  );
  const [contextLost, setContextLost] = useState(!webglCaps.supported);

  useEffect(() => {
    const updateViewport = () => {
      const w = window.innerWidth;
      if (w < 768) {
        setViewportMode('mobile');
      } else if (w < 1180) {
        setViewportMode('tablet');
      } else {
        setViewportMode('desktop');
      }
    };
    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  const isMobile = viewportMode === 'mobile';
  const isTablet = viewportMode === 'tablet';

  const fallbackStage = (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center md:justify-end md:pr-16">
      <div className="glass-studio-light rounded-3xl px-6 py-4 text-sm font-medium text-[#091e0e]">
        3D studio view paused. Refresh the page to re-enable WebGL.
      </div>
    </div>
  );

  if (contextLost) {
    return fallbackStage;
  }

  return (
    <div className="absolute inset-0 w-full h-full">
      <WebGLErrorBoundary fallback={fallbackStage}>
        <Canvas
          shadows={!isSoftwareGl}
          dpr={isSoftwareGl ? 1 : [1, 2]}
          camera={{ position: [0, 0.08, 6.45], fov: 37, near: 0.1, far: 45 }}
          gl={{
            antialias: !isSoftwareGl,
            alpha: true,
            powerPreference: 'high-performance',
            failIfMajorPerformanceCaveat: false,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.08,
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
          <fog attach="fog" args={['#97cb25', 10, 24]} />

          <Suspense fallback={null}>
            <StudioLighting isSoftwareGl={isSoftwareGl} />

            <CameraRig
              scrollProgressRef={scrollProgressRef}
              targetOffset={cameraOffset}
              isMobile={isMobile}
              isTablet={isTablet}
            />

            <MonieshCharacter
              isMobile={isMobile}
              isTablet={isTablet}
              scrollProgressRef={scrollProgressRef}
              onInteract={onCharacterInteract}
            />

            <FloatingArtifacts
              isMobile={isMobile}
              scrollProgressRef={scrollProgressRef}
            />

            {!isSoftwareGl && (
              <ContactShadows
                position={[
                  isMobile ? 0 : isTablet ? 1.3 : 1.62,
                  isMobile ? -1.96 : -1.66,
                  0.35,
                ]}
                opacity={0.44}
                scale={6.4}
                blur={2.4}
                far={4}
                color="#0d2408"
                resolution={256}
                frames={1}
              />
            )}
          </Suspense>
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}
