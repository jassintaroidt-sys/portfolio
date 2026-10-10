# Architectural & Technical Decisions Log

This log records architectural and implementation decisions per BRIEF guidelines.

## FASE 0 — Foundations
- **Date**: 2026-10-10
- **Decision 0.1 — Sentient Font Fallback**:
  - Sentient is configured with `@font-face` in `src/styles/fonts.css` pointing to `/fonts/sentient/Sentient-*.woff2`.
  - While font files are being procured from Fontshare, `@fontsource/fraunces` and `Georgia, serif` serve as automatic font fallback per BRIEF §3.
- **Decision 0.2 — Media Candidate Resolver**:
  - Implemented candidate filename resolver for `Inspirasi Konten Hardselling_Lassiewear.jpg` / `Inspirasi Konten Hardselling_Lassiwear.jpg` in `media-manifest.ts` and `check-media.mjs`. Actual file in assets is `Inspirasi Konten Hardselling_Lassiwear.jpg`.
- **Decision 0.3 — Router Architecture**:
  - Implemented lightweight `useHashRoute` in `src/lib/hashRoute.ts` instead of an external routing library per BRIEF §1. Internal route `/#/__tokens` renders `TokensPage`.
