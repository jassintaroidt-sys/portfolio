// src/components/runway/RunwayStage.tsx — BRIEF §13.2
import React, { useState, useEffect, useRef } from 'react';
import { items, ContentItem } from '../../data/content';
import { mediaUrl } from '../../lib/media';
import { RunwayCard } from './RunwayCard';
import { RunwayInfoModal } from './RunwayInfoModal';
import { RunwayCreditModal } from './RunwayCreditModal';

export interface RunwayStageProps {
  className?: string;
}

export function RunwayStage({ className = '' }: RunwayStageProps): JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isCreditOpen, setIsCreditOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const totalItems = items.length;
  const currentItem: ContentItem = items[activeIndex] ?? items[0]!;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : totalItems - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < totalItems - 1 ? prev + 1 : 0));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isInfoOpen || isCreditOpen) return;
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalItems, isInfoOpen, isCreditOpen]);

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      setTouchStartX(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0]?.clientX ?? touchStartX;
    const diff = touchEndX - touchStartX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
    setTouchStartX(null);
  };

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`relative w-full min-h-[90vh] md:min-h-[100svh] flex flex-col justify-between p-4 md:p-8 lg:p-12 overflow-hidden select-none text-white ${className}`}
    >
      {/* Dynamic Ambient Background Layer (§13.2) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Layer 1: Ambient Active Media */}
        {currentItem.media.kind === 'video' ? (
          <video
            key={currentItem.media.file}
            src={mediaUrl(`video/${currentItem.media.file}`)}
            className="w-full h-full object-cover scale-110 filter blur-3xl opacity-35 transition-opacity duration-1000"
            muted
            playsInline
            loop
            autoPlay
          />
        ) : (
          <img
            key={currentItem.media.file}
            src={mediaUrl(`img/${currentItem.media.file}`)}
            alt=""
            className="w-full h-full object-cover scale-110 filter blur-3xl opacity-35 transition-opacity duration-1000"
          />
        )}

        {/* Layer 2: --grad-plum-night at 50% opacity per BRIEF §13.2 */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background: 'var(--grad-plum-night, linear-gradient(160deg, #2A0F2E 0%, #4B1D4F 55%, #7A2E5C 100%))',
          }}
        />

        {/* Layer 3: White film grain texture */}
        <div className="absolute inset-0 opacity-30 mix-blend-overlay grain" />
      </div>

      {/* Decorative vertical ruler markings on left edge */}
      <div className="absolute left-3 top-1/4 bottom-1/4 hidden lg:flex flex-col justify-between font-mono text-[9px] text-white/20 pointer-events-none select-none z-10">
        <span>00.0</span>
        <span>02.5</span>
        <span>05.0</span>
        <span>07.5</span>
        <span>10.0</span>
      </div>

      {/* Top Bar: INFO button in center + Platform/Content Type tag */}
      <div className="relative z-20 flex flex-col items-center justify-center gap-3 w-full max-w-4xl mx-auto pt-2">
        {/* INFO button */}
        <button
          type="button"
          onClick={() => setIsInfoOpen(true)}
          className="px-5 py-1.5 rounded-full bg-white/15 hover:bg-hot-pink text-white text-xs font-mono font-bold tracking-widest uppercase backdrop-blur-md border border-white/30 shadow-md transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hot-pink"
        >
          ✦ INFO ✦
        </button>

        {/* Active Platform / Content Type Tag */}
        <div className="flex items-center gap-2 text-xs md:text-sm font-mono tracking-wider text-pink-200/90 bg-black/30 backdrop-blur-sm px-4 py-1 rounded-full border border-white/10">
          <span className="font-bold text-hot-pink">{currentItem.platform}</span>
          <span className="text-white/40">/</span>
          <span>{currentItem.type}</span>
        </div>
      </div>

      {/* Center 3D Stage with Runway Catwalk Cards */}
      <div
        className="relative w-full h-[52vh] min-h-[380px] max-h-[580px] my-3 flex items-center justify-center z-10"
        style={{
          perspective: '1200px',
        }}
      >
        {items.map((item, idx) => {
          const offset = idx - activeIndex;
          // Render within visibility window
          if (Math.abs(offset) > 3) return null;

          return (
            <RunwayCard
              key={item.n}
              item={item}
              offset={offset}
              onClick={() => setActiveIndex(idx)}
              reducedMotion={reducedMotion}
            />
          );
        })}
      </div>

      {/* Below Center Card: Title & Year Display */}
      <div className="relative z-20 w-full max-w-3xl mx-auto text-center px-4 my-2">
        <h3 className="font-serif text-[clamp(1.5rem,1.2rem+2vw,2.5rem)] font-bold text-white tracking-wide leading-tight drop-shadow-md">
          {currentItem.title}
        </h3>
      </div>

      {/* Bottom Bar: Date on Left, Nav & Counter in Center, CREDIT button on Right */}
      <div className="relative z-20 flex items-center justify-between gap-4 w-full max-w-6xl mx-auto pb-2">
        {/* Date (Left) */}
        <div className="font-mono text-xs md:text-sm text-white/70 bg-black/30 px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
          {currentItem.date}
        </div>

        {/* Navigation Arrows & Counter (Center) */}
        <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-md">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous showcase"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-hot-pink text-white transition-colors flex items-center justify-center text-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hot-pink"
          >
            ←
          </button>
          <span className="font-mono text-xs tracking-widest text-white font-bold">
            {String(activeIndex + 1).padStart(2, '0')} / {String(totalItems).padStart(2, '0')}
          </span>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next showcase"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-hot-pink text-white transition-colors flex items-center justify-center text-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hot-pink"
          >
            →
          </button>
        </div>

        {/* CREDIT Button (Right) */}
        <button
          type="button"
          onClick={() => setIsCreditOpen(true)}
          className="px-4 py-1.5 rounded-full bg-white/15 hover:bg-hot-pink text-white text-xs font-mono font-bold tracking-wider uppercase backdrop-blur-md border border-white/30 transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hot-pink"
        >
          CREDIT
        </button>
      </div>

      {/* Info Modal */}
      <RunwayInfoModal
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
        info={currentItem.info}
      />

      {/* Credit Modal */}
      <RunwayCreditModal
        isOpen={isCreditOpen}
        onClose={() => setIsCreditOpen(false)}
        credit={currentItem.credit}
        platform={currentItem.platform}
      />
    </div>
  );
}
