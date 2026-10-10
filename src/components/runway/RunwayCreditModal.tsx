// src/components/runway/RunwayCreditModal.tsx — BRIEF §13.2
import { ContentCredit } from '../../data/content';

export interface RunwayCreditModalProps {
  isOpen: boolean;
  onClose: () => void;
  credit: ContentCredit;
  platform: string;
}

export function RunwayCreditModal({
  isOpen,
  onClose,
  credit,
  platform,
}: RunwayCreditModalProps): JSX.Element | null {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Content Production Credits"
      className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        data-lenis-prevent="true"
        className="w-full max-w-md bg-milk-white text-ink rounded-3xl p-6 md:p-8 border border-white/40 shadow-2xl relative animate-in zoom-in-95 grain"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close credit"
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-mist hover:bg-hot-pink hover:text-white transition-colors flex items-center justify-center font-bold text-sm"
        >
          ✕
        </button>

        <span className="font-mono text-xs uppercase tracking-widest text-hot-pink font-bold block mb-2">
          Production Credits
        </span>

        <h3 className="font-serif text-2xl font-bold text-ink mb-6">
          Credits &amp; Brand
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-black/10">
            <span className="font-mono text-xs uppercase tracking-wider text-espresso/60">
              Company
            </span>
            <span className="font-sans font-semibold text-ink text-right">
              {credit.company}
            </span>
          </div>

          <div className="flex items-center justify-between pb-3 border-b border-black/10">
            <span className="font-mono text-xs uppercase tracking-wider text-espresso/60">
              {platform}
            </span>
            <a
              href={credit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs font-bold text-hot-pink hover:underline flex items-center gap-1"
            >
              <span>{credit.handle}</span>
              <span>↗</span>
            </a>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="font-mono text-xs uppercase tracking-wider text-espresso/60">
              By
            </span>
            <span className="font-serif italic font-bold text-ink text-right">
              {credit.by}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
