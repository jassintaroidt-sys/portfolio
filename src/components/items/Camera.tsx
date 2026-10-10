import { HoverLabel } from '../ui/HoverLabel';

export interface CameraProps {
  interactive?: boolean;
}

export function Camera({ interactive = true }: CameraProps): JSX.Element {
  const handleClick = () => {
    if (interactive) {
      window.location.hash = '#/photography';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (interactive && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      window.location.hash = '#/photography';
    }
  };

  const content = (
    <div
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label="Pastelca Camera — View photography portfolio"
      className="relative select-none outline-none group cursor-pointer focus-visible:ring-4 focus-visible:ring-hot-pink rounded-sm"
      style={{
        width: 'calc(560 * var(--px))',
        height: 'calc(365 * var(--px))',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Contact Shadow onto Shelf */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-[50%] pointer-events-none"
        style={{
          width: 'calc(520 * var(--px))',
          height: 'calc(40 * var(--px))',
          background: 'radial-gradient(ellipse at center, rgba(12, 2, 16, 0.75) 0%, rgba(12, 2, 16, 0) 75%)',
          filter: 'blur(calc(5 * var(--px)))',
          transform: 'translateY(35%)',
        }}
      />

      {/* SVG Camera Body & Extruded Lens Assembly */}
      <svg
        className="w-full h-full overflow-visible transition-transform duration-300 group-hover:scale-105"
        viewBox="0 0 560 365"
        fill="none"
      >
        <defs>
          {/* Mint Top & Bottom Metal Gradients */}
          <linearGradient id="cam-mint-plate" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C4EBDD" />
            <stop offset="50%" stopColor="#A8E6CF" />
            <stop offset="100%" stopColor="#8AD4BC" />
          </linearGradient>

          {/* Pink Leather Band */}
          <linearGradient id="cam-pink-leather" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F7B8D4" />
            <stop offset="50%" stopColor="#F19EBE" />
            <stop offset="100%" stopColor="#E081A6" />
          </linearGradient>

          {/* Chrome & Silver Highlights */}
          <linearGradient id="cam-chrome" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="45%" stopColor="#CFD4DC" />
            <stop offset="70%" stopColor="#9AA0AA" />
            <stop offset="100%" stopColor="#EAEFF5" />
          </linearGradient>

          {/* Lavender Lens Barrel */}
          <linearGradient id="cam-lens-barrel" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#D9C7F5" />
            <stop offset="40%" stopColor="#BAA4E6" />
            <stop offset="80%" stopColor="#947BCB" />
            <stop offset="100%" stopColor="#C8B3EE" />
          </linearGradient>

          {/* Deep Optical Glass Reflection */}
          <radialGradient id="cam-lens-glass" cx="40%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#4A3470" />
            <stop offset="50%" stopColor="#25123F" />
            <stop offset="85%" stopColor="#10051C" />
            <stop offset="100%" stopColor="#05010A" />
          </radialGradient>

          {/* Lens Specular Reflection */}
          <linearGradient id="cam-specular" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
            <stop offset="40%" stopColor="rgba(168,230,207,0.4)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>

          {/* Dial Knurling Pattern */}
          <pattern id="knurl" width="4" height="8" patternUnits="userSpaceOnUse">
            <line x1="1" y1="0" x2="1" y2="8" stroke="#9A82D0" strokeWidth="1.5" />
            <line x1="3" y1="0" x2="3" y2="8" stroke="#E3D6FC" strokeWidth="1" />
          </pattern>
        </defs>

        {/* --- Top Dials & Controls --- */}
        {/* Shutter Button & Dial (Left) */}
        <rect x="75" y="22" width="40" height="14" rx="3" fill="#BAA4E6" />
        <rect x="75" y="22" width="40" height="14" rx="3" fill="url(#knurl)" />
        <circle cx="95" cy="22" r="16" fill="url(#cam-chrome)" />
        <circle cx="95" cy="20" r="10" fill="#F19EBE" />

        {/* Speed Dial (Center Left) */}
        <rect x="135" y="18" width="55" height="18" rx="4" fill="#BAA4E6" />
        <rect x="135" y="18" width="55" height="18" rx="4" fill="url(#knurl)" />
        <rect x="145" y="14" width="35" height="6" rx="2" fill="#BFE3F5" />

        {/* Right Dial (Blue Knurled) */}
        <rect x="440" y="22" width="48" height="14" rx="4" fill="#A7D8F5" />
        <rect x="440" y="22" width="48" height="14" rx="4" fill="url(#knurl)" />

        {/* Strap Lugs (Left & Right) */}
        <path d="M 12 145 C 5 145, 5 165, 12 165 Z" fill="url(#cam-chrome)" />
        <circle cx="12" cy="155" r="4" fill="#333" />
        <path d="M 548 145 C 555 145, 555 165, 548 165 Z" fill="url(#cam-chrome)" />
        <circle cx="548" cy="155" r="4" fill="#333" />

        {/* --- Main Camera Body Chassis --- */}
        <rect
          x="18"
          y="35"
          width="524"
          height="315"
          rx="26"
          fill="url(#cam-mint-plate)"
          filter="drop-shadow(0 14px 22px rgba(0,0,0,0.38))"
        />

        {/* Leather Middle Wrap (with Stitched / Embossed Inset) */}
        <rect
          x="18"
          y="108"
          width="524"
          height="165"
          fill="url(#cam-pink-leather)"
        />
        {/* Leather Seam Separator Lines */}
        <line x1="18" y1="108" x2="542" y2="108" stroke="#84CCB5" strokeWidth="2.5" />
        <line x1="18" y1="273" x2="542" y2="273" stroke="#84CCB5" strokeWidth="2.5" />

        {/* --- Top Metal Plate Details --- */}
        {/* Brand Text: PASTELCA 35mm f/2.8 */}
        <text
          x="115"
          y="78"
          fontFamily="Sentient, serif"
          fontSize="24"
          fontWeight="bold"
          fill="#3B6758"
          letterSpacing="2"
          textAnchor="middle"
        >
          PASTELCA
        </text>
        <text
          x="115"
          y="96"
          fontFamily="Sentient, serif"
          fontSize="14"
          fontStyle="italic"
          fill="#4A7C6B"
          letterSpacing="1"
          textAnchor="middle"
        >
          35mm f/2.8
        </text>

        {/* Small Screw */}
        <circle cx="280" cy="72" r="5" fill="url(#cam-chrome)" />
        <line x1="277" y1="72" x2="283" y2="72" stroke="#666" strokeWidth="1" />

        {/* Optical Viewfinder Window (Right) */}
        <rect x="375" y="55" width="60" height="42" rx="7" fill="#1B1429" stroke="#7FC4B0" strokeWidth="3" />
        <rect x="385" y="63" width="40" height="26" rx="4" fill="#2E2445" />
        <path d="M 388 66 L 418 66 L 400 86 Z" fill="rgba(168,230,207,0.35)" />

        {/* Rangefinder Window (Middle) */}
        <rect x="315" y="58" width="42" height="38" rx="6" fill="#1C182B" stroke="#7FC4B0" strokeWidth="2.5" />
        <line x1="322" y1="62" x2="322" y2="92" stroke="#3D3554" strokeWidth="1.5" />
        <line x1="328" y1="62" x2="328" y2="92" stroke="#3D3554" strokeWidth="1.5" />
        <line x1="334" y1="62" x2="334" y2="92" stroke="#3D3554" strokeWidth="1.5" />
        <line x1="340" y1="62" x2="340" y2="92" stroke="#3D3554" strokeWidth="1.5" />

        {/* Small Sensor Window */}
        <rect x="205" y="65" width="24" height="20" rx="4" fill="#151220" stroke="#7FC4B0" strokeWidth="2" />

        {/* --- Front Levers & Dials --- */}
        {/* Left Self-timer Lever */}
        <path d="M 170 180 L 164 240 A 16 16 0 0 0 196 240 L 190 180 Z" fill="#BAA4E6" />
        <circle cx="180" cy="240" r="14" fill="url(#cam-chrome)" />
        <circle cx="180" cy="240" r="9" fill="#F19EBE" />

        {/* Small Red Indicator Button */}
        <circle cx="178" cy="135" r="7" fill="#BFE3F5" stroke="#7FC4B0" strokeWidth="2" />
        <circle cx="178" cy="135" r="4" fill="#FF8DC7" />

        {/* Right Lever */}
        <path d="M 405 180 L 398 230 A 14 14 0 0 0 426 230 L 420 180 Z" fill="#BAA4E6" />
        <circle cx="412" cy="230" r="12" fill="url(#cam-chrome)" />

        {/* --- Central Large 3D Lens Assembly --- */}
        {/* Outermost Lens Bezel Rim (Chrome) */}
        <circle cx="305" cy="210" r="115" fill="url(#cam-chrome)" filter="drop-shadow(0 10px 16px rgba(0,0,0,0.45))" />
        {/* Blue Accent Ring */}
        <circle cx="305" cy="210" r="108" fill="#BFE3F5" stroke="#90CAF9" strokeWidth="2" />
        {/* Lavender Knurled Barrel */}
        <circle cx="305" cy="210" r="102" fill="url(#cam-lens-barrel)" />

        {/* Lens Aperture Markings Ring */}
        <circle cx="305" cy="210" r="82" fill="#E6DAF8" stroke="#BAA4E6" strokeWidth="2" />
        <text x="305" y="145" fontFamily="sans-serif" fontSize="13" fontWeight="bold" fill="#583B82" textAnchor="middle">
          35mm
        </text>
        <text x="305" y="284" fontFamily="sans-serif" fontSize="12" fontWeight="bold" fill="#583B82" textAnchor="middle">
          35mm f/2.8
        </text>

        {/* Lens Inner Chrome Collar */}
        <circle cx="305" cy="210" r="66" fill="url(#cam-chrome)" />
        {/* Optical Glass Deep Core */}
        <circle cx="305" cy="210" r="58" fill="url(#cam-lens-glass)" />
        {/* Aperture Blades */}
        <circle cx="305" cy="210" r="32" fill="#0C0315" stroke="#1D0932" strokeWidth="2" />

        {/* Specular Diagonal Light Sheen */}
        <path
          d="
            M 270 170
            C 330 170, 350 200, 350 240
            C 330 220, 290 190, 270 170
            Z
          "
          fill="url(#cam-specular)"
        />
        {/* Secondary Glint */}
        <circle cx="282" cy="188" r="7" fill="rgba(255,255,255,0.75)" />
      </svg>
    </div>
  );

  if (!interactive) {
    return content;
  }

  return (
    <HoverLabel text="Photography" subtext="View Photo Gallery">
      {content}
    </HoverLabel>
  );
}
