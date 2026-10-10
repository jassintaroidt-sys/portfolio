import React, { useRef, useState, useEffect, useMemo } from 'react';
import { generateTornMaskSvg } from '../../lib/torn';
import { TornFiberEdge } from './TornFiberEdge';
import { TornHighlight } from './TornHighlight';

export interface TornSectionProps {
  seed: number;
  backgroundClass?: string;
  className?: string;
  id?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  isNextSection?: boolean; // §6.12 Seamless next-section transition under torn edge
}

export function TornSection({
  seed,
  backgroundClass = '',
  className = '',
  id,
  children,
  style,
  isNextSection = false,
}: TornSectionProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(1440);

  // ResizeObserver with 100ms debounce per BRIEF §6.13
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Initial measurement
    const initialWidth = el.offsetWidth || window.innerWidth || 1440;
    setContainerWidth(initialWidth);

    let timeoutId: NodeJS.Timeout;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const measuredWidth = Math.round(entry.contentRect.width);
        if (measuredWidth > 0) {
          setContainerWidth(measuredWidth);
        }
      }, 100);
    });

    observer.observe(el);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  // Width quantized to 64px buckets for memoization per §6.13
  const bucketWidth = useMemo(() => {
    return Math.max(320, Math.round(containerWidth / 64) * 64);
  }, [containerWidth]);

  // Generate SVG mask & companion paths
  const maskData = useMemo(() => {
    return generateTornMaskSvg(seed, bucketWidth, 64);
  }, [seed, bucketWidth]);

  // Two-layer mask styling strictly adhering to BRIEF §6.3 & §6.12
  const sectionStyle: React.CSSProperties = useMemo(() => {
    const base: React.CSSProperties = {
      ['--tear-h' as string]: 'clamp(36px, 6vw, 90px)',
      ['--tear-url' as string]: `url("${maskData.svgDataUrl}")`,
      WebkitMaskImage: 'linear-gradient(#000, #000), var(--tear-url)',
      maskImage: 'linear-gradient(#000, #000), var(--tear-url)',
      WebkitMaskRepeat: 'no-repeat, no-repeat',
      maskRepeat: 'no-repeat, no-repeat',
      WebkitMaskPosition: 'top left, left bottom',
      maskPosition: 'top left, left bottom',
      WebkitMaskSize: '100% calc(100% - var(--tear-h) + 1px), 100% var(--tear-h)',
      maskSize: '100% calc(100% - var(--tear-h) + 1px), 100% var(--tear-h)',
      paddingBottom: 'var(--tear-h)',
    };

    if (isNextSection) {
      base.paddingTop = 'var(--tear-h)';
    }

    return base;
  }, [maskData.svgDataUrl, isNextSection]);

  const rootStyle: React.CSSProperties = useMemo(() => {
    const merged: React.CSSProperties = {
      ['--tear-h' as string]: 'clamp(36px, 6vw, 90px)',
      ...style,
    };
    if (isNextSection) {
      merged.marginTop = 'calc(clamp(36px, 6vw, 90px) * -1)';
    }
    return merged;
  }, [style, isNextSection]);

  return (
    <div
      ref={containerRef}
      id={id}
      className={`torn-section-root relative w-full ${className}`}
      style={rootStyle}
    >
      {/* External shadow wrapper per BRIEF §6.2 & §6.8 */}
      <div
        className="torn-section-shadow-wrapper relative w-full"
        style={{ filter: 'drop-shadow(0 6px 8px rgba(0, 0, 0, 0.18))' }}
      >
        <section className={`torn-paper-section ${backgroundClass} relative w-full overflow-hidden`} style={sectionStyle}>
          {children}
        </section>

        {/* Secondary delicate fiber layer (§6.7) */}
        <TornFiberEdge fiberPath={maskData.fiberPath} width={bucketWidth} height={64} />

        {/* Subtle irregular edge curl/highlight (§6.9) */}
        <TornHighlight highlightPath={maskData.highlightPath} width={bucketWidth} height={64} />
      </div>
    </div>
  );
}

export default TornSection;
