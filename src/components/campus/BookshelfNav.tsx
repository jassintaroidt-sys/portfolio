// src/components/campus/BookshelfNav.tsx — BRIEF §15.2 Bookshelf Navigation
import { CampusItem } from '../../data/campus';

export interface BookshelfNavProps {
  items: readonly CampusItem[];
  activeId: string;
  onSelect: (id: string) => void;
  className?: string;
}

export function BookshelfNav({
  items,
  activeId,
  onSelect,
  className = '',
}: BookshelfNavProps): JSX.Element {
  return (
    <div className={`relative flex flex-col select-none ${className}`}>
      {/* Eyebrow Label */}
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full bg-cherry-red animate-pulse" />
        <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-ink/70">
          ARCHIVE SHELF
        </span>
      </div>

      {/* Bookshelf Container: Horizontal on mobile/tablet, Vertical rack on desktop */}
      <div className="relative p-3 md:p-4 rounded-2xl bg-gradient-to-b from-[#693D28] via-[#7A4A32] to-[#593320] shadow-[0_16px_36px_rgba(43,27,23,0.35),inset_0_2px_4px_rgba(255,255,255,0.15)] border-2 border-[#4A2A1A]">
        {/* Subtle wood grain texture highlight */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-25 mix-blend-overlay grain" />

        {/* Books arrangement: Row on mobile, Column on desktop */}
        <div
          role="tablist"
          aria-label="Campus Publications Shelf"
          className="relative z-10 flex flex-row md:flex-col items-center md:items-start justify-center gap-4 md:gap-6 py-2 md:py-4 px-2"
        >
          {items.map((item, idx) => {
            const isActive = item.id === activeId;
            const isRush = item.id === 'rush-07';

            // Distinct pastel book colors per BRIEF §15.2
            const spineBg = isRush
              ? 'bg-gradient-to-r from-[#A8E6CF] via-[#C8F2E2] to-[#8FD9BE]' // Pastel mint
              : 'bg-gradient-to-r from-[#D4C1F5] via-[#E8DEFC] to-[#BA9FED]'; // Pastel lavender

            const textColor = isRush ? 'text-[#1E4D3E]' : 'text-[#3E2468]';
            const accentBorder = isRush ? 'border-[#8FD9BE]' : 'border-[#BA9FED]';

            return (
              <button
                key={item.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`campus-panel-${item.id}`}
                tabIndex={0}
                onClick={() => onSelect(item.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelect(item.id);
                  }
                }}
                className={`
                  group relative focus:outline-none focus-visible:ring-2 focus-visible:ring-hot-pink rounded-lg
                  transition-all duration-300 ease-out cursor-pointer
                  ${
                    isActive
                      ? 'md:translate-x-3 -translate-y-2 shadow-[0_14px_28px_rgba(0,0,0,0.35)] scale-105'
                      : 'hover:opacity-100 opacity-80 hover:-translate-y-1 shadow-[0_6px_14px_rgba(0,0,0,0.22)]'
                  }
                `}
                title={`${item.title} (${item.pages} pages)`}
              >
                {/* 3D Vertical Book Spine (Desktop) / Horizontal Book Badge (Mobile) */}
                <div
                  className={`
                    relative flex items-center justify-center
                    ${spineBg} ${accentBorder} border
                    rounded-md md:rounded-lg overflow-hidden
                    /* Dimensions: vertical on desktop, compact pill on mobile */
                    w-28 h-12 md:w-14 md:h-64
                    transition-all duration-300
                  `}
                  style={{
                    boxShadow: isActive
                      ? 'inset -3px 0 6px rgba(0,0,0,0.2), inset 3px 0 6px rgba(255,255,255,0.4), 0 8px 20px rgba(0,0,0,0.25)'
                      : 'inset -2px 0 4px rgba(0,0,0,0.2), inset 2px 0 4px rgba(255,255,255,0.3)',
                  }}
                >
                  {/* Embossed book ribs (horizontal grooves on spine) */}
                  <div className="absolute inset-x-0 top-3 h-[2px] bg-black/15 shadow-xs hidden md:block" />
                  <div className="absolute inset-x-0 top-5 h-[1px] bg-white/40 hidden md:block" />
                  <div className="absolute inset-x-0 bottom-3 h-[2px] bg-black/15 shadow-xs hidden md:block" />
                  <div className="absolute inset-x-0 bottom-5 h-[1px] bg-white/40 hidden md:block" />

                  {/* Golden foil spine bookmark string indicator when active */}
                  {isActive && (
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-4 bg-gold rounded-b-xs shadow-xs hidden md:block animate-pulse" />
                  )}

                  {/* Spine Typography: Vertical writing on desktop, horizontal on mobile */}
                  <div className="flex md:flex-col items-center justify-between w-full h-full px-2 py-3 select-none">
                    <span className="font-mono text-[9px] font-bold opacity-60 text-ink uppercase tracking-wider hidden md:block">
                      VOL.{idx + 1}
                    </span>

                    <span
                      className={`
                        font-serif font-black tracking-widest uppercase text-xs md:text-sm ${textColor}
                        md:[writing-mode:vertical-rl] md:rotate-180
                      `}
                    >
                      {item.spine}
                    </span>

                    <span className="font-mono text-[10px] font-semibold text-ink/75">
                      {item.pages}P
                    </span>
                  </div>
                </div>

                {/* Active Indicator Pin */}
                {isActive && (
                  <span className="absolute -bottom-2 md:bottom-auto md:-right-2 top-auto md:top-1/2 md:-translate-y-1/2 left-1/2 md:left-auto -translate-x-1/2 md:translate-x-0 px-1.5 py-0.5 rounded-full bg-cherry-red text-white text-[9px] font-mono font-bold uppercase shadow-sm">
                    OPEN
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Shelf Plinth Bottom Support */}
        <div className="mt-2 h-3 rounded-md bg-gradient-to-r from-[#4A2A1A] via-[#593320] to-[#4A2A1A] shadow-inner border-t border-black/30" />
      </div>
    </div>
  );
}

export default BookshelfNav;
