import { useState, useEffect } from 'react';

export interface PreloaderProps {
  onLoaded?: () => void;
  maxWaitMs?: number; // default 2000ms (§7.4)
}

export function Preloader({ onLoaded, maxWaitMs = 2000 }: PreloaderProps): JSX.Element | null {
  const [isDone, setIsDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Artificial smooth progress + timeout safeguard
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / maxWaitMs) * 100));
      setProgress(pct);

      if (elapsed >= maxWaitMs) {
        clearInterval(interval);
        setIsDone(true);
        onLoaded?.();
      }
    }, 50);

    // Font readiness check
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(() => {
        // Ready early
      });
    }

    return () => clearInterval(interval);
  }, [maxWaitMs, onLoaded]);

  if (isDone) return null;

  return (
    <div
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed inset-0 z-[10000] bg-mist flex flex-col items-center justify-center grain p-6"
    >
      {/* Playful die-cut sticker badge */}
      <div
        className="bg-white p-6 rounded-3xl border-4 border-candy-pink shadow-xl text-center transform -rotate-2 max-w-xs w-full animate-bounce"
        style={{ animationDuration: '2s' }}
      >
        <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-tr from-hot-pink to-bubblegum flex items-center justify-center text-white font-sentient text-xl font-bold shadow-md mb-3">
          J
        </div>
        <h3 className="font-sentient text-lg font-bold text-ink">
          Jassinta Roid Triniti
        </h3>
        <p className="font-mono text-xs text-raspberry mt-1">Creative Portfolio · 2026</p>

        {/* Progress bar */}
        <div className="w-full bg-powder-pink h-2 rounded-full mt-5 overflow-hidden border border-warm-grey/50">
          <div
            className="bg-hot-pink h-full rounded-full transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="font-mono text-[11px] text-gray-500 mt-2 block">
          Loading playful world... {progress}%
        </span>
      </div>
    </div>
  );
}

export default Preloader;
