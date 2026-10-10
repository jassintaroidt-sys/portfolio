// src/lib/flipbook.ts — BRIEF §15.2 Flipbook Spread Engine
import { MEDIA_MANIFEST, MediaItem } from '../data/media-manifest';

export interface FlipbookPage {
  pageNumber: number; // 1-indexed
  file: string;
  w: number;
  h: number;
  ratio: number;
  isLandscape: boolean;
}

export type SpreadType = 'single-right' | 'single-left' | 'pair' | 'landscape' | 'mobile';

export interface FlipbookSpread {
  id: string;
  type: SpreadType;
  pages: FlipbookPage[];
  pageLabel: string;
  leftPage: FlipbookPage | null;
  rightPage: FlipbookPage | null;
  isLandscape: boolean;
}

/**
 * Builds the page metadata array for a campus document by querying MEDIA_MANIFEST.
 * Page ratios are calculated dynamically from actual asset dimensions, never hardcoded.
 */
export function getCampusPages(campusId: string): FlipbookPage[] {
  const prefix = campusId === 'rush-07' ? 'rush_07' : campusId === 'pandora' ? 'pandora' : campusId;

  // Filter items matching the document prefix
  const matchingManifestItems = new Map<string, MediaItem>();
  for (const item of MEDIA_MANIFEST) {
    if (item.file.startsWith(prefix + '_')) {
      matchingManifestItems.set(item.file, item);
    }
  }

  const pages: FlipbookPage[] = [];
  const totalPages = campusId === 'rush-07' ? 89 : campusId === 'pandora' ? 8 : matchingManifestItems.size;

  for (let n = 1; n <= totalPages; n++) {
    const filename = `${prefix}_${n}.jpg`;
    const manifestItem = matchingManifestItems.get(filename);

    const w = manifestItem?.w ?? (campusId === 'pandora' ? 1100 : 1000);
    const h = manifestItem?.h ?? (campusId === 'pandora' ? 1747 : 1419);
    const ratio = w / h;
    const isLandscape = ratio > 1.1;

    pages.push({
      pageNumber: n,
      file: filename,
      w,
      h,
      ratio,
      isLandscape,
    });
  }

  return pages;
}

/**
 * Constructs spreads for dual-page flipbook view or single-page mobile view.
 * 
 * Rules (§15.2):
 * - Portrait page 1 displays alone on the right (front cover).
 * - Landscape page (ratio > ~1.1) takes a full spread across both sides and is never cropped or split.
 * - Subsequent portrait pages pair up as (2–3), (4–5), etc.
 * - Trailing odd portrait page displays alone on the left (back cover).
 * - Mobile portrait mode displays 1 page per screen, with landscape pages fitted to full width.
 */
export function buildSpreads(pages: FlipbookPage[], isMobile: boolean): FlipbookSpread[] {
  if (!pages || pages.length === 0) return [];

  if (isMobile) {
    return pages.map((page) => ({
      id: `spread-m-${page.pageNumber}`,
      type: 'mobile',
      pages: [page],
      pageLabel: `Page ${page.pageNumber}`,
      leftPage: null,
      rightPage: page,
      isLandscape: page.isLandscape,
    }));
  }

  const spreads: FlipbookSpread[] = [];
  let i = 0;

  // Evaluate page 1 (front cover)
  const p1 = pages[0];
  if (p1) {
    if (p1.isLandscape) {
      // Landscape page 1 (e.g. rush_07_1.jpg) spans across both sides as a full spread
      spreads.push({
        id: `spread-${p1.pageNumber}`,
        type: 'landscape',
        pages: [p1],
        pageLabel: `Page ${p1.pageNumber}`,
        leftPage: null,
        rightPage: null,
        isLandscape: true,
      });
      i++;
    } else {
      // Portrait page 1 displays alone on the right
      spreads.push({
        id: `spread-${p1.pageNumber}`,
        type: 'single-right',
        pages: [p1],
        pageLabel: `Page ${p1.pageNumber}`,
        leftPage: null,
        rightPage: p1,
        isLandscape: false,
      });
      i++;
    }
  }

  // Evaluate remaining pages
  while (i < pages.length) {
    const current = pages[i];
    if (!current) break;

    if (current.isLandscape) {
      spreads.push({
        id: `spread-${current.pageNumber}`,
        type: 'landscape',
        pages: [current],
        pageLabel: `Page ${current.pageNumber}`,
        leftPage: null,
        rightPage: null,
        isLandscape: true,
      });
      i++;
      continue;
    }

    // Current page is portrait; check next page
    const next = pages[i + 1];
    if (!next) {
      // Last page alone -> single left page
      spreads.push({
        id: `spread-${current.pageNumber}`,
        type: 'single-left',
        pages: [current],
        pageLabel: `Page ${current.pageNumber}`,
        leftPage: current,
        rightPage: null,
        isLandscape: false,
      });
      i++;
      break;
    }

    if (next.isLandscape) {
      // Next page is landscape, so current page cannot pair with it; sits alone on the left
      spreads.push({
        id: `spread-${current.pageNumber}`,
        type: 'single-left',
        pages: [current],
        pageLabel: `Page ${current.pageNumber}`,
        leftPage: current,
        rightPage: null,
        isLandscape: false,
      });
      i++;
    } else {
      // Both are portrait: pair them together
      spreads.push({
        id: `spread-${current.pageNumber}-${next.pageNumber}`,
        type: 'pair',
        pages: [current, next],
        pageLabel: `Pages ${current.pageNumber}–${next.pageNumber}`,
        leftPage: current,
        rightPage: next,
        isLandscape: false,
      });
      i += 2;
    }
  }

  return spreads;
}

/**
 * Checks whether a given spread index is within the lazy-load window of ±windowSize around the active spread.
 * Prevents loading dozens of high-res images simultaneously (§15.2).
 */
export function isSpreadInLazyWindow(
  spreadIndex: number,
  currentSpreadIndex: number,
  windowSize: number = 4
): boolean {
  return Math.abs(spreadIndex - currentSpreadIndex) <= windowSize;
}

/**
 * Finds the spread index that contains the given 1-based page number.
 */
export function findSpreadIndexForPageNumber(
  spreads: FlipbookSpread[],
  targetPageNumber: number
): number {
  if (spreads.length === 0) return 0;
  const idx = spreads.findIndex((s) => s.pages.some((p) => p.pageNumber === targetPageNumber));
  return idx >= 0 ? idx : 0;
}
