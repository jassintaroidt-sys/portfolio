// src/components/cassette/DiscInfo.tsx — BRIEF §12.2
import { WorkItem } from '../../data/cassette';

export interface DiscInfoProps {
  work: WorkItem;
  className?: string;
}

export function DiscInfo({ work, className = '' }: DiscInfoProps): JSX.Element {
  return (
    <div
      className={`max-w-md w-full bg-white/75 backdrop-blur-md p-5 md:p-6 rounded-2xl border border-white/60 shadow-[0_12px_28px_rgba(42,15,46,0.08)] select-none transition-all duration-300 ${className}`}
    >
      {/* Title */}
      <div className="border-b border-black/10 pb-3 mb-3">
        <span className="font-mono text-[10px] tracking-widest text-espresso/60 uppercase block mb-1">
          TITLE
        </span>
        <h3 className="font-serif text-lg md:text-xl font-bold text-ink leading-snug line-clamp-2">
          {work.title}
        </h3>
      </div>

      {/* Author Row */}
      <div className="flex items-center justify-between py-1.5 border-b border-black/5 text-xs md:text-sm">
        <span className="font-mono text-[11px] uppercase tracking-wider text-espresso/60">
          AUTHOR
        </span>
        <span className="font-sans font-medium text-ink text-right">
          {work.author}
        </span>
      </div>

      {/* Date Row */}
      <div className="flex items-center justify-between py-1.5 border-b border-black/5 text-xs md:text-sm">
        <span className="font-mono text-[11px] uppercase tracking-wider text-espresso/60">
          DATE
        </span>
        <span className="font-mono font-medium text-ink text-right">
          {work.date}
        </span>
      </div>

      {/* Media Row */}
      <div className="flex items-center justify-between pt-1.5 text-xs md:text-sm">
        <span className="font-mono text-[11px] uppercase tracking-wider text-espresso/60">
          MEDIA
        </span>
        <span className="font-sans font-semibold text-hot-pink text-right">
          {work.media}
        </span>
      </div>
    </div>
  );
}
