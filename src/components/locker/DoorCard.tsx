import { useState, useRef } from 'react';
import { Pushpin } from '../ui/Pushpin';
import { mediaUrl } from '../../lib/media';

export interface DoorCardProps {
  variant: 'services' | 'intro' | 'stack';
  className?: string;
  style?: React.CSSProperties;
}

export function DoorCard({ variant, className = '', style }: DoorCardProps): JSX.Element {
  // Video player state for variant === 'intro'
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay policy fallback
      });
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  if (variant === 'services') {
    // ================= LOCKER 01: SERVICES =================
    const services = [
      'Social Media Manager',
      'Social Media Strategy',
      'SEO Writing',
      'Video Content',
      'Graphic Designer',
      'Editorial Planning',
      'Copywriting',
    ];

    return (
      <div
        className={`relative w-full h-full flex flex-col items-center justify-between p-[calc(40*var(--px))] select-none ${className}`}
        style={style}
      >
        {/* Paper Card Sheet */}
        <div
          className="relative w-full h-full rounded-[calc(12*var(--px))] flex flex-col justify-between items-center px-[calc(42*var(--px))] py-[calc(48*var(--px))] overflow-hidden"
          style={{
            backgroundColor: '#FFFDF9',
            backgroundImage: 'radial-gradient(circle at 50% 30%, #FFFFFF 0%, #FFF8EE 100%)',
            boxShadow: `
              0 calc(12*var(--px)) calc(28*var(--px)) rgba(0,0,0,0.35),
              inset 0 0 calc(20*var(--px)) rgba(255,214,232,0.4)
            `,
          }}
        >
          {/* Top Pushpin */}
          <div className="absolute top-[calc(18*var(--px))] left-1/2 -translate-x-1/2 z-20">
            <Pushpin color="hot-pink" size={Math.round(80 * 0.3)} />
          </div>

          {/* Top Header Group */}
          <div className="flex flex-col items-center pt-[calc(34*var(--px))] w-full">
            {/* Tag SERVICES */}
            <div
              className="bg-[#FFE2EE] text-[#D81B72] px-[calc(28*var(--px))] py-[calc(8*var(--px))] rounded-full font-bold uppercase tracking-[calc(3*var(--px))] text-[calc(17*var(--px))] select-none"
            >
              SERVICES
            </div>

            {/* Sub-tag */}
            <span
              className="text-[#FF2E93] text-[calc(17*var(--px))] font-semibold tracking-wider mt-[calc(10*var(--px))]"
            >
              ✦ CAPABILITIES
            </span>

            {/* Main Heading: "I Can Help You With:" */}
            <h2
              className="text-[#2A0F2E] font-bold text-center mt-[calc(10*var(--px))] leading-tight"
              style={{
                fontFamily: 'Sentient, serif',
                fontSize: 'calc(42*var(--px))',
              }}
            >
              I Can Help You With:
            </h2>
          </div>

          {/* 7 White Rounded Pills with Pink Checkmarks */}
          <div className="w-full flex flex-col gap-[calc(16*var(--px))] my-auto px-[calc(10*var(--px))]">
            {services.map((item, idx) => (
              <div
                key={idx}
                className="w-full bg-white rounded-full flex items-center px-[calc(20*var(--px))] py-[calc(14*var(--px))]"
                style={{
                  boxShadow: `
                    0 calc(4*var(--px)) calc(8*var(--px)) rgba(0,0,0,0.06),
                    0 calc(1*var(--px)) calc(2*var(--px)) rgba(0,0,0,0.04)
                  `,
                }}
              >
                {/* Pink Circle Checkmark */}
                <div
                  className="w-[calc(32*var(--px))] h-[calc(32*var(--px))] rounded-full bg-[#FFE2EE] flex items-center justify-center flex-shrink-0 mr-[calc(16*var(--px))]"
                >
                  <svg
                    width="calc(18*var(--px))"
                    height="calc(18*var(--px))"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FF2E93"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                {/* Item Label */}
                <span
                  className="text-[#3A1434] font-semibold tracking-wide text-[calc(22*var(--px))]"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom Footer: etc. with Sparkle Star */}
          <div className="w-full flex items-center justify-center relative pt-[calc(10*var(--px))]">
            <span
              className="text-[#FF2E93] text-[calc(32*var(--px))] font-normal select-none"
              style={{ fontFamily: 'Pinyon Script, cursive' }}
            >
              etc.
            </span>
            {/* Lavender Sparkle Star */}
            <div className="absolute right-[calc(40*var(--px))] top-1/2 -translate-y-1/2 opacity-70">
              <svg width="calc(28*var(--px))" height="calc(28*var(--px))" viewBox="0 0 24 24" fill="#BFA8E5">
                <path d="M12 0 L14 9 L23 12 L14 15 L12 24 L10 15 L1 12 L10 9 Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'intro') {
    // ================= LOCKER 03: SELF INTRODUCTION & VIDEO =================
    return (
      <div
        className={`relative w-full h-full flex flex-col items-center justify-between p-[calc(40*var(--px))] select-none ${className}`}
        style={style}
      >
        {/* Paper Card Sheet */}
        <div
          className="relative w-full h-full rounded-[calc(12*var(--px))] flex flex-col justify-between items-center px-[calc(42*var(--px))] py-[calc(48*var(--px))] overflow-hidden"
          style={{
            backgroundColor: '#FFFDF9',
            backgroundImage: 'radial-gradient(circle at 50% 30%, #FFFFFF 0%, #FFF8EE 100%)',
            boxShadow: `
              0 calc(12*var(--px)) calc(28*var(--px)) rgba(0,0,0,0.35),
              inset 0 0 calc(20*var(--px)) rgba(255,214,232,0.4)
            `,
          }}
        >
          {/* Top Pushpin (Cherry-Red) */}
          <div className="absolute top-[calc(18*var(--px))] left-1/2 -translate-x-1/2 z-20">
            <Pushpin color="cherry-red" size={Math.round(80 * 0.3)} />
          </div>

          {/* Top Header Group */}
          <div className="flex flex-col items-center pt-[calc(34*var(--px))] w-full">
            {/* Tag HELLO */}
            <div
              className="bg-[#FFE5EC] text-[#E5173F] px-[calc(28*var(--px))] py-[calc(8*var(--px))] rounded-full font-bold uppercase tracking-[calc(3*var(--px))] text-[calc(17*var(--px))] select-none"
            >
              HELLO, I AM JASSINTA
            </div>

            {/* Sub-tag */}
            <span
              className="text-[#E5173F] text-[calc(17*var(--px))] font-semibold tracking-wider mt-[calc(10*var(--px))]"
            >
              ✦ SELF INTRODUCTION
            </span>

            {/* Heading: Behind the Creative Lens */}
            <h2
              className="text-[#2A0F2E] font-bold text-center mt-[calc(10*var(--px))] leading-tight"
              style={{
                fontFamily: 'Sentient, serif',
                fontSize: 'calc(42*var(--px))',
              }}
            >
              Behind the Creative Lens
            </h2>
          </div>

          {/* Video Player Box (9:16 Portrait Ratio) */}
          <div
            className="relative w-full rounded-[calc(16*var(--px))] overflow-hidden my-auto flex flex-col items-center justify-between p-[calc(20*var(--px))]"
            style={{
              height: 'calc(1680 * var(--px))',
              backgroundColor: '#180B22',
              boxShadow: `
                0 calc(16*var(--px)) calc(30*var(--px)) rgba(0,0,0,0.5),
                inset 0 0 calc(20*var(--px)) rgba(255,46,147,0.2)
              `,
            }}
          >
            {/* Native Video Element */}
            <video
              ref={videoRef}
              src={mediaUrl('video/intro.mp4')}
              className="absolute inset-0 w-full h-full object-cover"
              playsInline
              loop
              muted={isMuted}
              preload="none"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />

            {/* Top Video Overlay Tint */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 pointer-events-none" />

            {/* Video Label Watermark when paused */}
            {!isPlaying && (
              <div className="relative z-10 pt-[calc(30*var(--px))] text-center pointer-events-none">
                <span className="text-white/80 font-mono text-[calc(16*var(--px))] tracking-wider">
                  Intro Video (1080×1920)
                </span>
              </div>
            )}

            {/* Big Center Play / Pause Button Overlay */}
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause Intro Video' : 'Play Intro Video'}
              className="relative z-10 m-auto rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 focus-visible:ring-4 focus-visible:ring-hot-pink"
              style={{
                width: 'calc(146 * var(--px))',
                height: 'calc(146 * var(--px))',
                backgroundColor: isPlaying ? 'rgba(0,0,0,0.5)' : '#FF2E93',
                boxShadow: isPlaying ? 'none' : '0 calc(8*var(--px)) calc(20*var(--px)) rgba(255,46,147,0.6)',
              }}
            >
              {isPlaying ? (
                /* Pause Icon */
                <svg width="calc(48*var(--px))" height="calc(48*var(--px))" viewBox="0 0 24 24" fill="white">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                /* Play Triangle Icon (64 units) */
                <svg
                  width="calc(64*var(--px))"
                  height="calc(64*var(--px))"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="ml-[calc(6*var(--px))]"
                >
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              )}
            </button>

            {/* Bottom Controls Bar (Play/Pause & Mute/Unmute) */}
            <div className="relative z-10 w-full flex items-center justify-between px-[calc(16*var(--px))] pb-[calc(10*var(--px))]">
              {/* Play/Pause Button (diameter 76) */}
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                className="rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center text-white transition-transform active:scale-90"
                style={{
                  width: 'calc(76 * var(--px))',
                  height: 'calc(76 * var(--px))',
                }}
              >
                {isPlaying ? (
                  <svg width="calc(28*var(--px))" height="calc(28*var(--px))" viewBox="0 0 24 24" fill="white">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg width="calc(28*var(--px))" height="calc(28*var(--px))" viewBox="0 0 24 24" fill="white" className="ml-[calc(2*var(--px))]">
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                )}
              </button>

              {/* Mute/Unmute Button (diameter 76) */}
              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                className="rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center text-white transition-transform active:scale-90"
                style={{
                  width: 'calc(76 * var(--px))',
                  height: 'calc(76 * var(--px))',
                }}
              >
                {isMuted ? (
                  /* Muted Speaker Icon */
                  <svg width="calc(30*var(--px))" height="calc(30*var(--px))" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </svg>
                ) : (
                  /* Audio Speaker Wave Icon */
                  <svg width="calc(30*var(--px))" height="calc(30*var(--px))" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Quote Footer: Serif Italic Bold */}
          <div className="w-full text-center pt-[calc(14*var(--px))]">
            <p
              className="text-[#3A1434] font-bold italic"
              style={{
                fontFamily: 'Sentient, serif',
                fontSize: 'calc(26*var(--px))',
              }}
            >
              &ldquo;Telling stories that resonate &amp; stay.&rdquo;
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ================= LOCKER 05: STACK & TOOLS =================
  const tools = [
    'Instagram',
    'TikTok',
    'Facebook',
    'Google Business Profile',
    'Canva',
    'Capcut',
    'Adobe Suites',
  ];

  return (
    <div
      className={`relative w-full h-full flex flex-col items-center justify-between p-[calc(40*var(--px))] select-none ${className}`}
      style={style}
    >
      {/* Paper Card Sheet (Lavender tint) */}
      <div
        className="relative w-full h-full rounded-[calc(12*var(--px))] flex flex-col justify-between items-center px-[calc(42*var(--px))] py-[calc(48*var(--px))] overflow-hidden"
        style={{
          backgroundColor: '#F7F5FC',
          backgroundImage: 'radial-gradient(circle at 50% 30%, #FFFFFF 0%, #EDE9F8 100%)',
          boxShadow: `
            0 calc(12*var(--px)) calc(28*var(--px)) rgba(0,0,0,0.35),
            inset 0 0 calc(20*var(--px)) rgba(191,168,229,0.3)
          `,
        }}
      >
        {/* Top Pushpin (Wisteria Purple) */}
        <div className="absolute top-[calc(18*var(--px))] left-1/2 -translate-x-1/2 z-20">
          <Pushpin color="wisteria" size={Math.round(80 * 0.3)} />
        </div>

        {/* Top Header Group */}
        <div className="flex flex-col items-center pt-[calc(34*var(--px))] w-full">
          {/* Tag STACK & TOOLS */}
          <div
            className="bg-[#EAE4F7] text-[#7B4FB8] px-[calc(28*var(--px))] py-[calc(8*var(--px))] rounded-full font-bold uppercase tracking-[calc(3*var(--px))] text-[calc(17*var(--px))] select-none"
          >
            STACK &amp; TOOLS
          </div>

          {/* Sub-tag */}
          <span
            className="text-[#7B4FB8] text-[calc(17*var(--px))] font-semibold tracking-wider mt-[calc(10*var(--px))]"
          >
            ▭ EXPERTISE
          </span>

          {/* Main Heading: "Platform I Am Proficient in:" */}
          <h2
            className="text-[#2A0F2E] font-bold text-center mt-[calc(10*var(--px))] leading-tight"
            style={{
              fontFamily: 'Sentient, serif',
              fontSize: 'calc(42*var(--px))',
            }}
          >
            Platform I Am Proficient in:
          </h2>
        </div>

        {/* 7 White Rounded Pills with Purple Checkmarks */}
        <div className="w-full flex flex-col gap-[calc(16*var(--px))] my-auto px-[calc(10*var(--px))]">
          {tools.map((item, idx) => (
            <div
              key={idx}
              className="w-full bg-white rounded-full flex items-center px-[calc(20*var(--px))] py-[calc(14*var(--px))]"
              style={{
                boxShadow: `
                  0 calc(4*var(--px)) calc(8*var(--px)) rgba(0,0,0,0.06),
                  0 calc(1*var(--px)) calc(2*var(--px)) rgba(0,0,0,0.04)
                `,
              }}
            >
              {/* Purple Circle Checkmark */}
              <div
                className="w-[calc(32*var(--px))] h-[calc(32*var(--px))] rounded-full bg-[#EAE4F7] flex items-center justify-center flex-shrink-0 mr-[calc(16*var(--px))]"
              >
                <svg
                  width="calc(18*var(--px))"
                  height="calc(18*var(--px))"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#7B4FB8"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              {/* Item Label (clean wrapping for long strings) */}
              <span
                className="text-[#2A0F2E] font-semibold tracking-wide text-[calc(22*var(--px))] leading-tight"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {item}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom Footer: CERTIFIED & EXPERIENCED */}
        <div className="w-full text-center pt-[calc(10*var(--px))]">
          <span
            className="text-[#7B4FB8] font-mono font-bold tracking-[calc(4*var(--px))] text-[calc(16*var(--px))] uppercase"
          >
            CERTIFIED &amp; EXPERIENCED
          </span>
        </div>
      </div>
    </div>
  );
}
