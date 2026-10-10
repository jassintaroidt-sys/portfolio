// src/lib/device.ts — Device detection & LOD settings per BRIEF §8.4

export function isLowPowerDevice(): boolean {
  if (typeof window === 'undefined') return false;

  // Reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return true;

  // Hardware concurrency check
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) {
    return true;
  }

  // Device memory check (Chrome / Chromium)
  if ('deviceMemory' in navigator && (navigator as { deviceMemory?: number }).deviceMemory! <= 4) {
    return true;
  }

  // Small screen mobile
  if (window.innerWidth < 768) {
    return true;
  }

  return false;
}
