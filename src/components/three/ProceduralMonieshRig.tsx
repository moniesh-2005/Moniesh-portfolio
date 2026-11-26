import { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import {
  breathingWave,
  dampEuler,
  dampNumber,
  dampVec3,
} from '@/src/animations/springKinematics';
import {
  createBlackHoodieTexture,
  createChairFabricTexture,
  createChestLogoTexture,
  createHairStrandTexture,
  createPixarEyeTexture,
  createPixarSkinTexture,
} from './proceduralTextures';

export interface CharacterRigProps {
  isMobile: boolean;
  isTablet: boolean;
  scrollProgressRef: React.MutableRefObject<number>;
  onInteract?: () => void;
}

/**
 * Builds a smooth indexed variable-radius tube geometry along a CatmullRomCurve3
 * with closed rounded end-caps (used for tapered eyebrows, cupid's-bow lips, and wavy hair locks).
 */
function createTaperedTubeGeometry(
  pts: [number, number, number][],
  radiusFn: (t: number) => number,
  tubularSegments = 24,
  radialSegments = 12,
): THREE.BufferGeometry {
  const curve = new THREE.CatmullRomCurve3(
    pts.map(([x, y, z]) => new THREE.Vector3(x, y, z)),
  );
  const frames = curve.computeFrenetFrames(tubularSegments, false);
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  const vertex = new THREE.Vector3();
  const P = new THREE.Vector3();

  for (let i = 0; i <= tubularSegments; i++) {
    const t = i / tubularSegments;
    curve.getPointAt(t, P);
    const N = frames.normals[i];
    const B = frames.binormals[i];
    // Smooth spherical cap taper at both tips
    const endTaper = Math.sin(Math.min(1, Math.max(0, t)) * Math.PI);
    const r = radiusFn(t) * (0.25 + 0.75 * Math.pow(endTaper, 0.35));

    for (let j = 0; j <= radialSegments; j++) {
      const v = (j / radialSegments) * Math.PI * 2;
      const sin = Math.sin(v);
      const cos = -Math.cos(v);

      vertex.x = P.x + r * (cos * N.x + sin * B.x);
      vertex.y = P.y + r * (cos * N.y + sin * B.y);
      vertex.z = P.z + r * (cos * N.z + sin * B.z);

      positions.push(vertex.x, vertex.y, vertex.z);
      uvs.push(t, j / radialSegments);
    }
  }

  for (let i = 0; i < tubularSegments; i++) {
    for (let j = 0; j < radialSegments; j++) {
      const a = i * (radialSegments + 1) + j;
      const b = (i + 1) * (radialSegments + 1) + j;
      const c = (i + 1) * (radialSegments + 1) + (j + 1);
      const d = i * (radialSegments + 1) + (j + 1);
      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

/**
 * Reconstructs the head geometry at 96x96 resolution to match the portrait's
 * facial structure: flat-tapered temples, high cheekbones, distinct jaw angle,
 * defined chin, deep almond orbital sockets, brow shelf, continuous nasal bridge,
 * and subtle philtrum & mentolabial creases.
 */
function createSculptedHeadGeometry(): THREE.SphereGeometry {
  const geo = new THREE.SphereGeometry(0.45, 96, 96);
  geo.rotateY(-Math.PI / 2);

  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    let x = pos.getX(i);
    let y = pos.getY(i);
    let z = pos.getZ(i);

    // Portrait oval-athletic cranial height
    y *= 1.18;

    // Flat-tapered lateral temples & upper sides (removes round-ball look)
    if (y > 0.02 && Math.abs(x) > 0.25) {
      const sideFactor = Math.min(1, (Math.abs(x) - 0.25) / 0.2);
      x *= 1 - sideFactor * 0.085;
    }

    // Structured jawline: slight gonion angle around y=-0.22 tapering to defined rounded chin
    if (y < 0) {
      const t = Math.min(1, Math.abs(y) / 0.53);
      // Keep mid-jaw width fuller around t=0.42 (gonion), then taper cleanly into chin
      const gonion = Math.exp(-Math.pow((t - 0.38) / 0.22, 2)) * 0.045;
      x *= 1 - Math.pow(t, 1.35) * 0.34 + gonion;

      if (z > 0) {
        // Subtle chin forward projection
        const chinPush = Math.exp(-Math.pow((t - 0.78) / 0.2, 2)) * Math.exp(-Math.pow(x / 0.14, 2));
        z = z * (1 - t * 0.1) + chinPush * 0.032;
      } else {
        z *= 1 - t * 0.26;
      }
    }

    // Deep horizontal-almond orbital eye sockets (x = ±0.142, y = 0.048)
    if (z > 0.2) {
      const leftDist = Math.hypot((x + 0.142) / 0.118, (y - 0.048) / 0.072);
      const rightDist = Math.hypot((x - 0.142) / 0.118, (y - 0.048) / 0.072);
      const socket =
        Math.exp(-leftDist * leftDist * 1.65) +
        Math.exp(-rightDist * rightDist * 1.65);
      z -= socket * 0.046;
    }

    // Defined low supraorbital brow ridge above eye sockets
    if (z > 0.24 && y > 0.095 && y < 0.21) {
      const browY = Math.exp(-Math.pow((y - 0.142) / 0.042, 2));
      const browX = Math.exp(-Math.pow(x / 0.28, 2));
      z += browY * browX * 0.028;
    }

    // Continuous integrated nasal bridge (from glabella y=0.095 down to y=-0.05)
    if (z > 0.28 && y > -0.075 && y < 0.115) {
      const bridgeProfile = Math.exp(-Math.pow((y - 0.015) / 0.075, 2));
      const widthScale = 0.036 + Math.max(0, 0.05 - y) * 0.22;
      const bridgeX = Math.exp(-Math.pow(x / widthScale, 2));
      z += bridgeProfile * bridgeX * 0.052;
    }

    // Subtle philtrum groove between nose base and upper lip
    if (z > 0.3 && y > -0.17 && y < -0.075) {
      const philY = Math.exp(-Math.pow((y + 0.12) / 0.038, 2));
      const philX = Math.exp(-Math.pow(x / 0.025, 2));
      z -= philY * philX * 0.012;
    }

    // Mentolabial crease indentation directly beneath lower lip
    if (z > 0.24 && y > -0.34 && y < -0.245) {
      const creaseY = Math.exp(-Math.pow((y + 0.295) / 0.035, 2));
      const creaseX = Math.exp(-Math.pow(x / 0.11, 2));
      z -= creaseY * creaseX * 0.018;
    }

    // Zygomatic cheekbones
    if (y > -0.15 && y < 0.035 && z > 0.1) {
      const cheekY = Math.exp(-Math.pow((y + 0.055) / 0.085, 2));
      const cheekX = Math.exp(-Math.pow((Math.abs(x) - 0.225) / 0.11, 2));
      x *= 1 + cheekY * 0.045;
      z += cheekY * cheekX * 0.032;
    }

    // Flattened back skull profile
    if (z < -0.12) {
      z *= 0.9;
    }

    pos.setXYZ(i, x, y, z);
  }

  geo.computeVertexNormals();
  return geo;
}

/**
 * Sculpts an authentic hair volume cap matching the photograph's hair silhouette:
 * closely cropped flat-tapered sides above the ears, crisp forehead hairline,
 * dense lifted top crown slightly taller on viewer's right, and wavy surface texture.
 */
function createSculptedHairCapGeometry(): THREE.SphereGeometry {
  const geo = new THREE.SphereGeometry(0.462, 72, 72);
  const pos = geo.attributes.position;

  for (let i = 0; i < pos.count; i++) {
    let x = pos.getX(i);
    let y = pos.getY(i);
    let z = pos.getZ(i);

    // Trim / pull back face region so hair never covers forehead/eyes/cheeks
    if (z > 0.12 && y < 0.24) {
      const pull = Math.min(1, (0.24 - y) / 0.35);
      z -= pull * 0.18;
    }

    // Closely tapered sides above the ears (matching portrait fade)
    if (y < 0.26 && Math.abs(x) > 0.3) {
      const sideT = Math.min(1, (0.26 - y) / 0.3);
      x *= 1 - sideT * 0.08;
    }

    // Tall, structured dense top crown rising higher on viewer's right (like portrait)
    if (y > 0.18) {
      const crownT = Math.min(1, (y - 0.18) / 0.3);
      const asymmetryLift = Math.max(0, x + 0.18) * 0.085;
      // Flatten top slightly into rectangular-rounded hair silhouette rather than pointed cone
      y = y * (1.12 + crownT * 0.16) + asymmetryLift;

      // Multi-frequency organic wavy curl ridges baked into hair surface
      const wave1 = Math.sin(x * 24 + z * 14) * 0.015;
      const wave2 = Math.cos(x * 38 - z * 22 + y * 12) * 0.009;
      const bump = (wave1 + wave2) * crownT;
      x += bump * 0.4;
      y += bump;
      z += bump * 0.5;
    }

    pos.setXYZ(i, x, y, z);
  }

  geo.computeVertexNormals();
  return geo;
}

/**
 * Fine, tapered wavy hair locks layered over the forehead hairline and crown
 * (eliminates uniform balloon-like tubes while adding crisp 3D hair silhouette).
 */
function createHairLockGeometries(): THREE.BufferGeometry[] {
  const specs: Array<{ pts: [number, number, number][]; maxR: number }> = [
    // Crisp wavy forehead fringe dipping slightly at center-left, lifting right
    {
      pts: [
        [-0.29, 0.25, 0.33],
        [-0.15, 0.24, 0.39],
        [-0.01, 0.26, 0.4],
        [0.14, 0.31, 0.37],
      ],
      maxR: 0.044,
    },
    {
      pts: [
        [-0.24, 0.31, 0.34],
        [-0.08, 0.35, 0.39],
        [0.09, 0.38, 0.37],
        [0.25, 0.37, 0.28],
      ],
      maxR: 0.048,
    },
    {
      pts: [
        [-0.16, 0.38, 0.34],
        [0.02, 0.45, 0.34],
        [0.19, 0.46, 0.26],
        [0.32, 0.39, 0.15],
      ],
      maxR: 0.052,
    },
    {
      pts: [
        [-0.32, 0.29, 0.24],
        [-0.18, 0.43, 0.26],
        [0.0, 0.51, 0.22],
        [0.18, 0.52, 0.14],
      ],
      maxR: 0.056,
    },
    // Top wavy crown texture
    {
      pts: [
        [-0.28, 0.39, 0.12],
        [-0.1, 0.54, 0.15],
        [0.12, 0.58, 0.1],
        [0.3, 0.49, 0.03],
      ],
      maxR: 0.06,
    },
    {
      pts: [
        [-0.26, 0.4, -0.04],
        [-0.08, 0.56, -0.02],
        [0.14, 0.58, -0.05],
        [0.31, 0.46, -0.1],
      ],
      maxR: 0.06,
    },
    {
      pts: [
        [-0.24, 0.36, -0.2],
        [-0.05, 0.52, -0.18],
        [0.15, 0.52, -0.18],
        [0.29, 0.4, -0.21],
      ],
      maxR: 0.056,
    },
    // Swept right-crown highlight wave (matches portrait top-right lift)
    {
      pts: [
        [0.06, 0.47, 0.26],
        [0.2, 0.55, 0.16],
        [0.3, 0.51, 0.04],
      ],
      maxR: 0.048,
    },
    {
      pts: [
        [-0.18, 0.46, 0.22],
        [-0.04, 0.55, 0.06],
        [0.1, 0.55, -0.12],
      ],
      maxR: 0.05,
    },
    // Subtle wavy forehead detail lock
    {
      pts: [
        [-0.06, 0.29, 0.4],
        [0.08, 0.31, 0.39],
        [0.21, 0.35, 0.33],
      ],
      maxR: 0.036,
    },
  ];

  return specs.map(({ pts, maxR }) =>
    createTaperedTubeGeometry(pts, () => maxR, 22, 10),
  );
}

/**
 * Creates tapered thick eyebrows matching the photograph:
 * thick straight inner-to-mid section, subtle outer arch peak, clean tapered tail.
 */
function createTaperedEyebrowGeometry(mirror = false): THREE.BufferGeometry {
  const s = mirror ? 1 : -1;
  // Coordinates relative to browsRef [0, 0.132, 0.425], contoured tightly onto the brow ridge
  const pts: [number, number, number][] = [
    [s * 0.052, -0.008, 0.028],
    [s * 0.118, 0.015, 0.02],
    [s * 0.184, 0.018, -0.006],
    [s * 0.236, -0.007, -0.044],
  ];
  return createTaperedTubeGeometry(
    pts,
    (t) => {
      // Thick at inner/mid (0.024), gently tapers toward outer tail (0.01)
      return 0.024 * (1 - 0.58 * Math.pow(t, 1.4));
    },
    22,
    10,
  );
}

/**
 * Cupid's-bow upper lip geometry matching the natural full upper lip in the portrait.
 */
function createCupidBowUpperLipGeometry(): THREE.BufferGeometry {
  const pts: [number, number, number][] = [
    [-0.114, 0.004, -0.024],
    [-0.055, 0.011, 0.006],
    [-0.02, 0.015, 0.016],
    [0, 0.009, 0.018],
    [0.02, 0.015, 0.016],
    [0.055, 0.011, 0.006],
    [0.114, 0.004, -0.024],
  ];
  return createTaperedTubeGeometry(
    pts,
    (t) => {
      // Slightly fuller at cupid's bow peaks (t≈0.35, 0.65), slight central dip
      const centerDip = 1 - 0.18 * Math.exp(-Math.pow((t - 0.5) / 0.1, 2));
      return 0.021 * centerDip;
    },
    28,
    12,
  );
}

/**
 * Natural subtle friendly smile parting line.
 */
function createSmilePartingGeometry(): THREE.BufferGeometry {
  const pts: [number, number, number][] = [
    [-0.114, 0.008, -0.02],
    [-0.055, -0.002, 0.014],
    [0, -0.004, 0.021],
    [0.055, -0.002, 0.014],
    [0.114, 0.008, -0.02],
  ];
  return createTaperedTubeGeometry(pts, () => 0.0065, 24, 8);
}

/**
 * Sculpted almond upper lash contour hugging the eye curvature.
 */
function createEyelidRimGeometry(isUpper: boolean): THREE.BufferGeometry {
  const pts: [number, number, number][] = isUpper
    ? [
        [-0.088, -0.008, -0.018],
        [-0.042, 0.04, 0.02],
        [0, 0.048, 0.028],
        [0.042, 0.038, 0.02],
        [0.088, -0.006, -0.018],
      ]
    : [
        [-0.084, -0.01, -0.018],
        [-0.04, -0.038, 0.018],
        [0, -0.044, 0.025],
        [0.04, -0.038, 0.018],
        [0.084, -0.008, -0.018],
      ];
  return createTaperedTubeGeometry(pts, () => (isUpper ? 0.011 : 0.008), 20, 8);
}

/**
 * Procedural Pixar-inspired seated 3D character rig for MONIESH®.
 * Built with hierarchical joints (root, pelvis, torso, head, eyes, eyelids, brows, arms, legs)
 * for smooth head/eye tracking, blinking, breathing, relaxed sitting pose, and click reaction.
 */
export function ProceduralMonieshRig({
  isMobile,
  isTablet,
  scrollProgressRef,
  onInteract,
}: CharacterRigProps) {
  const rootRef = useRef<THREE.Group>(null);
  const bodyGroupRef = useRef<THREE.Group>(null);
  const torsoRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftIrisRef = useRef<THREE.Group>(null);
  const rightIrisRef = useRef<THREE.Group>(null);
  const leftEyelidRef = useRef<THREE.Mesh>(null);
  const rightEyelidRef = useRef<THREE.Mesh>(null);
  const browsRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);

  const [hovered, setHovered] = useState(false);
  const reactImpulseRef = useRef(0);
  const nextBlinkRef = useRef(2.0);
  const blinkAmountRef = useRef(0);

  const headGeo = useMemo(() => createSculptedHeadGeometry(), []);
  const eyeGeo = useMemo(() => {
    const geo = new THREE.SphereGeometry(0.088, 32, 32);
    geo.rotateY(-Math.PI * 0.5);
    return geo;
  }, []);
  const hairCapGeo = useMemo(() => createSculptedHairCapGeometry(), []);
  const hairLockGeos = useMemo(() => createHairLockGeometries(), []);
  const leftBrowGeo = useMemo(() => createTaperedEyebrowGeometry(false), []);
  const rightBrowGeo = useMemo(() => createTaperedEyebrowGeometry(true), []);
  const upperLipGeo = useMemo(() => createCupidBowUpperLipGeometry(), []);
  const smilePartGeo = useMemo(() => createSmilePartingGeometry(), []);
  const upperRimGeo = useMemo(() => createEyelidRimGeometry(true), []);
  const lowerRimGeo = useMemo(() => createEyelidRimGeometry(false), []);

  const skinTexture = useMemo(() => createPixarSkinTexture(), []);
  const eyeTexture = useMemo(() => createPixarEyeTexture(), []);
  const hairTexture = useMemo(() => createHairStrandTexture(), []);
  const hoodieTexture = useMemo(() => createBlackHoodieTexture(), []);
  const chairTexture = useMemo(() => createChairFabricTexture(), []);
  const chestLogoTexture = useMemo(() => createChestLogoTexture(), []);

  useEffect(() => {
    return () => {
      headGeo.dispose();
      eyeGeo.dispose();
      hairCapGeo.dispose();
      hairLockGeos.forEach((g) => g.dispose());
      leftBrowGeo.dispose();
      rightBrowGeo.dispose();
      upperLipGeo.dispose();
      smilePartGeo.dispose();
      upperRimGeo.dispose();
      lowerRimGeo.dispose();
      skinTexture.dispose();
      eyeTexture.dispose();
      hairTexture.dispose();
      hoodieTexture.dispose();
      chairTexture.dispose();
      chestLogoTexture.dispose();
    };
  }, [
    headGeo,
    eyeGeo,
    hairCapGeo,
    hairLockGeos,
    leftBrowGeo,
    rightBrowGeo,
    upperLipGeo,
    smilePartGeo,
    upperRimGeo,
    lowerRimGeo,
    skinTexture,
    eyeTexture,
    hairTexture,
    hoodieTexture,
    chairTexture,
    chestLogoTexture,
  ]);

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [hovered]);

  const handleClick = () => {
    reactImpulseRef.current = 1;
    onInteract?.();
  };

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const dt = Math.min(delta, 0.1);
    const px = state.pointer.x;
    const py = state.pointer.y;
    const scroll = scrollProgressRef.current;

    reactImpulseRef.current = dampNumber(reactImpulseRef.current, 0, 3.8, dt);

    // Prominent right-side positioning with complete chair & seated character visible
    const baseX = isMobile ? 0 : isTablet ? 1.32 : 1.64;
    const baseY = (isMobile ? -0.9 : -0.16) + scroll * 0.14;
    const baseZ = isMobile ? 0.05 : 0.38;
    const baseScale = isMobile ? 0.72 : isTablet ? 0.88 : 1.04;

    if (rootRef.current) {
      dampVec3(rootRef.current.position, baseX, baseY, baseZ, 6, dt);

      const targetScale = baseScale * (hovered ? 1.02 : 1);
      const nextScale = dampNumber(rootRef.current.scale.x, targetScale, 7, dt);
      rootRef.current.scale.setScalar(nextScale);

      const targetRootY =
        (isMobile ? -0.15 : -0.3) + px * 0.15 + Math.sin(t * 0.5) * 0.02;
      rootRef.current.rotation.y = dampNumber(
        rootRef.current.rotation.y,
        targetRootY,
        5,
        dt,
      );
    }

    if (bodyGroupRef.current) {
      bodyGroupRef.current.position.y =
        breathingWave(t, 1.3, 0.014) + reactImpulseRef.current * 0.065;
    }

    if (torsoRef.current) {
      const breath = 1 + breathingWave(t, 1.4, 0.014);
      torsoRef.current.scale.set(breath, 1 + (breath - 1) * 0.45, breath);
      torsoRef.current.rotation.x = -0.04 + Math.sin(t * 0.65) * 0.014;
    }

    // Smooth cursor head tracking + friendly nod on click
    if (headRef.current) {
      const headPitch =
        -py * 0.17 +
        breathingWave(t + 0.4, 1.1, 0.02) +
        reactImpulseRef.current * 0.16;
      const headYaw = px * 0.34 + 0.07;
      const headRoll =
        -px * 0.065 + (hovered ? 0.04 : 0.02) + reactImpulseRef.current * 0.05;
      dampEuler(headRef.current.rotation, headPitch, headYaw, headRoll, 7.5, dt);
    }

    // Smooth brown iris eye tracking inside orbital sockets
    const eyeYaw = px * 0.24;
    const eyePitch = -py * 0.18;
    if (leftIrisRef.current && rightIrisRef.current) {
      leftIrisRef.current.rotation.y = dampNumber(
        leftIrisRef.current.rotation.y,
        eyeYaw,
        14,
        dt,
      );
      leftIrisRef.current.rotation.x = dampNumber(
        leftIrisRef.current.rotation.x,
        eyePitch,
        14,
        dt,
      );
      rightIrisRef.current.rotation.y = leftIrisRef.current.rotation.y;
      rightIrisRef.current.rotation.x = leftIrisRef.current.rotation.x;
    }

    // Natural periodic eyelid blink via orbital pivot rotation (-0.72 open -> +0.24 closed)
    if (t > nextBlinkRef.current) {
      blinkAmountRef.current = 1;
      nextBlinkRef.current = t + 2.7 + (Math.sin(t * 5.7) + 1) * 1.15;
    }
    blinkAmountRef.current = dampNumber(blinkAmountRef.current, 0, 19, dt);
    if (leftEyelidRef.current && rightEyelidRef.current) {
      const lidRotX = -0.72 + blinkAmountRef.current * 0.96;
      leftEyelidRef.current.rotation.x = lidRotX;
      rightEyelidRef.current.rotation.x = lidRotX;
    }

    if (browsRef.current) {
      const browLift = (hovered ? 0.012 : 0) + reactImpulseRef.current * 0.024;
      browsRef.current.position.y = dampNumber(
        browsRef.current.position.y,
        0.132 + browLift,
        10,
        dt,
      );
    }

    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = dampNumber(
        leftArmRef.current.rotation.z,
        0.24 + Math.sin(t * 1.15) * 0.018,
        6,
        dt,
      );
    }

    if (rightArmRef.current) {
      const baseRotX = -0.14 + Math.sin(t * 1.2) * 0.02;
      const baseRotZ = -0.18;
      const waveLift = reactImpulseRef.current * 0.55;
      rightArmRef.current.rotation.x = dampNumber(
        rightArmRef.current.rotation.x,
        baseRotX - waveLift,
        7,
        dt,
      );
      rightArmRef.current.rotation.z = dampNumber(
        rightArmRef.current.rotation.z,
        baseRotZ - reactImpulseRef.current * 0.25,
        7,
        dt,
      );
    }
  });

  return (
    <group
      ref={rootRef}
      position={[
        isMobile ? 0 : isTablet ? 1.32 : 1.64,
        isMobile ? -0.9 : -0.16,
        0.38,
      ]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        handleClick();
      }}
    >
      {/* ARCHITECTURAL LOUNGE CHAIR & STEPPED PLATFORM */}
      <group position={[0, -0.95, 0.04]}>
        <RoundedBox
          args={[1.92, 0.14, 1.58]}
          radius={0.065}
          smoothness={6}
          position={[0, -0.45, 0.16]}
          receiveShadow
          castShadow
        >
          <meshStandardMaterial
            color="#0b200f"
            roughness={0.35}
            metalness={0.28}
          />
        </RoundedBox>

        <RoundedBox
          args={[1.95, 0.028, 1.61]}
          radius={0.014}
          smoothness={4}
          position={[0, -0.38, 0.16]}
        >
          <meshStandardMaterial
            color="#c3f244"
            roughness={0.25}
            metalness={0.62}
          />
        </RoundedBox>

        <RoundedBox
          args={[1.26, 0.56, 0.96]}
          radius={0.18}
          smoothness={6}
          position={[0, -0.08, -0.14]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            color="#102c15"
            roughness={0.32}
            metalness={0.22}
          />
        </RoundedBox>

        <RoundedBox
          args={[1.34, 0.16, 1.04]}
          radius={0.075}
          smoothness={6}
          position={[0, 0.24, -0.12]}
          castShadow
          receiveShadow
        >
          <meshPhysicalMaterial
            map={chairTexture}
            color="#264b1b"
            roughness={0.74}
            sheen={0.5}
            sheenRoughness={0.65}
            sheenColor="#a2db30"
          />
        </RoundedBox>

        <RoundedBox
          args={[1.28, 0.72, 0.22]}
          radius={0.1}
          smoothness={6}
          position={[0, 0.62, -0.56]}
          rotation={[-0.14, 0, 0]}
          castShadow
          receiveShadow
        >
          <meshPhysicalMaterial
            map={chairTexture}
            color="#1e3d16"
            roughness={0.76}
            sheen={0.48}
            sheenColor="#8dc425"
          />
        </RoundedBox>

        <RoundedBox
          args={[0.24, 0.42, 0.92]}
          radius={0.11}
          smoothness={6}
          position={[-0.6, 0.41, -0.13]}
          castShadow
          receiveShadow
        >
          <meshPhysicalMaterial
            map={chairTexture}
            color="#1c3b15"
            roughness={0.72}
            sheen={0.45}
            sheenColor="#8dc425"
          />
        </RoundedBox>
      </group>

      {/* SEATED CHARACTER RIG */}
      <group ref={bodyGroupRef} position={[0, 0, 0]}>
        {/* Seated Pelvis & Relaxed Legs */}
        <group position={[0, -0.54, -0.05]}>
          <RoundedBox
            args={[0.74, 0.28, 0.56]}
            radius={0.12}
            smoothness={4}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color="#1a1d1b" roughness={0.86} />
          </RoundedBox>

          {/* LEFT LEG */}
          <group position={[-0.22, 0.01, 0.16]} rotation={[0.08, 0.26, 0.04]}>
            <mesh position={[0, -0.02, 0.24]} rotation={[Math.PI / 2.08, 0, 0]} castShadow>
              <capsuleGeometry args={[0.145, 0.34, 12, 24]} />
              <meshStandardMaterial color="#1d211e" roughness={0.86} />
            </mesh>
            <group position={[0, -0.03, 0.44]} rotation={[-0.15, 0, 0]}>
              <mesh position={[0, -0.27, 0.02]} castShadow>
                <capsuleGeometry args={[0.13, 0.38, 12, 24]} />
                <meshStandardMaterial color="#1d211e" roughness={0.86} />
              </mesh>
              <group position={[0, -0.54, 0.11]}>
                <RoundedBox args={[0.25, 0.16, 0.42]} radius={0.065} smoothness={4} castShadow>
                  <meshStandardMaterial color="#131517" roughness={0.48} />
                </RoundedBox>
                <RoundedBox
                  args={[0.27, 0.07, 0.44]}
                  radius={0.03}
                  position={[0, -0.06, 0]}
                  castShadow
                >
                  <meshStandardMaterial color="#f5fce0" roughness={0.35} />
                </RoundedBox>
                <RoundedBox args={[0.13, 0.06, 0.06]} radius={0.02} position={[0, 0.035, -0.18]}>
                  <meshStandardMaterial color="#b9ee2f" roughness={0.32} />
                </RoundedBox>
              </group>
            </group>
          </group>

          {/* RIGHT LEG */}
          <group position={[0.22, 0.01, 0.16]} rotation={[0.06, -0.18, -0.04]}>
            <mesh position={[0, -0.02, 0.25]} rotation={[Math.PI / 2.05, 0, 0]} castShadow>
              <capsuleGeometry args={[0.145, 0.34, 12, 24]} />
              <meshStandardMaterial color="#1d211e" roughness={0.86} />
            </mesh>
            <group position={[0, -0.03, 0.46]} rotation={[-0.1, 0, 0]}>
              <mesh position={[0, -0.27, 0.02]} castShadow>
                <capsuleGeometry args={[0.13, 0.38, 12, 24]} />
                <meshStandardMaterial color="#1d211e" roughness={0.86} />
              </mesh>
              <group position={[0, -0.54, 0.11]}>
                <RoundedBox args={[0.25, 0.16, 0.42]} radius={0.065} smoothness={4} castShadow>
                  <meshStandardMaterial color="#131517" roughness={0.48} />
                </RoundedBox>
                <RoundedBox
                  args={[0.27, 0.07, 0.44]}
                  radius={0.03}
                  position={[0, -0.06, 0]}
                  castShadow
                >
                  <meshStandardMaterial color="#f5fce0" roughness={0.35} />
                </RoundedBox>
                <RoundedBox args={[0.13, 0.06, 0.06]} radius={0.02} position={[0, 0.035, -0.18]}>
                  <meshStandardMaterial color="#b9ee2f" roughness={0.32} />
                </RoundedBox>
              </group>
            </group>
          </group>
        </group>

        {/* TORSO / BLACK OVERSIZED HOODIE */}
        <group ref={torsoRef} position={[0, 0.04, -0.08]}>
          <RoundedBox
            args={[0.92, 0.96, 0.6]}
            radius={0.26}
            smoothness={8}
            castShadow
            receiveShadow
          >
            <meshPhysicalMaterial
              map={hoodieTexture}
              color="#17181a"
              roughness={0.88}
              metalness={0.02}
              sheen={0.48}
              sheenRoughness={0.68}
              sheenColor="#343832"
            />
          </RoundedBox>

          <RoundedBox
            args={[0.88, 0.11, 0.56]}
            radius={0.05}
            smoothness={4}
            position={[0, -0.45, 0]}
            castShadow
          >
            <meshStandardMaterial color="#121315" roughness={0.86} />
          </RoundedBox>

          <RoundedBox
            args={[0.56, 0.26, 0.085]}
            radius={0.06}
            smoothness={4}
            position={[0, -0.22, 0.285]}
            castShadow
          >
            <meshStandardMaterial color="#121315" roughness={0.9} />
          </RoundedBox>

          <mesh position={[0, 0.43, -0.02]} rotation={[Math.PI / 2.2, 0, 0]} castShadow>
            <torusGeometry args={[0.295, 0.12, 20, 44]} />
            <meshPhysicalMaterial
              map={hoodieTexture}
              color="#18191b"
              roughness={0.88}
              sheen={0.42}
            />
          </mesh>
          <mesh position={[0, 0.39, -0.22]} rotation={[0.45, 0, 0]} castShadow>
            <sphereGeometry args={[0.31, 24, 24]} />
            <meshStandardMaterial color="#141517" roughness={0.9} />
          </mesh>

          {[-0.08, 0.08].map((xPos, idx) => (
            <group key={idx} position={[xPos, 0.25, 0.315]}>
              <mesh castShadow>
                <cylinderGeometry args={[0.013, 0.013, 0.29, 12]} />
                <meshStandardMaterial color="#b9ee2f" roughness={0.44} />
              </mesh>
              <mesh position={[0, -0.155, 0]} castShadow>
                <cylinderGeometry args={[0.017, 0.015, 0.048, 12]} />
                <meshStandardMaterial color="#111213" roughness={0.35} metalness={0.3} />
              </mesh>
            </group>
          ))}

          <mesh position={[0.2, 0.16, 0.304]}>
            <planeGeometry args={[0.24, 0.066]} />
            <meshBasicMaterial map={chestLogoTexture} transparent />
          </mesh>

          {/* Neck */}
          <mesh position={[0, 0.52, 0.03]} castShadow>
            <cylinderGeometry args={[0.132, 0.155, 0.22, 24]} />
            <meshStandardMaterial color="#c48660" roughness={0.52} />
          </mesh>

          {/* LEFT ARM: resting casually on armrest */}
          <group ref={leftArmRef} position={[-0.49, 0.2, 0.02]} rotation={[0.14, 0, 0.24]}>
            <mesh position={[-0.06, -0.2, 0.06]} castShadow>
              <capsuleGeometry args={[0.135, 0.36, 12, 24]} />
              <meshPhysicalMaterial
                map={hoodieTexture}
                color="#17181a"
                roughness={0.88}
                sheen={0.42}
              />
            </mesh>
            <group position={[-0.1, -0.38, 0.08]} rotation={[-1.08, 0.14, -0.18]}>
              <mesh position={[0, -0.16, 0.02]} castShadow>
                <capsuleGeometry args={[0.12, 0.32, 12, 24]} />
                <meshPhysicalMaterial
                  map={hoodieTexture}
                  color="#17181a"
                  roughness={0.88}
                  sheen={0.42}
                />
              </mesh>
              <mesh position={[0, -0.35, 0.03]}>
                <cylinderGeometry args={[0.105, 0.095, 0.07, 18]} />
                <meshStandardMaterial color="#121314" roughness={0.86} />
              </mesh>
              <RoundedBox
                args={[0.14, 0.14, 0.08]}
                radius={0.04}
                position={[0, -0.44, 0.04]}
                castShadow
              >
                <meshStandardMaterial color="#c68862" roughness={0.48} />
              </RoundedBox>
            </group>
          </group>

          {/* RIGHT ARM: resting casually on thigh, waves on click */}
          <group ref={rightArmRef} position={[0.49, 0.2, 0.04]} rotation={[-0.14, 0, -0.18]}>
            <mesh position={[0.04, -0.2, 0.08]} rotation={[0.25, 0, 0.12]} castShadow>
              <capsuleGeometry args={[0.135, 0.36, 12, 24]} />
              <meshPhysicalMaterial
                map={hoodieTexture}
                color="#17181a"
                roughness={0.88}
                sheen={0.42}
              />
            </mesh>
            <group position={[0.04, -0.38, 0.18]} rotation={[-1.08, -0.24, 0.12]}>
              <mesh position={[0, -0.16, 0.02]} castShadow>
                <capsuleGeometry args={[0.12, 0.32, 12, 24]} />
                <meshPhysicalMaterial
                  map={hoodieTexture}
                  color="#17181a"
                  roughness={0.88}
                  sheen={0.42}
                />
              </mesh>
              <mesh position={[0, -0.35, 0.03]}>
                <cylinderGeometry args={[0.105, 0.095, 0.07, 18]} />
                <meshStandardMaterial color="#121314" roughness={0.86} />
              </mesh>
              <RoundedBox
                args={[0.14, 0.14, 0.08]}
                radius={0.04}
                position={[0, -0.44, 0.04]}
                castShadow
              >
                <meshStandardMaterial color="#c68862" roughness={0.48} />
              </RoundedBox>
            </group>
          </group>
        </group>

        {/* RECONSTRUCTED ANATOMICAL PIXAR HEAD & PORTRAIT FEATURES */}
        <group ref={headRef} position={[0, 1.09, -0.01]} scale={1.06}>
          {/* Sculpted 96x96 head mesh with temples, cheekbones, jaw angle, chin & nasal bridge */}
          <mesh geometry={headGeo} castShadow receiveShadow>
            <meshPhysicalMaterial
              map={skinTexture}
              roughness={0.48}
              metalness={0.01}
              sheen={0.28}
              sheenRoughness={0.82}
              sheenColor="#f4be98"
            />
          </mesh>

          {/* Prominent sculpted ears matching portrait angle & helix */}
          {[-0.425, 0.425].map((xPos, idx) => (
            <group
              key={idx}
              position={[xPos, -0.035, -0.025]}
              rotation={[0, idx === 0 ? -0.28 : 0.28, idx === 0 ? 0.12 : -0.12]}
            >
              <mesh scale={[0.52, 1.15, 0.72]} castShadow>
                <sphereGeometry args={[0.145, 22, 22]} />
                <meshStandardMaterial color="#bf7f59" roughness={0.5} />
              </mesh>
              <mesh
                position={[idx === 0 ? -0.014 : 0.014, 0, 0.042]}
                scale={[0.32, 0.74, 0.42]}
              >
                <sphereGeometry args={[0.102, 16, 16]} />
                <meshStandardMaterial color="#965a3c" roughness={0.62} />
              </mesh>
            </group>
          ))}

          {/* Reconstructed Nose Tip & Proportional Alar Nostrils (integrates with sculpted bridge) */}
          <group position={[0, -0.056, 0.428]}>
            <mesh position={[0, 0.008, 0.016]} scale={[1.08, 0.88, 1.05]} castShadow>
              <sphereGeometry args={[0.048, 22, 22]} />
              <meshStandardMaterial color="#be7e58" roughness={0.46} />
            </mesh>
            {[-0.042, 0.042].map((nx, idx) => (
              <group key={idx} position={[nx, -0.008, -0.002]}>
                <mesh scale={[0.92, 0.78, 0.94]} castShadow>
                  <sphereGeometry args={[0.028, 16, 16]} />
                  <meshStandardMaterial color="#b77650" roughness={0.48} />
                </mesh>
                {/* Subtle nostril shadow */}
                <mesh position={[0, -0.016, -0.004]} scale={[0.7, 0.4, 0.7]}>
                  <sphereGeometry args={[0.016, 10, 10]} />
                  <meshStandardMaterial color="#59301e" roughness={0.8} />
                </mesh>
              </group>
            ))}
          </group>

          {/* Reconstructed Cupid's-Bow Upper Lip, Natural Full Lower Lip & Friendly Smile */}
          <group position={[0, -0.195, 0.398]}>
            <mesh geometry={upperLipGeo} castShadow>
              <meshStandardMaterial color="#9f5948" roughness={0.45} />
            </mesh>
            <mesh geometry={smilePartGeo} position={[0, -0.012, 0.002]}>
              <meshStandardMaterial color="#682f24" roughness={0.42} />
            </mesh>
            <mesh position={[0, -0.036, -0.002]} scale={[1.38, 0.64, 0.76]} castShadow>
              <sphereGeometry args={[0.048, 20, 20]} />
              <meshStandardMaterial color="#b46e5b" roughness={0.44} />
            </mesh>
          </group>

          {/* ALMOND-SHAPED EXPRESSIVE PIXAR EYES INSIDE ORBITAL SOCKETS */}
          {[-0.142, 0.142].map((xPos, idx) => (
            <group key={idx} position={[xPos, 0.046, 0.354]} scale={[1.06, 0.9, 0.92]}>
              {/* Tracked eyeball group (pre-rotated geometry keeps world X horizontal) */}
              <group ref={idx === 0 ? leftIrisRef : rightIrisRef}>
                <mesh geometry={eyeGeo}>
                  <meshPhysicalMaterial
                    map={eyeTexture}
                    roughness={0.05}
                    clearcoat={1}
                    clearcoatRoughness={0.03}
                  />
                </mesh>
              </group>

              {/* Almond upper lash contour */}
              <mesh geometry={upperRimGeo} position={[0, 0.006, 0.06]}>
                <meshStandardMaterial color="#120d0a" roughness={0.45} />
              </mesh>

              {/* Soft lower eyelid rim */}
              <mesh geometry={lowerRimGeo} position={[0, -0.006, 0.058]}>
                <meshStandardMaterial color="#a46846" roughness={0.55} />
              </mesh>

              {/* Blinking upper eyelid pivoting around eyeball center */}
              <mesh
                ref={idx === 0 ? leftEyelidRef : rightEyelidRef}
                rotation={[-0.72, 0, 0]}
              >
                <sphereGeometry
                  args={[0.093, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.56]}
                />
                <meshStandardMaterial color="#b37551" roughness={0.5} />
              </mesh>
            </group>
          ))}

          {/* TAPERED THICK EYEBROWS (contoured onto sculpted brow ridge) */}
          <group ref={browsRef} position={[0, 0.132, 0.425]}>
            <mesh geometry={leftBrowGeo} castShadow>
              <meshStandardMaterial color="#120f0e" roughness={0.78} />
            </mesh>
            <mesh geometry={rightBrowGeo} castShadow>
              <meshStandardMaterial color="#120f0e" roughness={0.78} />
            </mesh>
          </group>

          {/* THICK, NATURALLY TEXTURED WAVY BLACK HAIRSTYLE */}
          <group position={[0, 0.02, 0]}>
            {/* Sculpted asymmetrical hair volume cap with tapered sides & wavy crown */}
            <mesh geometry={hairCapGeo} castShadow receiveShadow>
              <meshPhysicalMaterial
                map={hairTexture}
                color="#141312"
                roughness={0.74}
                metalness={0.04}
                sheen={0.42}
                sheenRoughness={0.58}
                sheenColor="#36322f"
              />
            </mesh>

            {/* Tapered sideburns blending into closely cropped temples */}
            {[-0.39, 0.39].map((sx, idx) => (
              <mesh
                key={idx}
                position={[sx, 0.09, -0.02]}
                scale={[0.26, 0.95, 0.78]}
                castShadow
              >
                <sphereGeometry args={[0.135, 16, 16]} />
                <meshStandardMaterial color="#131211" roughness={0.82} />
              </mesh>
            ))}

            {/* Tapered wavy hair locks along front fringe & crown */}
            {hairLockGeos.map((geo, i) => (
              <mesh key={i} geometry={geo} castShadow>
                <meshPhysicalMaterial
                  map={hairTexture}
                  color="#151413"
                  roughness={0.68}
                  metalness={0.04}
                  sheen={0.46}
                  sheenRoughness={0.54}
                  sheenColor="#3a3633"
                />
              </mesh>
            ))}
          </group>
        </group>
      </group>
    </group>
  );
}
