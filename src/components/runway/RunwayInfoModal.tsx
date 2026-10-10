// src/components/runway/RunwayInfoModal.tsx — BRIEF §13.2
import { ContentInfo } from '../../data/content';

export interface RunwayInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  info: ContentInfo;
}

export function RunwayInfoModal({
  isOpen,
  onClose,
  info,
}: RunwayInfoModalProps): JSX.Element | null {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={info.heading}
      className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        data-lenis-prevent="true"
        className="w-full max-w-lg bg-milk-white text-ink rounded-3xl p-6 md:p-8 border border-white/40 shadow-2xl relative animate-in zoom-in-95 grain"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close information"
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-mist hover:bg-hot-pink hover:text-white transition-colors flex items-center justify-center font-bold text-sm"
        >
          ✕
        </button>

        <span className="font-mono text-xs uppercase tracking-widest text-hot-pink font-bold block mb-2">
          Project Brief &amp; Insights
        </span>

        <h3 className="font-serif text-2xl font-bold text-ink mb-4 leading-tight">
          {info.heading}
        </h3>

        {/* Body Paragraphs */}
        <div className="space-y-3 mb-6 font-sans text-sm md:text-base text-espresso/85 leading-relaxed">
          {info.body.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        {/* Performance Statistics Pills */}
        {info.stats && (
          <div className="border-t border-black/10 pt-4">
            <span className="font-mono text-[11px] uppercase tracking-wider text-espresso/60 block mb-2">
              Performance Metrics
            </span>
            <div className="flex flex-wrap gap-2">
              {info.stats.views !== undefined && (
                <div className="px-3 py-1 rounded-full bg-mist/80 border border-black/5 text-xs font-mono">
                  <span className="text-espresso/60 mr-1">Views:</span>
                  <span className="font-bold text-ink">{info.stats.views.toLocaleString()}</span>
                </div>
              )}
              {info.stats.likes !== undefined && (
                <div className="px-3 py-1 rounded-full bg-mist/80 border border-black/5 text-xs font-mono">
                  <span className="text-espresso/60 mr-1">Likes:</span>
                  <span className="font-bold text-ink">{info.stats.likes.toLocaleString()}</span>
                </div>
              )}
              {info.stats.comments !== undefined && (
                <div className="px-3 py-1 rounded-full bg-mist/80 border border-black/5 text-xs font-mono">
                  <span className="text-espresso/60 mr-1">Comments:</span>
                  <span className="font-bold text-ink">{info.stats.comments.toLocaleString()}</span>
                </div>
              )}
              {info.stats.saves !== undefined && (
                <div className="px-3 py-1 rounded-full bg-mist/80 border border-black/5 text-xs font-mono">
                  <span className="text-espresso/60 mr-1">Saves:</span>
                  <span className="font-bold text-ink">{info.stats.saves.toLocaleString()}</span>
                </div>
              )}
              {info.stats.shares !== undefined && (
                <div className="px-3 py-1 rounded-full bg-mist/80 border border-black/5 text-xs font-mono">
                  <span className="text-espresso/60 mr-1">Shares:</span>
                  <span className="font-bold text-ink">{info.stats.shares.toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
