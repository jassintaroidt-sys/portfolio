import { useRef, useEffect } from 'react';
import { ContentItem } from '../../data/content';
import { mediaUrl } from '../../lib/media';

export interface RunwayCardProps {
  item: ContentItem;
  offset: number; // 0 = active catwalk center, -1 = left, +1 = right, etc.
  onClick: () => void;
  reducedMotion?: boolean;
}

export function RunwayCard({
  item,
  offset,
  onClick,
  reducedMotion = false,
}: RunwayCardProps): JSX.Element {
  const isCenter = offset === 0;
  const absOffset = Math.abs(offset);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-play active center video, pause side videos (concurrency gate §8.4)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isCenter) {
      video.play().catch(() => {
        // Autoplay may be restricted before interaction
      });
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isCenter]);

  // 3D positioning per BRIEF §13.2:
  // Center: translateZ(+40px), scale(1.0), blur(0), opacity(1.0)
  // Upstage (offset != 0): translateZ(-240px), scale(0.70), blur(1.5px), opacity(0.80), rotateY(±8deg)
  const scale = isCenter ? 1.0 : Math.max(0.65, 0.70 - (absOffset - 1) * 0.08);
  const opacity = isCenter ? 1.0 : Math.max(0.4, 0.80 - (absOffset - 1) * 0.15);
  const blur = isCenter ? 0 : 1.5;
  const rotateY = reducedMotion ? 0 : isCenter ? 0 : offset > 0 ? -8 : 8;
  const translateZ = isCenter ? 40 : -240;
  const translateX = offset * 260; // Spacing along stage
  const zIndex = isCenter ? 30 : Math.max(1, 20 - absOffset);

  const isVideo = item.media.kind === 'video';

  return (
    <div
      role="button"
      tabIndex={isCenter ? 0 : -1}
      aria-label={`${item.title} (${item.platform} - ${item.type})`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className={`absolute top-1/2 left-1/2 cursor-pointer select-none transition-all duration-[800ms] focus:outline-none ${
        isCenter ? 'focus-visible:ring-4 focus-visible:ring-hot-pink focus-visible:ring-offset-4 rounded-3xl' : ''
      }`}
      style={{
        transitionTimingFunction: 'cubic-bezier(0.18, 0.9, 0.28, 1)',
        transform: `translate(-50%, -50%) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
        opacity,
        filter: blur > 0 ? `blur(${blur}px)` : 'none',
        zIndex,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Radiant Glow Aura bloom behind active card (§13.2) */}
      {isCenter && (
        <div
          className="absolute -inset-4 md:-inset-6 rounded-3xl md:rounded-[36px] bg-gradient-to-r from-hot-pink via-candy-pink to-lilac opacity-70 blur-xl pointer-events-none animate-pulse"
          style={{ zIndex: -1 }}
        />
      )}

      {/* Main Media Card Shell */}
      <div
        className={`relative overflow-hidden rounded-2xl md:rounded-3xl bg-black shadow-[0_24px_50px_rgba(0,0,0,0.5)] border-2 transition-colors duration-500 ${
          isCenter
            ? 'border-hot-pink ring-2 ring-hot-pink/60 shadow-[0_0_35px_rgba(255,46,147,0.45)]'
            : 'border-white/30 hover:border-white/60'
        }`}
        style={{
          // Center un-shrunk dimensions per BRIEF §13.2:
          // 9:16 videos: min(58svh, 520px)
          // Feeds (~1:1): min(54svh, 470px)
          width: isVideo ? 'min(33svh, 292px)' : 'min(54svh, 470px)',
          height: isVideo ? 'min(58svh, 520px)' : 'min(54svh, 470px)',
          maxHeight: '520px',
        }}
      >
        {isVideo ? (
          <video
            ref={videoRef}
            src={mediaUrl(`video/${item.media.file}`)}
            className="w-full h-full object-cover select-none pointer-events-none"
            muted
            playsInline
            loop
            preload="metadata"
          />
        ) : (
          <img
            src={mediaUrl(`img/${item.media.file}`)}
            alt={item.title}
            className="w-full h-full object-cover select-none pointer-events-none"
            loading="lazy"
            decoding="async"
          />
        )}

        {/* Subtle glass reflection gradient */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-40" />

        {/* Side card dark overlay for focus contrast */}
        {!isCenter && (
          <div className="absolute inset-0 bg-black/35 pointer-events-none transition-opacity" />
        )}
      </div>
    </div>
  );
}
