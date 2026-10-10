import { useState, useEffect } from 'react';
import { TocOverlay } from './TocOverlay';

export interface TocButtonProps {
  activeSectionId?: string;
  isOpeningUnlocked?: boolean;
  className?: string;
  hidden?: boolean;
}

export function TocButton({
  activeSectionId,
  isOpeningUnlocked = true,
  className = '',
  hidden = false,
}: TocButtonProps): JSX.Element | null {
  const [isOpen, setIsOpen] = useState(false);

  // Listen to open-toc event triggered by embedded buttons across sections
  useEffect(() => {
    const handleOpenToc = () => {
      if (isOpeningUnlocked) {
        setIsOpen(true);
      }
    };
    window.addEventListener('open-toc', handleOpenToc);
    return () => window.removeEventListener('open-toc', handleOpenToc);
  }, [isOpeningUnlocked]);

  // Toc is only active after Opening is unlocked per BRIEF §7 & §7.2
  if (!isOpeningUnlocked) return null;

  return (
    <>
      {!hidden && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={`
            fixed top-4 right-4 md:top-6 md:right-8 z-40
            min-h-[44px] min-w-[44px] px-4 py-2
            bg-white/90 hover:bg-white text-ink
            border-2 border-warm-grey rounded-full
            font-mono text-xs uppercase font-bold tracking-widest
            shadow-md hover:shadow-lg hover:border-hot-pink
            transition-all duration-200 hover:scale-105 active:scale-95
            flex items-center gap-2 select-none
            ${className}
          `}
          aria-label="Open Table of Contents"
        >
          <span className="w-2 h-2 rounded-full bg-hot-pink animate-pulse" />
          <span>INDEX</span>
        </button>
      )}

      <TocOverlay
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        activeSectionId={activeSectionId}
      />
    </>
  );
}

export default TocButton;

