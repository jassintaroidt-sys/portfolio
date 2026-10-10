import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useLockerFit } from '../../lib/fit';
import { ClosedLocker } from '../locker/ClosedLocker';
import { OpenLocker } from '../locker/OpenLocker';
import { useLenis } from '../../lib/scroll';
import { TocInline } from '../nav/TocInline';
import { TornFiberEdge } from '../torn/TornFiberEdge';
import { TornHighlight } from '../torn/TornHighlight';
import { generateTornMaskSvg } from '../../lib/torn';

export interface OpeningProps {
  isOpenState?: boolean;
  onOpen?: () => void;
}

export function Opening({ isOpenState: externalIsOpen, onOpen }: OpeningProps): JSX.Element {
  const fit = useLockerFit();
  const { lockScroll, unlockScroll } = useLenis();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeDoorIndex, setActiveDoorIndex] = useState<number>(2); // Door 03 is index 2

  // Internal transition state
  const [isOpen, setIsOpen] = useState(externalIsOpen ?? false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showGlow, setShowGlow] = useState(false);

  // Sync external prop if provided
  useEffect(() => {
    if (externalIsOpen !== undefined && externalIsOpen !== isOpen) {
      setIsOpen(externalIsOpen);
    }
  }, [externalIsOpen, isOpen]);

  // Lock vertical scroll strictly while locker is closed (§7.2 & §9.1)
  useEffect(() => {
    if (!isOpen) {
      lockScroll();

      const preventVerticalScroll = (e: WheelEvent | TouchEvent | KeyboardEvent) => {
        if (e instanceof KeyboardEvent) {
          if (['Space', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.code)) {
            e.preventDefault();
          }
        } else if (e instanceof WheelEvent) {
          if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            e.preventDefault();
          }
        }
      };

      window.addEventListener('wheel', preventVerticalScroll, { passive: false });
      window.addEventListener('keydown', preventVerticalScroll);

      return () => {
        window.removeEventListener('wheel', preventVerticalScroll);
        window.removeEventListener('keydown', preventVerticalScroll);
      };
    } else {
      unlockScroll();
    }
  }, [isOpen, lockScroll, unlockScroll]);

  // Center on Door 03 initially in 3-door mobile mode
  useEffect(() => {
    if (!fit.isFiveDoorMode && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const unitPx = fit.px;
      const doorPx = 1080 * unitPx;
      const postPx = 86 * unitPx;
      const centerPos = (doorPx + postPx) * 2 - (container.clientWidth - doorPx) / 2;
      container.scrollLeft = Math.max(0, centerPos);
    }
  }, [fit.isFiveDoorMode, fit.px]);

  // Track horizontal scroll position in mobile mode to update dot indicators
  const handleHorizontalScroll = () => {
    if (!scrollContainerRef.current || fit.isFiveDoorMode) return;
    const container = scrollContainerRef.current;
    const unitPx = fit.px;
    const step = (1080 + 86) * unitPx;
    const centerPoint = container.scrollLeft + container.clientWidth / 2;
    const currentIndex = Math.min(4, Math.max(0, Math.floor(centerPoint / step)));
    setActiveDoorIndex(currentIndex);
  };

  // Trigger Open Sequence per BRIEF §9.4 (700–900ms)
  const handleOpenClick = () => {
    if (isOpen || isTransitioning) return;

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = isReducedMotion ? 250 : 800;

    setIsTransitioning(true);
    setShowGlow(true);

    // Sequence stages:
    setTimeout(() => {
      setIsOpen(true);
      unlockScroll();
      onOpen?.();
    }, duration * 0.45);

    setTimeout(() => {
      setShowGlow(false);
      setIsTransitioning(false);
    }, duration);
  };

  // Precomputed torn edge mask for open state (Seed 101 per §9.1 & §9.4)
  const mask101 = useMemo(() => generateTornMaskSvg(101, 1440, 64), []);

  const openMaskStyle: React.CSSProperties = useMemo(() => {
    if (!isOpen) return {};
    return {
      ['--tear-h' as string]: 'clamp(36px, 6vw, 90px)',
      ['--tear-url' as string]: `url("${mask101.svgDataUrl}")`,
      WebkitMaskImage: 'linear-gradient(#000, #000), var(--tear-url)',
      maskImage: 'linear-gradient(#000, #000), var(--tear-url)',
      WebkitMaskRepeat: 'no-repeat, no-repeat',
      maskRepeat: 'no-repeat, no-repeat',
      WebkitMaskPosition: 'top left, left bottom',
      maskPosition: 'top left, left bottom',
      WebkitMaskSize: '100% calc(100% - var(--tear-h) + 1px), 100% var(--tear-h)',
      maskSize: '100% calc(100% - var(--tear-h) + 1px), 100% var(--tear-h)',
      paddingBottom: 'var(--tear-h)',
    };
  }, [isOpen, mask101.svgDataUrl]);

  return (
    <div
      className="relative w-full z-[30]"
      style={isOpen ? { filter: 'drop-shadow(0 6px 8px rgba(0, 0, 0, 0.18))' } : undefined}
    >
      <section
        id="opening"
        className={`relative w-full ${isOpen ? 'min-h-[100svh]' : 'h-[100svh] min-h-[100svh]'} overflow-hidden flex flex-col justify-between select-none transition-colors duration-700`}
        style={
          {
            ...openMaskStyle,
            ['--px' as string]: `${fit.px}px`,
            backgroundColor: isOpen ? '#FFF4F8' : '#F2F4F8',
            backgroundImage: isOpen
              ? 'radial-gradient(circle at 50% 45%, #FFFFFF 0%, #FFE9F2 65%, #FADCE8 100%)'
              : 'radial-gradient(circle at 50% 45%, #FFFFFF 0%, var(--mist, #E9EBF2) 60%, var(--cloud, #E3E6EE) 100%)',
          } as React.CSSProperties
        }
      >
      {/* Subtle vignette lighting behind locker */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-700"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.9) 0%, transparent 70%)',
        }}
      />

      {/* Radiant Glow Burst Overlay During Transition (§9.4 stage 2) */}
      <div
        className={`absolute inset-0 pointer-events-none z-40 transition-opacity duration-500 flex items-center justify-center ${
          showGlow ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255,46,147,0.7) 0%, rgba(255,141,199,0.4) 40%, transparent 80%)',
        }}
      >
        {/* Floating Sparkle Particles */}
        {showGlow && (
          <div className="relative w-full h-full overflow-hidden">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-4 h-4 rounded-full bg-white animate-ping"
                style={{
                  top: `${30 + (i * 7) % 40}%`,
                  left: `${20 + (i * 11) % 60}%`,
                  animationDuration: '600ms',
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Top Spacer / Safe Area */}
      <div className="w-full shrink-0" style={{ height: 'max(12px, env(safe-area-inset-top, 0px))' }} />

      {/* Main Locker Container */}
      <div
        className={`relative z-10 w-full flex-1 flex flex-col items-center justify-center overflow-hidden px-2 transition-transform duration-500 ${
          isTransitioning ? 'scale-[1.015]' : 'scale-100'
        }`}
      >
        {fit.isFiveDoorMode ? (
          /* Desktop / Landscape: 5 doors fully centered */
          <div className="flex items-center justify-center relative">
            {/* Smooth Crossfade between Closed and Open State */}
            <div
              className={`transition-all duration-700 ${
                isOpen
                  ? 'opacity-0 scale-95 pointer-events-none absolute inset-0'
                  : 'opacity-100 scale-100 relative'
              }`}
            >
              <ClosedLocker onOpenClick={handleOpenClick} />
            </div>

            <div
              className={`transition-all duration-700 ${
                isOpen
                  ? 'opacity-100 scale-100 relative'
                  : 'opacity-0 scale-105 pointer-events-none absolute inset-0'
              }`}
            >
              <OpenLocker />
            </div>
          </div>
        ) : (
          /* Mobile / Portrait: 3 doors visible with horizontal scroll-snap */
          <div className="w-full flex flex-col items-center">
            <div
              ref={scrollContainerRef}
              onScroll={handleHorizontalScroll}
              className="w-full overflow-x-auto no-scrollbar snap-x snap-mandatory flex justify-start scroll-smooth"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              <div className="shrink-0 px-8 relative">
                <div
                  className={`transition-all duration-700 ${
                    isOpen
                      ? 'opacity-0 scale-95 pointer-events-none absolute inset-0 px-8'
                      : 'opacity-100 scale-100 relative'
                  }`}
                >
                  <ClosedLocker onOpenClick={handleOpenClick} />
                </div>

                <div
                  className={`transition-all duration-700 ${
                    isOpen
                      ? 'opacity-100 scale-100 relative'
                      : 'opacity-0 scale-105 pointer-events-none absolute inset-0 px-8'
                  }`}
                >
                  <OpenLocker />
                </div>
              </div>
            </div>

            {/* Dot Indicators for 5 Doors (§8.3 & §9.3) */}
            <div className="flex items-center gap-2 mt-3 mb-1">
              {[0, 1, 2, 3, 4].map((idx) => {
                const isDoor3 = idx === 2;
                const isActive = activeDoorIndex === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      if (!scrollContainerRef.current) return;
                      const unitPx = fit.px;
                      const doorPx = 1080 * unitPx;
                      const postPx = 86 * unitPx;
                      const targetScroll = (doorPx + postPx) * idx - (scrollContainerRef.current.clientWidth - doorPx) / 2;
                      scrollContainerRef.current.scrollTo({
                        left: Math.max(0, targetScroll),
                        behavior: 'smooth',
                      });
                    }}
                    className={`rounded-full transition-all duration-200 ${
                      isActive
                        ? isDoor3
                          ? 'w-6 h-2 bg-hot-pink'
                          : isOpen
                          ? 'w-6 h-2 bg-barbie-pink'
                          : 'w-6 h-2 bg-steel-lilac'
                        : isDoor3
                        ? 'w-2 h-2 bg-candy-pink hover:bg-hot-pink'
                        : 'w-2 h-2 bg-warm-grey hover:bg-steel-lilac'
                    }`}
                    aria-label={`Scroll to door 0${idx + 1}`}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Footer Section:
          - State 1 (Closed): Clean footer, no torn paper (2026 / Jassinta Roid Triniti / Creative Portfolio)
          - State 2 (Open): Height 20px, year & name on left, TocInline on right, plus Torn Paper Edge (seed 101)
      */}
      {!isOpen ? (
        <footer
          className="w-full shrink-0 px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between text-xs font-mono uppercase tracking-widest text-ink/80 select-none pb-2 z-20"
          style={{
            minHeight: `${fit.footerHeight}px`,
            paddingBottom: 'max(8px, env(safe-area-inset-bottom, 0px))',
          }}
        >
          <span className="mb-1 sm:mb-0">2026</span>
          <span className="font-semibold text-center mb-1 sm:mb-0">Jassinta Roid Triniti</span>
          <span className="text-ink/60">Creative Portfolio</span>
        </footer>
      ) : (
        <footer
          className="w-full shrink-0 px-6 md:px-12 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-ink/80 select-none z-20 relative transition-opacity duration-300"
          style={{
            height: 'calc(24px + max(4px, env(safe-area-inset-bottom, 0px)))',
            paddingBottom: 'max(4px, env(safe-area-inset-bottom, 0px))',
          }}
        >
          <div className="flex items-center gap-4">
            <span className="font-bold text-hot-pink">2026</span>
            <span>/</span>
            <span className="font-semibold">Jassinta Roid Triniti</span>
          </div>

          {/* Table of Contents Inline (§9.5) */}
          <div className="hidden md:block">
            <TocInline />
          </div>
        </footer>
      )}
      </section>

      {/* Bottom Realistic Torn Paper Edge (Seed 101 per §9.1 & §9.4) when open */}
      {isOpen && (
        <>
          <TornFiberEdge fiberPath={mask101.fiberPath} width={1440} height={64} />
          <TornHighlight highlightPath={mask101.highlightPath} width={1440} height={64} />
        </>
      )}
    </div>
  );
}

export default Opening;
