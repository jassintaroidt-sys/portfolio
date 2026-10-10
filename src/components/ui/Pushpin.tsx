import React from 'react';

export interface PushpinProps {
  color?: 'cherry-red' | 'hot-pink' | 'wisteria' | 'gold';
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function Pushpin({
  color = 'cherry-red',
  size = 24,
  className = '',
  style,
}: PushpinProps): JSX.Element {
  const colorMap = {
    'cherry-red': { base: '#E5173F', specular: '#FF7B92', dark: '#99001F' },
    'hot-pink': { base: '#FF2E93', specular: '#FFA3D0', dark: '#B30059' },
    wisteria: { base: '#A98BDA', specular: '#D8C6F6', dark: '#634596' },
    gold: { base: '#D4A64A', specular: '#FFF0BA', dark: '#8C6718' },
  }[color];

  return (
    <div
      className={`relative inline-block select-none pointer-events-none ${className}`}
      style={{ width: size, height: size, ...style }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        {/* Needle shadow */}
        <ellipse cx="20" cy="26" rx="6" ry="2" fill="rgba(0,0,0,0.25)" />
        {/* Metal needle */}
        <path d="M16 16 L20 25" stroke="#C9CCD5" strokeWidth="2" strokeLinecap="round" />
        {/* Pin base */}
        <ellipse cx="16" cy="18" rx="8" ry="4" fill={colorMap.dark} />
        {/* Pin stem */}
        <rect x="13" y="10" width="6" height="6" rx="1" fill={colorMap.base} />
        {/* Pin round dome head */}
        <circle cx="16" cy="9" r="7" fill={colorMap.base} />
        {/* Spherical gradient / specular highlight */}
        <ellipse cx="14" cy="7" rx="3.5" ry="2.5" fill={colorMap.specular} opacity="0.85" />
      </svg>
    </div>
  );
}

export default Pushpin;
