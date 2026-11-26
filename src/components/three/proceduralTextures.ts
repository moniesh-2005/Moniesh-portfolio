import * as THREE from 'three';

interface WebGLProbeResult {
  supported: boolean;
  isSoftware: boolean;
}

let cachedProbe: WebGLProbeResult | null = null;

/**
 * Probes WebGL capability and software rasterizers (e.g. SwiftShader, llvmpipe, WARP)
 * once per page load without invoking WEBGL_lose_context (which triggers Chromium context blocking).
 */
export function probeWebGLCapabilities(): WebGLProbeResult {
  if (cachedProbe) return cachedProbe;
  if (typeof document === 'undefined') {
    cachedProbe = { supported: true, isSoftware: false };
    return cachedProbe;
  }

  try {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const gl =
      canvas.getContext('webgl2', { failIfMajorPerformanceCaveat: false }) ||
      canvas.getContext('webgl', { failIfMajorPerformanceCaveat: false });
    if (!gl) {
      cachedProbe = { supported: false, isSoftware: true };
      return cachedProbe;
    }
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) || '');
    cachedProbe = {
      supported: true,
      isSoftware: /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu),
    };
    return cachedProbe;
  } catch {
    cachedProbe = { supported: false, isSoftware: false };
    return cachedProbe;
  }
}

export function detectSoftwareWebGL(): boolean {
  return probeWebGLCapabilities().isSoftware;
}


/**
 * Procedural Pixar-style warm medium-brown skin texture calibrated precisely
 * to the sculpted head UV layout (front center at u=0.5 after -PI/2 Y rotation).
 */
export function createPixarSkinTexture(): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Warm medium-brown skin base matching portrait
    ctx.fillStyle = '#c98a61';
    ctx.fillRect(0, 0, size, size);

    // Soft forehead-to-chin vertical warmth gradient
    const grad = ctx.createLinearGradient(0, 0, 0, size);
    grad.addColorStop(0, 'rgba(228, 168, 128, 0.22)');
    grad.addColorStop(0.5, 'rgba(201, 138, 97, 0)');
    grad.addColorStop(1, 'rgba(116, 68, 42, 0.26)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    // Subtle warm highlight on forehead & nasal bridge
    const bridge = ctx.createRadialGradient(
      size * 0.5,
      size * 0.46,
      4,
      size * 0.5,
      size * 0.46,
      46,
    );
    bridge.addColorStop(0, 'rgba(238, 182, 144, 0.22)');
    bridge.addColorStop(1, 'rgba(238, 182, 144, 0)');
    ctx.fillStyle = bridge;
    ctx.fillRect(0, 0, size, size);

    // Calibrated cheek warmth (u=0.435, 0.565)
    for (const cx of [size * 0.435, size * 0.565]) {
      const blush = ctx.createRadialGradient(
        cx,
        size * 0.56,
        3,
        cx,
        size * 0.56,
        38,
      );
      blush.addColorStop(0, 'rgba(204, 92, 72, 0.2)');
      blush.addColorStop(1, 'rgba(204, 92, 72, 0)');
      ctx.fillStyle = blush;
      ctx.fillRect(0, 0, size, size);
    }

    // Subtle orbital eye-socket & lower tear-trough warmth (u=0.452, 0.548)
    for (const ex of [size * 0.452, size * 0.548]) {
      const socket = ctx.createRadialGradient(
        ex,
        size * 0.48,
        3,
        ex,
        size * 0.48,
        24,
      );
      socket.addColorStop(0, 'rgba(108, 58, 36, 0.25)');
      socket.addColorStop(1, 'rgba(108, 58, 36, 0)');
      ctx.fillStyle = socket;
      ctx.fillRect(0, 0, size, size);
    }

    // Natural light stubble along lower jaw, sideburns & chin contour
    ctx.fillStyle = 'rgba(18, 13, 11, 0.24)';
    for (let i = 0; i < 1100; i++) {
      const rx = (((Math.sin(i * 12.9898) * 43758.5453) % 1) + 1) % 1;
      const ry = (((Math.sin(i * 78.233) * 19341.123) % 1) + 1) % 1;
      const u = 0.37 + rx * 0.26;
      const centerDist = Math.abs(u - 0.5) / 0.13;
      const vMin = 0.69 - centerDist * 0.06;
      const v = vMin + ry * 0.12;
      ctx.fillRect(u * size, v * size, 1.3, 1.3);
    }

    // Faint natural mustache shadow above upper lip
    ctx.fillStyle = 'rgba(18, 13, 11, 0.17)';
    for (let i = 0; i < 220; i++) {
      const rx = (((Math.sin(i * 45.164) * 23421.631) % 1) + 1) % 1;
      const ry = (((Math.sin(i * 93.112) * 12345.678) % 1) + 1) % 1;
      const u = 0.445 + rx * 0.11;
      const v = 0.588 + ry * 0.028;
      ctx.fillRect(u * size, v * size, 1.1, 1.1);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Procedural radial deep chestnut-brown iris texture calibrated for almond Pixar eyes.
 */
export function createPixarEyeTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = '#fcfaf7';
    ctx.fillRect(0, 0, size, size);

    const cx = size * 0.5;
    const cy = size * 0.5;
    const irisR = size * 0.23;

    // Dark limbal ring
    ctx.beginPath();
    ctx.arc(cx, cy, irisR, 0, Math.PI * 2);
    ctx.fillStyle = '#110703';
    ctx.fill();

    // Rich deep chestnut-brown iris gradient matching portrait
    const irisGrad = ctx.createRadialGradient(
      cx,
      cy,
      irisR * 0.22,
      cx,
      cy,
      irisR * 0.92,
    );
    irisGrad.addColorStop(0, '#6e3c1e');
    irisGrad.addColorStop(0.5, '#3f1e0c');
    irisGrad.addColorStop(1, '#1a0a04');
    ctx.beginPath();
    ctx.arc(cx, cy, irisR * 0.92, 0, Math.PI * 2);
    ctx.fillStyle = irisGrad;
    ctx.fill();

    // Fine iris fibers
    ctx.strokeStyle = 'rgba(160, 102, 58, 0.34)';
    ctx.lineWidth = 1.25;
    for (let a = 0; a < 44; a++) {
      const ang = (a / 44) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(
        cx + Math.cos(ang) * irisR * 0.34,
        cy + Math.sin(ang) * irisR * 0.34,
      );
      ctx.lineTo(
        cx + Math.cos(ang) * irisR * 0.88,
        cy + Math.sin(ang) * irisR * 0.88,
      );
      ctx.stroke();
    }

    // Crisp pupil
    ctx.beginPath();
    ctx.arc(cx, cy, irisR * 0.44, 0, Math.PI * 2);
    ctx.fillStyle = '#050302';
    ctx.fill();

    // Dual Pixar specular catchlights
    ctx.beginPath();
    ctx.arc(cx - irisR * 0.34, cy - irisR * 0.34, irisR * 0.19, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(cx + irisR * 0.26, cy + irisR * 0.28, irisR * 0.085, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Procedural fine wavy hair-strand texture for silky directional hair texture.
 */
export function createHairStrandTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = '#131211';
    ctx.fillRect(0, 0, size, size);

    for (let i = 0; i < 160; i++) {
      const y = (i / 160) * size;
      ctx.strokeStyle =
        i % 3 === 0 ? 'rgba(54, 50, 46, 0.42)' : 'rgba(6, 6, 6, 0.52)';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.bezierCurveTo(
        size * 0.33,
        y + Math.sin(i * 0.7) * 6,
        size * 0.66,
        y - Math.cos(i * 0.6) * 6,
        size,
        y,
      );
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Tactile charcoal-black cotton-fleece weave texture for the oversized hoodie.
 */
export function createBlackHoodieTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = '#161719';
    ctx.fillRect(0, 0, size, size);

    for (let y = 0; y < size; y += 4) {
      for (let x = 0; x < size; x += 4) {
        const shade =
          (x + y) % 8 === 0
            ? 'rgba(255, 255, 255, 0.025)'
            : 'rgba(0, 0, 0, 0.16)';
        ctx.fillStyle = shade;
        ctx.fillRect(x, y, 2, 2);
      }
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(5, 5);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Tactile bouclé upholstery weave texture for the sculptural lounge chair.
 */
export function createChairFabricTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = '#1b3818';
    ctx.fillRect(0, 0, size, size);

    for (let i = 0; i < 1800; i++) {
      const rx = (((Math.sin(i * 19.31) * 43758.5453) % 1) + 1) % 1;
      const ry = (((Math.sin(i * 73.17) * 19341.123) % 1) + 1) % 1;
      ctx.fillStyle =
        i % 2 === 0 ? 'rgba(185, 238, 47, 0.06)' : 'rgba(8, 22, 10, 0.18)';
      ctx.beginPath();
      ctx.arc(rx * size, ry * size, 1.8, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Subtle lime-green MONIESH® chest print texture for the black oversized hoodie.
 */
export function createChestLogoTexture(): THREE.CanvasTexture {
  const width = 512;
  const height = 140;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = 'rgba(185, 238, 47, 0.9)';
    ctx.font = '800 50px "Bricolage Grotesque", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('MONIESH®', width * 0.5, height * 0.5);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}
