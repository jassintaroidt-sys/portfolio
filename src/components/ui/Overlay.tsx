import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useLenis } from '../../lib/scroll';

export interface OverlayProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function Overlay({
  isOpen,
  onClose,
  title,
  children,
  className = '',
}: OverlayProps): JSX.Element | null {
  const { lockScroll, unlockScroll } = useLenis();
  const overlayRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previouslyFocusedElement.current = document.activeElement as HTMLElement;
      lockScroll();

      // Focus trap setup
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          onClose();
          return;
        }

        if (e.key === 'Tab' && overlayRef.current) {
          const focusable = overlayRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusable.length === 0) return;

          const first = focusable[0]!;
          const last = focusable[focusable.length - 1]!;

          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);

      // Focus initial close button or first element
      const timer = setTimeout(() => {
        const firstFocusable = overlayRef.current?.querySelector<HTMLElement>(
          'button, [href], input'
        );
        firstFocusable?.focus();
      }, 50);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        clearTimeout(timer);
        unlockScroll();
        if (previouslyFocusedElement.current) {
          previouslyFocusedElement.current.focus();
        }
      };
    }
  }, [isOpen, lockScroll, unlockScroll, onClose]);

  if (!isOpen || typeof document === 'undefined') return null;

  return createPortal(
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Sticker-pop animated modal container per BRIEF §5 */}
      <div
        data-lenis-prevent="true"
        className={`
          relative w-full max-w-4xl max-h-[90vh] overflow-y-auto
          bg-milk-white text-ink rounded-3xl p-6 md:p-10
          border-4 border-white shadow-2xl
          transform transition-all duration-300 ease-out
          scale-100 opacity-100 animate-in zoom-in-95
          grain
          ${className}
        `}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-warm-grey/60 pb-4 mb-6">
          <h2 className="font-sentient text-2xl md:text-3xl font-bold text-ink flex items-center gap-3">
            <span className="w-3.5 h-3.5 rounded-full bg-hot-pink" />
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="w-11 h-11 rounded-full bg-powder-pink hover:bg-candy-pink text-raspberry font-bold flex items-center justify-center border border-raspberry/20 transition-all hover:scale-105 active:scale-95"
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        {/* Modal content with data-lenis-prevent */}
        <div data-lenis-prevent="true" className="relative z-10">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}

export default Overlay;
