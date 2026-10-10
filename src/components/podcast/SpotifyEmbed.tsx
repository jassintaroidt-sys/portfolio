// src/components/podcast/SpotifyEmbed.tsx — BRIEF §16.2 Spotify Player Cards
import { useState } from 'react';
import { PODCAST_EPISODES, PODCAST_CREDITS, SpotifyEpisode } from '../../data/podcast';

export interface SpotifyEmbedProps {
  className?: string;
}

export function SpotifyEmbed({ className = '' }: SpotifyEmbedProps): JSX.Element {
  const [loadedFrames, setLoadedFrames] = useState<Record<string, boolean>>({});

  const handleFrameLoad = (id: string) => {
    setLoadedFrames((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className={`relative flex flex-col items-center w-full max-w-5xl mx-auto px-4 ${className}`}>
      {/* Studio Header Subtitle & Broadcast Signal */}
      <div className="flex items-center gap-3 mb-8">
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cherry-red/10 border border-cherry-red/30 text-cherry-red font-mono text-xs font-bold uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-cherry-red animate-pulse" />
          ON AIR
        </span>
        <span className="font-mono text-xs text-ink/70 uppercase tracking-widest">
          OFFICIAL SPOTIFY BROADCAST
        </span>
      </div>

      {/* 2 Spotify Player Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-12">
        {PODCAST_EPISODES.map((ep: SpotifyEpisode, idx: number) => {
          return (
            <div
              key={ep.id}
              className="relative flex flex-col p-5 md:p-6 rounded-2xl bg-milk-white/95 text-ink border-2 border-warm-grey shadow-[0_12px_36px_rgba(42,15,46,0.14)] grain overflow-hidden group hover:border-hot-pink transition-all duration-300"
            >
              {/* Studio Card Header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-warm-grey/70">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-cherry-red">
                    0{idx + 1}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-ink">
                    {ep.title}
                  </h3>
                </div>
                <a
                  href={ep.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-full bg-[#1DB954]/10 hover:bg-[#1DB954]/20 border border-[#1DB954]/40 text-[#1DB954] font-mono text-[11px] font-bold tracking-tight transition-colors flex items-center gap-1.5"
                  title="Listen directly on Spotify"
                >
                  <span>Spotify</span>
                  <span className="text-[10px]">↗</span>
                </a>
              </div>

              <p className="font-poppins text-xs text-ink/75 mb-4 italic">
                {ep.subtitle}
              </p>

              {/* Responsive Iframe Container */}
              <div className="relative w-full h-[152px] sm:h-[180px] md:h-[232px] rounded-xl overflow-hidden bg-black/5 border border-warm-grey/60">
                {/* Fallback & Loading Placeholder */}
                {!loadedFrames[ep.id] && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-milk-white text-center z-0">
                    <span className="font-mono text-xs text-ink/60 mb-2">
                      Loading Spotify Player...
                    </span>
                    <a
                      href={ep.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-[#1DB954] text-white font-mono text-xs font-bold hover:bg-[#1AA34A] transition-colors"
                    >
                      Open on Spotify
                    </a>
                  </div>
                )}

                <iframe
                  src={ep.embedUrl}
                  title={`Spotify Episode: ${ep.title} - Kartini Podcast`}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  onLoad={() => handleFrameLoad(ep.id)}
                  className="relative z-10 w-full h-full rounded-xl"
                />
              </div>

              {/* Listening Notice */}
              <div className="mt-3 text-right">
                <span className="font-mono text-[10px] text-ink/50">
                  Full playback requires Spotify login
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Credit Block per BRIEF §16.2 */}
      <div className="w-full max-w-md p-6 rounded-2xl bg-milk-white/90 border-2 border-warm-grey shadow-md text-ink grain">
        <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-cherry-red mb-3 flex items-center gap-2">
          <span>✦</span> PRODUCTION CREDIT
        </h4>
        <dl className="grid grid-cols-[100px_1fr] gap-y-2 text-xs md:text-sm font-poppins">
          <dt className="font-mono text-ink/60 uppercase text-[11px]">Script:</dt>
          <dd className="font-semibold text-ink">{PODCAST_CREDITS.script}</dd>

          <dt className="font-mono text-ink/60 uppercase text-[11px]">Hosts:</dt>
          <dd className="font-semibold text-ink">{PODCAST_CREDITS.hosts}</dd>

          <dt className="font-mono text-ink/60 uppercase text-[11px]">Spotify:</dt>
          <dd className="font-semibold text-cherry-red">{PODCAST_CREDITS.podcastName}</dd>
        </dl>
      </div>
    </div>
  );
}

export default SpotifyEmbed;
