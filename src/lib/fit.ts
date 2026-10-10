// src/lib/fit.ts — Locker Fit Algorithm per BRIEF §8.6
import { useState, useEffect } from 'react';

export interface LockerFitResult {
  px: number; // Scale factor: screen pixels per 1 locker unit
  isFiveDoorMode: boolean; // true = 5 doors visible, false = 3 doors visible (swipe mode)
  cabinetWidth: number; // in pixels
  cabinetHeight: number; // in pixels
  doorWidth: number; // in pixels
  doorHeight: number; // in pixels
  footerHeight: number; // in pixels
}

export const LOCKER_CONSTANTS = {
  DOOR_WIDTH: 1080,
  DOOR_HEIGHT: 3240,
  POST_WIDTH: 86,
  CABINET_TOP_HEIGHT: 116,
  CABINET_PLINTH_HEIGHT: 113,
  TOTAL_CABINET_HEIGHT: 3469, // 3240 + 116 + 113
  FIVE_DOOR_WIDTH: 5916, // 5 * 1080 + 6 * 86
  THREE_DOOR_WIDTH: 3584, // 3 * 1080 + 4 * 86
  FOOTER_UNITS: 66,
  MIN_DOOR_WIDTH_PX: 150,
};

/**
 * Pure calculation function for locker fit (testable)
 */
export function calculateLockerFit(
  viewportW: number,
  viewportH: number,
  options?: { safeTop?: number; safeBottom?: number; safeX?: number; margin?: number }
): LockerFitResult {
  const safeX = options?.safeX ?? 12;
  const safeTop = options?.safeTop ?? 12;
  const safeBottom = options?.safeBottom ?? 12;
  const margin = options?.margin ?? 16;

  // Available viewport space
  const availW = Math.max(200, viewportW - 2 * safeX - margin);
  // Reserve space for footer (~20-28px) + margins
  const estimatedFooterPx = Math.max(20, Math.min(32, viewportH * 0.03));
  const availH = Math.max(300, viewportH - estimatedFooterPx - safeTop - safeBottom - margin);

  const px5 = Math.min(availW / LOCKER_CONSTANTS.FIVE_DOOR_WIDTH, availH / LOCKER_CONSTANTS.TOTAL_CABINET_HEIGHT);
  const px3 = Math.min(availW / LOCKER_CONSTANTS.THREE_DOOR_WIDTH, availH / LOCKER_CONSTANTS.TOTAL_CABINET_HEIGHT);

  const isLandscape = viewportW > viewportH;
  const hasEnoughWidthForFive = px5 * LOCKER_CONSTANTS.DOOR_WIDTH >= LOCKER_CONSTANTS.MIN_DOOR_WIDTH_PX;
  const isFiveDoorMode = isLandscape && hasEnoughWidthForFive;

  const px = isFiveDoorMode ? px5 : px3;

  const doorWidth = px * LOCKER_CONSTANTS.DOOR_WIDTH;
  const doorHeight = px * LOCKER_CONSTANTS.DOOR_HEIGHT;
  const cabinetWidth = px * (isFiveDoorMode ? LOCKER_CONSTANTS.FIVE_DOOR_WIDTH : LOCKER_CONSTANTS.FIVE_DOOR_WIDTH);
  const cabinetHeight = px * LOCKER_CONSTANTS.TOTAL_CABINET_HEIGHT;
  const footerHeight = Math.max(18, px * LOCKER_CONSTANTS.FOOTER_UNITS);

  return {
    px,
    isFiveDoorMode,
    cabinetWidth,
    cabinetHeight,
    doorWidth,
    doorHeight,
    footerHeight,
  };
}

/**
 * React Hook for dynamic responsive fitting
 */
export function useLockerFit(): LockerFitResult {
  const [fit, setFit] = useState<LockerFitResult>(() => {
    if (typeof window !== 'undefined') {
      const w = window.visualViewport?.width ?? window.innerWidth;
      const h = window.visualViewport?.height ?? window.innerHeight;
      return calculateLockerFit(w, h);
    }
    return calculateLockerFit(1920, 1080);
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const updateFit = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const w = window.visualViewport?.width ?? window.innerWidth;
        const h = window.visualViewport?.height ?? window.innerHeight;
        setFit(calculateLockerFit(w, h));
      }, 50);
    };

    window.addEventListener('resize', updateFit);
    window.addEventListener('orientationchange', updateFit);
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', updateFit);
    }

    // Initial update
    updateFit();

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateFit);
      window.removeEventListener('orientationchange', updateFit);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', updateFit);
      }
    };
  }, []);

  return fit;
}
