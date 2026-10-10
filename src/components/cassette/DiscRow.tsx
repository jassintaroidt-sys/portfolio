// src/components/cassette/DiscRow.tsx — BRIEF §12.2
import React, { useEffect, useRef, useState } from 'react';
import { WorkItem, works } from '../../data/cassette';
import { Disc } from './Disc';
import { DiscInfo } from './DiscInfo';

export interface DiscRowProps {
  className?: string;
}

export function DiscRow({ className = '' }: DiscRowProps): JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const totalWorks = works.length;
  const currentWork: WorkItem = works[activeIndex] ?? works[0]!;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : totalWorks - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < totalWorks - 1 ? prev + 1 : 0));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only navigate if container is in view
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
  }, [totalWorks]);

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
      className={`relative w-full min-h-[85vh] md:min-h-[95vh] flex flex-col justify-between p-4 md:p-8 lg:p-12 overflow-hidden select-none ${className}`}
    >
      {/* Top Bar: Info metadata on Left + Progress counter on Right */}
      <div className="relative z-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full max-w-7xl mx-auto">
        <DiscInfo work={currentWork} />

        {/* Counter Badge & Nav Buttons */}
        <div className="flex items-center gap-3 bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/60 shadow-sm self-end md:self-auto">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous work"
            className="w-8 h-8 rounded-full bg-mist hover:bg-hot-pink hover:text-white transition-colors flex items-center justify-center text-sm font-bold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hot-pink"
          >
            ←
          </button>
          <span className="font-mono text-xs tracking-wider text-ink font-semibold">
            {String(activeIndex + 1).padStart(2, '0')} / {String(totalWorks).padStart(2, '0')}
          </span>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next work"
            className="w-8 h-8 rounded-full bg-mist hover:bg-hot-pink hover:text-white transition-colors flex items-center justify-center text-sm font-bold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hot-pink"
          >
            →
          </button>
        </div>
      </div>

      {/* Center 3D Stage with Discs */}
      <div
        className="relative w-full h-[360px] md:h-[460px] my-4 flex items-center justify-center"
        style={{
          perspective: '1200px',
        }}
      >
        {works.map((work, idx) => {
          const offset = idx - activeIndex;
          // Render only discs within view range for performance
          if (Math.abs(offset) > 4) return null;

          return (
            <Disc
              key={work.n}
              work={work}
              offset={offset}
              onClick={() => setActiveIndex(idx)}
              reducedMotion={reducedMotion}
            />
          );
        })}
      </div>

      {/* Bottom Track Title Display per BRIEF §12.2 */}
      <div className="relative z-20 w-full max-w-5xl mx-auto text-center mt-2">
        <div className="inline-block px-4 py-1.5 rounded-full bg-white/50 backdrop-blur-sm border border-black/5 mb-2">
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-espresso/70">
            Selected Article
          </span>
        </div>
        <h2 className="font-serif uppercase font-bold text-[clamp(1.4rem,1rem+1.8vw,2.5rem)] text-ink tracking-wide leading-tight line-clamp-2 md:line-clamp-3 transition-opacity duration-300">
          {currentWork.title}
        </h2>
      </div>
    </div>
  );
}
