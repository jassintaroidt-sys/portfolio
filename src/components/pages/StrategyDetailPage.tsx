// src/components/pages/StrategyDetailPage.tsx — BRIEF §14.3
import React, { useState, useRef } from 'react';
import { strategies, StrategySlug } from '../../data/strategy';
import { mediaUrl } from '../../lib/media';
import { PhotoFrame } from '../ui/PhotoFrame';

export interface StrategyDetailPageProps {
  slug: string;
}

export function StrategyDetailPage({ slug }: StrategyDetailPageProps): JSX.Element {
  // Safe lookup with fallback to hard-selling
  const validSlug: StrategySlug =
    slug in strategies ? (slug as StrategySlug) : 'hard-selling';
  const data = strategies[validSlug];

  const galleryRef = useRef<HTMLDivElement>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [mouseStartX, setMouseStartX] = useState(0);
  const [scrollStartLeft, setScrollStartLeft] = useState(0);

  // Filename tolerant candidate resolver (§14.4)
  const resolveReferenceFile = (filename: string): string => {
    if (filename.includes('Hardselling')) {
      return 'Inspirasi Konten Hardselling_Lassiwear.jpg';
    }
    return filename;
  };

  // Filter out non-existent or empty slots per §14.4 (slot ke-5 disembunyikan otomatis bila kosong)
  const validFootage = data.footage.filter(
    (file) => typeof file === 'string' && file.trim().length > 0
  );

  const handleScrollGallery = (direction: 'left' | 'right') => {
    if (!galleryRef.current) return;
    const scrollAmount = 320;
    galleryRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches[0]) setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || !galleryRef.current) return;
    const touchEndX = e.changedTouches[0]?.clientX ?? touchStartX;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 40) {
      galleryRef.current.scrollBy({
        left: diff > 0 ? -280 : 280,
        behavior: 'smooth',
      });
    }
    setTouchStartX(null);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!galleryRef.current) return;
    setIsMouseDown(true);
    setMouseStartX(e.pageX - galleryRef.current.offsetLeft);
    setScrollStartLeft(galleryRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !galleryRef.current) return;
    e.preventDefault();
    const x = e.pageX - galleryRef.current.offsetLeft;
    const walk = (x - mouseStartX) * 1.5;
    galleryRef.current.scrollLeft = scrollStartLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsMouseDown(false);
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-4 md:py-8 px-2 md:px-6 select-none font-poppins">
      {/* Header Info Block */}
      <div className="mb-8 border-b border-black/10 pb-6">
        <div className="inline-block px-3.5 py-1 rounded-full bg-hot-pink/15 text-hot-pink font-mono text-xs font-bold uppercase tracking-wider mb-3">
          Strategy Pillar
        </div>
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-ink mb-4">
          {data.label}
        </h2>
        <p className="font-sans text-base md:text-lg text-espresso/90 max-w-3xl leading-relaxed mb-4">
          {data.about}
        </p>
        <div className="bg-pearl/70 p-4 md:p-5 rounded-2xl border border-warm-grey/60 max-w-3xl">
          <span className="font-mono text-[11px] uppercase tracking-wider text-espresso/60 block mb-1">
            Case Study Highlight
          </span>
          <p className="font-sans italic text-sm md:text-base text-ink leading-relaxed">
            "{data.example}"
          </p>
        </div>
      </div>

      {/* Main Grid: Details on Left + Seamless Footage Gallery on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Reference, Results, See More, Credit */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Reference Card */}
          <div className="bg-milk-white p-5 rounded-2xl border border-warm-grey/70 shadow-sm">
            <span className="font-mono text-xs uppercase tracking-wider text-espresso/60 block mb-3 font-semibold">
              Inspiration &amp; Reference
            </span>
            <div className="max-w-[240px] mx-auto">
              <PhotoFrame
                src={mediaUrl(`img/${resolveReferenceFile(data.reference)}`)}
                alt={`${data.label} Reference`}
                className="transform -rotate-1"
              />
            </div>
          </div>

          {/* Results Metric Card */}
          <div className="bg-milk-white p-5 rounded-2xl border border-warm-grey/70 shadow-sm">
            <span className="font-mono text-xs uppercase tracking-wider text-espresso/60 block mb-3 font-semibold">
              Campaign Results
            </span>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-mist p-3 rounded-xl text-center border border-black/5">
                <span className="font-serif text-xl md:text-2xl font-bold text-ink block">
                  {data.results.views}
                </span>
                <span className="font-mono text-[10px] uppercase text-espresso/60 tracking-wider">
                  Views
                </span>
              </div>
              <div className="bg-mist p-3 rounded-xl text-center border border-black/5">
                <span className="font-serif text-xl md:text-2xl font-bold text-hot-pink block">
                  {data.results.likes}
                </span>
                <span className="font-mono text-[10px] uppercase text-espresso/60 tracking-wider">
                  Likes
                </span>
              </div>
              <div className="bg-mist p-3 rounded-xl text-center border border-black/5">
                <span className="font-serif text-xl md:text-2xl font-bold text-ink block">
                  {data.results.shares}
                </span>
                <span className="font-mono text-[10px] uppercase text-espresso/60 tracking-wider">
                  Shares
                </span>
              </div>
            </div>
          </div>

          {/* See More Social Link Button */}
          {data.seeMore && (
            <a
              href={data.seeMore}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 rounded-2xl bg-hot-pink hover:bg-raspberry text-white font-mono text-sm font-bold tracking-wider uppercase text-center shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Watch on Instagram</span>
              <span className="text-base">↗</span>
            </a>
          )}

          {/* Production Credits Table */}
          <div className="bg-milk-white p-5 rounded-2xl border border-warm-grey/70 shadow-sm">
            <span className="font-mono text-xs uppercase tracking-wider text-espresso/60 block mb-3 font-semibold">
              Production Credits
            </span>
            <div className="space-y-2 text-xs md:text-sm">
              {data.credit.map(([role, name], idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-1.5 border-b border-black/5 last:border-0"
                >
                  <span className="font-mono text-espresso/60 uppercase text-[11px]">
                    {role}
                  </span>
                  <span className="font-sans font-medium text-ink text-right">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Seamless Continuous Footage Gallery */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-hot-pink font-bold block">
                Production Artifacts
              </span>
              <h3 className="font-serif text-2xl font-bold text-ink">
                Footage Gallery
              </h3>
            </div>

            {/* Gallery Navigation Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleScrollGallery('left')}
                aria-label="Previous footage"
                className="w-8 h-8 rounded-full bg-mist hover:bg-hot-pink hover:text-white transition-colors flex items-center justify-center text-sm font-bold text-ink"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => handleScrollGallery('right')}
                aria-label="Next footage"
                className="w-8 h-8 rounded-full bg-mist hover:bg-hot-pink hover:text-white transition-colors flex items-center justify-center text-sm font-bold text-ink"
              >
                →
              </button>
            </div>
          </div>

          {/* Continuous Strip of 9:16 Portrait Photos */}
          <div
            ref={galleryRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className={`flex items-center gap-0 overflow-x-auto p-2 pb-4 rounded-2xl bg-[#14121A] shadow-inner border border-black/20 no-scrollbar snap-x snap-mandatory ${
              isMouseDown ? 'cursor-grabbing select-none' : 'cursor-grab'
            }`}
            style={{
              scrollBehavior: isMouseDown ? 'auto' : 'smooth',
            }}
          >
            {validFootage.map((file, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-[220px] md:w-[260px] aspect-[9/16] relative overflow-hidden bg-black snap-start border-r border-white/10 group first:rounded-l-xl last:rounded-r-xl last:border-r-0"
              >
                <img
                  src={mediaUrl(`img/${file}`)}
                  alt={`${data.label} footage ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 pointer-events-none"
                  loading="lazy"
                  decoding="async"
                />
                {/* Subtle numbering watermark on footage */}
                <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[10px] font-mono text-white/80 border border-white/10">
                  {String(idx + 1).padStart(2, '0')} / {String(validFootage.length).padStart(2, '0')}
                </div>
              </div>
            ))}
          </div>
          <span className="font-mono text-[11px] text-espresso/50 mt-2 text-right">
            ← Drag or swipe horizontal to explore connected footage frames →
          </span>
        </div>
      </div>
    </div>
  );
}
