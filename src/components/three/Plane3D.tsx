import React from 'react';

export interface Plane3DProps {
  w?: number | string;
  h?: number | string;
  z?: number; // translateZ in px
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export function Plane3D({
  w,
  h,
  z = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  className = '',
  style,
  children,
}: Plane3DProps): JSX.Element {
  const transform = [
    z !== 0 ? `translateZ(${z}px)` : '',
    rotateX !== 0 ? `rotateX(${rotateX}deg)` : '',
    rotateY !== 0 ? `rotateY(${rotateY}deg)` : '',
    rotateZ !== 0 ? `rotateZ(${rotateZ}deg)` : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={`absolute inset-0 ${className}`}
      style={{
        width: w,
        height: h,
        transform: transform || undefined,
        transformStyle: 'preserve-3d',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default Plane3D;
