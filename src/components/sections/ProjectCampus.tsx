// src/components/sections/ProjectCampus.tsx — BRIEF §15 Project Campus
import { useState } from 'react';
import { SectionHero } from '../hero/SectionHero';
import { TornSection } from '../torn/TornSection';
import { BookshelfNav } from '../campus/BookshelfNav';
import { FlipbookStage } from '../campus/FlipbookStage';
import { CampusInfoPanel } from '../campus/CampusInfoPanel';
import { SectionFooter } from '../ui/SectionFooter';
import { campus, CampusItem } from '../../data/campus';

export function ProjectCampus(): JSX.Element {
  const [activeId, setActiveId] = useState<string>('rush-07');

  const activeItem: CampusItem =
    campus.find((item) => item.id === activeId) ?? (campus[0] as CampusItem);

  return (
    <TornSection
      id="project-campus"
      seed={505}
      isNextSection={true}
      backgroundClass="bg-gradient-to-b from-[#FFE3CC] via-[#FFD3B0] to-[#FFC499] text-ink grain"
      className="relative w-full z-[21]"
    >
      {/* 15.1 Section Hero (tanpa gambar/video per BRIEF §15.1) */}
      <SectionHero
        headline={
          <>
            <span className="font-bold text-ink">From</span>{' '}
            <span className="font-bold italic text-cherry-red">The Campus</span>{' '}
            <span className="font-bold text-ink">For</span>{' '}
            <span className="font-bold italic text-cherry-red">The Story</span>
          </>
        }
        narration="Jakarta State Polytechnic was not only where I pursued my education it was also the stage where I first began creating meaningful work. It was here that I started building my identity as a creator, long before my name became recognized beyond the university environment."
        floatingMedia={[]}
        className="text-ink [&_.narration]:text-ink/80 [&_.headline]:text-ink"
      />

      {/* 15.2 Main Flipbook & Bookshelf Interactive Workspace */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 pb-16 pt-2">
        {/* Campus Stationery / Washi Accents */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b-2 border-dashed border-[#B88669]/40">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-white/70 border border-warm-grey font-mono text-xs font-bold uppercase tracking-wider text-ink shadow-xs">
              SECTION 05
            </span>
            <span className="font-mono text-xs font-semibold text-ink/70">
              EDITORIAL DESIGN &amp; PUBLICATION
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-ink/60">
            <span>DRAG / ARROW KEYS TO TURN PAGES</span>
            <span>✦</span>
            <span>3D INTERACTIVE FLIPBOOK</span>
          </div>
        </div>

        {/* 3-Column Layout on Desktop, Vertical Stack on Mobile */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 lg:gap-8">
          {/* Bookshelf Navigation (Left on desktop, horizontal bar on mobile) */}
          <div className="w-full lg:w-auto shrink-0 flex justify-center lg:block">
            <BookshelfNav
              items={campus}
              activeId={activeId}
              onSelect={(id) => setActiveId(id)}
              className="w-full max-w-md lg:max-w-none"
            />
          </div>

          {/* 3D Flipbook Stage (Center) */}
          <div className="flex-1 w-full min-w-0">
            <FlipbookStage
              campusId={activeId}
              className="w-full"
            />
          </div>

          {/* Publication Information Panel (Right on desktop, bottom on mobile) */}
          <div className="w-full lg:w-80 xl:w-96 shrink-0">
            <CampusInfoPanel item={activeItem} />
          </div>
        </div>

        {/* Section Footer per BRIEF §7.5 */}
        <div className="mt-12">
          <SectionFooter rightElement="THE CAMPUS · 02 PUBLICATIONS" />
        </div>
      </div>
    </TornSection>
  );
}

export default ProjectCampus;
