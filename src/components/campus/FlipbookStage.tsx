import { useState, useEffect, useRef, useCallback, useMemo, type TouchEvent, type FormEvent } from 'react';
import {
  FlipbookPage,
  FlipbookSpread,
  buildSpreads,
  getCampusPages,
  isSpreadInLazyWindow,
  findSpreadIndexForPageNumber,
} from '../../lib/flipbook';
import { mediaUrl } from '../../lib/media';

export interface FlipbookStageProps {
  campusId: string;
  className?: string;
}

export function FlipbookStage({ campusId, className = '' }: FlipbookStageProps): JSX.Element {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [activeSpreadIdx, setActiveSpreadIdx] = useState<number>(0);
  const [isFlipping, setIsFlipping] = useState<'next' | 'prev' | null>(null);
  const [jumpInput, setJumpInput] = useState<string>('1');
  const stageRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  // Detect mobile viewport (width < 768px) per BRIEF §15.2
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Retrieve pages dynamically from MEDIA_MANIFEST and construct spreads
  const pages: FlipbookPage[] = useMemo(() => getCampusPages(campusId), [campusId]);
  const spreads: FlipbookSpread[] = useMemo(
    () => buildSpreads(pages, isMobile),
    [pages, isMobile]
  );

  // Reset to first spread when document changes
  useEffect(() => {
    setActiveSpreadIdx(0);
    setJumpInput('1');
  }, [campusId, isMobile]);

  const totalSpreads = spreads.length;
  const currentSpread = spreads[activeSpreadIdx] || spreads[0];

  // Update jumpInput whenever active spread changes
  useEffect(() => {
    if (currentSpread && currentSpread.pages[0]) {
      setJumpInput(String(currentSpread.pages[0].pageNumber));
    }
  }, [currentSpread]);

  const goToSpread = useCallback(
    (newIdx: number, direction: 'next' | 'prev' = 'next') => {
      if (newIdx < 0 || newIdx >= totalSpreads || newIdx === activeSpreadIdx) return;
      setIsFlipping(direction);
      setActiveSpreadIdx(newIdx);
      const timer = setTimeout(() => {
        setIsFlipping(null);
      }, 350);
      return () => clearTimeout(timer);
    },
    [totalSpreads, activeSpreadIdx]
  );

  const handleNext = useCallback(() => {
    goToSpread(activeSpreadIdx + 1, 'next');
  }, [goToSpread, activeSpreadIdx]);

  const handlePrev = useCallback(() => {
    goToSpread(activeSpreadIdx - 1, 'prev');
  }, [goToSpread, activeSpreadIdx]);

  // Keyboard navigation (← and →)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is currently typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Touch swipe support
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    if (touch) {
      touchStartX.current = touch.clientX;
    }
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const touch = e.changedTouches[0];
    if (!touch) return;
    const touchEndX = touch.clientX;
    const diffX = touchStartX.current - touchEndX;

    if (Math.abs(diffX) > 45) {
      if (diffX > 0) {
        handleNext(); // Swiped left -> next
      } else {
        handlePrev(); // Swiped right -> prev
      }
    }
    touchStartX.current = null;
  };

  // Direct page jump form
  const handleJumpSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const pageNum = parseInt(jumpInput, 10);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= pages.length) {
      const targetSpreadIdx = findSpreadIndexForPageNumber(spreads, pageNum);
      const dir = targetSpreadIdx > activeSpreadIdx ? 'next' : 'prev';
      goToSpread(targetSpreadIdx, dir);
    }
  };

  if (!currentSpread) return <div />;

  // Format indicator text per BRIEF §15.2 (e.g. "Pages 2–3 / 89" or "Page 1 / 89")
  const totalPagesCount = pages.length;
  const indicatorLabel = `${currentSpread.pageLabel} / ${totalPagesCount}`;

  return (
    <div
      ref={stageRef}
      className={`relative flex flex-col items-center justify-center w-full select-none ${className}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 3D Book Container with Perspective */}
      <div
        className="relative w-full max-w-4xl py-3 flex items-center justify-center"
        style={{ perspective: '1800px' }}
      >
        {/* Book Outer Casting & Page Stack Shadow */}
        <div
          className={`
            relative w-full transition-transform duration-300 ease-out
            rounded-2xl bg-gradient-to-b from-[#FAF7F2] to-[#ECE7DE]
            border border-[#D1C9BE]
            shadow-[0_24px_60px_rgba(42,15,46,0.22),0_8px_18px_rgba(0,0,0,0.12)]
            p-2 sm:p-3 md:p-5
            ${
              isFlipping === 'next'
                ? 'rotate-y-[-1.5deg]'
                : isFlipping === 'prev'
                ? 'rotate-y-[1.5deg]'
                : ''
            }
          `}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Subtle paper grain & book edges */}
          <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-20 mix-blend-multiply grain" />

          {/* Book Spine Center Gutter Shadow Overlay (Dual Spread View Only) */}
          {!isMobile && (
            <div
              className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-10 pointer-events-none z-30"
              style={{
                background:
                  'linear-gradient(to right, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.06) 35%, transparent 50%, rgba(0,0,0,0.06) 65%, rgba(0,0,0,0.22) 100%)',
              }}
            />
          )}

          {/* Stacked Pages Edges Depth Illusion on Left and Right borders */}
          <div className="absolute inset-y-3 -left-1.5 w-1.5 rounded-l-xs bg-[#E5DFD4] border-l border-y border-[#C8C0B2] shadow-inner hidden md:block" />
          <div className="absolute inset-y-3 -right-1.5 w-1.5 rounded-r-xs bg-[#E5DFD4] border-r border-y border-[#C8C0B2] shadow-inner hidden md:block" />

          {/* Spread Viewport */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[1.45/1] max-h-[68vh] min-h-[300px] bg-[#FAF8F5] rounded-xl overflow-hidden flex items-stretch shadow-inner border border-[#E8E2D8]">
            {/* CASE 1: Landscape Spread (e.g. rush_07_1.jpg spanning full width across both sides) */}
            {currentSpread.type === 'landscape' ? (
              <div
                className="relative w-full h-full flex items-center justify-center cursor-pointer group bg-[#FAF8F5] p-2 sm:p-4"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  if (clickX < rect.width / 2) {
                    handlePrev();
                  } else {
                    handleNext();
                  }
                }}
                title="Click left side to go back, right side to go forward"
              >
                {currentSpread.pages[0] && isSpreadInLazyWindow(activeSpreadIdx, activeSpreadIdx, 4) ? (
                  <img
                    src={mediaUrl(`img/${currentSpread.pages[0].file}`)}
                    alt={`${currentSpread.pageLabel} (Landscape Full Spread)`}
                    className="w-full h-full object-contain rounded-md select-none pointer-events-none drop-shadow-md"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-mono text-xs text-ink/40">
                    Loading {currentSpread.pageLabel}...
                  </div>
                )}

                {/* Subtitle Badge */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 text-white font-mono text-[10px] tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                  Landscape Panoramic Spread
                </div>
              </div>
            ) : isMobile ? (
              /* CASE 2: Mobile Mode (1 Page per screen) */
              <div
                className="relative w-full h-full flex items-center justify-center p-2 bg-[#FAF8F5] cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  if (e.clientX - rect.left < rect.width / 2) {
                    handlePrev();
                  } else {
                    handleNext();
                  }
                }}
              >
                {currentSpread.pages[0] && isSpreadInLazyWindow(activeSpreadIdx, activeSpreadIdx, 4) ? (
                  <img
                    src={mediaUrl(`img/${currentSpread.pages[0].file}`)}
                    alt={currentSpread.pageLabel}
                    className="w-full h-full object-contain rounded-md select-none pointer-events-none"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-mono text-xs text-ink/40">
                    Loading {currentSpread.pageLabel}...
                  </div>
                )}
              </div>
            ) : (
              /* CASE 3: Desktop Dual-Page Spread */
              <div className="relative w-full h-full grid grid-cols-2">
                {/* Left Page Half */}
                <div
                  className="relative h-full flex items-center justify-center p-2 sm:p-4 border-r border-[#E8E2D8] cursor-pointer group bg-[#FAF8F5]"
                  onClick={handlePrev}
                  title="Click left page to turn back"
                >
                  {currentSpread.leftPage ? (
                    isSpreadInLazyWindow(activeSpreadIdx, activeSpreadIdx, 4) ? (
                      <img
                        src={mediaUrl(`img/${currentSpread.leftPage.file}`)}
                        alt={`Page ${currentSpread.leftPage.pageNumber}`}
                        className="w-full h-full object-contain rounded-l-md select-none pointer-events-none transition-transform duration-200 group-hover:scale-[1.01]"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-mono text-xs text-ink/40">
                        Page {currentSpread.leftPage.pageNumber}
                      </div>
                    )
                  ) : (
                    /* Inside Front Cover (Single Right / Cover mode) */
                    <div className="w-full h-full flex flex-col items-center justify-center rounded-l-md bg-[#F4EFE6] text-ink/30 border border-dashed border-[#DDD5C7] p-6 text-center">
                      <span className="font-serif italic text-sm">Inside Front Cover</span>
                      <span className="font-mono text-[10px] mt-2 opacity-60">JASSINTA ROID TRINITI</span>
                    </div>
                  )}

                  {/* Left Page Turn Indicator */}
                  {activeSpreadIdx > 0 && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 shadow-md flex items-center justify-center text-ink opacity-0 group-hover:opacity-100 transition-opacity">
                      ←
                    </div>
                  )}
                </div>

                {/* Right Page Half */}
                <div
                  className="relative h-full flex items-center justify-center p-2 sm:p-4 cursor-pointer group bg-[#FAF8F5]"
                  onClick={handleNext}
                  title="Click right page to turn forward"
                >
                  {currentSpread.rightPage ? (
                    isSpreadInLazyWindow(activeSpreadIdx, activeSpreadIdx, 4) ? (
                      <img
                        src={mediaUrl(`img/${currentSpread.rightPage.file}`)}
                        alt={`Page ${currentSpread.rightPage.pageNumber}`}
                        className="w-full h-full object-contain rounded-r-md select-none pointer-events-none transition-transform duration-200 group-hover:scale-[1.01]"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-mono text-xs text-ink/40">
                        Page {currentSpread.rightPage.pageNumber}
                      </div>
                    )
                  ) : (
                    /* Inside Back Cover (Single Left / Back Cover mode) */
                    <div className="w-full h-full flex flex-col items-center justify-center rounded-r-md bg-[#F4EFE6] text-ink/30 border border-dashed border-[#DDD5C7] p-6 text-center">
                      <span className="font-serif italic text-sm">Inside Back Cover</span>
                      <span className="font-mono text-[10px] mt-2 opacity-60">END OF PUBLICATION</span>
                    </div>
                  )}

                  {/* Right Page Turn Indicator */}
                  {activeSpreadIdx < totalSpreads - 1 && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 shadow-md flex items-center justify-center text-ink opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Controls Bar per BRIEF §15.2 */}
      <div className="w-full max-w-4xl mt-4 px-2 sm:px-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white/90 backdrop-blur-md rounded-2xl p-3 border border-warm-grey shadow-md text-ink">
        {/* Left: Quick buttons (First, Prev, Next, Last) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => goToSpread(0, 'prev')}
            disabled={activeSpreadIdx === 0}
            className="px-2.5 py-1.5 rounded-lg border border-warm-grey hover:border-hot-pink disabled:opacity-30 disabled:hover:border-warm-grey font-mono text-xs font-bold transition-colors cursor-pointer disabled:cursor-not-allowed"
            title="First Page"
          >
            |◀
          </button>
          <button
            type="button"
            onClick={handlePrev}
            disabled={activeSpreadIdx === 0}
            className="px-3 py-1.5 rounded-lg border border-warm-grey hover:border-hot-pink disabled:opacity-30 disabled:hover:border-warm-grey font-mono text-xs font-bold transition-colors cursor-pointer disabled:cursor-not-allowed flex items-center gap-1"
            title="Previous Page (←)"
          >
            <span>←</span>
            <span className="hidden sm:inline">Prev</span>
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={activeSpreadIdx === totalSpreads - 1}
            className="px-3 py-1.5 rounded-lg border border-warm-grey hover:border-hot-pink disabled:opacity-30 disabled:hover:border-warm-grey font-mono text-xs font-bold transition-colors cursor-pointer disabled:cursor-not-allowed flex items-center gap-1"
            title="Next Page (→)"
          >
            <span className="hidden sm:inline">Next</span>
            <span>→</span>
          </button>
          <button
            type="button"
            onClick={() => goToSpread(totalSpreads - 1, 'next')}
            disabled={activeSpreadIdx === totalSpreads - 1}
            className="px-2.5 py-1.5 rounded-lg border border-warm-grey hover:border-hot-pink disabled:opacity-30 disabled:hover:border-warm-grey font-mono text-xs font-bold transition-colors cursor-pointer disabled:cursor-not-allowed"
            title="Last Page"
          >
            ▶|
          </button>
        </div>

        {/* Center: Slider Bar */}
        <div className="flex-1 w-full sm:w-auto px-2 flex items-center gap-2">
          <input
            type="range"
            min={0}
            max={Math.max(0, totalSpreads - 1)}
            value={activeSpreadIdx}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              const dir = val > activeSpreadIdx ? 'next' : 'prev';
              goToSpread(val, dir);
            }}
            className="w-full accent-cherry-red cursor-pointer h-2 bg-warm-grey rounded-lg"
            aria-label="Flipbook Page Slider"
          />
        </div>

        {/* Right: Spread Indicator & Direct Page Jump Field */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-bold text-ink/80 whitespace-nowrap">
            {indicatorLabel}
          </span>

          <form onSubmit={handleJumpSubmit} className="flex items-center gap-1">
            <input
              type="number"
              min={1}
              max={totalPagesCount}
              value={jumpInput}
              onChange={(e) => setJumpInput(e.target.value)}
              className="w-12 px-1.5 py-1 text-center font-mono text-xs border border-warm-grey rounded-md focus:outline-none focus:border-cherry-red"
              aria-label="Jump to page"
            />
            <button
              type="submit"
              className="px-2 py-1 rounded-md bg-cherry-red text-white font-mono text-[11px] font-bold hover:bg-lipstick-red transition-colors"
            >
              Go
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FlipbookStage;
