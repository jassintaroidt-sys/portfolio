export function Bag(): JSX.Element {
  return (
    <div
      aria-label="Pink Leather Hobo Handbag"
      className="relative select-none pointer-events-none"
      style={{
        width: 'calc(800 * var(--px))',
        height: 'calc(700 * var(--px))',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Contact Shadow onto Floor */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-[50%]"
        style={{
          width: 'calc(740 * var(--px))',
          height: 'calc(50 * var(--px))',
          background: 'radial-gradient(ellipse at center, rgba(15, 3, 20, 0.8) 0%, rgba(15, 3, 20, 0) 75%)',
          filter: 'blur(calc(6 * var(--px)))',
          transform: 'translateY(35%)',
        }}
      />

      {/* SVG Hobo Handbag Structure */}
      <svg
        className="w-full h-full overflow-visible"
        viewBox="0 0 800 700"
        fill="none"
      >
        <defs>
          {/* Pink Leather Gradient */}
          <linearGradient id="bag-leather" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFAFD3" />
            <stop offset="35%" stopColor="#FF8DC7" />
            <stop offset="80%" stopColor="#F06FA9" />
            <stop offset="100%" stopColor="#D9508E" />
          </linearGradient>

          {/* Strap Gradient */}
          <linearGradient id="bag-strap" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFA6CE" />
            <stop offset="50%" stopColor="#FF7EB9" />
            <stop offset="100%" stopColor="#D84E8A" />
          </linearGradient>

          {/* Chrome Hardware */}
          <linearGradient id="bag-chrome" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#D8DDE6" />
            <stop offset="70%" stopColor="#8A92A0" />
            <stop offset="100%" stopColor="#F0F4F8" />
          </linearGradient>

          {/* Pocket & Flap Shadows */}
          <radialGradient id="pocket-shade" cx="50%" cy="30%" r="50%">
            <stop offset="0%" stopColor="#FF99C4" />
            <stop offset="100%" stopColor="#D04582" />
          </radialGradient>
        </defs>

        {/* --- Curved Single Handle Shoulder Strap --- */}
        <path
          d="
            M 270 310
            C 250 150, 310 40, 400 40
            C 490 40, 550 150, 530 310
          "
          stroke="url(#bag-strap)"
          strokeWidth="38"
          strokeLinecap="round"
          fill="none"
          filter="drop-shadow(0 10px 14px rgba(0,0,0,0.35))"
        />
        {/* Strap Inner Highlight & Stitching */}
        <path
          d="
            M 270 310
            C 250 150, 310 40, 400 40
            C 490 40, 550 150, 530 310
          "
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="6"
          fill="none"
        />
        {/* Chrome Strap Rings & Anchors */}
        <ellipse cx="270" cy="305" rx="15" ry="18" fill="url(#bag-chrome)" />
        <ellipse cx="270" cy="305" rx="8" ry="10" fill="#666" />
        <ellipse cx="530" cy="305" rx="15" ry="18" fill="url(#bag-chrome)" />
        <ellipse cx="530" cy="305" rx="8" ry="10" fill="#666" />

        {/* --- Main Crescent Hobo Body --- */}
        <path
          d="
            M 230 340
            C 210 390, 160 440, 150 510
            C 135 600, 220 670, 400 670
            C 580 670, 665 600, 650 510
            C 640 440, 590 390, 570 340
            C 540 400, 470 430, 400 430
            C 330 430, 260 400, 230 340
            Z
          "
          fill="url(#bag-leather)"
          filter="drop-shadow(0 16px 26px rgba(0,0,0,0.4))"
        />

        {/* Top Zipper Track & Pull on Left */}
        <path
          d="M 235 345 C 280 405, 340 430, 400 430 C 460 430, 520 405, 565 345"
          stroke="#4A1E35"
          strokeWidth="5"
          strokeDasharray="4 2"
          fill="none"
        />
        {/* Zipper Pull Tab */}
        <path d="M 275 375 L 290 430 L 278 440 L 268 385 Z" fill="url(#bag-chrome)" />

        {/* Vertical Contour Stitching Seams */}
        <path
          d="M 310 435 C 300 520, 280 600, 280 660"
          stroke="#B53970"
          strokeWidth="2.5"
          strokeDasharray="4 3"
          fill="none"
        />
        <path
          d="M 490 435 C 500 520, 520 600, 520 660"
          stroke="#B53970"
          strokeWidth="2.5"
          strokeDasharray="4 3"
          fill="none"
        />

        {/* --- Left Small Flap Pocket --- */}
        <g transform="translate(185, 470)">
          <rect x="0" y="0" width="105" height="115" rx="14" fill="url(#pocket-shade)" stroke="#B53970" strokeWidth="2" />
          <path d="M 0 0 L 105 0 L 105 40 L 52 58 L 0 40 Z" fill="#FFAFD3" stroke="#B53970" strokeWidth="2" />
          {/* Silver Snap Button */}
          <circle cx="52" cy="34" r="8" fill="url(#bag-chrome)" />
          <circle cx="52" cy="34" r="4" fill="#999" />
        </g>

        {/* --- Right Small Flap Pocket --- */}
        <g transform="translate(510, 470)">
          <rect x="0" y="0" width="105" height="115" rx="14" fill="url(#pocket-shade)" stroke="#B53970" strokeWidth="2" />
          <path d="M 0 0 L 105 0 L 105 40 L 52 58 L 0 40 Z" fill="#FFAFD3" stroke="#B53970" strokeWidth="2" />
          {/* Silver Snap Button */}
          <circle cx="52" cy="34" r="8" fill="url(#bag-chrome)" />
          <circle cx="52" cy="34" r="4" fill="#999" />
        </g>

        {/* --- Center Main Closure Flap & Large Chrome Buckle --- */}
        <g transform="translate(345, 430)">
          {/* Leather Tongue / Flap */}
          <path
            d="
              M 15 0
              L 95 0
              L 95 160
              C 95 180, 55 195, 55 195
              C 55 195, 15 180, 15 160
              Z
            "
            fill="url(#bag-leather)"
            stroke="#B53970"
            strokeWidth="2.5"
            filter="drop-shadow(0 6px 10px rgba(0,0,0,0.3))"
          />
          {/* Flap Perimeter Stitching */}
          <path
            d="M 22 5 L 88 5 L 88 155 C 88 170, 55 185, 55 185 C 55 185, 22 170, 22 155 Z"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="1.5"
            strokeDasharray="4 2"
            fill="none"
          />

          {/* Horseshoe Chrome Buckle Frame */}
          <rect
            x="8"
            y="95"
            width="94"
            height="70"
            rx="18"
            fill="none"
            stroke="url(#bag-chrome)"
            strokeWidth="12"
            filter="drop-shadow(0 4px 6px rgba(0,0,0,0.3))"
          />
          {/* Buckle Prong */}
          <rect x="52" y="90" width="6" height="42" rx="3" fill="url(#bag-chrome)" />
        </g>
      </svg>
    </div>
  );
}
