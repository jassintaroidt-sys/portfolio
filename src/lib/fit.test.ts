import { describe, it, expect } from 'vitest';
import { calculateLockerFit } from './fit';

describe('Locker Fit Algorithm (BRIEF §8.6)', () => {
  const VIEWPORTS_8_5 = [
    { name: 'Mobile XS', w: 360, h: 640, expectedMode: false },
    { name: 'iPhone 14', w: 390, h: 844, expectedMode: false },
    { name: 'iPhone Pro Max', w: 430, h: 932, expectedMode: false },
    { name: 'Phone Landscape', w: 844, h: 390, expectedMode: false },
    { name: 'iPad Portrait', w: 768, h: 1024, expectedMode: false },
    { name: 'iPad Landscape', w: 1024, h: 768, expectedMode: true },
    { name: 'HD 720p', w: 1280, h: 720, expectedMode: true },
    { name: 'Laptop WXGA', w: 1366, h: 768, expectedMode: true },
    { name: 'MacBook 1440', w: 1440, h: 900, expectedMode: true },
    { name: 'Full HD Desktop', w: 1920, h: 1080, expectedMode: true },
    { name: 'QHD 2560', w: 2560, h: 1440, expectedMode: true },
  ];

  it('correctly calculates --px and mode across all 11 §8.5 device viewports', () => {
    VIEWPORTS_8_5.forEach(({ name, w, h, expectedMode }) => {
      const fit = calculateLockerFit(w, h);
      expect(fit.px, `Viewport ${name} should have valid px`).toBeGreaterThan(0);
      expect(Number.isFinite(fit.px)).toBe(true);
      expect(fit.cabinetHeight).toBeLessThanOrEqual(h);
      expect(fit.isFiveDoorMode).toBe(expectedMode);
      expect(fit.doorWidth).toBeGreaterThan(0);
      expect(fit.doorHeight).toBeGreaterThan(0);
    });
  });

  it('matches 1920x1080 reference scale factor (~0.301)', () => {
    const fit = calculateLockerFit(1920, 1080, { safeX: 0, safeTop: 0, safeBottom: 0, margin: 0 });
    // In brief §8.6: --px ≈ 0.301 at 1920x1080 without excessive margins
    expect(fit.px).toBeCloseTo(0.30, 1);
    expect(fit.isFiveDoorMode).toBe(true);
  });
});
