// src/components/archive/ArchiveTable.tsx — BRIEF §17.1 Archive Table
import { useState, useEffect, useRef } from 'react';
import { ArchiveItem, archive } from '../../data/archive';

export interface ShuffledArchiveItem extends ArchiveItem {
  displayNumber: string; // "01", "02", ...
}

export interface ArchiveTableProps {
  selectedItem: ArchiveItem;
  onSelect: (item: ArchiveItem) => void;
  className?: string;
}

/**
 * Shuffles items once on page load using Fisher-Yates algorithm,
 * renumbering 01..N strictly after shuffle (§17.1).
 */
function createShuffledArchive(): ShuffledArchiveItem[] {
  const activeItems = archive.filter((it) => it.enabled !== false);
  const array = [...activeItems];

  // Fisher-Yates shuffle
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i]!;
    array[i] = array[j]!;
    array[j] = temp;
  }

  // Renumber 01..N after shuffle
  return array.map((item, idx) => ({
    ...item,
    displayNumber: String(idx + 1).padStart(2, '0'),
  }));
}

export function ArchiveTable({
  selectedItem,
  onSelect,
  className = '',
}: ArchiveTableProps): JSX.Element {
  const [items, setItems] = useState<ShuffledArchiveItem[]>([]);
  const tableRef = useRef<HTMLDivElement>(null);

  // Run Fisher-Yates shuffle once on page load (§17.1)
  useEffect(() => {
    const shuffled = createShuffledArchive();
    setItems(shuffled);
    if (shuffled[0]) {
      onSelect(shuffled[0]);
    }
  }, [onSelect]);

  // Keyboard navigation (ArrowUp and ArrowDown)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (items.length === 0) return;
      const currentIdx = items.findIndex((it) => it.title === selectedItem.title);
      if (currentIdx === -1) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIdx = (currentIdx + 1) % items.length;
        const nextItem = items[nextIdx];
        if (nextItem) onSelect(nextItem);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIdx = (currentIdx - 1 + items.length) % items.length;
        const prevItem = items[prevIdx];
        if (prevItem) onSelect(prevItem);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [items, selectedItem, onSelect]);

  return (
    <div
      ref={tableRef}
      data-lenis-prevent="true"
      className={`relative w-full max-h-[640px] md:max-h-[720px] overflow-y-auto rounded-2xl bg-black/40 backdrop-blur-md border border-white/15 p-3 md:p-5 shadow-2xl grain ${className}`}
      aria-label="Archive Works Table"
    >
      {/* Table Header */}
      <div className="grid grid-cols-[38px_1fr] sm:grid-cols-[44px_1fr_120px] lg:grid-cols-[44px_1fr_110px_70px_100px] gap-2 pb-3 mb-2 border-b border-white/20 font-mono text-[11px] font-bold uppercase tracking-wider text-white/60 select-none">
        <span>No</span>
        <span>Title Of Work</span>
        <span className="hidden sm:block">Company</span>
        <span className="hidden lg:block">Format</span>
        <span className="hidden lg:block text-right">Type</span>
      </div>

      {/* Table Rows */}
      <div className="space-y-1">
        {items.map((item) => {
          const isSelected = item.title === selectedItem.title;

          return (
            <div
              key={item.title}
              role="button"
              tabIndex={0}
              onClick={() => onSelect(item)}
              onMouseEnter={() => onSelect(item)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelect(item);
                }
              }}
              className={`
                group relative grid grid-cols-[38px_1fr] sm:grid-cols-[44px_1fr_120px] lg:grid-cols-[44px_1fr_110px_70px_100px] items-center gap-2
                p-2.5 rounded-xl cursor-pointer transition-all duration-200 select-none
                ${
                  isSelected
                    ? 'bg-hot-pink/20 border border-hot-pink shadow-[0_4px_16px_rgba(255,46,147,0.25)] text-white'
                    : 'hover:bg-white/10 border border-transparent text-white/80 hover:text-white'
                }
              `}
            >
              {/* Numbering */}
              <span className="font-mono text-xs font-bold text-hot-pink">
                {item.displayNumber}.
              </span>

              {/* Title (Serif large) */}
              <div className="min-w-0 pr-2">
                <span className="font-serif italic text-sm md:text-base font-semibold leading-snug line-clamp-2">
                  {item.title}
                </span>

                {/* Read article link if URL exists */}
                {item.url && (
                  <div className="mt-1">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 font-mono text-[10px] text-hot-pink hover:text-bubblegum hover:underline uppercase tracking-wider"
                    >
                      <span>Read article</span>
                      <span>↗</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Company */}
              <span className="hidden sm:block font-mono text-[11px] text-white/70 truncate uppercase">
                {item.company}
              </span>

              {/* Format */}
              <span className="hidden lg:block font-mono text-[10px] text-pink-200/80 uppercase">
                {item.format}
              </span>

              {/* Type */}
              <span className="hidden lg:block font-mono text-[10px] text-white/60 text-right truncate uppercase">
                {item.type}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ArchiveTable;
