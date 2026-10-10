// src/components/sections/Podcast.tsx — BRIEF §16 Podcast
import { SectionHero } from '../hero/SectionHero';
import { SpotifyEmbed } from '../podcast/SpotifyEmbed';
import { SectionFooter } from '../ui/SectionFooter';

export function Podcast(): JSX.Element {
  return (
    <section
      id="podcast"
      className="torn-next-section relative w-full bg-gradient-to-b from-[#251028] via-[#1E0B22] to-[#150718] text-white grain z-[20] overflow-hidden"
    >
      {/* 16.1 Section Hero (tanpa media per BRIEF §16.1) */}
      <div className="relative w-full flex flex-col items-center">
        {/* Eyebrow in DM Mono */}
        <div className="pt-16 md:pt-24 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cherry-red animate-pulse" />
          <span className="font-mono text-xs uppercase font-bold tracking-widest text-pink-200/80">
            PODCAST
          </span>
        </div>

        <SectionHero
          headline={
            <>
              <span className="font-bold text-white">Behind</span>{' '}
              <span className="font-bold italic text-cherry-red">the Microphone</span>
            </>
          }
          narration={
            <div className="flex flex-col gap-2">
              <p>Being a producer is not simply about taking control.</p>
              <p>It is about becoming the most attentive listener before anyone else is ready to listen.</p>
            </div>
          }
          floatingMedia={[]}
          className="text-white py-8 md:py-12 min-h-auto md:min-h-auto [&_.narration]:text-pink-100/90 [&_.headline]:text-white"
        />
      </div>

      {/* 16.2 Spotify Player Cards & Credits */}
      <div className="relative z-10 pb-12 pt-4">
        <SpotifyEmbed />
      </div>

      {/* Section Footer per BRIEF §7.5 */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pb-4">
        <SectionFooter dark rightElement="KARTINI PODCAST · 02 EPISODES" />
      </div>
    </section>
  );
}

export default Podcast;
