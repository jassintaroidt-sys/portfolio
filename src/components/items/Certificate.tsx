import { HoverLabel } from '../ui/HoverLabel';

export interface CertificateProps {
  interactive?: boolean;
}

export function Certificate({ interactive = true }: CertificateProps): JSX.Element {
  const handleClick = () => {
    if (interactive) {
      window.location.hash = '#/participation';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (interactive && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      window.location.hash = '#/participation';
    }
  };

  const content = (
    <div
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label="Certificate of Participation — View participation details"
      className="relative select-none outline-none group cursor-pointer focus-visible:ring-4 focus-visible:ring-hot-pink rounded-sm"
      style={{
        width: 'calc(960 * var(--px))',
        height: 'calc(700 * var(--px))',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Hanging Golden String & Pins */}
      <svg
        className="absolute -top-[calc(60*var(--px))] left-1/2 -translate-x-1/2 overflow-visible pointer-events-none"
        width="calc(700 * var(--px))"
        height="calc(70 * var(--px))"
        viewBox="0 0 700 70"
        fill="none"
      >
        <path
          d="M 120 70 Q 350 15 580 70"
          stroke="url(#cert-gold-cord)"
          strokeWidth="3.5"
          strokeDasharray="4 2"
        />
        {/* Wall hanging pins */}
        <circle cx="120" cy="68" r="7" fill="#C59B27" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.5))" />
        <circle cx="120" cy="68" r="4" fill="#FFE57F" />
        <circle cx="580" cy="68" r="7" fill="#C59B27" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.5))" />
        <circle cx="580" cy="68" r="4" fill="#FFE57F" />
        <defs>
          <linearGradient id="cert-gold-cord" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#C59B27" />
            <stop offset="50%" stopColor="#FFE082" />
            <stop offset="100%" stopColor="#C59B27" />
          </linearGradient>
        </defs>
      </svg>

      {/* 3D Frame Outer & Bevel Box */}
      <div
        className="w-full h-full relative rounded-[calc(8*var(--px))] p-[calc(26*var(--px))] transition-transform duration-300 group-hover:scale-[1.015]"
        style={{
          background: 'linear-gradient(135deg, #ECC86A 0%, #B8860B 28%, #FFE599 50%, #996515 75%, #F4D068 100%)',
          boxShadow: `
            0 calc(12*var(--px)) calc(24*var(--px)) rgba(0,0,0,0.45),
            inset 0 0 calc(16*var(--px)) rgba(0,0,0,0.4),
            inset calc(2*var(--px)) calc(2*var(--px)) calc(4*var(--px)) rgba(255,255,255,0.7),
            inset calc(-2*var(--px)) calc(-2*var(--px)) calc(4*var(--px)) rgba(0,0,0,0.6)
          `,
        }}
      >
        {/* Inner Gold Carved Relief Border */}
        <div
          className="w-full h-full relative rounded-[calc(4*var(--px))] p-[calc(14*var(--px))]"
          style={{
            background: 'linear-gradient(145deg, #7A4F01 0%, #D4AF37 35%, #FFF2B2 50%, #8C5A00 85%, #593900 100%)',
            boxShadow: 'inset 0 0 calc(10*var(--px)) rgba(0,0,0,0.6)',
          }}
        >
          {/* Parchment Certificate Paper */}
          <div
            className="w-full h-full relative flex flex-col items-center justify-between p-[calc(28*var(--px))] text-center overflow-hidden"
            style={{
              backgroundColor: '#FCF8ED',
              backgroundImage: 'radial-gradient(ellipse at 50% 40%, #FFFDF7 0%, #F5ECCE 100%)',
              boxShadow: 'inset 0 0 calc(18*var(--px)) rgba(138, 102, 34, 0.22)',
            }}
          >
            {/* Fine Golden Flourish Border */}
            <div
              className="absolute inset-[calc(12*var(--px))] pointer-events-none rounded-[calc(2*var(--px))]"
              style={{
                border: 'calc(1.5*var(--px)) double #B8860B',
                boxShadow: 'inset 0 0 0 calc(3*var(--px)) #FCF8ED, inset 0 0 0 calc(4.5*var(--px)) #D4AF37',
              }}
            />

            {/* Top Ornamental Flourish */}
            <div className="relative z-10 pt-[calc(14*var(--px))]">
              <svg width="calc(180*var(--px))" height="calc(22*var(--px))" viewBox="0 0 180 22" fill="none">
                <path d="M10 11 C40 4, 70 18, 90 11 C110 4, 140 18, 170 11" stroke="#B8860B" strokeWidth="1.5" />
                <circle cx="90" cy="11" r="3.5" fill="#D4AF37" />
                <circle cx="10" cy="11" r="2.5" fill="#B8860B" />
                <circle cx="170" cy="11" r="2.5" fill="#B8860B" />
              </svg>
            </div>

            {/* Typography */}
            <div className="relative z-10 flex flex-col items-center">
              <span
                className="font-serif tracking-[calc(8*var(--px))] uppercase font-bold text-transparent bg-clip-text"
                style={{
                  fontFamily: 'Bodoni Moda, serif',
                  fontSize: 'calc(58*var(--px))',
                  backgroundImage: 'linear-gradient(180deg, #996515 0%, #593900 100%)',
                  textShadow: '0 1px 1px rgba(255,255,255,0.8)',
                }}
              >
                CERTIFICATE
              </span>
              <span
                className="italic font-serif text-[#7A5813] tracking-wider mt-[calc(4*var(--px))]"
                style={{
                  fontFamily: 'Sentient, serif',
                  fontSize: 'calc(20*var(--px))',
                }}
              >
                OF OFFICIAL PARTICIPATION
              </span>
              <div
                className="w-[calc(240*var(--px))] h-[calc(1*var(--px))] bg-gradient-to-r from-transparent via-[#C59B27] to-transparent my-[calc(8*var(--px))]"
              />
              <span
                className="font-serif font-semibold text-[#3D2800] tracking-wide"
                style={{
                  fontFamily: 'Bodoni Moda, serif',
                  fontSize: 'calc(26*var(--px))',
                }}
              >
                Jassinta Roid Triniti
              </span>
              <span
                className="text-[#8C6D23] uppercase tracking-[calc(3*var(--px))] text-[calc(12*var(--px))] mt-[calc(2*var(--px))]"
              >
                Creative & Social Media Specialist
              </span>
            </div>

            {/* Golden Rosette Medallion Seal */}
            <div className="relative z-10 mb-[calc(8*var(--px))] flex items-center justify-center">
              <svg
                width="calc(140*var(--px))"
                height="calc(140*var(--px))"
                viewBox="0 0 140 140"
                className="filter drop-shadow(0 4px 6px rgba(0,0,0,0.3))"
              >
                {/* 24-point Rosette Cog */}
                <path
                  d="
                    M 70 8 L 76 16 L 85 11 L 88 20 L 98 18 L 98 28 L 108 29 L 105 38 L 115 41 L 109 49 L 118 55 L 110 61 L 117 69 L 108 73 L 113 82 L 103 84 L 106 94 L 96 93 L 96 103 L 87 100 L 84 109 L 75 104 L 70 112 L 65 104 L 56 109 L 53 100 L 44 103 L 44 93 L 34 94 L 37 84 L 27 82 L 32 73 L 23 69 L 30 61 L 22 55 L 31 49 L 25 41 L 35 38 L 32 29 L 42 28 L 42 18 L 52 20 L 55 11 L 64 16 Z
                  "
                  fill="url(#rosette-grad)"
                  stroke="#8C5A00"
                  strokeWidth="1.5"
                />
                <circle cx="70" cy="60" r="38" fill="url(#rosette-inner)" stroke="#FFE082" strokeWidth="1.5" />
                <circle cx="70" cy="60" r="32" fill="none" stroke="#996515" strokeWidth="1" strokeDasharray="3 2" />
                {/* Shield & Compass Emblems */}
                <path
                  d="M 60 48 L 80 48 L 78 64 L 70 72 L 62 64 Z"
                  fill="none"
                  stroke="#593900"
                  strokeWidth="1.5"
                />
                <path d="M 70 52 L 70 66 M 64 57 L 76 57" stroke="#593900" strokeWidth="1.5" />
                {/* Ribbon tails */}
                <path d="M 52 100 L 40 134 L 56 128 L 64 135 L 60 98" fill="#B8860B" />
                <path d="M 88 100 L 100 134 L 84 128 L 76 135 L 80 98" fill="#C59B27" />
                <defs>
                  <linearGradient id="rosette-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FFE082" />
                    <stop offset="35%" stopColor="#D4AF37" />
                    <stop offset="70%" stopColor="#8C5A00" />
                    <stop offset="100%" stopColor="#FFD54F" />
                  </linearGradient>
                  <linearGradient id="rosette-inner" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FFF3B0" />
                    <stop offset="50%" stopColor="#E5C158" />
                    <stop offset="100%" stopColor="#B38600" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (!interactive) {
    return content;
  }

  return (
    <HoverLabel text="Participation" subtext="View Certificate Details">
      {content}
    </HoverLabel>
  );
}
