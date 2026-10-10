import { useState, useEffect } from 'react';
import { VINTAGE_CINDY_PHOTOS } from '../../data/documents';
import { mediaUrl } from '../../lib/media';
import { PhotoFrame } from '../ui/PhotoFrame';
import { Pushpin } from '../ui/Pushpin';

export function PhotographyPage(): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((i) => (i > 0 ? i - 1 : VINTAGE_CINDY_PHOTOS.length - 1));
  };

  const next = () => {
    setCurrentIndex((i) => (i < VINTAGE_CINDY_PHOTOS.length - 1 ? i + 1 : 0));
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const current = (VINTAGE_CINDY_PHOTOS[currentIndex] ?? VINTAGE_CINDY_PHOTOS[0])!;

  return (
    <div className="w-full flex flex-col items-center py-6 px-4 select-none">
      {/* Header */}
      <div className="text-center mb-6">
        <h2
          className="text-3xl md:text-4xl font-bold text-ink"
          style={{ fontFamily: 'Bodoni Moda, serif' }}
        >
          Photography
        </h2>
        <p className="font-poppins text-xs md:text-sm text-gray-600 mt-1">
          Vintage Editorial Portrait Series · Cindy Collection
        </p>
      </div>

      {/* Main Aged-Paper Gallery Display */}
      <div
        className="relative w-full max-w-4xl rounded-xl p-6 md:p-10 flex flex-col items-center"
        style={{
          backgroundColor: '#F3E3B8',
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4) 0%, rgba(220,195,145,0.3) 100%)
          `,
          boxShadow: `
            0 12px 30px rgba(0,0,0,0.2),
            inset 0 0 40px rgba(180,145,90,0.25)
          `,
        }}
      >
        {/* Top Pushpin */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20">
          <Pushpin color="wisteria" size={32} />
        </div>

        {/* Carousel Slide Area with Arrow Controls */}
        <div className="relative w-full flex items-center justify-center min-h-[360px] md:min-h-[500px]">
          {/* Previous Arrow Button */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous Photo"
            className="absolute left-0 md:-left-5 z-20 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-ink shadow-lg flex items-center justify-center transition-transform hover:scale-110 active:scale-95 border border-warm-grey"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Photo Frame Container (Always Object-Fit Contain) */}
          <div className="relative z-10 max-w-full flex items-center justify-center">
            <PhotoFrame
              src={mediaUrl(`img/${current.file}`)}
              alt={current.title}
              className="max-h-[420px] md:max-h-[520px]"
            />
          </div>

          {/* Next Arrow Button */}
          <button
            type="button"
            onClick={next}
            aria-label="Next Photo"
            className="absolute right-0 md:-right-5 z-20 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-ink shadow-lg flex items-center justify-center transition-transform hover:scale-110 active:scale-95 border border-warm-grey"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Photo Counter */}
        <div className="mt-4 text-center">
          <span className="font-mono text-xs font-bold text-hot-pink">
            {currentIndex + 1} / {VINTAGE_CINDY_PHOTOS.length}
          </span>
        </div>

        {/* Bottom Credits Block per BRIEF §10.4 */}
        <div className="w-full mt-6 pt-4 border-t border-amber-900/15 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 text-left">
          <div className="font-poppins text-xs text-ink/90 leading-relaxed bg-white/70 px-4 py-3 rounded-lg border border-warm-grey/50 shadow-xs">
            <h4 className="font-bold text-hot-pink uppercase tracking-wider mb-1 font-mono text-[11px]">
              Credit
            </h4>
            <p><strong>Model:</strong> Chindy</p>
            <p><strong>Photograph:</strong> Jassinta Roid Triniti</p>
            <p><strong>Editing:</strong> Jassinta Roid Triniti</p>
          </div>

          {/* Thumbnails Scroller */}
          <div className="flex gap-1.5 overflow-x-auto max-w-md py-1 no-scrollbar">
            {VINTAGE_CINDY_PHOTOS.map((p, idx) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`w-9 h-12 flex-shrink-0 rounded overflow-hidden border-2 transition-all ${
                  currentIndex === idx ? 'border-hot-pink scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={mediaUrl(`img/${p.file}`)} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
