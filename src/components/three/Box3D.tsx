import React from 'react';

export interface Box3DProps {
  w: number | string; // width
  h: number | string; // height
  d: number; // depth in px/units
  frontClass?: string;
  topClass?: string;
  leftClass?: string;
  rightClass?: string;
  bottomClass?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export function Box3D({
  w,
  h,
  d,
  frontClass = 'bg-white',
  topClass = 'bg-white/80',
  leftClass = 'bg-black/10',
  rightClass = 'bg-black/20',
  bottomClass = 'bg-black/30',
  className = '',
  style,
  children,
}: Box3DProps): JSX.Element {
  const halfD = d / 2;

  return (
    <div
      className={`relative transform-gpu ${className}`}
      style={{
        width: w,
        height: h,
        transformStyle: 'preserve-3d',
        ...style,
      }}
    >
      {/* Front Face */}
      <div
        className={`absolute inset-0 ${frontClass}`}
        style={{
          transform: `translateZ(${halfD}px)`,
        }}
      >
        {children}
      </div>

      {/* Back Face */}
      <div
        className="absolute inset-0 bg-black/40"
        style={{
          transform: `rotateY(180deg) translateZ(${halfD}px)`,
        }}
      />

      {/* Top Face (Specular / brighter) */}
      <div
        className={`absolute top-0 left-0 w-full ${topClass}`}
        style={{
          height: `${d}px`,
          transformOrigin: 'top',
          transform: `rotateX(90deg) translateZ(0px)`,
        }}
      />

      {/* Bottom Face (Darker contact) */}
      <div
        className={`absolute bottom-0 left-0 w-full ${bottomClass}`}
        style={{
          height: `${d}px`,
          transformOrigin: 'bottom',
          transform: `rotateX(-90deg) translateZ(0px)`,
        }}
      />

      {/* Left Face (Key light) */}
      <div
        className={`absolute top-0 left-0 h-full ${leftClass}`}
        style={{
          width: `${d}px`,
          transformOrigin: 'left',
          transform: `rotateY(-90deg) translateZ(0px)`,
        }}
      />

      {/* Right Face (Shadow side) */}
      <div
        className={`absolute top-0 right-0 h-full ${rightClass}`}
        style={{
          width: `${d}px`,
          transformOrigin: 'right',
          transform: `rotateY(90deg) translateZ(0px)`,
        }}
      />
    </div>
  );
}

export default Box3D;
