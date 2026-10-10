import React from 'react';
import { Pushpin } from './Pushpin';

export interface PaperNoteProps {
  children: React.ReactNode;
  rotation?: number;
  showPin?: boolean;
  pinColor?: 'cherry-red' | 'hot-pink' | 'wisteria' | 'gold';
  className?: string;
  style?: React.CSSProperties;
}

export function PaperNote({
  children,
  rotation = 2,
  showPin = false,
  pinColor = 'cherry-red',
  className = '',
  style,
}: PaperNoteProps): JSX.Element {
  return (
    <div
      className={`relative p-5 bg-aged-paper text-espresso rounded-sm ${className}`}
      style={{
        transform: `rotate(${rotation}deg)`,
        boxShadow: '0 8px 16px -2px rgba(0, 0, 0, 0.12), 0 3px 6px -2px rgba(0, 0, 0, 0.08)',
        ...style,
      }}
    >
      {/* Paper texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 rounded-sm"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4) 0%, rgba(0,0,0,0.06) 100%)',
        }}
      />

      {/* Lifted corner shadow (bottom right) */}
      <div
        className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none opacity-15"
        style={{
          background: 'radial-gradient(circle at 100% 100%, black, transparent 70%)',
        }}
      />

      {/* Optional Pushpin at top center */}
      {showPin && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
          <Pushpin color={pinColor} size={28} />
        </div>
      )}

      <div className="relative z-10 font-caveat text-lg leading-relaxed">{children}</div>
    </div>
  );
}

export default PaperNote;
