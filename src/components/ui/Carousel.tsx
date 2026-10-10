import React, { useRef, useState, useEffect, useCallback } from 'react';

export interface CarouselProps {
  children: React.ReactNode[];
  className?: string;
  itemClassName?: string;
}

export function Carousel({
  children,
  className = '',
  itemClassName = '',
}: CarouselProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);

  const checkScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  }, []);

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [checkScroll]);

  const scrollBy = (direction: 'left' | 'right') => {
    const el = containerRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.75;
    el.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  // Pointer drag events for swipe
  const handlePointerDown = (e: React.PointerEvent) => {
    const el = containerRef.current;
    if (!el) return;
    setIsDragging(true);
    setStartX(e.pageX - el.offsetLeft);
    setScrollLeftPos(el.scrollLeft);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const el = containerRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX) * 1.5;
    el.scrollLeft = scrollLeftPos - walk;
    checkScroll();
  };

  const handlePointerUpOrLeave = () => {
    setIsDragging(false);
    checkScroll();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      scrollBy('left');
    } else if (e.key === 'ArrowRight') {
      scrollBy('right');
    }
  };

  return (
    <div
      className={`relative w-full group ${className}`}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Carousel navigation"
    >
      {/* Left button */}
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => scrollBy('left')}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-ink border border-warm-grey shadow-md flex items-center justify-center transition-all hover:scale-105 active:scale-95"
          aria-label="Previous items"
        >
          ←
        </button>
      )}

      {/* Right button */}
      {canScrollRight && (
        <button
          type="button"
          onClick={() => scrollBy('right')}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-ink border border-warm-grey shadow-md flex items-center justify-center transition-all hover:scale-105 active:scale-95"
          aria-label="Next items"
        >
          →
        </button>
      )}

      {/* Scrollable container with snap & pointer events */}
      <div
        ref={containerRef}
        data-lenis-prevent="true"
        onScroll={checkScroll}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUpOrLeave}
        onPointerLeave={handlePointerUpOrLeave}
        className={`
          flex gap-4 md:gap-6 overflow-x-auto py-4 px-2
          scroll-smooth snap-x snap-mandatory select-none
          no-scrollbar cursor-grab active:cursor-grabbing
        `}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {children.map((child, idx) => (
          <div
            key={idx}
            className={`snap-start shrink-0 flex items-center justify-center ${itemClassName}`}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
