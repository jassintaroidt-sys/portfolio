import { useState, useEffect } from 'react';
import { PARTICIPATION_ITEMS } from '../../data/documents';
import { mediaUrl } from '../../lib/media';
import { PhotoFrame } from '../ui/PhotoFrame';
import { Pushpin } from '../ui/Pushpin';

export function ParticipationPage(): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((i) => (i > 0 ? i - 1 : PARTICIPATION_ITEMS.length - 1));
  };

  const next = () => {
    setCurrentIndex((i) => (i < PARTICIPATION_ITEMS.length - 1 ? i + 1 : 0));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const current = (PARTICIPATION_ITEMS[currentIndex] ?? PARTICIPATION_ITEMS[0])!;

  return (
    <div className="w-full flex flex-col items-center py-6 px-4 select-none">
      {/* Header */}
      <div className="text-center mb-6">
        <h2
          className="text-3xl md:text-4xl font-bold text-ink"
          style={{ fontFamily: 'Bodoni Moda, serif' }}
        >
          Participation
        </h2>
        <p className="font-poppins text-xs md:text-sm text-gray-600 mt-1">
          Official internships, trainings, and leadership engagements
        </p>
      </div>

      {/* Main Aged-Paper Pinboard Display Container */}
      <div
        className="relative w-full max-w-3xl rounded-xl p-6 md:p-10 flex flex-col items-center"
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
          <Pushpin color="cherry-red" size={32} />
        </div>

        {/* Carousel Slide Area with Arrow Controls */}
        <div className="relative w-full flex items-center justify-center min-h-[320px] md:min-h-[460px]">
          {/* Previous Arrow Button */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous Certificate"
            className="absolute left-0 md:-left-5 z-20 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-ink shadow-lg flex items-center justify-center transition-transform hover:scale-110 active:scale-95 border border-warm-grey"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Photo Frame Container (Always Object-Fit Contain) */}
          <div className="relative z-10 max-w-full flex items-center justify-center transition-all duration-300">
            <PhotoFrame
              src={mediaUrl(`img/${current.file}`)}
              alt={current.caption}
              className="max-h-[380px] md:max-h-[500px]"
            />
          </div>

          {/* Next Arrow Button */}
          <button
            type="button"
            onClick={next}
            aria-label="Next Certificate"
            className="absolute right-0 md:-right-5 z-20 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-ink shadow-lg flex items-center justify-center transition-transform hover:scale-110 active:scale-95 border border-warm-grey"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Caption & Metadata Badge */}
        <div className="mt-6 text-center max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-warm-grey/60 text-xs font-mono font-bold text-hot-pink mb-2">
            <span>{current.year}</span>
            <span>•</span>
            <span>{current.category}</span>
          </div>

          <h3
            className="text-lg md:text-xl font-bold text-ink leading-snug"
            style={{ fontFamily: 'Sentient, serif' }}
          >
            {current.caption}
          </h3>
        </div>

        {/* Dot Indicators */}
        <div className="flex items-center gap-2 mt-5">
          {PARTICIPATION_ITEMS.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`rounded-full transition-all duration-200 ${
                currentIndex === idx
                  ? 'w-6 h-2 bg-hot-pink'
                  : 'w-2 h-2 bg-warm-grey hover:bg-hot-pink'
              }`}
              aria-label={`Jump to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
