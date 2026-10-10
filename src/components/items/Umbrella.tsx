export function Umbrella(): JSX.Element {
  return (
    <div
      aria-label="Polka Dot Umbrella with Walnut J-Handle"
      className="relative select-none pointer-events-none"
      style={{
        width: 'calc(210 * var(--px))',
        height: 'calc(880 * var(--px))',
        transformStyle: 'preserve-3d',
        transform: 'rotate(7.5deg)',
        transformOrigin: 'bottom center',
      }}
    >
      {/* Contact Shadow onto Floor / Shelf Corner */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-[50%]"
        style={{
          width: 'calc(180 * var(--px))',
          height: 'calc(38 * var(--px))',
          background: 'radial-gradient(ellipse at center, rgba(15, 3, 20, 0.75) 0%, rgba(15, 3, 20, 0) 75%)',
          filter: 'blur(calc(5 * var(--px)))',
          transform: 'translateY(40%) rotate(-7.5deg)',
        }}
      />

      {/* SVG Polka Dot Umbrella Structure */}
      <svg
        className="w-full h-full overflow-visible"
        viewBox="0 0 210 880"
        fill="none"
      >
        <defs>
          {/* White Fabric Folds Gradient */}
          <linearGradient id="umb-fabric" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#E6ECF2" />
            <stop offset="35%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>

          {/* Chrome Metal Ferrule & Shaft */}
          <linearGradient id="umb-chrome" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#9AA0AA" />
            <stop offset="35%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#CFD4DC" />
            <stop offset="100%" stopColor="#6C727C" />
          </linearGradient>

          {/* Polished Walnut J-Handle */}
          <linearGradient id="umb-walnut" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6E3E1A" />
            <stop offset="30%" stopColor="#8F562B" />
            <stop offset="60%" stopColor="#4A280D" />
            <stop offset="100%" stopColor="#2E1705" />
          </linearGradient>

          {/* Polka Dot Pattern */}
          <pattern id="umb-dots" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="8" cy="8" r="4.2" fill="#1E293B" />
            <circle cx="22" cy="22" r="4.2" fill="#1E293B" />
          </pattern>
        </defs>

        {/* --- Top Chrome Spike / Ferrule Tip --- */}
        <path d="M 100 20 L 110 20 L 108 85 L 102 85 Z" fill="url(#umb-chrome)" />
        <circle cx="105" cy="18" r="5" fill="#111" />

        {/* --- Folded Canopy Fabric Body --- */}
        <g filter="drop-shadow(4px 10px 14px rgba(0,0,0,0.35))">
          {/* Tapered Folded Fabric Silhouette */}
          <path
            d="
              M 105 85
              C 125 180, 145 350, 140 520
              C 138 580, 120 620, 115 650
              L 95 650
              C 90 620, 72 580, 70 520
              C 65 350, 85 180, 105 85
              Z
            "
            fill="url(#umb-fabric)"
          />

          {/* Polka Dots Overlay (Clipped to Canopy Shape) */}
          <path
            d="
              M 105 85
              C 125 180, 145 350, 140 520
              C 138 580, 120 620, 115 650
              L 95 650
              C 90 620, 72 580, 70 520
              C 65 350, 85 180, 105 85
              Z
            "
            fill="url(#umb-dots)"
            opacity="0.9"
          />

          {/* Vertical Crease Shadow Lines (Fluting of Fabric Ribs) */}
          <path d="M 105 85 C 108 260, 110 440, 105 650" stroke="rgba(0,0,0,0.18)" strokeWidth="3" />
          <path d="M 105 85 C 122 260, 126 440, 120 650" stroke="rgba(0,0,0,0.22)" strokeWidth="2.5" />
          <path d="M 105 85 C 88 260, 84 440, 90 650" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" />

          {/* Bottom Flared Ruffle Hem */}
          <path
            d="
              M 88 625
              Q 96 648 105 632
              Q 114 648 122 625
              Z
            "
            fill="#CBD5E1"
          />
        </g>

        {/* --- Black Fabric Tie Strap with Snap Button --- */}
        <g transform="translate(72, 420)">
          <rect
            x="0"
            y="0"
            width="66"
            height="22"
            rx="4"
            fill="#1A1F2C"
            stroke="#0F1420"
            strokeWidth="1.5"
            filter="drop-shadow(0 3px 5px rgba(0,0,0,0.4))"
          />
          {/* Silver Snap Button */}
          <circle cx="50" cy="11" r="5" fill="url(#umb-chrome)" />
          <circle cx="50" cy="11" r="2.5" fill="#333" />
        </g>

        {/* --- Shaft Collar & Lower Metal Rod --- */}
        <rect x="100" y="650" width="10" height="40" fill="url(#umb-chrome)" />

        {/* --- Solid Dark Walnut Wooden J-Hook Cane Handle --- */}
        <g filter="drop-shadow(4px 8px 12px rgba(0,0,0,0.4))">
          <path
            d="
              M 100 685
              L 100 780
              C 100 840, 160 850, 175 800
              C 185 765, 165 745, 150 755
              C 140 762, 142 778, 148 780
              C 142 805, 122 800, 122 775
              L 122 685
              Z
            "
            fill="url(#umb-walnut)"
          />
          {/* Handle Specular Shine Highlight */}
          <path
            d="
              M 104 690
              L 104 775
              C 104 815, 125 822, 145 812
            "
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="3.5"
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
}
