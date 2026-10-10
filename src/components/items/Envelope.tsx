import { HoverLabel } from '../ui/HoverLabel';

export interface EnvelopeProps {
  interactive?: boolean;
}

export function Envelope({ interactive = true }: EnvelopeProps): JSX.Element {
  const handleClick = () => {
    if (interactive) {
      window.location.hash = '#/my-message';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (interactive && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      window.location.hash = '#/my-message';
    }
  };

  const content = (
    <div
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label="Lavender Letter Envelope — Read personal message"
      className="relative select-none outline-none group cursor-pointer focus-visible:ring-4 focus-visible:ring-hot-pink rounded-sm"
      style={{
        width: 'calc(840 * var(--px))',
        height: 'calc(530 * var(--px))',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Contact Shadow onto Shelf */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-[50%] pointer-events-none"
        style={{
          width: 'calc(800 * var(--px))',
          height: 'calc(44 * var(--px))',
          background: 'radial-gradient(ellipse at center, rgba(15, 3, 20, 0.75) 0%, rgba(15, 3, 20, 0) 75%)',
          filter: 'blur(calc(5 * var(--px)))',
          transform: 'translateY(40%)',
        }}
      />

      {/* SVG Envelope Back View with Triangular Flap & Heart Wax Seal */}
      <svg
        className="w-full h-full overflow-visible transition-transform duration-300 group-hover:scale-[1.02]"
        viewBox="0 0 840 530"
        fill="none"
      >
        <defs>
          {/* Lavender Paper Envelope Gradient */}
          <linearGradient id="env-paper" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#D4C1F5" />
            <stop offset="40%" stopColor="#C2ACEE" />
            <stop offset="100%" stopColor="#AD95DF" />
          </linearGradient>

          {/* Flap Gradient (Lighter highlight from top light) */}
          <linearGradient id="env-flap" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#DFD0FA" />
            <stop offset="80%" stopColor="#BAA2E8" />
            <stop offset="100%" stopColor="#9C82CF" />
          </linearGradient>

          {/* Wax Seal Gradient (Hot Pink with Glossy Dome) */}
          <radialGradient id="wax-seal" cx="35%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#FFA6D5" />
            <stop offset="35%" stopColor="#FF2E93" />
            <stop offset="80%" stopColor="#C2185B" />
            <stop offset="100%" stopColor="#880E4F" />
          </radialGradient>
        </defs>

        {/* Envelope Base Body Rectangle */}
        <rect
          x="10"
          y="10"
          width="820"
          height="510"
          rx="14"
          fill="url(#env-paper)"
          filter="drop-shadow(0 14px 20px rgba(0,0,0,0.35))"
        />

        {/* Diagonal Fold Seams from Bottom Corners to Center Point */}
        <path
          d="M 10 520 L 420 310 L 830 520 Z"
          fill="#B59DE4"
          stroke="#9F84D4"
          strokeWidth="1.5"
        />
        <path
          d="M 10 10 L 420 310 L 10 520 Z"
          fill="#BCA5EE"
          stroke="#9F84D4"
          strokeWidth="1.5"
          opacity="0.6"
        />
        <path
          d="M 830 10 L 420 310 L 830 520 Z"
          fill="#B298E4"
          stroke="#9F84D4"
          strokeWidth="1.5"
          opacity="0.6"
        />

        {/* Top Triangular Flap Folded Down */}
        <path
          d="
            M 14 10
            C 14 10, 200 12, 420 300
            C 640 12, 826 10, 826 10
            Z
          "
          fill="url(#env-flap)"
          stroke="#A88FE0"
          strokeWidth="2"
          filter="drop-shadow(0 8px 12px rgba(25, 6, 35, 0.35))"
        />
        {/* Soft Flap Rounded Tip */}
        <path
          d="
            M 14 12
            L 395 285
            C 410 298, 430 298, 445 285
            L 826 12
            Z
          "
          fill="url(#env-flap)"
        />

        {/* Cute Postage Stamp on Top Right */}
        <g transform="translate(710, 36) rotate(3)">
          <rect
            x="0"
            y="0"
            width="78"
            height="96"
            rx="3"
            fill="#FFFDF9"
            stroke="#D4AF37"
            strokeWidth="1"
            strokeDasharray="4 2"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))"
          />
          <rect x="8" y="8" width="62" height="80" rx="2" fill="#FFD6E8" />
          {/* Heart icon inside stamp */}
          <path
            d="
              M 39 52
              C 39 52, 22 38, 22 28
              C 22 21, 28 17, 34 17
              C 38 17, 39 20, 39 20
              C 39 20, 40 17, 44 17
              C 50 17, 56 21, 56 28
              C 56 38, 39 52, 39 52
              Z
            "
            fill="#FF2E93"
          />
        </g>

        {/* Hot Pink Heart Wax Seal at the Flap Tip */}
        <g transform="translate(420, 290)">
          {/* Melted Wax Outer Organic Pool */}
          <path
            d="
              M 0 -48
              C 32 -48, 54 -32, 58 -8
              C 62 16, 50 42, 32 54
              C 14 66, -18 64, -36 50
              C -54 36, -60 12, -56 -12
              C -52 -36, -32 -48, 0 -48
              Z
            "
            fill="url(#wax-seal)"
            filter="drop-shadow(0 6px 10px rgba(0,0,0,0.45))"
          />
          {/* Inner Pressed Rim */}
          <circle cx="0" cy="2" r="38" fill="#D81B72" stroke="#FF77B5" strokeWidth="2.5" />

          {/* Embossed Relief Heart Emblem */}
          <path
            d="
              M 0 24
              C 0 24, -22 6, -22 -8
              C -22 -18, -14 -24, -6 -24
              C -1 -24, 0 -20, 0 -20
              C 0 -20, 1 -24, 6 -24
              C 14 -24, 22 -18, 22 -8
              C 22 6, 0 24, 0 24
              Z
            "
            fill="#FF2E93"
            filter="drop-shadow(0 2px 2px rgba(255,255,255,0.4))"
          />
        </g>
      </svg>
    </div>
  );

  if (!interactive) {
    return content;
  }

  return (
    <HoverLabel text="My Message" subtext="Read Personal Letter">
      {content}
    </HoverLabel>
  );
}
