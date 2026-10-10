import { describe, it, expect } from 'vitest';
import { generateTornPath, generateSeededNoise, generateTornMaskSvg } from './torn';

describe('Torn edge generation (BRIEF §6)', () => {
  it('is deterministic: same seed produces identical path, different seeds produce different paths', () => {
    const pathA1 = generateTornPath(101, 1000, 60);
    const pathA2 = generateTornPath(101, 1000, 60);
    const pathB = generateTornPath(202, 1000, 60);

    expect(pathA1).toBe(pathA2);
    expect(pathA1).not.toBe(pathB);
  });

  it('contains no NaN values', () => {
    const path = generateTornPath(303, 1200, 64);
    expect(path).not.toContain('NaN');
    expect(path).not.toContain('undefined');

    const noise = generateSeededNoise(404, 50);
    noise.forEach((val) => {
      expect(Number.isNaN(val)).toBe(false);
      expect(Number.isFinite(val)).toBe(true);
    });
  });

  it('forms a properly closed SVG path', () => {
    const path = generateTornPath(505, 800, 50);
    expect(path.startsWith('M 0 0')).toBe(true);
    expect(path.endsWith('Z')).toBe(true);
  });

  it('keeps amplitude within height bounds (amplitude <= height)', () => {
    const height = 64;
    const path = generateTornPath(606, 1440, height);

    // Extract all numbers after L and M
    const matches = path.match(/-?\d+(\.\d+)?/g);
    expect(matches).not.toBeNull();

    if (matches) {
      const numbers = matches.map(Number);
      // Even indices are x, odd are y
      for (let i = 1; i < numbers.length; i += 2) {
        const y = numbers[i]!;
        expect(y).toBeGreaterThanOrEqual(0);
        expect(y).toBeLessThanOrEqual(height);
      }
    }
  });

  it('generates valid SVG data URI mask', () => {
    const { svgDataUrl } = generateTornMaskSvg(101, 1440, 64);
    expect(svgDataUrl.startsWith('data:image/svg+xml;utf8,')).toBe(true);
    expect(svgDataUrl).toContain('path');
    expect(svgDataUrl).toContain('fill');
  });
});
