import React, { useState, useRef } from 'react';

export interface LockerCabinetProps {
  children: React.ReactNode;
  isOpenState?: boolean;
}

export function LockerCabinet({
  children,
  isOpenState = false,
}: LockerCabinetProps): JSX.Element {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const cabinetRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only on hover-capable pointer devices per BRIEF §9.2
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const el = cabinetRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Subtle tilt ±1.8 deg
    setTilt({
      rx: -y * 2.5,
      ry: x * 2.5,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  return (
    <div
      ref={cabinetRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative select-none transform-gpu transition-transform duration-200 ease-out"
      style={{
        width: 'calc(5916 * var(--px))',
        height: 'calc(3469 * var(--px))',
        perspective: 'calc(2400 * var(--px) * 10)',
        transformStyle: 'preserve-3d',
        transform: `perspective(2200px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
      }}
    >
      {/* 1. TOP CHROME LID (116 units height) */}
      <div
        className={`
          absolute top-0 left-0 w-full rounded-t-lg z-30 border-b border-black/30 shadow-md
          flex items-center justify-around px-4
          ${
            isOpenState
              ? 'bg-gradient-to-b from-[#FFE3F0] via-[#FFB3D9] to-[#F7A8CF]'
              : 'bg-gradient-to-b from-[#FFFFFF] via-[#DADCE8] to-[#9A9BB2]'
          }
        `}
        style={{
          height: 'calc(116 * var(--px))',
          boxShadow: '0 4px 10px rgba(0,0,0,0.25), inset 0 2px 0 rgba(255,255,255,0.9)',
        }}
      >
        {/* Top rivets along top chrome bar */}
        {Array.from({ length: 18 }, (_, i) => (
          <div
            key={i}
            className="rounded-full shadow-inner border border-black/30"
            style={{
              width: 'calc(14 * var(--px))',
              height: 'calc(14 * var(--px))',
              background: 'radial-gradient(circle at 35% 35%, #FFFFFF, #7C7D91)',
            }}
          />
        ))}
      </div>

      {/* 2. INNER COMPARTMENTS CONTAINER (3240 units height) */}
      <div
        className="absolute w-full z-20 flex items-stretch justify-between"
        style={{
          top: 'calc(116 * var(--px))',
          height: 'calc(3240 * var(--px))',
        }}
      >
        {/* Leftmost Outer Rail (86 units) with rivets */}
        <div
          className={`h-full flex flex-col justify-around items-center border-r border-black/40 ${
            isOpenState
              ? 'bg-gradient-to-r from-[#F7A8CF] to-[#FFC2E0]'
              : 'bg-gradient-to-r from-[#4A4857] via-[#34323F] to-[#2B2933]'
          }`}
          style={{ width: 'calc(86 * var(--px))' }}
        >
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={i}
              className="rounded-full shadow-inner border border-black/30"
              style={{
                width: 'calc(16 * var(--px))',
                height: 'calc(16 * var(--px))',
                background: 'radial-gradient(circle at 35% 35%, #DADCE8, #7C7D91)',
              }}
            />
          ))}
        </div>

        {/* 5 Compartments / Doors */}
        {children}

        {/* Rightmost Outer Rail (86 units) with rivets */}
        <div
          className={`h-full flex flex-col justify-around items-center border-l border-black/40 ${
            isOpenState
              ? 'bg-gradient-to-l from-[#F7A8CF] to-[#FFC2E0]'
              : 'bg-gradient-to-l from-[#4A4857] via-[#34323F] to-[#2B2933]'
          }`}
          style={{ width: 'calc(86 * var(--px))' }}
        >
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={i}
              className="rounded-full shadow-inner border border-black/30"
              style={{
                width: 'calc(16 * var(--px))',
                height: 'calc(16 * var(--px))',
                background: 'radial-gradient(circle at 35% 35%, #DADCE8, #7C7D91)',
              }}
            />
          ))}
        </div>
      </div>

      {/* 3. BOTTOM DARK STEEL PLINTH (113 units height) */}
      <div
        className="absolute bottom-0 left-0 w-full rounded-b-lg z-30 shadow-2xl flex items-center justify-between px-6 border-t border-black/60"
        style={{
          height: 'calc(113 * var(--px))',
          background: isOpenState
            ? 'linear-gradient(180deg, #5C163C 0%, #360C23 50%, #1F0614 100%)'
            : 'linear-gradient(180deg, #1C1A24 0%, #100E17 50%, #07060A 100%)',
          boxShadow: '0 12px 24px rgba(0,0,0,0.6), inset 0 2px 0 rgba(255,255,255,0.15)',
        }}
      >
        <div
          className="w-full h-1 bg-white/10 rounded-full"
          style={{ height: 'calc(4 * var(--px))' }}
        />
      </div>

    </div>
  );
}

export default LockerCabinet;
