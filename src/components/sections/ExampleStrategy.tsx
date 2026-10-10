import { FloatingMediaItem, SectionHero } from '../hero/SectionHero';
import { CurvedRevealStage } from '../reveal3d/CurvedRevealStage';
import { TornSection } from '../torn/TornSection';
import { SectionFooter } from '../ui/SectionFooter';
import { EmbeddedIndexButton } from '../nav/EmbeddedIndexButton';

const HERO_VIDEOS: FloatingMediaItem[] = [
  {
    id: 'strat-hero-edu',
    file: 'Hasil Konten Education Lassiewear.mp4',
    kind: 'video',
    x: 12,
    y: 24,
    initialRotation: -6,
  },
  {
    id: 'strat-hero-hs',
    file: 'Hasil Konten Hardselling Lassiewear.mp4',
    kind: 'video',
    x: 88,
    y: 20,
    initialRotation: 7,
  },
  {
    id: 'strat-hero-ent',
    file: 'Hasil Konten Entertainment Lassiewear.mp4',
    kind: 'video',
    x: 10,
    y: 72,
    initialRotation: 5,
  },
  {
    id: 'strat-hero-fun',
    file: 'Hasil Konten Fun Lassiewear.mp4',
    kind: 'video',
    x: 90,
    y: 68,
    initialRotation: -7,
  },
];

export function ExampleStrategy(): JSX.Element {
  return (
    <TornSection
      id="example-strategy"
      seed={404}
      isNextSection={true}
      backgroundClass="bg-gradient-to-b from-[#1E0B22] via-[#140616] to-[#0D030E] text-white grain"
      className="relative w-full z-[22]"
    >
      {/* 14.1 Section Hero */}
      <SectionHero
        headline={
          <>
            <span className="font-bold text-white">From</span>{' '}
            <span className="font-bold italic text-hot-pink">Scrolling</span>{' '}
            <span className="font-bold text-white">to</span>{' '}
            <span className="font-bold italic text-hot-pink">Strategy</span>
          </>
        }
        narration="I found the perfect canvas when I joined a fashion brand that did not merely sell clothing it sold lifestyle and confidence. This was where I began building content strategies with genuine purpose and personality."
        floatingMedia={HERO_VIDEOS}
        className="text-white [&_.narration]:text-pink-100/90 [&_.headline]:text-white"
      />

      {/* 14.2 3D Curved Video Reveal Stage */}
      <div className="relative z-10 w-full pt-2 pb-6">
        <CurvedRevealStage />

        {/* Dedicated In-Section INDEX Button (Video Reveal kanan bawah per BRIEF §7) */}
        <div className="w-full max-w-7xl mx-auto px-4 flex justify-end pt-4 pb-2">
          <EmbeddedIndexButton dark={true} />
        </div>
      </div>

      {/* Section Footer per BRIEF §7.5 */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pb-2">
        <SectionFooter dark rightElement="EXAMPLE STRATEGY · 04 PILLARS" />
      </div>
    </TornSection>
  );
}

export default ExampleStrategy;
