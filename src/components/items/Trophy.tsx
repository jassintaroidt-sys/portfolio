import { HoverLabel } from '../ui/HoverLabel';

export interface TrophyProps {
  interactive?: boolean;
}

export function Trophy({ interactive = true }: TrophyProps): JSX.Element {
  const handleClick = () => {
    if (interactive) {
      window.location.hash = '#/achievement';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (interactive && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      window.location.hash = '#/achievement';
    }
  };

  const content = (
    <div
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label="Golden Trophy — View achievements and milestones"
      className="relative select-none outline-none group cursor-pointer focus-visible:ring-4 focus-visible:ring-hot-pink rounded-sm"
      style={{
        width: 'calc(520 * var(--px))',
        height: 'calc(750 * var(--px))',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Contact Shadow onto Shelf Surface */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-[50%] pointer-events-none"
        style={{
          width: 'calc(420 * var(--px))',
          height: 'calc(54 * var(--px))',
          background: 'radial-gradient(ellipse at center, rgba(15, 3, 18, 0.75) 0%, rgba(15, 3, 18, 0) 75%)',
          filter: 'blur(calc(6 * var(--px)))',
          transform: 'translateY(40%)',
        }}
      />

      {/* Trophy Vector SVG with Deep 3D Gradients & Specular Highlights */}
      <svg
        className="w-full h-full overflow-visible transition-transform duration-300 group-hover:scale-105"
        viewBox="0 0 520 750"
        fill="none"
      >
        <defs>
          {/* Main Gold Body Gradient (Reflective vertical cylindrical shine) */}
          <linearGradient id="gold-cup-body" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#9B6F12" />
            <stop offset="12%" stopColor="#D4A017" />
            <stop offset="28%" stopColor="#FFF2A8" />
            <stop offset="42%" stopColor="#FFFFFF" />
            <stop offset="55%" stopColor="#F5C02A" />
            <stop offset="78%" stopColor="#AA7810" />
            <stop offset="92%" stopColor="#6E4804" />
            <stop offset="100%" stopColor="#8C5C05" />
          </linearGradient>

          {/* Cup Rim Gradient */}
          <linearGradient id="gold-rim" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFEAA7" />
            <stop offset="35%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#E2A91D" />
            <stop offset="100%" stopColor="#7A4F00" />
          </linearGradient>

          {/* Left Handle Gradient */}
          <linearGradient id="gold-handle-l" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFECA0" />
            <stop offset="30%" stopColor="#D49E18" />
            <stop offset="70%" stopColor="#875704" />
            <stop offset="100%" stopColor="#FAD866" />
          </linearGradient>

          {/* Right Handle Gradient */}
          <linearGradient id="gold-handle-r" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F8DA6F" />
            <stop offset="40%" stopColor="#A06E09" />
            <stop offset="80%" stopColor="#633C00" />
            <stop offset="100%" stopColor="#E1A61A" />
          </linearGradient>

          {/* Stem & Collar */}
          <linearGradient id="gold-stem" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7D5103" />
            <stop offset="30%" stopColor="#FFF099" />
            <stop offset="60%" stopColor="#E4AD20" />
            <stop offset="100%" stopColor="#5E3800" />
          </linearGradient>

          {/* Base Pedestal */}
          <linearGradient id="gold-base-top" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7A4E00" />
            <stop offset="25%" stopColor="#FFEA94" />
            <stop offset="55%" stopColor="#DBA215" />
            <stop offset="85%" stopColor="#5C3500" />
            <stop offset="100%" stopColor="#8C5503" />
          </linearGradient>

          <linearGradient id="gold-base-bot" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#5C3500" />
            <stop offset="20%" stopColor="#E0AA1E" />
            <stop offset="35%" stopColor="#FFF5B8" />
            <stop offset="60%" stopColor="#9C6B08" />
            <stop offset="100%" stopColor="#4A2800" />
          </linearGradient>

          {/* Inner Cup Dark Shade */}
          <radialGradient id="cup-inner" cx="50%" cy="30%" r="50%">
            <stop offset="0%" stopColor="#5A3A02" />
            <stop offset="80%" stopColor="#2E1A00" />
            <stop offset="100%" stopColor="#1A0D00" />
          </radialGradient>
        </defs>

        {/* --- Left Scroll Handle --- */}
        <path
          d="
            M 175 140
            C 100 130, 45 160, 40 230
            C 35 300, 95 360, 160 410
            C 185 430, 195 440, 195 450
            C 195 460, 180 460, 170 450
            C 130 410, 20 330, 20 220
            C 20 120, 100 80, 175 100
            Z
          "
          fill="url(#gold-handle-l)"
          filter="drop-shadow(-4px 6px 8px rgba(0,0,0,0.4))"
        />
        {/* Left Handle Scroll Finial */}
        <circle cx="165" cy="130" r="14" fill="#E8B528" stroke="#FFE994" strokeWidth="3" />
        <circle cx="185" cy="455" r="10" fill="#B37C0C" stroke="#FFDF78" strokeWidth="2" />

        {/* --- Right Scroll Handle --- */}
        <path
          d="
            M 345 140
            C 420 130, 475 160, 480 230
            C 485 300, 425 360, 360 410
            C 335 430, 325 440, 325 450
            C 325 460, 340 460, 350 450
            C 390 410, 500 330, 500 220
            C 500 120, 420 80, 345 100
            Z
          "
          fill="url(#gold-handle-r)"
          filter="drop-shadow(4px 6px 8px rgba(0,0,0,0.45))"
        />
        {/* Right Handle Scroll Finials */}
        <circle cx="355" cy="130" r="14" fill="#B37C0C" stroke="#FFDF78" strokeWidth="3" />
        <circle cx="335" cy="455" r="10" fill="#754800" stroke="#FFCC54" strokeWidth="2" />

        {/* --- Cup Interior / Flared Opening --- */}
        <ellipse cx="260" cy="110" rx="140" ry="24" fill="url(#cup-inner)" />
        <ellipse cx="260" cy="110" rx="140" ry="24" fill="none" stroke="url(#gold-rim)" strokeWidth="8" />

        {/* --- Main Chalice Vessel --- */}
        <path
          d="
            M 120 110
            C 120 280, 150 420, 260 490
            C 370 420, 400 280, 400 110
            Z
          "
          fill="url(#gold-cup-body)"
          filter="drop-shadow(0 12px 18px rgba(0,0,0,0.35))"
        />

        {/* Left Mirror Specular Band */}
        <path
          d="
            M 175 115
            C 170 260, 190 380, 245 460
            C 230 450, 175 350, 155 220
            C 145 160, 150 125, 155 115
            Z
          "
          fill="rgba(255, 255, 255, 0.45)"
        />

        {/* Upper Rim Front Half Overlay */}
        <path
          d="M 120 110 C 120 135, 400 135, 400 110"
          stroke="url(#gold-rim)"
          strokeWidth="7"
          fill="none"
        />

        {/* --- Waist Collar / Flange --- */}
        <ellipse cx="260" cy="495" rx="42" ry="10" fill="url(#gold-stem)" />
        <path d="M 218 495 C 218 510, 302 510, 302 495" fill="none" stroke="#FFE994" strokeWidth="3" />

        {/* --- Stem Column --- */}
        <path
          d="
            M 235 500
            C 235 550, 215 585, 205 605
            L 315 605
            C 305 585, 285 550, 285 500
            Z
          "
          fill="url(#gold-stem)"
        />
        {/* Stem Mid-Ring */}
        <ellipse cx="260" cy="555" rx="36" ry="8" fill="url(#gold-stem)" stroke="#FFE994" strokeWidth="2.5" />

        {/* --- Tier 1 Base Flange --- */}
        <path
          d="
            M 195 605
            C 195 615, 210 635, 170 645
            L 350 645
            C 310 635, 325 615, 325 605
            Z
          "
          fill="url(#gold-base-top)"
        />
        <ellipse cx="260" cy="645" rx="90" ry="12" fill="url(#gold-base-top)" stroke="#FFE585" strokeWidth="3" />

        {/* --- Tier 2 Main Cylindrical Pedestal --- */}
        <path
          d="
            M 170 645
            L 160 705
            C 160 735, 360 735, 360 705
            L 350 645
            Z
          "
          fill="url(#gold-base-bot)"
          filter="drop-shadow(0 8px 12px rgba(0,0,0,0.5))"
        />

        {/* Bottom Lip Ring */}
        <path
          d="
            M 150 710
            C 150 740, 370 740, 370 710
            L 380 730
            C 380 760, 140 760, 140 730
            Z
          "
          fill="url(#gold-base-bot)"
        />
        <ellipse cx="260" cy="728" rx="115" ry="14" fill="none" stroke="#FFE994" strokeWidth="2.5" />
      </svg>
    </div>
  );

  if (!interactive) {
    return content;
  }

  return (
    <HoverLabel text="Achievement" subtext="View Milestones & Wins">
      {content}
    </HoverLabel>
  );
}
