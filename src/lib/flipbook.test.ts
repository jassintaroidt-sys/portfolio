// src/lib/flipbook.test.ts — Unit tests for BRIEF §15.2
import { describe, it, expect } from 'vitest';
import {
  getCampusPages,
  buildSpreads,
  isSpreadInLazyWindow,
  findSpreadIndexForPageNumber,
  FlipbookPage,
} from './flipbook';

describe('flipbook spread engine (§15.2)', () => {
  it('retrieves accurate page metadata from media manifest for rush-07', () => {
    const pages = getCampusPages('rush-07');
    expect(pages.length).toBe(89);

    // Page 1 is landscape (1000x704, ratio ~1.42 > 1.1)
    const p1 = pages[0]!;
    expect(p1.file).toBe('rush_07_1.jpg');
    expect(p1.w).toBe(1000);
    expect(p1.h).toBe(704);
    expect(p1.isLandscape).toBe(true);

    // Pages 63-65 have dimensions 1000x1393 (tidak peyot)
    const p63 = pages[62]!;
    const p64 = pages[63]!;
    const p65 = pages[64]!;
    expect(p63.w).toBe(1000);
    expect(p63.h).toBe(1393);
    expect(p63.ratio).toBeCloseTo(1000 / 1393, 3);
    expect(p64.h).toBe(1393);
    expect(p65.h).toBe(1393);

    // Standard portrait pages (e.g. page 2 is 1000x1419)
    const p2 = pages[1]!;
    expect(p2.w).toBe(1000);
    expect(p2.h).toBe(1419);
    expect(p2.isLandscape).toBe(false);
  });

  it('retrieves accurate page metadata from media manifest for pandora', () => {
    const pages = getCampusPages('pandora');
    expect(pages.length).toBe(8);
    for (const p of pages) {
      expect(p.w).toBe(1100);
      expect(p.h).toBe(1747);
      expect(p.isLandscape).toBe(false);
    }
  });

  it('builds desktop spreads for rush-07 with rush_07_1.jpg as full landscape spread', () => {
    const pages = getCampusPages('rush-07');
    const spreads = buildSpreads(pages, false);

    // 1 landscape spread + 44 pair spreads = 45 spreads
    expect(spreads.length).toBe(45);

    // Spread 0: rush_07_1.jpg displayed as full landscape spread across both sides
    const firstSpread = spreads[0]!;
    expect(firstSpread.type).toBe('landscape');
    expect(firstSpread.isLandscape).toBe(true);
    expect(firstSpread.pages.length).toBe(1);
    expect(firstSpread.pages[0]!.file).toBe('rush_07_1.jpg');
    expect(firstSpread.pageLabel).toBe('Page 1');

    // Spread 1: pair of portrait pages 2 & 3
    const secondSpread = spreads[1]!;
    expect(secondSpread.type).toBe('pair');
    expect(secondSpread.pages.length).toBe(2);
    expect(secondSpread.leftPage?.pageNumber).toBe(2);
    expect(secondSpread.rightPage?.pageNumber).toBe(3);
    expect(secondSpread.pageLabel).toBe('Pages 2–3');

    // Last spread: pair of portrait pages 88 & 89
    const lastSpread = spreads[spreads.length - 1]!;
    expect(lastSpread.type).toBe('pair');
    expect(lastSpread.leftPage?.pageNumber).toBe(88);
    expect(lastSpread.rightPage?.pageNumber).toBe(89);
    expect(lastSpread.pageLabel).toBe('Pages 88–89');
  });

  it('builds desktop spreads for pandora with cover on right and back cover on left', () => {
    const pages = getCampusPages('pandora');
    const spreads = buildSpreads(pages, false);

    // Page 1 (right cover) + 3 pairs (2-3, 4-5, 6-7) + Page 8 (left back cover) = 5 spreads
    expect(spreads.length).toBe(5);

    // Front cover: single right
    expect(spreads[0]!.type).toBe('single-right');
    expect(spreads[0]!.rightPage?.pageNumber).toBe(1);
    expect(spreads[0]!.leftPage).toBeNull();
    expect(spreads[0]!.pageLabel).toBe('Page 1');

    // Inside pairs
    expect(spreads[1]!.type).toBe('pair');
    expect(spreads[1]!.pageLabel).toBe('Pages 2–3');
    expect(spreads[2]!.type).toBe('pair');
    expect(spreads[2]!.pageLabel).toBe('Pages 4–5');
    expect(spreads[3]!.type).toBe('pair');
    expect(spreads[3]!.pageLabel).toBe('Pages 6–7');

    // Back cover: single left
    expect(spreads[4]!.type).toBe('single-left');
    expect(spreads[4]!.leftPage?.pageNumber).toBe(8);
    expect(spreads[4]!.rightPage).toBeNull();
    expect(spreads[4]!.pageLabel).toBe('Page 8');
  });

  it('builds 1 page per spread on mobile mode', () => {
    const rushPages = getCampusPages('rush-07');
    const mobileSpreads = buildSpreads(rushPages, true);

    expect(mobileSpreads.length).toBe(89);
    expect(mobileSpreads[0]!.type).toBe('mobile');
    expect(mobileSpreads[0]!.pages[0]!.pageNumber).toBe(1);
    expect(mobileSpreads[0]!.isLandscape).toBe(true);

    expect(mobileSpreads[88]!.type).toBe('mobile');
    expect(mobileSpreads[88]!.pages[0]!.pageNumber).toBe(89);
    expect(mobileSpreads[88]!.isLandscape).toBe(false);
  });

  it('handles custom layout with embedded landscape pages correctly', () => {
    const customPages: FlipbookPage[] = [
      { pageNumber: 1, file: 'p1.jpg', w: 1000, h: 1400, ratio: 1000 / 1400, isLandscape: false },
      { pageNumber: 2, file: 'p2.jpg', w: 1000, h: 1400, ratio: 1000 / 1400, isLandscape: false },
      { pageNumber: 3, file: 'p3.jpg', w: 1400, h: 1000, ratio: 1.4, isLandscape: true },
      { pageNumber: 4, file: 'p4.jpg', w: 1000, h: 1400, ratio: 1000 / 1400, isLandscape: false },
    ];

    const spreads = buildSpreads(customPages, false);
    // Page 1: single-right
    expect(spreads[0]!.type).toBe('single-right');
    // Page 2: since page 3 is landscape, page 2 cannot pair with it -> single-left
    expect(spreads[1]!.type).toBe('single-left');
    expect(spreads[1]!.leftPage?.pageNumber).toBe(2);
    // Page 3: landscape spread
    expect(spreads[2]!.type).toBe('landscape');
    expect(spreads[2]!.pages[0]!.pageNumber).toBe(3);
    // Page 4: trailing page -> single-left
    expect(spreads[3]!.type).toBe('single-left');
    expect(spreads[3]!.leftPage?.pageNumber).toBe(4);
  });

  it('calculates lazy window of ±4 spreads accurately', () => {
    // Current spread = 10, windowSize = 4 -> [6, 14] inclusive
    expect(isSpreadInLazyWindow(10, 10, 4)).toBe(true);
    expect(isSpreadInLazyWindow(6, 10, 4)).toBe(true);
    expect(isSpreadInLazyWindow(14, 10, 4)).toBe(true);
    expect(isSpreadInLazyWindow(5, 10, 4)).toBe(false);
    expect(isSpreadInLazyWindow(15, 10, 4)).toBe(false);

    // Current spread = 0 -> [0, 4] inclusive
    expect(isSpreadInLazyWindow(0, 0, 4)).toBe(true);
    expect(isSpreadInLazyWindow(4, 0, 4)).toBe(true);
    expect(isSpreadInLazyWindow(5, 0, 4)).toBe(false);
  });

  it('locates spread index for a given page number accurately', () => {
    const rushPages = getCampusPages('rush-07');
    const spreads = buildSpreads(rushPages, false);

    expect(findSpreadIndexForPageNumber(spreads, 1)).toBe(0);
    expect(findSpreadIndexForPageNumber(spreads, 2)).toBe(1);
    expect(findSpreadIndexForPageNumber(spreads, 3)).toBe(1);
    expect(findSpreadIndexForPageNumber(spreads, 88)).toBe(44);
    expect(findSpreadIndexForPageNumber(spreads, 89)).toBe(44);
  });
});
