// src/lib/torn.ts — Realistic Torn Paper Edge Generator per BRIEF §6
import { createPrng } from './seed';

export interface TornPoint {
  x: number;
  y: number;
  hasLongFiber?: boolean;
  fiberLen?: number;
}

// Global memoization cache per (seed, widthBucket)
const MASK_CACHE = new Map<string, { path: string; svgDataUrl: string; fiberPath: string; highlightPath: string }>();

/**
 * 1D Smooth Noise / Value Noise with cubic interpolation
 */
function smoothNoise1D(randomValues: number[], x: number): number {
  const len = randomValues.length;
  const idx = Math.floor(x);
  const frac = x - idx;

  const i0 = ((idx % len) + len) % len;
  const i1 = (((idx + 1) % len) + len) % len;

  const v0 = randomValues[i0] ?? 0.5;
  const v1 = randomValues[i1] ?? 0.5;

  // Smoothstep interpolation (3t^2 - 2t^3)
  const t = frac * frac * (3 - 2 * frac);
  return v0 * (1 - t) + v1 * t;
}

/**
 * Generates 3-layer seeded noise for realistic hand-torn paper edge per BRIEF §6.4
 */
export function generateSeededNoise(seed: number, count: number): number[] {
  const prng = createPrng(seed);

  // Generate table of random numbers for 3 noise octaves
  const tableSize = 128;
  const macroTable = Array.from({ length: tableSize }, () => prng() * 2 - 1);
  const medTable = Array.from({ length: tableSize }, () => prng() * 2 - 1);
  const fineTable = Array.from({ length: tableSize }, () => prng() * 2 - 1);

  const points: number[] = [];
  const numSteps = Math.max(16, count);

  for (let i = 0; i < numSteps; i++) {
    const t = i / (numSteps - 1);

    // 1. Macro scale: 2-3 wide undulations (frequency ~ 2.5)
    const macro = smoothNoise1D(macroTable, t * 2.8);

    // 2. Medium scale: uneven rips and asymmetrical peaks (frequency ~ 9.0)
    const med = smoothNoise1D(medTable, t * 9.5);

    // 3. Fine scale: micro fiber teeth (frequency ~ 32.0)
    const fine = smoothNoise1D(fineTable, t * 32.0);

    // Composite amplitude: 50% macro + 35% med + 15% fine
    const composite = macro * 0.5 + med * 0.35 + fine * 0.15;
    points.push(composite);
  }

  return points;
}

/**
 * Generates a closed SVG path for the torn strip mask per BRIEF §6.3 & §6.4
 * Top (0,0) -> (width,0) is solid, bottom contour is torn.
 */
export function generateTornPath(seed: number, width: number, height: number): string {
  const prng = createPrng(seed ^ 0x9e3779b9);

  // Sample points every ~8-12px across width
  const stepPx = Math.max(8, Math.min(16, width / 80));
  const numPoints = Math.max(20, Math.ceil(width / stepPx));
  const rawNoise = generateSeededNoise(seed, numPoints);

  // Tear baseline is centered at ~48% of strip height
  const baseTearY = height * 0.48;
  const maxDeviation = height * 0.38; // Amplitude <= height

  const points: TornPoint[] = [];

  for (let i = 0; i < numPoints; i++) {
    const x = (i / (numPoints - 1)) * width;
    const noiseVal = rawNoise[i] ?? 0;
    let y = baseTearY + noiseVal * maxDeviation;

    // Physical details per §6.4:
    // Occasional long fiber protruding 2-8px
    const fiberChance = prng();
    let hasLongFiber = false;
    let fiberLen = 0;
    if (fiberChance > 0.88) {
      hasLongFiber = true;
      fiberLen = 2 + prng() * 6; // 2 to 8px
      y += fiberLen;
    }

    // Occasional hanging piece
    if (prng() > 0.96) {
      y += 3 + prng() * 5;
    }

    // Clamp strictly within [4px, height - 2px] to guarantee amplitude <= height
    y = Math.max(4, Math.min(height - 2, y));

    points.push({ x, y, hasLongFiber, fiberLen });
  }

  // Construct closed SVG path:
  // (0,0) -> (width, 0) -> (width, y_last) -> trace points back to (0, y_first) -> (0,0)
  let d = `M 0 0 L ${width.toFixed(1)} 0`;

  // Down to right edge
  const lastPoint = points[points.length - 1]!;
  d += ` L ${width.toFixed(1)} ${lastPoint.y.toFixed(1)}`;

  // Trace torn contour from right to left
  for (let i = points.length - 2; i >= 0; i--) {
    const p = points[i]!;
    d += ` L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
  }

  // Back to start
  d += ' Z';
  return d;
}

/**
 * Secondary subtle fiber contour path offset 3-8px (§6.7)
 */
export function generateFiberPath(seed: number, width: number, height: number): string {
  const prng = createPrng(seed ^ 0x55aa55aa);
  const stepPx = Math.max(10, Math.min(18, width / 70));
  const numPoints = Math.max(18, Math.ceil(width / stepPx));
  const rawNoise = generateSeededNoise(seed + 17, numPoints);

  const baseTearY = height * 0.48;
  const maxDeviation = height * 0.36;

  let d = '';
  let inSegment = false;

  for (let i = 0; i < numPoints; i++) {
    const x = (i / (numPoints - 1)) * width;
    const noiseVal = rawNoise[i] ?? 0;
    // Fibers appear only in small irregular patches per §6.7
    const showFiber = prng() > 0.4;
    const offset = 3 + prng() * 5; // 3 to 8px offset
    const y = Math.min(height - 1, baseTearY + noiseVal * maxDeviation + offset);

    if (showFiber) {
      if (!inSegment) {
        d += ` M ${x.toFixed(1)} ${y.toFixed(1)}`;
        inSegment = true;
      } else {
        d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
      }
    } else {
      inSegment = false;
    }
  }

  return d;
}

/**
 * Generates irregular highlight stroke path for curl/depth per §6.9
 */
export function generateHighlightPath(seed: number, width: number, height: number): string {
  const prng = createPrng(seed ^ 0x33cc33cc);
  const stepPx = Math.max(12, Math.min(20, width / 60));
  const numPoints = Math.max(16, Math.ceil(width / stepPx));
  const rawNoise = generateSeededNoise(seed + 42, numPoints);

  const baseTearY = height * 0.48;
  const maxDeviation = height * 0.36;

  let d = '';
  let inSegment = false;

  for (let i = 0; i < numPoints; i++) {
    const x = (i / (numPoints - 1)) * width;
    const noiseVal = rawNoise[i] ?? 0;
    // Irregular discontinuous highlight (never continuous border per §6.9)
    const showHighlight = prng() > 0.55;
    const y = Math.min(height - 2, baseTearY + noiseVal * maxDeviation - 0.5);

    if (showHighlight) {
      if (!inSegment) {
        d += ` M ${x.toFixed(1)} ${y.toFixed(1)}`;
        inSegment = true;
      } else {
        d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
      }
    } else {
      inSegment = false;
    }
  }

  return d;
}

/**
 * Returns cached or newly generated SVG strip mask data URI and companion paths
 */
export function generateTornMaskSvg(
  seed: number,
  width: number = 1440,
  height: number = 64
): { path: string; svgDataUrl: string; fiberPath: string; highlightPath: string } {
  // Quantize width to 64px buckets for stable memoization (§6.13)
  const bucketWidth = Math.max(320, Math.round(width / 64) * 64);
  const cacheKey = `${seed}_${bucketWidth}_${height}`;

  const cached = MASK_CACHE.get(cacheKey);
  if (cached) return cached;

  const path = generateTornPath(seed, bucketWidth, height);
  const fiberPath = generateFiberPath(seed, bucketWidth, height);
  const highlightPath = generateHighlightPath(seed, bucketWidth, height);

  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${bucketWidth} ${height}' preserveAspectRatio='none' width='100%' height='100%'><path d='${path}' fill='black'/></svg>`;
  const svgDataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

  const result = { path, svgDataUrl, fiberPath, highlightPath };
  MASK_CACHE.set(cacheKey, result);
  return result;
}

/**
 * Creates CSS custom properties for TornSection styling per §6.3
 */
export function createTornEdgeStyle(seed: number, width: number = 1440): React.CSSProperties {
  const { svgDataUrl } = generateTornMaskSvg(seed, width, 64);
  return {
    ['--tear-url' as string]: `url("${svgDataUrl}")`,
  };
}
