export function Shoes(): JSX.Element {
  return (
    <div
      aria-label="Pink Retro Running Sneakers"
      className="relative select-none pointer-events-none flex items-end justify-center"
      style={{
        width: 'calc(980 * var(--px))',
        height: 'calc(440 * var(--px))',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Contact Shadow onto Floor */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-[50%]"
        style={{
          width: 'calc(920 * var(--px))',
          height: 'calc(50 * var(--px))',
          background: 'radial-gradient(ellipse at center, rgba(15, 3, 20, 0.8) 0%, rgba(15, 3, 20, 0) 75%)',
          filter: 'blur(calc(6 * var(--px)))',
          transform: 'translateY(30%)',
        }}
      />

      {/* SVG Retro Runner Sneakers (Pair) */}
      <svg
        className="w-full h-full overflow-visible"
        viewBox="0 0 980 440"
        fill="none"
      >
        <defs>
          {/* Upper Pink Nylon Gradient */}
          <linearGradient id="shoe-nylon" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFC2DE" />
            <stop offset="50%" stopColor="#F99EC2" />
            <stop offset="100%" stopColor="#EA83AB" />
          </linearGradient>

          {/* Suede Toe & Heel Overlays */}
          <linearGradient id="shoe-suede" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F5A3C4" />
            <stop offset="100%" stopColor="#D9759B" />
          </linearGradient>

          {/* 3 Diagonal Stripes (Raspberry / Berry) */}
          <linearGradient id="shoe-stripes" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#D81B72" />
            <stop offset="100%" stopColor="#7A2E5C" />
          </linearGradient>

          {/* Midsole Cream Foam */}
          <linearGradient id="shoe-midsole" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#FFF8EE" />
            <stop offset="100%" stopColor="#EDE1CE" />
          </linearGradient>

          {/* Serrated Gum Outsole */}
          <linearGradient id="shoe-outsole" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F6DFC2" />
            <stop offset="100%" stopColor="#E2C19B" />
          </linearGradient>

          {/* Serrated Tread Pattern */}
          <pattern id="sawtooth" width="20" height="24" patternUnits="userSpaceOnUse">
            <polygon points="0,0 10,24 20,0" fill="#E2C19B" stroke="#D3B087" strokeWidth="1" />
          </pattern>
        </defs>

        {/* ================= LEFT SNEAKER (BACK) ================= */}
        <g transform="translate(40, -15) scale(0.92)" opacity="0.96">
          {/* Left Shoe Contact Shadow */}
          <ellipse cx="260" cy="415" rx="230" ry="22" fill="rgba(20,5,25,0.45)" filter="blur(6px)" />

          {/* Serrated Outsole */}
          <path
            d="M 40 380 Q 250 395 490 370 L 490 405 Q 250 420 40 405 Z"
            fill="url(#shoe-outsole)"
          />
          <rect x="40" y="390" width="450" height="15" fill="url(#sawtooth)" opacity="0.8" />

          {/* Midsole Wedge */}
          <path
            d="M 42 355 Q 260 365 486 345 L 490 380 Q 250 395 40 380 Z"
            fill="url(#shoe-midsole)"
            stroke="#D6C4AD"
            strokeWidth="1.5"
          />
          {/* Midsole Black Racing Stripe */}
          <path d="M 45 365 Q 255 375 488 355" stroke="#2A0F2E" strokeWidth="3" />

          {/* Upper Body (Nylon) */}
          <path
            d="
              M 48 355
              C 48 310, 80 270, 110 240
              C 140 210, 190 200, 220 220
              C 250 240, 310 300, 380 320
              C 430 330, 480 335, 486 345
              Z
            "
            fill="url(#shoe-nylon)"
          />

          {/* 3 Iconic Diagonal Stripes */}
          <path d="M 160 255 L 205 345 L 225 345 L 180 255 Z" fill="url(#shoe-stripes)" />
          <path d="M 200 260 L 245 348 L 265 348 L 220 260 Z" fill="url(#shoe-stripes)" />
          <path d="M 240 270 L 285 350 L 305 350 L 260 270 Z" fill="url(#shoe-stripes)" />

          {/* Suede Toe Cap */}
          <path
            d="
              M 350 320
              C 410 325, 470 330, 486 345
              L 486 360
              C 450 365, 380 360, 340 350
              Z
            "
            fill="url(#shoe-suede)"
          />

          {/* Heel Counter Suede */}
          <path
            d="
              M 45 355
              C 45 300, 75 270, 100 260
              L 125 355
              Z
            "
            fill="url(#shoe-suede)"
          />

          {/* Collar & Tongue */}
          <ellipse cx="140" cy="225" rx="35" ry="45" fill="#FFEFEA" stroke="#E292B4" strokeWidth="2" />
          <path d="M 130 180 Q 155 170 170 195 L 195 240 L 160 245 Z" fill="#FFF4EE" stroke="#E292B4" strokeWidth="1.5" />
          {/* Blank Minimalist Tongue Label */}
          <rect x="138" y="185" width="24" height="28" rx="3" fill="#FFFFFF" stroke="#E081A6" strokeWidth="1" />

          {/* Laces */}
          <path d="M 175 210 Q 200 220 220 240" stroke="#FFF8EE" strokeWidth="6" strokeLinecap="round" />
          <path d="M 195 235 Q 220 245 245 265" stroke="#FFF8EE" strokeWidth="6" strokeLinecap="round" />
          <path d="M 220 260 Q 245 270 270 290" stroke="#FFF8EE" strokeWidth="6" strokeLinecap="round" />
          <path d="M 245 285 Q 270 295 295 315" stroke="#FFF8EE" strokeWidth="6" strokeLinecap="round" />
        </g>

        {/* ================= RIGHT SNEAKER (FOREGROUND) ================= */}
        <g transform="translate(430, 20)">
          {/* Right Shoe Contact Shadow */}
          <ellipse cx="270" cy="385" rx="250" ry="24" fill="rgba(20,5,25,0.6)" filter="blur(6px)" />

          {/* Serrated Outsole */}
          <path
            d="M 30 350 Q 260 365 510 340 L 510 380 Q 260 398 30 380 Z"
            fill="url(#shoe-outsole)"
          />
          <rect x="30" y="365" width="480" height="15" fill="url(#sawtooth)" />

          {/* Midsole Wedge */}
          <path
            d="M 32 320 Q 270 335 506 312 L 510 350 Q 260 365 30 350 Z"
            fill="url(#shoe-midsole)"
            stroke="#D6C4AD"
            strokeWidth="1.5"
          />
          {/* Midsole Black Racing Stripe */}
          <path d="M 35 332 Q 265 345 508 322" stroke="#2A0F2E" strokeWidth="3.5" />

          {/* Upper Body (Nylon) */}
          <path
            d="
              M 38 320
              C 38 270, 75 225, 110 195
              C 145 165, 195 155, 230 180
              C 265 205, 330 270, 400 290
              C 455 300, 500 305, 506 312
              Z
            "
            fill="url(#shoe-nylon)"
          />

          {/* 3 Iconic Diagonal Stripes */}
          <path d="M 175 220 L 225 315 L 248 315 L 198 220 Z" fill="url(#shoe-stripes)" />
          <path d="M 218 226 L 268 318 L 290 318 L 240 226 Z" fill="url(#shoe-stripes)" />
          <path d="M 260 236 L 310 320 L 332 320 L 282 236 Z" fill="url(#shoe-stripes)" />

          {/* Suede Toe Cap */}
          <path
            d="
              M 370 290
              C 430 295, 490 300, 506 312
              L 506 328
              C 465 335, 395 330, 355 320
              Z
            "
            fill="url(#shoe-suede)"
          />

          {/* Heel Counter Suede */}
          <path
            d="
              M 35 320
              C 35 260, 70 225, 100 215
              L 125 320
              Z
            "
            fill="url(#shoe-suede)"
          />

          {/* Heel Tab Leather Accent */}
          <path d="M 40 250 C 40 230, 65 220, 85 230 L 78 270 Z" fill="#7A2E5C" />

          {/* Collar & Tongue */}
          <ellipse cx="145" cy="185" rx="38" ry="48" fill="#FFEFEA" stroke="#E292B4" strokeWidth="2" />
          <path d="M 135 135 Q 165 125 180 155 L 210 205 L 170 210 Z" fill="#FFF4EE" stroke="#E292B4" strokeWidth="1.5" />
          {/* Blank Minimalist Tongue Label */}
          <rect x="145" y="140" width="28" height="32" rx="4" fill="#FFFFFF" stroke="#E081A6" strokeWidth="1" />

          {/* Thick Cream Laces with 3D Overlaps */}
          <path d="M 188 175 Q 215 185 238 208" stroke="#FFF8EE" strokeWidth="7" strokeLinecap="round" />
          <path d="M 210 202 Q 238 212 265 235" stroke="#FFF8EE" strokeWidth="7" strokeLinecap="round" />
          <path d="M 235 230 Q 265 240 292 262" stroke="#FFF8EE" strokeWidth="7" strokeLinecap="round" />
          <path d="M 262 258 Q 292 268 318 290" stroke="#FFF8EE" strokeWidth="7" strokeLinecap="round" />

          {/* Lacing Loops / Bow Detail */}
          <path d="M 175 160 C 150 145, 130 180, 165 185 C 195 190, 205 160, 175 160" fill="none" stroke="#FFFDF9" strokeWidth="4.5" />
          <path d="M 185 165 C 215 150, 230 185, 200 190" fill="none" stroke="#FFFDF9" strokeWidth="4.5" />
        </g>
      </svg>
    </div>
  );
}
