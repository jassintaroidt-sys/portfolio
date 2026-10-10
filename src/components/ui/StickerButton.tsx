import React from 'react';

export interface StickerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'hot-pink' | 'barbie' | 'candy' | 'plum';
  tilt?: number; // tilt degrees
  className?: string;
}

export function StickerButton({
  children,
  variant = 'hot-pink',
  tilt = -1.5,
  className = '',
  ...props
}: StickerButtonProps): JSX.Element {
  const bgStyles = {
    'hot-pink': 'bg-gradient-to-r from-hot-pink to-barbie-pink text-white',
    barbie: 'bg-barbie-pink text-white',
    candy: 'bg-candy-pink text-berry border-2 border-raspberry/30',
    plum: 'bg-plum-night text-milk-white border border-orchid/30',
  }[variant];

  return (
    <button
      type="button"
      className={`
        relative inline-flex items-center justify-center
        min-h-[44px] min-w-[44px] px-5 py-2.5
        font-sentient font-bold text-sm tracking-wide
        rounded-full cursor-pointer
        select-none outline-none
        border-2 border-white
        transition-all duration-200 ease-out
        hover:-translate-y-0.5 hover:scale-[1.02] hover:rotate-0
        active:translate-y-0 active:scale-95
        focus-visible:outline-3 focus-visible:outline-hot-pink focus-visible:outline-offset-2
        ${bgStyles}
        ${className}
      `}
      style={{
        transform: `rotate(${tilt}deg)`,
        boxShadow: '0 4px 0 rgba(0, 0, 0, 0.15), 0 8px 16px rgba(233, 30, 140, 0.25)',
      }}
      {...props}
    >
      {/* Glitter / shine overlay */}
      <span
        className="absolute inset-0 rounded-full opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), transparent 60%)',
        }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}

export default StickerButton;
