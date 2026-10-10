import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

export interface HoverLabelProps {
  text: string;
  subtext?: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

export function HoverLabel({
  text,
  subtext,
  children,
  className = '',
  ariaLabel,
}: HoverLabelProps): JSX.Element {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number; placement: 'top' | 'bottom' | 'right' | 'left' }>({
    top: 0,
    left: 0,
    placement: 'top',
  });
  const targetRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  const calculatePosition = () => {
    if (!targetRef.current) return;
    const rect = targetRef.current.getBoundingClientRect();
    const padding = 12;

    // Default label dimensions estimate
    const labelW = 160;
    const labelH = 48;

    let placement: 'top' | 'bottom' | 'right' | 'left' = 'top';
    let top = rect.top - labelH - padding;
    let left = rect.left + rect.width / 2 - labelW / 2;

    // Collision detection per BRIEF §5: top -> side -> bottom
    if (top < padding) {
      if (rect.right + labelW + padding <= window.innerWidth) {
        placement = 'right';
        top = rect.top + rect.height / 2 - labelH / 2;
        left = rect.right + padding;
      } else if (rect.left - labelW - padding >= padding) {
        placement = 'left';
        top = rect.top + rect.height / 2 - labelH / 2;
        left = rect.left - labelW - padding;
      } else {
        placement = 'bottom';
        top = rect.bottom + padding;
        left = rect.left + rect.width / 2 - labelW / 2;
      }
    }

    // Keep left within viewport boundaries
    left = Math.max(padding, Math.min(window.innerWidth - labelW - padding, left));

    setCoords({
      top: top + window.scrollY,
      left: left + window.scrollX,
      placement,
    });
  };

  const handleMouseEnter = () => {
    calculatePosition();
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  const handleClick = () => {
    // Mobile tap support per §5
    calculatePosition();
    setIsVisible((prev) => !prev);
  };

  useEffect(() => {
    if (!isVisible) return;
    const handleScrollOrResize = () => calculatePosition();
    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [isVisible]);

  return (
    <div
      ref={targetRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      aria-label={ariaLabel ?? text}
    >
      {children}

      {/* Touch caption sticky below object for touch devices (§5) */}
      {subtext && (
        <span className="block md:hidden text-[11px] font-mono text-gray-500 text-center mt-1">
          {text}
        </span>
      )}

      {/* Paper price tag portal */}
      {isVisible &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={labelRef}
            className="fixed pointer-events-none z-[9999] transition-opacity duration-150 animate-in fade-in"
            style={{
              top: `${coords.top - window.scrollY}px`,
              left: `${coords.left - window.scrollX}px`,
            }}
          >
            {/* Price-tag style per BRIEF §5: milk-white, dashed stitches, twine string */}
            <div className="relative bg-milk-white text-ink px-3 py-1.5 rounded-lg border-2 border-dashed border-warm-grey shadow-lg transform -rotate-1 min-w-[140px] max-w-[220px]">
              {/* String loop simulation */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full border border-twine bg-aged-paper/50" />
              
              <div className="text-xs font-sentient font-bold tracking-tight text-ink text-center">
                {text}
              </div>
              {subtext && (
                <div className="text-[10px] font-mono text-gray-500 text-center mt-0.5">
                  {subtext}
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

export default HoverLabel;
