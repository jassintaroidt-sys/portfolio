// src/components/cassette/Disc.tsx — BRIEF §12.2
import React, { useState } from 'react';
import { WorkItem } from '../../data/cassette';
import { mediaUrl } from '../../lib/media';

export interface DiscProps {
  work: WorkItem;
  offset: number; // 0 = active center, -1 = left 1, +1 = right 1, etc.
  onClick: () => void;
  reducedMotion?: boolean;
}

export function Disc({
  work,
  offset,
  onClick,
  reducedMotion = false,
}: DiscProps): JSX.Element {
  const isCenter = offset === 0;
  const absOffset = Math.abs(offset);
  const [showTooltip, setShowTooltip] = useState(false);

  // 3D positioning calculations per BRIEF §12.2
  // Center is largest and sharp; side ones get progressively smaller, dimmer, and angled
  const scale = Math.max(0.65, 1.15 - absOffset * 0.16);
  const opacity = Math.max(0.3, 1 - absOffset * 0.22);
  const blur = absOffset >= 2 ? 1.5 : 0;
  const rotateY = reducedMotion ? 0 : offset * -14; // Angled inwards to center
  const rotateZ = reducedMotion ? 0 : offset * -3;
  const translateX = offset * 210; // Spacing between disc centers
  const translateZ = -absOffset * 85;

  const handleClick = () => {
    if (!isCenter) {
      onClick();
      return;
    }

    if (work.url) {
      window.open(work.url, '_blank', 'noopener,noreferrer');
    } else {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2500);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={isCenter ? 0 : -1}
      aria-label={`${work.title} - ${work.media} (${work.date})`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`absolute top-1/2 left-1/2 cursor-pointer select-none transition-all duration-500 ease-out focus:outline-none ${
        isCenter ? 'focus-visible:ring-4 focus-visible:ring-hot-pink focus-visible:ring-offset-4 rounded-full z-20' : 'z-10'
      }`}
      style={{
        width: 'clamp(240px, 24vw, 320px)',
        height: 'clamp(240px, 24vw, 320px)',
        transform: `translate(-50%, -50%) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`,
        opacity,
        filter: blur ? `blur(${blur}px)` : 'none',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Floor Contact Shadow */}
      <div
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[85%] h-6 rounded-full bg-black/25 blur-md pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isCenter ? 0.7 : 0.35,
        }}
      />

      {/* Main Disc Body */}
      <div className="relative w-full h-full rounded-full shadow-[0_16px_36px_rgba(0,0,0,0.45),inset_0_2px_4px_rgba(255,255,255,0.6)] overflow-hidden bg-[#18181b] border-2 border-[#d0d3de]">
        {/* Outer Chrome Rim */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            border: '5px solid var(--disc-rim, #C9CCD5)',
            boxShadow: 'inset 0 0 10px rgba(0,0,0,0.6)',
          }}
        />

        {/* Artwork Layer (Clipped circle inside rim) */}
        <div className="absolute inset-[6px] rounded-full overflow-hidden bg-white">
          <img
            src={mediaUrl(`img/${work.image}`)}
            alt={work.title}
            className="w-full h-full object-cover select-none pointer-events-none filter contrast-[1.05]"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Concentric Grooves (Micro Vinyl Texture) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-45 mix-blend-overlay"
          viewBox="0 0 300 300"
        >
          <circle cx="150" cy="150" r="140" fill="none" stroke="#fff" strokeWidth="0.5" strokeOpacity="0.4" />
          <circle cx="150" cy="150" r="132" fill="none" stroke="#000" strokeWidth="0.6" strokeOpacity="0.5" />
          <circle cx="150" cy="150" r="124" fill="none" stroke="#fff" strokeWidth="0.5" strokeOpacity="0.3" />
          <circle cx="150" cy="150" r="116" fill="none" stroke="#000" strokeWidth="0.5" strokeOpacity="0.4" />
          <circle cx="150" cy="150" r="108" fill="none" stroke="#fff" strokeWidth="0.5" strokeOpacity="0.3" />
          <circle cx="150" cy="150" r="100" fill="none" stroke="#000" strokeWidth="0.6" strokeOpacity="0.4" />
          <circle cx="150" cy="150" r="92" fill="none" stroke="#fff" strokeWidth="0.5" strokeOpacity="0.3" />
          <circle cx="150" cy="150" r="84" fill="none" stroke="#000" strokeWidth="0.5" strokeOpacity="0.4" />
          <circle cx="150" cy="150" r="76" fill="none" stroke="#fff" strokeWidth="0.5" strokeOpacity="0.4" />
          <circle cx="150" cy="150" r="68" fill="none" stroke="#000" strokeWidth="0.5" strokeOpacity="0.3" />
        </svg>

        {/* Rotating Conic Specular Highlight */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none mix-blend-screen opacity-55"
          style={{
            background:
              'conic-gradient(from 35deg at 50% 50%, rgba(255,255,255,0.6) 0deg, transparent 45deg, transparent 180deg, rgba(255,255,255,0.45) 215deg, transparent 260deg)',
          }}
        />

        {/* Center Spindle Hub Ring */}
        <div
          className="absolute inset-[37%] rounded-full pointer-events-none flex items-center justify-center border-2 border-white/70 shadow-[0_0_12px_rgba(0,0,0,0.5),inset_0_2px_4px_rgba(255,255,255,0.8)]"
          style={{
            background:
              'radial-gradient(circle, #e9ebf2 0%, #c8ccd6 70%, #999ba8 100%)',
          }}
        >
          {/* Spindle Center Hole */}
          <div className="w-[32%] h-[32%] rounded-full bg-[#181017] shadow-[inset_0_2px_5px_rgba(0,0,0,0.9),0_1px_2px_rgba(255,255,255,0.5)] border border-gray-400" />
        </div>
      </div>

      {/* Online Article / Not Published Prompt */}
      {isCenter && showTooltip && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap z-30 px-3 py-1.5 rounded-full bg-ink text-white text-xs font-mono tracking-wider shadow-lg animate-in fade-in zoom-in-95">
          Not published online
        </div>
      )}

      {/* Center disc interactive link indicator */}
      {isCenter && work.url && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-ink/90 text-white text-[11px] font-mono tracking-wider uppercase rounded-full shadow-md backdrop-blur-sm border border-white/20 pointer-events-none flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <span>Read Article</span>
          <span>↗</span>
        </div>
      )}
    </div>
  );
}
