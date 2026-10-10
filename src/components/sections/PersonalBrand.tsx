import React, { useState, useRef } from 'react';
import { Hero } from './personal-brand/Hero';
import { DocumentCanvas } from './personal-brand/DocumentCanvas';
import { SectionFooter } from '../ui/SectionFooter';

export function PersonalBrand(): JSX.Element {
  const containerRef = useRef<HTMLElement>(null);
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    // Only on hover-capable fine pointer devices per BRIEF §11.4
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;

    // Smoothed parallax offset (max ±24px per §11.4)
    setParallaxOffset({
      x: normX * 24,
      y: normY * 24,
    });
  };

  const handleMouseLeave = () => {
    setParallaxOffset({ x: 0, y: 0 });
  };

  return (
    <section
      ref={containerRef}
      id="personal-brand"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="torn-next-section relative w-full bg-[#FFFFFF] text-ink select-none overflow-hidden pb-6 px-4 md:px-12 lg:px-20 z-[25]"
      style={{
        backgroundColor: '#FFFFFF', // Mandatory pure white canvas per BRIEF §11
      }}
    >
      {/* Editorial Content Container */}
      <div className="w-full max-w-7xl mx-auto flex flex-col pt-8 md:pt-14">
        {/* Top Giant Typography Hero + Sitting Photo */}
        <Hero parallaxOffset={parallaxOffset} />

        {/* 10 Physical Document Sheets Collage Canvas */}
        <DocumentCanvas parallaxOffset={parallaxOffset} />

        {/* Section Footer per BRIEF §7.5 */}
        <SectionFooter className="mt-12" />
      </div>
    </section>
  );
}

export default PersonalBrand;
