import { FloatingMediaItem, SectionHero } from '../hero/SectionHero';
import { RunwayStage } from '../runway/RunwayStage';
import { TornSection } from '../torn/TornSection';
import { SectionFooter } from '../ui/SectionFooter';
import { EmbeddedIndexButton } from '../nav/EmbeddedIndexButton';

const HERO_VIDEOS: FloatingMediaItem[] = [
  { id: 'cm-1', file: 'Hasil Konten Hardselling Lassiewear.mp4', kind: 'video', x: 12, y: 24, initialRotation: -6 },
  { id: 'cm-2', file: 'kecantikan_2.mp4', kind: 'video', x: 88, y: 20, initialRotation: 7 },
  { id: 'cm-3', file: 'Hasil Konten Education Lassiewear.mp4', kind: 'video', x: 8, y: 68, initialRotation: 5 },
  { id: 'cm-4', file: 'kuliner_2.mp4', kind: 'video', x: 92, y: 65, initialRotation: -8 },
  { id: 'cm-5', file: 'travel_1.mp4', kind: 'video', x: 24, y: 88, initialRotation: -4 },
  { id: 'cm-6', file: 'travel_2.mp4', kind: 'video', x: 76, y: 86, initialRotation: 6 },
];

export function ContentMarketing(): JSX.Element {
  return (
    <TornSection
      id="content-marketing"
      seed={303}
      isNextSection={true}
      backgroundClass="bg-gradient-to-b from-[#2A0F2E] via-[#3B1538] to-[#1F0A23] text-white grain"
      className="relative w-full z-[23]"
    >
      {/* Dedicated In-Section INDEX Button (Content Marketing kanan atas per BRIEF §7) */}
      <div className="absolute top-6 right-6 md:top-8 md:right-12 z-30">
        <EmbeddedIndexButton dark={true} />
      </div>
      {/* 13.1 Section Hero */}
      <SectionHero
        headline={
          <>
            <span className="font-bold italic text-candy-pink">From Ordinary Content to</span>{' '}
            <span className="font-bold text-white">Memorable Stories</span>
          </>
        }
        narration="I used to wonder: Why does one post go viral while another fades unnoticed? That curiosity led me deeper into understanding algorithms, content psychology, and audience behavior. It was there that I realized that creating content is not just about publishing it is about understanding people."
        floatingMedia={HERO_VIDEOS}
        className="text-white [&_.narration]:text-pink-100/90 [&_.headline]:text-white"
      />

      {/* 13.2 Catwalk Runway Stage */}
      <div className="relative z-10 w-full py-6 md:py-12">
        <RunwayStage />
      </div>

      {/* Section Footer per BRIEF §7.5 */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        <SectionFooter dark rightElement="CONTENT MARKETING · 06 CASES" />
      </div>
    </TornSection>
  );
}
