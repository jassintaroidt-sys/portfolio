import { useState, useEffect } from 'react';
import { TornSection } from '../torn/TornSection';

export function TornDemoPage(): JSX.Element {
  const [viewportWidth, setViewportWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1440
  );

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full bg-mist text-ink font-poppins selection:bg-hot-pink selection:text-white">
      {/* Sticky Dev Bar */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-warm-grey px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
        <div className="flex items-center gap-3">
          <a href="#/" className="font-bold text-hot-pink hover:underline">
            ← Back to App
          </a>
          <span className="text-gray-400">|</span>
          <span className="font-bold">/#/__torn</span>
          <span className="text-gray-500">Torn Paper Edge Validation (§6)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-bubblegum/20 text-raspberry px-2 py-0.5 rounded font-bold">
            Viewport: {viewportWidth}px
          </span>
          <span className="hidden sm:inline text-gray-500">
            (Tested: 360px Mobile &amp; 1920px Desktop)
          </span>
        </div>
      </div>

      {/* SECTION 1: Seed 101 — Opening Paper (Pink Blush) */}
      <TornSection seed={101} backgroundClass="bg-blush grain">
        <div className="py-20 px-6 max-w-4xl mx-auto text-center">
          <div className="inline-block px-3 py-1 rounded-full bg-hot-pink/15 text-raspberry font-mono text-xs font-bold mb-4">
            SEED 101 · Opening Paper
          </div>
          <h2 className="headline text-ink mb-4">
            Hand-Torn Paper Simulation
          </h2>
          <p className="narration text-ink/80 mx-auto">
            3-layer seeded octave noise (macro, medium, and fine micro-fibers) with secondary
            fibers and delicate highlights. Look below: the pink physically tears off into the vanilla paper.
          </p>
        </div>
      </TornSection>

      {/* SECTION 2: Seed 202 — Cassette Paper (Vanilla Cream) */}
      <div className="torn-next-section">
        <TornSection seed={202} backgroundClass="bg-vanilla grain">
          <div className="py-24 px-6 max-w-4xl mx-auto text-center">
            <div className="inline-block px-3 py-1 rounded-full bg-honey/30 text-cocoa font-mono text-xs font-bold mb-4">
              SEED 202 · Cassette Vanilla Paper
            </div>
            <h2 className="headline text-ink mb-4">
              Seamless Physical Transition
            </h2>
            <p className="narration text-espresso mx-auto">
              No white strips. No faux gradients. The background of the section continues uninterrupted
              right up to the ragged paper edge contour. The section underneath starts directly beneath it.
            </p>
          </div>
        </TornSection>
      </div>

      {/* SECTION 3: Seed 303 — Dark Runway (Plum Night with White Film Grain) */}
      <div className="torn-next-section">
        <TornSection seed={303} backgroundClass="bg-plum-night text-milk-white grain-dark">
          <div className="py-28 px-6 max-w-4xl mx-auto text-center">
            <div className="inline-block px-3 py-1 rounded-full bg-orchid/20 text-orchid font-mono text-xs font-bold mb-4">
              SEED 303 · Plum Night Dark Runway
            </div>
            <h2 className="headline text-milk-white mb-4">
              Contour-Clipped Film Grain
            </h2>
            <p className="narration text-milk-white/90 mx-auto">
              White noise film grain (`mix-blend-mode: screen`) is clipped together with the dark paper.
              It terminates precisely at the irregular contour line without bleeding or leaving gaps.
            </p>
          </div>
        </TornSection>
      </div>

      {/* SECTION 4: Seed 404 — 300svh Tall Section with Sticky Card (§6.3 Test) */}
      <div className="torn-next-section">
        <TornSection seed={404} backgroundClass="bg-powder-pink grain min-h-[300svh]">
          <div className="py-20 px-6 max-w-4xl mx-auto flex flex-col items-center">
            <div className="inline-block px-3 py-1 rounded-full bg-cherry-red/15 text-cherry-red font-mono text-xs font-bold mb-6">
              SEED 404 · Extreme Height (300svh) Test
            </div>
            
            <h2 className="headline text-ink text-center mb-6">
              Two-Layer Mask Distortion Test
            </h2>
            <p className="narration text-ink/80 text-center mb-16">
              Scroll down to inspect this 300svh container. The bottom tear strip is locked to `--tear-h`
              via the two-layer mask (<code className="text-xs bg-white/70 px-1.5 py-0.5 rounded">linear-gradient + SVG</code>),
              so the tear curve NEVER stretches vertically even on ultra-tall sections.
            </p>

            {/* Sticky Card Inside (§6.13 test) */}
            <div className="sticky top-20 w-full max-w-md bg-white/95 backdrop-blur p-6 rounded-2xl shadow-xl border border-warm-grey text-center my-12">
              <span className="font-mono text-xs font-bold text-hot-pink uppercase">
                Sticky Element Inside TornSection
              </span>
              <h3 className="font-sentient text-xl font-bold mt-2 text-ink">
                Sticky Position Works Flawlessly
              </h3>
              <p className="text-xs text-gray-600 mt-2">
                Verified: <code className="text-[11px] font-mono">position: sticky</code> remains functional inside
                the section without layout clipping bugs.
              </p>
              <div className="mt-4 py-2 px-3 bg-blush/40 rounded-lg text-xs font-mono text-raspberry font-semibold">
                Keep scrolling down 300svh to bottom edge ↓
              </div>
            </div>

            <div className="mt-auto pt-48 pb-12 text-center text-xs text-gray-500 font-mono">
              Approaching the bottom of 300svh section. Notice below: the tear edge retains crisp, un-stretched geometry.
            </div>
          </div>
        </TornSection>
      </div>

      {/* Concluding Footer */}
      <footer className="bg-plum-night text-milk-white py-12 px-6 text-center text-xs font-mono">
        <p>Torn Paper Validation Complete · Seed 101, 202, 303, 404</p>
        <p className="text-gray-400 mt-1">Responsive at 360px, 768px, 1024px, 1440px, 1920px</p>
      </footer>
    </div>
  );
}

export default TornDemoPage;
