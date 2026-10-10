// src/components/sections/Archive.tsx — BRIEF §17 Archive Section
import { useState } from 'react';
import { TornSection } from '../torn/TornSection';
import { ArchivePreview } from '../archive/ArchivePreview';
import { ArchiveTable } from '../archive/ArchiveTable';
import { ArchiveItem, archive } from '../../data/archive';
import { mediaUrl } from '../../lib/media';
import { EmbeddedIndexButton } from '../nav/EmbeddedIndexButton';
import { SectionFooter } from '../ui/SectionFooter';

export function Archive(): JSX.Element {
  const activeItems = archive.filter((it) => it.enabled !== false);
  const [selectedItem, setSelectedItem] = useState<ArchiveItem>(() => activeItems[0]!);

  return (
    <TornSection
      id="archive"
      seed={606}
      backgroundClass="bg-gradient-to-b from-[#1C0820] via-[#140517] to-[#0A020C] text-white grain"
      className="relative w-full z-[15]"
    >
      {/* Dynamic Blurred Media Background Overlay per BRIEF §17.1 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {selectedItem.kind === 'video' ? (
          <video
            key={selectedItem.file}
            src={mediaUrl(`video/${selectedItem.file}`)}
            muted
            loop
            playsInline
            autoPlay
            className="w-full h-full object-cover blur-3xl opacity-20 scale-125"
          />
        ) : (
          <img
            key={selectedItem.file}
            src={mediaUrl(`img/${selectedItem.file}`)}
            alt=""
            className="w-full h-full object-cover blur-3xl opacity-20 scale-125"
          />
        )}
        {/* 50% overlay plum-night + film grain */}
        <div className="absolute inset-0 bg-[#2A0F2E]/60 mix-blend-multiply" />
        <div className="absolute inset-0 opacity-40 mix-blend-overlay grain" />
      </div>

      {/* Main Section Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 pt-16 md:pt-24 pb-16">
        {/* Section Header with Embedded INDEX Button (Archive kanan atas per BRIEF §7) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-8 border-b border-white/20">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-hot-pink animate-pulse" />
              <span className="font-mono text-xs uppercase font-bold tracking-widest text-pink-200/80">
                PORTFOLIO ARCHIVE
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Selected Works &amp; Publications
            </h2>
          </div>

          <div className="flex items-center sm:items-end flex-col gap-3">
            <EmbeddedIndexButton dark={true} />
            <div className="font-mono text-xs text-white/60 text-right">
              <span>TOTAL: {activeItems.length} WORKS</span>
              <span className="block text-[10px] text-hot-pink mt-0.5">RANDOMIZED ON EACH LOAD</span>
            </div>
          </div>
        </div>

        {/* 2-Column Desktop Layout / Sticky Mobile Layout per BRIEF §17.1 */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Shuffled Works Table (Desktop: 7 cols, Mobile: below preview) */}
          <div className="order-2 lg:order-1 lg:col-span-7 w-full">
            <ArchiveTable
              selectedItem={selectedItem}
              onSelect={(item) => setSelectedItem(item)}
            />
          </div>

          {/* Right Column: Dynamic Media Preview Panel (Desktop: 5 cols, Mobile: sticky on top) */}
          <div className="order-1 lg:order-2 lg:col-span-5 w-full sticky top-4 lg:top-8 z-20">
            <ArchivePreview item={selectedItem} />
          </div>
        </div>

        {/* Section Footer per BRIEF §7.5 */}
        <div className="mt-12">
          <SectionFooter dark rightElement="PORTFOLIO ARCHIVE · 34 WORKS" />
        </div>
      </div>
    </TornSection>
  );
}

export default Archive;
