import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { TOC_SECTIONS } from './tocData';
import { useLenis } from '../../lib/scroll';

export interface TocOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  activeSectionId?: string;
}

export function TocOverlay({
  isOpen,
  onClose,
  activeSectionId,
}: TocOverlayProps): JSX.Element | null {
  const { scrollTo } = useLenis();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === 'undefined') return null;

  const handleNavClick = (id: string) => {
    onClose();
    const element = document.getElementById(id);
    if (element) {
      scrollTo(element, { offset: -20, duration: 1.4 });
    }
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Table of Contents"
      className="fixed inset-0 z-[9990] flex items-start justify-end p-4 md:p-8 bg-black/40 backdrop-blur-xs animate-in fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Paper-styled Index Panel per BRIEF §7 */}
      <div
        ref={panelRef}
        data-lenis-prevent="true"
        className="w-full max-w-sm bg-milk-white text-ink rounded-2xl p-6 border-2 border-warm-grey shadow-2xl transform rotate-1 animate-in slide-in-from-top-4 duration-200 grain"
      >
        <div className="flex items-center justify-between border-b border-warm-grey/60 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-hot-pink" />
            <h3 className="font-mono text-xs uppercase tracking-widest font-bold text-ink">
              Table of Contents
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-powder-pink hover:bg-candy-pink text-raspberry text-xs font-bold flex items-center justify-center transition-colors"
            aria-label="Close index"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col gap-1.5 font-mono text-xs">
          {TOC_SECTIONS.map((item, idx) => {
            const isActive = activeSectionId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`
                  w-full text-left py-2 px-3 rounded-lg transition-all flex items-center justify-between
                  hover:bg-blush/40 hover:text-raspberry
                  ${isActive ? 'bg-powder-pink text-hot-pink font-bold border-l-4 border-hot-pink pl-2.5' : 'text-ink/80'}
                `}
              >
                <span>
                  <span className="text-gray-400 mr-2">{String(idx + 1).padStart(2, '0')}.</span>
                  <span className={isActive ? 'underline decoration-hot-pink decoration-2 underline-offset-4' : ''}>
                    {item.label}
                  </span>
                </span>
                {isActive && <span className="w-2 h-2 rounded-full bg-hot-pink animate-pulse" />}
              </button>
            );
          })}
        </nav>
      </div>
    </div>,
    document.body
  );
}

export default TocOverlay;
