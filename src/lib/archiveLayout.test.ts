// src/lib/archiveLayout.test.ts — Unit tests for BRIEF §17.2 Engine
import { describe, it, expect } from 'vitest';
import { computeArchiveLayout } from './archiveLayout';

describe('Archive Work Preview Engine (§17.2)', () => {
  it('CASE A: 16:9 preview & 16:9 media → 1 media', () => {
    const res = computeArchiveLayout({
      mediaRatio: 16 / 9,
      W: 1600,
      H: 900,
      gap: 12,
    });

    expect(res.count).toBe(1);
    expect(res.cols).toBe(1);
    expect(res.rows).toBe(1);
    expect(res.mediaW).toBeCloseTo(1600, 1);
    expect(res.mediaH).toBeCloseTo(900, 1);
    expect(res.coverage).toBeCloseTo(1.0, 2);
    expect(res.offsetX).toBeCloseTo(0, 1);
    expect(res.offsetY).toBeCloseTo(0, 1);
  });

  it('CASE B: 16:9 preview & 9:16 media → grid of multiple portraits, no crop', () => {
    const res = computeArchiveLayout({
      mediaRatio: 9 / 16,
      W: 1600,
      H: 900,
      gap: 16,
    });

    // Multi-tile repetition covers far more area than a single centered portrait
    expect(res.count).toBeGreaterThan(1);
    expect(res.coverage).toBeGreaterThan(0.65);
    // Invariant: no crop, ratio preserved
    expect(res.mediaW / res.mediaH).toBeCloseTo(9 / 16, 2);
    expect(res.gridW).toBeLessThanOrEqual(1600);
    expect(res.gridH).toBeLessThanOrEqual(900);
  });

  it('CASE C: Square (1:1) media preserves 1:1 ratio without turning into rectangle', () => {
    const res = computeArchiveLayout({
      mediaRatio: 1.0,
      W: 1200,
      H: 800,
      gap: 12,
    });

    expect(res.mediaW).toBeCloseTo(res.mediaH, 2);
    expect(res.mediaW / res.mediaH).toBeCloseTo(1.0, 3);
    expect(res.gridW).toBeLessThanOrEqual(1200);
    expect(res.gridH).toBeLessThanOrEqual(800);
  });

  it('CASE D: 9:20 media ratio (tall mobile format) preserves ratio without crop', () => {
    const res = computeArchiveLayout({
      mediaRatio: 9 / 20,
      W: 1200,
      H: 800,
      gap: 12,
    });

    expect(res.mediaW / res.mediaH).toBeCloseTo(9 / 20, 2);
    expect(res.gridW).toBeLessThanOrEqual(1200);
    expect(res.gridH).toBeLessThanOrEqual(800);
  });

  it('CASE E: 32:9 ultra-wide media ratio has no crop left/right', () => {
    const res = computeArchiveLayout({
      mediaRatio: 32 / 9,
      W: 1200,
      H: 800,
      gap: 12,
    });

    expect(res.mediaW / res.mediaH).toBeCloseTo(32 / 9, 2);
    expect(res.mediaW).toBeLessThanOrEqual(1200);
    expect(res.gridW).toBeLessThanOrEqual(1200);
    expect(res.gridH).toBeLessThanOrEqual(800);
  });

  it('handles portrait mobile preview container (HP) gracefully', () => {
    const res = computeArchiveLayout({
      mediaRatio: 9 / 16,
      W: 390,
      H: 600,
      gap: 8,
    });

    expect(res.count).toBeGreaterThanOrEqual(1);
    expect(res.gridW).toBeLessThanOrEqual(390);
    expect(res.gridH).toBeLessThanOrEqual(600);
    expect(res.mediaW / res.mediaH).toBeCloseTo(9 / 16, 2);
  });

  it('respects video maxCopies constraint (≤ 6 active copies)', () => {
    const res = computeArchiveLayout({
      mediaRatio: 9 / 16,
      W: 1920,
      H: 1080,
      gap: 16,
      maxCopies: 6,
    });

    expect(res.count).toBeLessThanOrEqual(6);
  });

  it('strictly satisfies all invariants across 11 screen sizes and 10 test aspect ratios', () => {
    const screenSizes = [
      { W: 360, H: 640 },
      { W: 390, H: 844 },
      { W: 412, H: 915 },
      { W: 768, H: 1024 },
      { W: 1024, H: 768 },
      { W: 1280, H: 800 },
      { W: 1366, H: 768 },
      { W: 1440, H: 900 },
      { W: 1920, H: 1080 },
      { W: 2560, H: 1440 },
      { W: 3840, H: 2160 },
    ];

    const testRatios = [
      9 / 16, // Portrait stories
      9 / 20, // Tall mobile
      3 / 4,  // Standard portrait
      4 / 5,  // Instagram portrait
      1.0,    // Square feed
      4 / 3,  // Classic landscape
      3 / 2,  // Photography
      16 / 9, // HD video
      21 / 9, // Ultrawide
      32 / 9, // Super ultrawide
    ];

    for (const screen of screenSizes) {
      for (const ratio of testRatios) {
        const res = computeArchiveLayout({
          mediaRatio: ratio,
          W: screen.W,
          H: screen.H,
          gap: 12,
        });

        // 1. Media fits inside cell
        expect(res.mediaW).toBeLessThanOrEqual(res.tileW + 0.05);
        expect(res.mediaH).toBeLessThanOrEqual(res.tileH + 0.05);

        // 2. Entire grid fits inside viewport with no overflow
        expect(res.gridW).toBeLessThanOrEqual(screen.W + 0.05);
        expect(res.gridH).toBeLessThanOrEqual(screen.H + 0.05);

        // 3. Aspect ratio strictly preserved within 0.5% (no distortion)
        const computedRatio = res.mediaW / res.mediaH;
        const ratioDelta = Math.abs(computedRatio - ratio) / ratio;
        expect(ratioDelta).toBeLessThanOrEqual(0.005);

        // 4. Centering offsets are non-negative
        expect(res.offsetX).toBeGreaterThanOrEqual(0);
        expect(res.offsetY).toBeGreaterThanOrEqual(0);

        // 5. Positive coverage
        expect(res.coverage).toBeGreaterThan(0);
        expect(res.coverage).toBeLessThanOrEqual(1.001);
      }
    }
  });
});
