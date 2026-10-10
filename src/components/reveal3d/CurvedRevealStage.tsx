// src/components/reveal3d/CurvedRevealStage.tsx — BRIEF §14.2
import React, { useState, useEffect, useRef } from 'react';
import { STRATEGY_ORDER, StrategySlug } from '../../data/strategy';
import { mediaUrl } from '../../lib/media';
import { setHashRoute } from '../../lib/hashRoute';
import { TocOverlay } from '../nav/TocOverlay';

export function CurvedRevealStage(): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredSlug, setHoveredSlug] = useState<StrategySlug | null>(null);
  const [mobileActiveIndex, setMobileActiveIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [mouseOffset, setMouseOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStartX, setDragStartX] = useState<number>(0);
  const [isTocOpen, setIsTocOpen] = useState<boolean>(false);
  const [inView, setInView] = useState<boolean>(false);

  // Responsive mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // IntersectionObserver to control video playback strictly when visible (§8.4, §14.2)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry?.isIntersecting ?? false);
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Subtle mouse-move parallax on desktop (pointer: fine)
  useEffect(() => {
    if (isMobile) return;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFinePointer || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      if (e.clientY < rect.top || e.clientY > rect.bottom) return;
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMouseOffset({ x: x * 10, y: y * 6 }); // Smooth subtle tilt
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  // Touch handlers for mobile 1-focus carousel swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (!touch) return;
    setDragStartX(touch.clientX);
    setIsDragging(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.changedTouches[0];
    if (!touch) {
      setIsDragging(false);
      return;
    }
    const endX = touch.clientX;
    const diff = endX - dragStartX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        // Swipe right -> prev
        setMobileActiveIndex((prev) => (prev > 0 ? prev - 1 : STRATEGY_ORDER.length - 1));
      } else {
        // Swipe left -> next
        setMobileActiveIndex((prev) => (prev < STRATEGY_ORDER.length - 1 ? prev + 1 : 0));
      }
    }
    setIsDragging(false);
  };

  // Keyboard navigation across panels
  const handleKeyDown = (e: React.KeyboardEvent, index: number, slug: StrategySlug) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setHashRoute(`strategy/${slug}`);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      const next = (index + 1) % STRATEGY_ORDER.length;
      setMobileActiveIndex(next);
      const nextEl = document.getElementById(`strategy-panel-${next}`);
      nextEl?.focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = (index - 1 + STRATEGY_ORDER.length) % STRATEGY_ORDER.length;
      setMobileActiveIndex(prev);
      const prevEl = document.getElementById(`strategy-panel-${prev}`);
      prevEl?.focus();
    }
  };

  const handlePanelClick = (slug: StrategySlug) => {
    setHashRoute(`strategy/${slug}`);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[750px] md:min-h-[880px] flex flex-col items-center justify-between overflow-hidden bg-gradient-to-b from-[#180A1C] via-[#110513] to-[#0A020B] text-white pt-6 pb-12 select-none"
      style={{
        perspective: isMobile ? '800px' : '1400px',
      }}
    >
      {/* Top Ambient Glow Aura */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[260px] bg-hot-pink/10 blur-[120px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Main 3D Curved Panels Layer (§14.2) */}
      <div
        className="relative w-full max-w-[1340px] mx-auto flex items-center justify-center pt-8 pb-14 z-20"
        style={{
          transformStyle: 'preserve-3d',
          transform: isMobile
            ? undefined
            : `rotateY(${mouseOffset.x * 0.4}deg) rotateX(${-mouseOffset.y * 0.3}deg)`,
          transition: 'transform 0.25s cubic-bezier(0.2, 0, 0, 1)',
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {isMobile ? (
          /* MOBILE: 1-Focus Carousel (§14.2: HP = carousel 1 video fokus, 3D disederhanakan) */
          <div className="relative w-full px-4 flex flex-col items-center">
            <div className="relative w-full flex items-center justify-center min-h-[460px]">
              {STRATEGY_ORDER.map((item, idx) => {
                const isActive = idx === mobileActiveIndex;
                const offset = idx - mobileActiveIndex;
                // Render active prominently, adjacent cards peek with subtle perspective
                const isAdjacent = Math.abs(offset) === 1 || (idx === 0 && mobileActiveIndex === 3) || (idx === 3 && mobileActiveIndex === 0);

                if (!isActive && !isAdjacent) return null;

                const transX = offset * 85;
                const rotY = offset * 18;
                const scaleVal = isActive ? 1 : 0.82;
                const opacityVal = isActive ? 1 : 0.4;
                const zIndexVal = isActive ? 30 : 10;

                return (
                  <div
                    key={item.slug}
                    id={`strategy-panel-${idx}`}
                    tabIndex={isActive ? 0 : -1}
                    role="button"
                    aria-label={`View details for ${item.label}`}
                    onClick={() => isActive && handlePanelClick(item.slug)}
                    onKeyDown={(e) => isActive && handleKeyDown(e, idx, item.slug)}
                    className="absolute w-[260px] sm:w-[280px] aspect-[9/16] rounded-2xl overflow-hidden bg-black/90 border border-white/20 shadow-2xl transition-all duration-300 cursor-pointer"
                    style={{
                      transform: `translateX(${transX}px) scale(${scaleVal}) rotateY(${rotY}deg)`,
                      opacity: opacityVal,
                      zIndex: zIndexVal,
                      boxShadow: isActive ? '0 0 35px rgba(255, 46, 147, 0.45)' : 'none',
                      WebkitBoxReflect: isActive
                        ? 'below 4px linear-gradient(to bottom, transparent 65%, rgba(0,0,0,0.12) 100%)'
                        : 'none',
                    }}
                  >
                    <video
                      src={mediaUrl(`video/${item.video}`)}
                      muted
                      playsInline
                      loop
                      autoPlay={inView && isActive}
                      className="w-full h-full object-cover block"
                    />

                    {/* Bottom Label & Arrow Button Bar */}
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-center justify-between">
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-hot-pink font-bold block">
                          Pillar 0{idx + 1}
                        </span>
                        <h4 className="font-serif text-lg font-bold text-white tracking-wide">
                          {item.label}
                        </h4>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white/10 border border-white/30 flex items-center justify-center text-white text-xs font-bold shadow-md">
                        →
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile Carousel Indicators & Quick Arrows */}
            <div className="flex items-center gap-4 mt-6 z-30">
              <button
                type="button"
                onClick={() =>
                  setMobileActiveIndex((prev) => (prev > 0 ? prev - 1 : STRATEGY_ORDER.length - 1))
                }
                aria-label="Previous strategy video"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-hot-pink border border-white/20 flex items-center justify-center text-white text-xs transition-colors"
              >
                ←
              </button>
              <div className="flex items-center gap-2">
                {STRATEGY_ORDER.map((item, idx) => (
                  <button
                    key={item.slug}
                    type="button"
                    onClick={() => setMobileActiveIndex(idx)}
                    aria-label={`Jump to ${item.label}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === mobileActiveIndex ? 'w-6 bg-hot-pink' : 'w-2 bg-white/30'
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() =>
                  setMobileActiveIndex((prev) => (prev < STRATEGY_ORDER.length - 1 ? prev + 1 : 0))
                }
                aria-label="Next strategy video"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-hot-pink border border-white/20 flex items-center justify-center text-white text-xs transition-colors"
              >
                →
              </button>
            </div>
          </div>
        ) : (
          /* DESKTOP / TABLET: 4-Panel 3D Curved Cylinder (§14.2) */
          <div className="relative w-full flex items-center justify-center gap-3 lg:gap-5 px-4">
            {STRATEGY_ORDER.map((item, idx) => {
              const isHovered = hoveredSlug === item.slug;

              // Exact 3D curved arc geometry:
              // Index 0: curved backwards on left
              // Index 1: mid-left, slightly inward
              // Index 2: mid-right, slightly inward
              // Index 3: curved backwards on right
              const baseRotations = [16, 5, -5, -16];
              const baseZ = [-45, 12, 12, -45];
              const baseX = [-12, -4, 4, 12];

              const rotY = baseRotations[idx] ?? 0;
              const defaultZ = baseZ[idx] ?? 0;
              const zVal = isHovered ? defaultZ + 55 : defaultZ;
              const xVal = baseX[idx] ?? 0;
              const scaleVal = isHovered ? 1.03 : 1;

              return (
                <div
                  key={item.slug}
                  id={`strategy-panel-${idx}`}
                  tabIndex={0}
                  role="button"
                  aria-label={`View details for ${item.label}`}
                  onMouseEnter={() => setHoveredSlug(item.slug)}
                  onMouseLeave={() => setHoveredSlug(null)}
                  onClick={() => handlePanelClick(item.slug)}
                  onKeyDown={(e) => handleKeyDown(e, idx, item.slug)}
                  className="group relative flex-1 max-w-[275px] aspect-[9/16] rounded-2xl md:rounded-3xl overflow-hidden bg-black/95 border border-white/15 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-hot-pink transition-all duration-300 ease-out"
                  style={{
                    transform: `translateX(${xVal}px) translateZ(${zVal}px) rotateY(${rotY}deg) scale(${scaleVal})`,
                    transformStyle: 'preserve-3d',
                    boxShadow: isHovered
                      ? '0 12px 45px rgba(255, 46, 147, 0.4), 0 0 20px rgba(255, 46, 147, 0.3)'
                      : '0 8px 30px rgba(0, 0, 0, 0.7)',
                    borderColor: isHovered ? 'rgba(255, 46, 147, 0.8)' : 'rgba(255, 255, 255, 0.16)',
                    WebkitBoxReflect:
                      'below 4px linear-gradient(to bottom, transparent 65%, rgba(0,0,0,0.14) 100%)',
                  }}
                >
                  {/* Native 9:16 Auto-playing Muted Loop Video */}
                  <video
                    src={mediaUrl(`video/${item.video}`)}
                    muted
                    playsInline
                    loop
                    autoPlay={inView}
                    className="w-full h-full object-cover block pointer-events-none transform transition-transform duration-500 ease-out group-hover:scale-105"
                  />

                  {/* Gradient bottom bar (§14.2) */}
                  <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 bg-gradient-to-t from-black/90 via-black/45 to-transparent flex items-end justify-between transition-all duration-200">
                    <div>
                      <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-hot-pink font-bold block mb-1">
                        Pillar 0{idx + 1}
                      </span>
                      <h4 className="font-serif text-lg md:text-xl font-bold text-white tracking-wide">
                        {item.label}
                      </h4>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-white/50 block opacity-0 group-hover:opacity-100 transition-opacity">
                        View details
                      </span>
                    </div>

                    {/* Circular Arrow Button (§14.2 round action icon) */}
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shadow-lg transition-all duration-300 ${
                        isHovered
                          ? 'bg-hot-pink text-white scale-110 shadow-hot-pink/50'
                          : 'bg-black/60 border border-white/30 text-white group-hover:border-hot-pink group-hover:bg-hot-pink'
                      }`}
                    >
                      <span className="transform transition-transform duration-300 group-hover:translate-x-0.5">
                        →
                      </span>
                    </div>
                  </div>

                  {/* Accessible Hover Vignette Lip */}
                  <div className="absolute inset-0 border border-white/10 rounded-2xl md:rounded-3xl pointer-events-none" />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* LANTAI GRID PERSPEKTIF + PANTULAN + OBJEK LANTAI (§14.2) */}
      <div
        className="relative w-full h-[220px] md:h-[260px] overflow-hidden -mt-16 md:-mt-20 z-10 flex items-center justify-center pointer-events-none"
        style={{
          perspective: '600px',
        }}
      >
        {/* 3D Perspective Aubergine Grid Floor */}
        <div
          className="absolute inset-x-0 top-0 w-full h-[380px] origin-top"
          style={{
            transform: 'rotateX(74deg)',
            backgroundImage: `
              linear-gradient(to right, rgba(122, 46, 92, 0.42) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(122, 46, 92, 0.42) 1px, transparent 1px)
            `,
            backgroundSize: '44px 44px',
            backgroundColor: '#0E0410',
            maskImage:
              'radial-gradient(ellipse 95% 75% at 50% 15%, black 20%, rgba(0,0,0,0.4) 60%, transparent 95%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 95% 75% at 50% 15%, black 20%, rgba(0,0,0,0.4) 60%, transparent 95%)',
          }}
        />

        {/* Ambient Floor Glow under center stage */}
        <div
          className="absolute top-2 w-[70vw] max-w-[800px] h-[70px] bg-hot-pink/15 blur-[50px] rounded-full"
          aria-hidden="true"
        />

        {/* Objek Dekoratif 3D Kecil di Depan: Clapperboard Sticker Pink (§14.2) */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 pointer-events-auto cursor-pointer group"
          style={{
            transform: 'rotateX(18deg) rotateZ(-4deg)',
            transformStyle: 'preserve-3d',
          }}
          title="Creative Direction Slate — Lassiewear Strategy"
        >
          {/* Floor Contact Drop Shadow */}
          <div
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[120px] h-[16px] bg-black/80 blur-[6px] rounded-full transform scale-y-50"
            aria-hidden="true"
          />

          {/* Die-cut Pink Clapperboard SVG / CSS */}
          <div className="relative w-[130px] h-[92px] bg-gradient-to-b from-hot-pink to-raspberry rounded-lg p-1.5 border-2 border-white shadow-xl transform transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-1">
            {/* Clapper Stick (open angle) */}
            <div className="w-full h-[18px] bg-ink rounded-xs mb-1.5 flex overflow-hidden border border-white/50">
              <div className="flex-1 bg-white" />
              <div className="w-2.5 bg-hot-pink transform -skew-x-12" />
              <div className="flex-1 bg-ink" />
              <div className="w-2.5 bg-white transform -skew-x-12" />
              <div className="flex-1 bg-hot-pink" />
              <div className="w-2.5 bg-white transform -skew-x-12" />
            </div>

            {/* Slate Body Text */}
            <div className="bg-[#1C0B1E] rounded-xs p-1.5 text-[8px] font-mono leading-tight text-white border border-white/20">
              <div className="flex justify-between text-candy-pink font-bold border-b border-white/10 pb-0.5 mb-0.5">
                <span>SCENE: STRATEGY</span>
                <span>TAKE 01</span>
              </div>
              <div className="text-[7.5px] text-white/80">PROD: LASSIEWEAR</div>
              <div className="text-[7px] text-white/60">DIR: JASSINTA ROID T.</div>
            </div>

            {/* Sparkle sticker badge on corner */}
            <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-butter rounded-full border border-white flex items-center justify-center text-[8px] text-ink font-bold shadow-xs">
              ✦
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION BAR: FEATURED MARKER (Left) + TOMBOL INDEX (Right) per §14.2 */}
      <div className="relative w-full max-w-6xl mx-auto px-6 pt-4 flex items-center justify-between z-30">
        {/* Left Marker: FEATURED / FULL indicator (§14.2) */}
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-hot-pink" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-white/60 font-semibold">
            EXAMPLE STRATEGY / 04 PILLARS
          </span>
        </div>

        {/* Right Marker: TOMBOL INDEX (§14.2: "Tombol INDEX kanan bawah.") */}
        <button
          type="button"
          onClick={() => setIsTocOpen(true)}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-hot-pink hover:text-white border border-white/25 text-white font-mono text-xs uppercase tracking-widest transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Open Table of Contents"
        >
          <span className="w-2 h-2 rounded-full bg-hot-pink animate-pulse" />
          <span className="font-bold">INDEX</span>
        </button>
      </div>

      {/* Accessible Table of Contents Modal */}
      <TocOverlay
        isOpen={isTocOpen}
        onClose={() => setIsTocOpen(false)}
        activeSectionId="example-strategy"
      />
    </div>
  );
}

export default CurvedRevealStage;
