import React from 'react';

export interface EmbeddedIndexButtonProps {
  dark?: boolean;
  className?: string;
  onClick?: () => void;
  positionLabel?: string;
}

export function EmbeddedIndexButton({
  dark = false,
  className = '',
  onClick,
  positionLabel,
}: EmbeddedIndexButtonProps): JSX.Element {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClick) {
      onClick();
    } else {
      window.dispatchEvent(new CustomEvent('open-toc'));
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`
        min-h-[44px] min-w-[44px] px-4 py-2 rounded-full font-mono text-xs uppercase font-bold tracking-widest
        transition-all duration-200 shadow-md flex items-center gap-2 cursor-pointer select-none
        hover:scale-105 active:scale-95
        ${
          dark
            ? 'bg-white/10 hover:bg-white text-white hover:text-ink border border-white/30 hover:border-hot-pink shadow-xs backdrop-blur-sm'
            : 'bg-white/90 hover:bg-white text-ink border-2 border-warm-grey hover:border-hot-pink shadow-md backdrop-blur-sm'
        }
        ${className}
      `}
      aria-label="Open Table of Contents"
    >
      <span className="w-2 h-2 rounded-full bg-hot-pink animate-pulse" />
      <span>INDEX</span>
      {positionLabel && (
        <span className="text-[10px] opacity-60 font-normal">({positionLabel})</span>
      )}
    </button>
  );
}

export default EmbeddedIndexButton;
