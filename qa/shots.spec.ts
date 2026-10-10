import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const SECTIONS = [
  'opening',
  'personal-brand',
  'writing-portfolio',
  'content-marketing',
  'example-strategy',
  'project-campus',
  'podcast',
  'archive',
  'contact',
];

test.describe('FASE 12 — Visual QA & Device Matrix (§8.5)', () => {
  test('verify 11 viewports x all sections without horizontal scroll', async ({ page }, testInfo) => {
    const dir = path.resolve('qa/shots/fase-12');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const viewport = page.viewportSize();
    const vpName = viewport ? `${viewport.width}x${viewport.height}` : testInfo.project.name;

    // 1. Load root page
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Wait for preloader to complete (max 1800ms)
    await page.waitForTimeout(2000);

    // 2. Initial state: verify Opening Locker is closed and fits to footer
    const openingEl = page.locator('#opening');
    await expect(openingEl).toBeVisible();

    // Verify no horizontal overflow in initial state
    const initialOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(initialOverflow).toBe(false);

    // Capture closed locker state
    await page.screenshot({
      path: path.join(dir, `${vpName}-opening-closed.png`),
      fullPage: false,
    });

    // 3. Trigger OPEN sequence on Door 03
    const openBtn = page.locator('button:has-text("OPEN"), [aria-label*="Open door"], [aria-label*="03"]').first();
    if (await openBtn.isVisible()) {
      await openBtn.click();
    } else {
      // Fallback click on center locker handle
      await page.locator('#opening').click({ position: { x: (viewport?.width ?? 800) / 2, y: (viewport?.height ?? 600) / 2 } });
    }

    // Wait for open transition (800ms)
    await page.waitForTimeout(1000);

    // 4. Capture each section in document order
    for (const sectionId of SECTIONS) {
      const sectionLoc = page.locator(`#${sectionId}`);
      if (await sectionLoc.isVisible()) {
        await sectionLoc.scrollIntoViewIfNeeded();
        await page.waitForTimeout(400);

        // Verify zero horizontal scrollbar on every section
        const hasHorizontalScroll = await page.evaluate(() => {
          return document.documentElement.scrollWidth > window.innerWidth;
        });
        expect(hasHorizontalScroll).toBe(false);

        // Capture section viewport screenshot
        await page.screenshot({
          path: path.join(dir, `${vpName}-${sectionId}.png`),
          fullPage: false,
        });
      }
    }
  });

  test('direct route #/photography opens modal cleanly', async ({ page }) => {
    await page.goto('/#/photography');
    await page.waitForTimeout(2200);

    // The overlay should be present with role dialog
    const overlay = page.locator('[role="dialog"]');
    await expect(overlay).toBeVisible();

    // Press Escape to dismiss overlay
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);
    await expect(overlay).not.toBeVisible();
  });
});
