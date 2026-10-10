import React from 'react';

export interface CompartmentOpenProps {
  shelfTop: React.ReactNode;
  shelfMiddle: React.ReactNode;
  shelfBottom: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function CompartmentOpen({
  shelfTop,
  shelfMiddle,
  shelfBottom,
  className = '',
  style,
}: CompartmentOpenProps): JSX.Element {
  return (
    <div
      className={`relative select-none overflow-hidden flex flex-col justify-between ${className}`}
      style={{
        width: 'calc(1080 * var(--px))',
        height: 'calc(3240 * var(--px))',
        transformStyle: 'preserve-3d',
        backgroundColor: '#4E1B39',
        backgroundImage: `
          radial-gradient(circle at 50% 20%, #7A2E5C 0%, #4B1D4F 60%, #2A0F2E 100%)
        `,
        boxShadow: `
          inset 0 0 calc(60*var(--px)) rgba(15, 3, 20, 0.95),
          inset calc(20*var(--px)) 0 calc(40*var(--px)) rgba(10, 2, 14, 0.85),
          inset calc(-20*var(--px)) 0 calc(40*var(--px)) rgba(10, 2, 14, 0.85)
        `,
        ...style,
      }}
    >
      {/* 3D Depth Inner Ambient Occlusion Shadows */}
      {/* Top Ceiling Shadow */}
      <div
        className="absolute top-0 inset-x-0 pointer-events-none z-20"
        style={{
          height: 'calc(120 * var(--px))',
          background: 'linear-gradient(180deg, rgba(15, 3, 20, 0.9) 0%, transparent 100%)',
        }}
      />
      {/* Left Wall Shadow */}
      <div
        className="absolute inset-y-0 left-0 pointer-events-none z-20"
        style={{
          width: 'calc(50 * var(--px))',
          background: 'linear-gradient(90deg, rgba(15, 3, 20, 0.75) 0%, transparent 100%)',
        }}
      />
      {/* Right Wall Shadow */}
      <div
        className="absolute inset-y-0 right-0 pointer-events-none z-20"
        style={{
          width: 'calc(50 * var(--px))',
          background: 'linear-gradient(270deg, rgba(15, 3, 20, 0.75) 0%, transparent 100%)',
        }}
      />

      {/* ================= TIER 1: SHELF 1 (TOP) ================= */}
      <div
        className="relative flex-1 flex flex-col justify-end items-center px-[calc(30*var(--px))] pb-[calc(10*var(--px))] z-10"
        style={{ height: 'calc(1050 * var(--px))' }}
      >
        {shelfTop}
      </div>

      {/* ================= SHELF DIVIDER 1 ================= */}
      <div
        className="relative w-full z-20"
        style={{
          height: 'calc(24 * var(--px))', // Visible front lip ±24 units per §9.2
          background: 'linear-gradient(180deg, #FFFFFF 0%, #F5C6DA 30%, #E8A5B8 60%, #BA6E8D 100%)',
          boxShadow: `
            0 calc(8*var(--px)) calc(16*var(--px)) rgba(0,0,0,0.7),
            inset 0 calc(1.5*var(--px)) calc(2*var(--px)) rgba(255,255,255,0.9),
            inset 0 calc(-2*var(--px)) calc(3*var(--px)) rgba(0,0,0,0.4)
          `,
        }}
      >
        {/* Subtle screw studs on shelf lip */}
        <div className="absolute top-1/2 -translate-y-1/2 left-[calc(40*var(--px))] w-[calc(8*var(--px))] h-[calc(8*var(--px))] rounded-full bg-[#8A3A60] shadow-inner" />
        <div className="absolute top-1/2 -translate-y-1/2 right-[calc(40*var(--px))] w-[calc(8*var(--px))] h-[calc(8*var(--px))] rounded-full bg-[#8A3A60] shadow-inner" />
      </div>

      {/* ================= TIER 2: SHELF 2 (MIDDLE) ================= */}
      <div
        className="relative flex-1 flex flex-col justify-end items-center px-[calc(30*var(--px))] pb-[calc(10*var(--px))] z-10"
        style={{ height: 'calc(1050 * var(--px))' }}
      >
        {shelfMiddle}
      </div>

      {/* ================= SHELF DIVIDER 2 ================= */}
      <div
        className="relative w-full z-20"
        style={{
          height: 'calc(24 * var(--px))',
          background: 'linear-gradient(180deg, #FFFFFF 0%, #F5C6DA 30%, #E8A5B8 60%, #BA6E8D 100%)',
          boxShadow: `
            0 calc(8*var(--px)) calc(16*var(--px)) rgba(0,0,0,0.7),
            inset 0 calc(1.5*var(--px)) calc(2*var(--px)) rgba(255,255,255,0.9),
            inset 0 calc(-2*var(--px)) calc(3*var(--px)) rgba(0,0,0,0.4)
          `,
        }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 left-[calc(40*var(--px))] w-[calc(8*var(--px))] h-[calc(8*var(--px))] rounded-full bg-[#8A3A60] shadow-inner" />
        <div className="absolute top-1/2 -translate-y-1/2 right-[calc(40*var(--px))] w-[calc(8*var(--px))] h-[calc(8*var(--px))] rounded-full bg-[#8A3A60] shadow-inner" />
      </div>

      {/* ================= TIER 3: FLOOR (BOTTOM) ================= */}
      <div
        className="relative flex-1 flex flex-col justify-end items-center px-[calc(30*var(--px))] pb-[calc(18*var(--px))] z-10"
        style={{ height: 'calc(1070 * var(--px))' }}
      >
        {shelfBottom}
      </div>

      {/* Bottom Floor Rim */}
      <div
        className="relative w-full z-20"
        style={{
          height: 'calc(18 * var(--px))',
          background: 'linear-gradient(180deg, #BA6E8D 0%, #5C1D3D 100%)',
          boxShadow: 'inset 0 calc(1*var(--px)) rgba(255,255,255,0.4)',
        }}
      />
    </div>
  );
}
