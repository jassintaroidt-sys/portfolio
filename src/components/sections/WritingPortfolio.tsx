import { FloatingMediaItem, SectionHero } from '../hero/SectionHero';
import { DiscRow } from '../cassette/DiscRow';
import { TornSection } from '../torn/TornSection';
import { SectionFooter } from '../ui/SectionFooter';
import { EmbeddedIndexButton } from '../nav/EmbeddedIndexButton';

const HERO_MEDIA: FloatingMediaItem[] = [
  { id: 'imn-1', file: 'IMN_1.png', kind: 'image', x: 12, y: 22, initialRotation: -8, alt: 'Independen Media article 1' },
  { id: 'imn-2', file: 'IMN_2.png', kind: 'image', x: 88, y: 18, initialRotation: 6, alt: 'Independen Media article 2' },
  { id: 'innalar-1', file: 'innalar_1.png', kind: 'image', x: 8, y: 70, initialRotation: 5, alt: 'innalar.com article 1' },
  { id: 'innalar-2', file: 'innalar_2.png', kind: 'image', x: 92, y: 66, initialRotation: -7, alt: 'innalar.com article 2' },
  { id: 'ikapunija-1', file: 'Ikapunija_1.png', kind: 'image', x: 25, y: 88, initialRotation: -4, alt: 'Ikapunija Media article 1' },
  { id: 'ikapunija-2', file: 'Ikapunija_2.png', kind: 'image', x: 75, y: 86, initialRotation: 8, alt: 'Ikapunija Media article 2' },
];

export function WritingPortfolio(): JSX.Element {
  return (
    <TornSection
      id="writing-portfolio"
      seed={202}
      backgroundClass="bg-gradient-to-b from-[#F9F7F5] via-[#F4EFF1] to-[#E9EBF2] grain"
      className="relative w-full text-ink z-[24]"
    >
      {/* 12.1 Section Hero */}
      <SectionHero
        headline={
          <>
            <span className="font-bold italic text-hot-pink">Storytelling</span>{' '}
            <span className="font-bold">Through Screens</span>
          </>
        }
        narration="We used to flip through newspapers and magazines; now, we scroll through mobile screens. Over the past five years, I have studied this transformation and become an online news writer, adapting to the ever-changing landscape of digital media."
        floatingMedia={HERO_MEDIA}
      />

      {/* 12.2 Interactive 3D Discs Carousel */}
      <div className="relative z-10 w-full py-8 md:py-16">
        <DiscRow />

        {/* Dedicated In-Section INDEX Button (Cassette kanan bawah per BRIEF §7) */}
        <div className="w-full max-w-7xl mx-auto px-4 flex justify-end pt-4 pb-2">
          <EmbeddedIndexButton dark={false} />
        </div>
      </div>

      {/* Section Footer per BRIEF §7.5 */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        <SectionFooter rightElement="DISC CASSETTE · 06 SELECTIONS" />
      </div>
    </TornSection>
  );
}
