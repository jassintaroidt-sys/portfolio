import { useState } from 'react';
import { mediaUrl } from '../../../lib/media';

export interface HeroProps {
  parallaxOffset?: { x: number; y: number };
}

export function Hero({ parallaxOffset = { x: 0, y: 0 } }: HeroProps): JSX.Element {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative w-full flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-8 md:pb-16 select-none overflow-visible">
      {/* Giant Typography on Left Side per BRIEF §11.1 */}
      <div
        className="relative z-10 flex flex-col tracking-tight text-ink uppercase font-black"
        style={{
          fontFamily: 'Anton, Archivo Black, Impact, sans-serif',
          fontSize: 'clamp(3.4rem, 2rem + 8.5vw, 10.5rem)',
          lineHeight: 0.9,
          transform: `translate(${parallaxOffset.x * 0.3}px, ${parallaxOffset.y * 0.3}px)`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        <span>WHICH</span>
        <span>COMPANIES</span>
        <span>HAVE I</span>
        <span>WORKED</span>
        <span className="text-hot-pink">FOR?</span>
      </div>

      {/* Transparent Cut-out Photo on Right Side per BRIEF §11.2 */}
      <div
        className="relative z-20 shrink-0 self-center md:self-end mt-4 md:mt-0 flex items-end justify-center"
        style={{
          width: 'clamp(240px, 30vw, 420px)',
          transform: `translate(${parallaxOffset.x * 0.6}px, ${parallaxOffset.y * 0.6}px)`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        {!imgError ? (
          <img
            src={mediaUrl('img/foto_jassinta_duduk.png')}
            alt="Jassinta sitting pose"
            onError={() => setImgError(true)}
            loading="lazy"
            className="w-full h-auto object-contain filter drop-shadow(0 15px 25px rgba(0,0,0,0.22)) pointer-events-none"
          />
        ) : (
          /* Invisible placeholder preserving exact aspect ratio per §11.2 */
          <div
            className="w-full aspect-[408/612] bg-transparent pointer-events-none"
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );
}
