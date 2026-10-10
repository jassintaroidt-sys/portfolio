// src/components/archive/ArchivePreview.tsx — BRIEF §17.2 Dynamic Media Preview Engine
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { ArchiveItem } from '../../data/archive';
import { computeArchiveLayout, LayoutResult } from '../../lib/archiveLayout';
import { mediaUrl } from '../../lib/media';

export interface ArchivePreviewProps {
  item: ArchiveItem;
  className?: string;
}

export function ArchivePreview({ item, className = '' }: ArchivePreviewProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoMasterRef = useRef<HTMLVideoElement>(null);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);

  const [dimensions, setDimensions] = useState<{ W: number; H: number }>({
    W: 600,
    H: 600,
  });

  // Measure container dimensions with 100ms debounce
  const updateDimensions = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const w = Math.round(rect.width);
    const h = Math.round(rect.height);
    if (w > 0 && h > 0) {
      setDimensions((prev) => {
        if (Math.abs(prev.W - w) > 2 || Math.abs(prev.H - h) > 2) {
          return { W: w, H: h };
        }
        return prev;
      });
    }
  }, []);

  useEffect(() => {
    updateDimensions();

    let timeoutId: NodeJS.Timeout;
    const observer = new ResizeObserver(() => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateDimensions, 100);
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const handleWindowChange = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateDimensions, 100);
    };

    window.addEventListener('resize', handleWindowChange);
    window.addEventListener('orientationchange', handleWindowChange);
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleWindowChange);
    }
    document.addEventListener('fullscreenchange', handleWindowChange);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
      window.removeEventListener('resize', handleWindowChange);
      window.removeEventListener('orientationchange', handleWindowChange);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleWindowChange);
      }
      document.removeEventListener('fullscreenchange', handleWindowChange);
    };
  }, [updateDimensions]);

  // Compute dynamic layout
  const mediaRatio = useMemo(() => item.w / item.h, [item.w, item.h]);
  const isVideo = item.kind === 'video';

  const layout: LayoutResult = useMemo(() => {
    return computeArchiveLayout({
      mediaRatio,
      W: dimensions.W,
      H: dimensions.H,
      gap: 12,
      minShort: 80,
      maxCopies: isVideo ? 6 : 24,
      naturalW: item.w,
      maxUpscale: 1.6,
    });
  }, [mediaRatio, dimensions.W, dimensions.H, isVideo, item.w]);

  // Video mirror via canvas for multi-copy video
  useEffect(() => {
    if (!isVideo || layout.count <= 1) return;

    let animId: number;
    let videoCallbackId: number;
    const video = videoMasterRef.current;
    if (!video) return;

    const drawCanvases = () => {
      if (video.readyState >= 2) {
        for (let i = 0; i < layout.count; i++) {
          const canvas = canvasRefs.current[i];
          if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            }
          }
        }
      }

      if ('requestVideoFrameCallback' in video) {
        videoCallbackId = (video as any).requestVideoFrameCallback(drawCanvases);
      } else {
        animId = requestAnimationFrame(drawCanvases);
      }
    };

    if ('requestVideoFrameCallback' in video) {
      videoCallbackId = (video as any).requestVideoFrameCallback(drawCanvases);
    } else {
      animId = requestAnimationFrame(drawCanvases);
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
      if (videoCallbackId && 'cancelVideoFrameCallback' in video) {
        (video as any).cancelVideoFrameCallback(videoCallbackId);
      }
    };
  }, [isVideo, layout.count, item.file]);

  // Construct item array for grid
  const tiles = useMemo(() => {
    return Array.from({ length: layout.count }, (_, i) => i);
  }, [layout.count]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[320px] sm:min-h-[440px] md:min-h-[540px] rounded-2xl bg-black/40 backdrop-blur-md border border-white/20 shadow-2xl p-4 flex items-center justify-center overflow-hidden grain select-none ${className}`}
      aria-label={`Preview: ${item.title}`}
    >
      {/* Hidden Master Video element for multi-copy canvas mirroring */}
      {isVideo && (
        <video
          ref={videoMasterRef}
          src={mediaUrl(`video/${item.file}`)}
          muted
          loop
          playsInline
          autoPlay
          className={layout.count > 1 ? 'hidden' : 'hidden'}
          aria-hidden="true"
        />
      )}

      {/* Dynamic Grid Container strictly centered via computed offsets */}
      <div
        className="grid items-center justify-center"
        style={{
          width: `${layout.gridW}px`,
          height: `${layout.gridH}px`,
          gridTemplateColumns: `repeat(${layout.cols}, ${layout.mediaW}px)`,
          gridTemplateRows: `repeat(${layout.rows}, ${layout.mediaH}px)`,
          gap: '12px',
        }}
      >
        {tiles.map((idx) => {
          if (isVideo) {
            if (layout.count === 1) {
              return (
                <div
                  key={idx}
                  className="relative rounded-xl overflow-hidden shadow-lg border border-white/20 bg-black"
                  style={{ width: `${layout.mediaW}px`, height: `${layout.mediaH}px` }}
                >
                  <video
                    src={mediaUrl(`video/${item.file}`)}
                    muted
                    loop
                    playsInline
                    autoPlay
                    className="w-full h-full object-contain pointer-events-none"
                  />
                </div>
              );
            }

            return (
              <div
                key={idx}
                className="relative rounded-xl overflow-hidden shadow-lg border border-white/20 bg-black"
                style={{ width: `${layout.mediaW}px`, height: `${layout.mediaH}px` }}
              >
                <canvas
                  ref={(el) => (canvasRefs.current[idx] = el)}
                  width={Math.round(layout.mediaW)}
                  height={Math.round(layout.mediaH)}
                  className="w-full h-full object-contain pointer-events-none"
                />
              </div>
            );
          }

          // Images
          return (
            <div
              key={idx}
              className="relative rounded-xl overflow-hidden shadow-lg border border-white/15 bg-black/20"
              style={{ width: `${layout.mediaW}px`, height: `${layout.mediaH}px` }}
            >
              <img
                src={mediaUrl(`img/${item.file}`)}
                alt={`${item.title} tile ${idx + 1}`}
                className="w-full h-full object-contain pointer-events-none"
                loading="eager"
                decoding="async"
              />
            </div>
          );
        })}
      </div>

      {/* Information Overlay Tag */}
      <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] tracking-widest uppercase pointer-events-none">
        {layout.count} {layout.count === 1 ? 'TILE' : 'TILES'} · {Math.round(layout.coverage * 100)}% COVERAGE
      </div>
    </div>
  );
}

export default ArchivePreview;
