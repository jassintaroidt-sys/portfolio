# Jassinta Roid Triniti — Creative Portfolio

One-page creative portfolio website for Jassinta Roid Triniti (Social Media Specialist, Content Creator, Videographer, Graphic Designer).
Built with React 18, Vite, TypeScript (strict), Tailwind CSS v3.4, Lenis, and GSAP.

## Project Structure

```
src/
  lib/          Utilities (media, seed, torn edge, fit)
  data/         Data manifests & constants
  styles/       Tokens, fonts, textures, base CSS
  components/   Modular UI components & 3D CSS
public/assets/  Media assets (images, videos, flipbook)
scripts/        Verification & media processing scripts
qa/             Device testing & screenshot QA suite
```

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.
Open `http://localhost:5173/#/__tokens` to inspect all design system color swatches.

### 3. Type Checking
```bash
npm run typecheck
```

### 4. Unit Testing
```bash
npm run test
```

### 5. Verify Media & Architecture Rules
```bash
npm run check:media
npm run check:refs
```

### 6. QA Device Viewport Screenshots
```bash
npm run qa:shots
```

### 7. Production Build & Preview
```bash
npm run build
npm run preview
```

## Deployment

Configured for **Vercel** with caching and SPA rewrites defined in `vercel.json`.
Static assets in `public/assets/` and fonts in `public/fonts/` are cached with immutable headers.
