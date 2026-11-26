import { Environment, Lightformer } from '@react-three/drei';

interface StudioLightingProps {
  isSoftwareGl: boolean;
}

/**
 * Cinematic 3-point creative studio lighting rig with warm key shadows,
 * cool-olive hemisphere fill, and crisp lime-ivory rim separation for dark hair and hoodie.
 */
export function StudioLighting({ isSoftwareGl }: StudioLightingProps) {
  return (
    <>
      {/* Subtle ambient bounce + cool-olive sky to deep-moss ground fill */}
      <ambientLight intensity={0.22} color="#e7f9a8" />
      <hemisphereLight args={['#f6fde0', '#31490d', 0.96]} />

      {/* Warm studio key light sculpting facial planes & hoodie folds */}
      <directionalLight
        position={[4.8, 7.2, 6.2]}
        intensity={2.25}
        color="#fffce8"
        castShadow={!isSoftwareGl}
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0004}
        shadow-normalBias={0.02}
        shadow-camera-near={1}
        shadow-camera-far={22}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      />

      {/* Soft lime fill from left-front */}
      <directionalLight
        position={[-5.2, 2.4, 4.5]}
        intensity={0.85}
        color="#daf872"
      />

      {/* Crisp back-rim light separating black hair & black hoodie from olive backdrop */}
      <directionalLight
        position={[2.4, 4.8, -5.2]}
        intensity={1.95}
        color="#eaff99"
      />

      {/* Secondary warm subtle under-fill to keep chin & eye sockets luminous */}
      <pointLight position={[1.4, -0.4, 3.2]} intensity={0.45} color="#fff7d6" />

      {/* Procedural studio softboxes for PBR reflections */}
      <Environment resolution={256} frames={1}>
        <Lightformer
          form="rect"
          intensity={2.5}
          color="#fffef2"
          scale={[8, 4, 1]}
          position={[4, 5, 5]}
          target={[0, 0, 0]}
        />
        <Lightformer
          form="rect"
          intensity={1.5}
          color="#ccf252"
          scale={[6, 6, 1]}
          position={[-5, 2, 2]}
          target={[0, 0, 0]}
        />
        <Lightformer
          form="ring"
          intensity={2.1}
          color="#f5fce0"
          scale={4}
          position={[1.5, 6, -4]}
          target={[0, 0, 0]}
        />
      </Environment>
    </>
  );
}
