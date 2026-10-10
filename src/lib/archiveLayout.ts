// src/lib/archiveLayout.ts — BRIEF §17.2 Dynamic Responsive Media Engine

export type LayoutInput = {
  mediaRatio: number; // w/h asli
  W: number;
  H: number; // ukuran area preview (px)
  gap: number; // px
  minShort?: number; // sisi pendek min per tile (default 96)
  maxCopies?: number; // default 24 (video: 6, mode hemat: 6)
  naturalW?: number; // lebar asli media untuk mencegah upscale berlebih
  maxUpscale?: number; // default 1.6
};

export type LayoutResult = {
  cols: number;
  rows: number;
  count: number;
  tileW: number;
  tileH: number;
  mediaW: number;
  mediaH: number;
  gridW: number;
  gridH: number;
  offsetX: number;
  offsetY: number;
  coverage: number;
};

/**
 * Computes optimal dynamic repetition/tiling layout for media preview (§17.2).
 * Principle: FULL MEDIA + PRESERVE ORIGINAL RATIO + MAXIMUM AREA COVERAGE.
 * Zero cropping, zero distortion, zero overlap.
 */
export function computeArchiveLayout(input: LayoutInput): LayoutResult {
  const { mediaRatio, W, H, gap } = input;
  const minShort = input.minShort ?? 96;
  const maxCopies = Math.max(1, input.maxCopies ?? 24);
  const naturalW = input.naturalW;
  const maxUpscale = input.maxUpscale ?? 1.6;

  // Fallback candidate if container is extremely small or no valid candidates found
  const fallbackMediaW = Math.min(W, H * mediaRatio);
  const fallbackMediaH = fallbackMediaW / mediaRatio;
  const fallback: LayoutResult = {
    cols: 1,
    rows: 1,
    count: 1,
    tileW: W,
    tileH: H,
    mediaW: fallbackMediaW,
    mediaH: fallbackMediaH,
    gridW: fallbackMediaW,
    gridH: fallbackMediaH,
    offsetX: Math.max(0, (W - fallbackMediaW) / 2),
    offsetY: Math.max(0, (H - fallbackMediaH) / 2),
    coverage: (fallbackMediaW * fallbackMediaH) / (W * H),
  };

  if (W <= 0 || H <= 0 || mediaRatio <= 0) {
    return fallback;
  }

  const validCandidates: LayoutResult[] = [];

  // Iterate over full grids where cols * rows <= maxCopies
  for (let cols = 1; cols <= maxCopies; cols++) {
    for (let rows = 1; rows <= maxCopies; rows++) {
      const count = cols * rows;
      if (count > maxCopies) break;

      const availW = W - (cols - 1) * gap;
      const availH = H - (rows - 1) * gap;
      if (availW <= 0 || availH <= 0) continue;

      const cellW = availW / cols;
      const cellH = availH / rows;

      // Fit media preserving exact aspect ratio within cell
      const mediaW = Math.min(cellW, cellH * mediaRatio);
      const mediaH = mediaW / mediaRatio;

      // Validate minShort constraint
      if (Math.min(mediaW, mediaH) < minShort && count > 1) {
        continue;
      }

      // Validate maxUpscale constraint if naturalW is provided
      if (naturalW && naturalW > 0 && mediaW / naturalW > maxUpscale) {
        continue;
      }

      const gridW = cols * mediaW + (cols - 1) * gap;
      const gridH = rows * mediaH + (rows - 1) * gap;

      // Reject if rounding causes overflow
      if (gridW > W + 0.5 || gridH > H + 0.5) {
        continue;
      }

      const offsetX = Math.max(0, (W - gridW) / 2);
      const offsetY = Math.max(0, (H - gridH) / 2);
      const coverage = (count * mediaW * mediaH) / (W * H);

      validCandidates.push({
        cols,
        rows,
        count,
        tileW: cellW,
        tileH: cellH,
        mediaW,
        mediaH,
        gridW,
        gridH,
        offsetX,
        offsetY,
        coverage,
      });
    }
  }

  if (validCandidates.length === 0) {
    return fallback;
  }

  // Selection rule: Pick highest coverage; if difference < ~4% (0.04),
  // pick candidate with fewer copies, then larger tile size per BRIEF §17.2
  let best = validCandidates[0]!;

  for (let k = 1; k < validCandidates.length; k++) {
    const cand = validCandidates[k]!;
    const covDiff = cand.coverage - best.coverage;

    if (covDiff > 0.04) {
      // Significantly higher coverage
      best = cand;
    } else if (covDiff >= -0.04) {
      // Within ~4% coverage range: prefer fewer copies
      if (cand.count < best.count) {
        best = cand;
      } else if (cand.count === best.count) {
        // Equal count: prefer larger individual tile
        const candArea = cand.mediaW * cand.mediaH;
        const bestArea = best.mediaW * best.mediaH;
        if (candArea > bestArea) {
          best = cand;
        }
      }
    }
  }

  return best;
}
