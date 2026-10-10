// src/components/hero/SectionHero.tsx — BRIEF §12.1, §13.1, §14.1, §15.1
import React, { useEffect, useRef, useState } from 'react';
import { mediaUrl } from '../../lib/media';

export interface FloatingMediaItem {
  id: string | number;
  file: string;
  kind: 'image' | 'video';
  alt?: string;
  initialRotation?: number;
  // Percentage placement for desktop relative to container (x: 0-100%, y: 0-100%)
  x: number;
  y: number;
  tabletVisible?: boolean;
}

export interface SectionHeroProps {
  headline: React.ReactNode;
  narration: React.ReactNode;
  floatingMedia: FloatingMediaItem[];
  className?: string;
}

export function SectionHero({
  headline,
  narration,
  floatingMedia,
  className = '',
}: SectionHeroProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // IntersectionObserver for entrance reveal wipe
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Subtle mouse parallax on desktop (pointer: fine)
  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFinePointer || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 24; // ±12px
      const y = (e.clientY / innerHeight - 0.5) * 24; // ±12px
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full py-20 md:py-28 lg:py-36 px-4 md:px-8 overflow-hidden select-none flex flex-col items-center justify-center min-h-[70vh] md:min-h-[85vh] ${className}`}
    >
      {/* Background Atmosphere Grain */}
      <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay grain" />

      {/* Scattered Floating Media Elements (Desktop & Tablet) */}
      <div className="absolute inset-0 pointer-events-none hidden md:block overflow-hidden">
        {floatingMedia.map((item, idx) => {
          const rotation = item.initialRotation ?? (idx % 2 === 0 ? -6 + idx * 2 : 5 - idx * 2);
          const isTablet = item.tabletVisible !== false;
          // Staggered delay for entrance wipe
          const delayMs = idx * 100 + 150;
          // Parallax depth factor
          const depth = 0.4 + (idx % 3) * 0.3;
          const parallaxX = mouseOffset.x * depth;
          const parallaxY = mouseOffset.y * depth;

          return (
            <div
              key={item.id}
              className={`absolute pointer-events-auto transition-all duration-700 ease-out group ${
                isTablet ? 'block' : 'hidden lg:block'
              }`}
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                transform: inView
                  ? `translate(-50%, -50%) translate3d(${parallaxX}px, ${parallaxY}px, 0) rotate(${rotation}deg) scale(1)`
                  : `translate(-50%, -50%) translate3d(${parallaxX}px, ${parallaxY + 40}px, 0) rotate(${rotation - 4}deg) scale(0.85)`,
                opacity: inView ? 1 : 0,
                transitionDelay: `${delayMs}ms`,
                zIndex: 1,
              }}
            >
              <div
                className="w-[clamp(110px,12vw,190px)] aspect-square rounded-2xl bg-white p-2 md:p-2.5 shadow-[0_12px_32px_rgba(42,15,46,0.14),0_2px_6px_rgba(0,0,0,0.06)] border border-white/60 backdrop-blur-sm transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-2 group-hover:shadow-[0_20px_40px_rgba(255,46,147,0.22)]"
                style={{
                  clipPath: inView ? 'inset(0% 0% 0% 0% round 16px)' : 'inset(100% 0% 0% 0% round 16px)',
                  transition: 'clip-path 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: `${delayMs}ms`,
                }}
              >
                {item.kind === 'image' ? (
                  <img
                    src={mediaUrl(`img/${item.file}`)}
                    alt={item.alt ?? 'Artwork snippet'}
                    className="w-full h-full object-cover rounded-xl select-none pointer-events-none"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <video
                    src={mediaUrl(`video/${item.file}`)}
                    className="w-full h-full object-cover rounded-xl select-none pointer-events-none"
                    muted
                    playsInline
                    loop
                    autoPlay
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Center Text Column (Exclusion Zone) */}
      <div className="relative z-10 max-w-3xl lg:max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Mobile floating media strip above text */}
        <div className="flex md:hidden items-center justify-center gap-3 mb-6 overflow-hidden max-w-full px-2">
          {floatingMedia.slice(0, 3).map((item, idx) => (
            <div
              key={`m-top-${item.id}`}
              className="w-20 h-20 rounded-xl bg-white p-1.5 shadow-md border border-white/70 flex-shrink-0"
              style={{
                transform: `rotate(${idx === 1 ? '4deg' : '-3deg'})`,
              }}
            >
              <img
                src={mediaUrl(`img/${item.file}`)}
                alt={item.alt ?? 'Visual snippet'}
                className="w-full h-full object-cover rounded-lg"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Headline */}
        <h2 className="headline font-serif text-[clamp(2.2rem,1.4rem+3.6vw,4.125rem)] leading-[1.08] tracking-tight text-ink font-normal">
          {headline}
        </h2>

        {/* Gap token */}
        <div style={{ height: 'var(--headline-narration-gap, 1.5rem)' }} />

        {/* Narration */}
        <p className="narration font-sans italic font-normal text-[clamp(1rem,0.85rem+0.6vw,1.35rem)] max-w-2xl text-espresso/85 leading-relaxed">
          {narration}
        </p>

        {/* Mobile floating media strip below text */}
        <div className="flex md:hidden items-center justify-center gap-3 mt-8 overflow-hidden max-w-full px-2">
          {floatingMedia.slice(3, 6).map((item, idx) => (
            <div
              key={`m-bot-${item.id}`}
              className="w-20 h-20 rounded-xl bg-white p-1.5 shadow-md border border-white/70 flex-shrink-0"
              style={{
                transform: `rotate(${idx === 1 ? '-4deg' : '3deg'})`,
              }}
            >
              <img
                src={mediaUrl(`img/${item.file}`)}
                alt={item.alt ?? 'Visual snippet'}
                className="w-full h-full object-cover rounded-lg"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
