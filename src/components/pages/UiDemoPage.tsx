import { useState } from 'react';
import { HoverLabel } from '../ui/HoverLabel';
import { StickerButton } from '../ui/StickerButton';
import { Pushpin } from '../ui/Pushpin';
import { PaperNote } from '../ui/PaperNote';
import { PhotoFrame } from '../ui/PhotoFrame';
import { Overlay } from '../ui/Overlay';
import { Carousel } from '../ui/Carousel';
import { SafeImage } from '../ui/SafeImage';
import { SafeVideo } from '../ui/SafeVideo';
import { Preloader } from '../ui/Preloader';
import { Footer } from '../ui/Footer';

export function UiDemoPage(): JSX.Element {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [showPreloader, setShowPreloader] = useState(false);

  return (
    <div className="min-h-screen bg-mist text-ink font-poppins p-6 md:p-12 grain">
      {/* Dev Header */}
      <header className="max-w-6xl mx-auto border-b border-warm-grey/60 pb-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <a href="#/" className="text-xs font-mono font-bold text-hot-pink hover:underline block mb-2">
            ← Back to Main App
          </a>
          <h1 className="text-3xl md:text-5xl font-bold font-sentient text-ink">
            UI Primitives Showcase
          </h1>
          <p className="text-sm text-gray-600 mt-1 font-mono">
            BRIEF §5 — Interactive Components &amp; Design Systems
          </p>
        </div>
        <div className="bg-white/80 backdrop-blur px-4 py-2 rounded-lg border border-warm-grey/50 text-xs font-mono">
          <code>route: /#/__ui</code>
        </div>
      </header>

      <div className="max-w-6xl mx-auto space-y-16">
        {/* 1. StickerButton & Pushpins */}
        <section className="bg-white p-6 md:p-8 rounded-2xl border border-warm-grey/50 shadow-sm">
          <h2 className="font-sentient text-xl font-bold mb-6 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-hot-pink" />
            1. StickerButtons &amp; 3D Pushpins (§5)
          </h2>
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <StickerButton variant="hot-pink" tilt={-2}>Hot Pink Glitter</StickerButton>
            <StickerButton variant="barbie" tilt={1.5}>Barbie Pink</StickerButton>
            <StickerButton variant="candy" tilt={-1}>Candy Pink</StickerButton>
            <StickerButton variant="plum" tilt={2}>Plum Night</StickerButton>
          </div>
          <div className="flex items-center gap-6 pt-4 border-t border-warm-grey/40">
            <span className="text-xs font-mono text-gray-500">Pushpin colors:</span>
            <Pushpin color="cherry-red" size={32} />
            <Pushpin color="hot-pink" size={32} />
            <Pushpin color="wisteria" size={32} />
            <Pushpin color="gold" size={32} />
          </div>
        </section>

        {/* 2. HoverLabel with collision detection */}
        <section className="bg-white p-6 md:p-8 rounded-2xl border border-warm-grey/50 shadow-sm">
          <h2 className="font-sentient text-xl font-bold mb-2 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-hot-pink" />
            2. HoverLabel with Collision Detection (§5)
          </h2>
          <p className="text-xs text-gray-600 mb-6 font-mono">
            Hover over items below. Price-tag style portals to top layer and avoids viewport clipping.
          </p>
          <div className="flex flex-wrap items-center justify-around gap-6 py-6 bg-powder-pink/30 rounded-xl border border-powder-pink">
            <HoverLabel text="Vintage Camera" subtext="Top shelf right">
              <div className="p-4 bg-white rounded-lg shadow border border-warm-grey cursor-pointer text-xs font-mono font-bold">
                📷 Hover Me (Left Edge)
              </div>
            </HoverLabel>

            <HoverLabel text="Achievement Trophy" subtext="Gold 1st Place">
              <div className="p-4 bg-white rounded-lg shadow border border-warm-grey cursor-pointer text-xs font-mono font-bold">
                🏆 Hover Me (Center)
              </div>
            </HoverLabel>

            <HoverLabel text="Pink Sneakers" subtext="Locker Floor 91%">
              <div className="p-4 bg-white rounded-lg shadow border border-warm-grey cursor-pointer text-xs font-mono font-bold">
                👟 Hover Me (Right Edge)
              </div>
            </HoverLabel>
          </div>
        </section>

        {/* 3. PaperNote & PhotoFrame */}
        <section className="bg-white p-6 md:p-8 rounded-2xl border border-warm-grey/50 shadow-sm">
          <h2 className="font-sentient text-xl font-bold mb-6 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-hot-pink" />
            3. PaperNote &amp; PhotoFrame (§5)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <PaperNote showPin pinColor="cherry-red" rotation={-1.5}>
              <h4 className="text-xl font-bold mb-2">3 Keys to Success:</h4>
              <p>• Awareness</p>
              <p>• Engagement</p>
              <p>• Conversion</p>
            </PaperNote>

            <div className="flex justify-center">
              <PhotoFrame
                src="/assets/img/FOTO JASSINTA TAMPAK DEPAN.png"
                alt="Jassinta Roid Triniti"
                caption="Jassinta Roid Triniti · 2026"
                rotation={2}
                aspectRatio="1/1"
                className="max-w-[240px]"
              />
            </div>
          </div>
        </section>

        {/* 4. Carousel */}
        <section className="bg-white p-6 md:p-8 rounded-2xl border border-warm-grey/50 shadow-sm">
          <h2 className="font-sentient text-xl font-bold mb-4 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-hot-pink" />
            4. Carousel (§5)
          </h2>
          <p className="text-xs text-gray-600 mb-6 font-mono">
            Supports arrow navigation, pointer drag/swipe, keyboard arrows, and snap alignment.
          </p>
          <Carousel>
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div
                key={num}
                className="w-48 h-64 bg-powder-pink rounded-2xl border-2 border-white shadow-md p-4 flex flex-col justify-between"
              >
                <span className="font-mono text-xs font-bold text-raspberry">Card 0{num}</span>
                <div className="text-center font-sentient text-lg font-bold text-ink">
                  Slide Item {num}
                </div>
                <div className="text-right font-mono text-[11px] text-gray-500">2026</div>
              </div>
            ))}
          </Carousel>
        </section>

        {/* 5. SafeImage & SafeVideo */}
        <section className="bg-white p-6 md:p-8 rounded-2xl border border-warm-grey/50 shadow-sm">
          <h2 className="font-sentient text-xl font-bold mb-6 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-hot-pink" />
            5. SafeImage &amp; SafeVideo (§5, §8.4)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-mono text-xs uppercase font-bold text-gray-500 mb-2">SafeImage (.webp fallback + zero CLS)</h3>
              <SafeImage
                filePath="flyer_kecantikan_1.jpg"
                alt="Beauty flyer demo"
                width={1080}
                height={1072}
                className="rounded-xl shadow-md border border-warm-grey/60"
              />
            </div>
            <div>
              <h3 className="font-mono text-xs uppercase font-bold text-gray-500 mb-2">SafeVideo (IntersectionObserver &amp; Max 6 Queue)</h3>
              <SafeVideo
                filePath="kecantikan_1.mp4"
                width={1080}
                height={1920}
                className="rounded-xl shadow-md border border-warm-grey/60 max-h-[360px]"
              />
            </div>
          </div>
        </section>

        {/* 6. Overlay & Preloader Demo Trigger */}
        <section className="bg-white p-6 md:p-8 rounded-2xl border border-warm-grey/50 shadow-sm">
          <h2 className="font-sentient text-xl font-bold mb-4 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-hot-pink" />
            6. Modal Overlay &amp; Preloader (§5, §7.4)
          </h2>
          <div className="flex flex-wrap gap-4">
            <StickerButton onClick={() => setIsOverlayOpen(true)}>
              Open Accessible Modal Overlay
            </StickerButton>
            <StickerButton variant="candy" onClick={() => setShowPreloader(true)}>
              Preview Preloader (2s)
            </StickerButton>
          </div>
        </section>

        {/* 7. Footer */}
        <section className="bg-white rounded-2xl border border-warm-grey/50 shadow-sm overflow-hidden">
          <div className="p-6 pb-2">
            <h2 className="font-sentient text-xl font-bold flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-hot-pink" />
              7. Footer (§7.5)
            </h2>
          </div>
          <div className="space-y-4 pt-4">
            <Footer rightContent="Creative Portfolio · Light Mode" theme="light" />
            <Footer rightContent="Table of Contents · Dark Mode" theme="dark" />
          </div>
        </section>
      </div>

      {/* Demo Modal Overlay */}
      <Overlay
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(false)}
        title="Sample Sticker-Pop Overlay"
      >
        <div className="py-4 text-center">
          <p className="text-sm text-gray-700 leading-relaxed max-w-lg mx-auto">
            This modal features an automatic focus trap, closes on Escape or backdrop click,
            locks background Lenis scroll without jump, and tags scrollable inner regions with
            <code className="text-xs bg-powder-pink px-1.5 py-0.5 rounded font-mono ml-1">data-lenis-prevent</code>.
          </p>
          <div className="mt-8">
            <StickerButton onClick={() => setIsOverlayOpen(false)}>
              Close Demo
            </StickerButton>
          </div>
        </div>
      </Overlay>

      {/* Preloader Demo */}
      {showPreloader && (
        <Preloader onLoaded={() => setShowPreloader(false)} maxWaitMs={2000} />
      )}
    </div>
  );
}

export default UiDemoPage;
