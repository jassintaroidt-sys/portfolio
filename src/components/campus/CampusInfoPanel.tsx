// src/components/campus/CampusInfoPanel.tsx — BRIEF §15.2 Info Panel
import { CampusItem } from '../../data/campus';

export interface CampusInfoPanelProps {
  item: CampusItem;
  className?: string;
}

export function CampusInfoPanel({ item, className = '' }: CampusInfoPanelProps): JSX.Element {
  return (
    <aside
      id={`campus-panel-${item.id}`}
      aria-label={`${item.title} Information Panel`}
      className={`
        relative flex flex-col p-6 md:p-8 rounded-2xl
        bg-milk-white/95 text-ink border-2 border-warm-grey
        shadow-[0_12px_32px_rgba(42,15,46,0.12)]
        grain select-none ${className}
      `}
    >
      {/* Top Header Badge */}
      <div className="flex items-center justify-between gap-2 border-b border-warm-grey/70 pb-4 mb-5">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cherry-red animate-pulse" />
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-ink/75">
            CAMPUS PUBLICATION
          </span>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-cherry-red/10 border border-cherry-red/30 font-mono text-[11px] font-bold text-cherry-red">
          {item.pages} PAGES TOTAL
        </span>
      </div>

      {/* Title */}
      <h3 className="font-serif text-3xl md:text-4xl font-extrabold tracking-tight text-ink mb-4">
        {item.title}
      </h3>

      {/* Description Paragraphs */}
      <div className="space-y-3 mb-6 text-sm md:text-base leading-relaxed text-ink/85 font-poppins">
        {item.description.map((paragraph, idx) => (
          <p key={idx} className="relative pl-3 border-l-2 border-cherry-red/40 italic">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Responsibilities Section */}
      <div className="mt-auto pt-4 border-t border-warm-grey/70">
        <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-ink/70 mb-3 flex items-center gap-2">
          <span className="text-cherry-red">✦</span> KEY RESPONSIBILITIES
        </h4>
        <ul className="space-y-2 text-xs md:text-sm text-ink/80">
          {item.responsibilities.map((resp, idx) => (
            <li key={idx} className="flex items-start gap-2.5 leading-snug">
              <span className="text-cherry-red font-bold text-xs mt-0.5 select-none">▸</span>
              <span>{resp}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Editorial Watermark */}
      <div className="mt-6 pt-3 flex items-center justify-between text-[10px] font-mono text-ink/50 border-t border-dashed border-warm-grey/60">
        <span>POLITEKNIK NEGERI JAKARTA</span>
        <span>LAYOUT & EDITORIAL</span>
      </div>
    </aside>
  );
}

export default CampusInfoPanel;
