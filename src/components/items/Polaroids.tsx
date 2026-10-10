export function Polaroids(): JSX.Element {
  return (
    <div
      aria-label="Hanging Polaroid Photos — Moments, Stories, Memories"
      className="relative select-none pointer-events-none w-full flex flex-col items-center"
      style={{
        height: 'calc(360 * var(--px))',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Natural Twine Rope Spanning 100% from Left Wall to Right Wall */}
      <svg
        className="w-full overflow-visible pointer-events-none"
        style={{ height: 'calc(40 * var(--px))' }}
        viewBox="0 0 1080 40"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* Shadow of the twine on back wall */}
        <path
          d="M 0 18 Q 540 38 1080 18"
          stroke="rgba(20, 4, 25, 0.5)"
          strokeWidth="4"
          filter="blur(2px)"
        />
        {/* Actual twisted twine rope */}
        <path
          d="M 0 14 Q 540 34 1080 14"
          stroke="#C4A482"
          strokeWidth="3.5"
          strokeDasharray="6 2"
        />
        <path
          d="M 0 14 Q 540 34 1080 14"
          stroke="#8C6845"
          strokeWidth="1.5"
        />
      </svg>

      {/* 3 Suspended Polaroids with Wooden Pegs */}
      <div
        className="w-full flex justify-around items-start -mt-[calc(26*var(--px))] px-[calc(30*var(--px))]"
      >
        {/* --- Polaroid 1 (Left: Moments) --- */}
        <div
          className="relative flex flex-col items-center transition-transform duration-300"
          style={{
            width: 'calc(280 * var(--px))',
            transform: 'rotate(-3.5deg)',
            filter: 'drop-shadow(0 calc(10*var(--px)) calc(16*var(--px)) rgba(0,0,0,0.38))',
          }}
        >
          {/* Wooden Clothespin Peg */}
          <div
            className="w-[calc(18*var(--px))] h-[calc(46*var(--px))] rounded-[calc(2*var(--px))] -mb-[calc(18*var(--px))] z-20 relative"
            style={{
              background: 'linear-gradient(90deg, #D9B382 0%, #C89D66 50%, #B08249 100%)',
              boxShadow: '0 calc(2*var(--px)) calc(4*var(--px)) rgba(0,0,0,0.35)',
            }}
          >
            {/* Metal spring ring on peg */}
            <div className="absolute top-[calc(18*var(--px))] inset-x-0 h-[calc(5*var(--px))] bg-[#858585] shadow-inner" />
          </div>

          {/* Polaroid Card Body */}
          <div
            className="w-full bg-[#FFFDF9] p-[calc(16*var(--px))] pb-[calc(24*var(--px))] rounded-[calc(4*var(--px))] flex flex-col items-center"
            style={{
              boxShadow: 'inset 0 0 calc(6*var(--px)) rgba(0,0,0,0.06)',
            }}
          >
            {/* Photo Viewport (Pastel Mountain Lake Gradient Illustration) */}
            <div
              className="w-full aspect-square rounded-[calc(2*var(--px))] overflow-hidden relative"
              style={{
                background: 'linear-gradient(180deg, #FFB3D9 0%, #FFD6E8 40%, #BFA8E5 75%, #7A2E5C 100%)',
              }}
            >
              {/* Sun & Mountain Silhouettes */}
              <div className="absolute bottom-[calc(28*var(--px))] left-1/2 -translate-x-1/2 w-[calc(40*var(--px))] h-[calc(40*var(--px))] rounded-full bg-[#FFF1A8]/80" />
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <polygon points="0,100 35,48 70,100" fill="#69335E" opacity="0.6" />
                <polygon points="30,100 65,38 100,100" fill="#4B1D4F" opacity="0.8" />
                <polygon points="55,100 80,60 100,100" fill="#2A0F2E" />
              </svg>
            </div>

            {/* Handwritten Caption */}
            <span
              className="mt-[calc(12*var(--px))] text-[#2A0F2E] text-[calc(19*var(--px))] font-bold tracking-wide select-none"
              style={{ fontFamily: 'Permanent Marker, cursive' }}
            >
              Moments
            </span>
          </div>
        </div>

        {/* --- Polaroid 2 (Center: Stories) --- */}
        <div
          className="relative flex flex-col items-center transition-transform duration-300"
          style={{
            width: 'calc(280 * var(--px))',
            transform: 'rotate(1.5deg) translateY(calc(8*var(--px)))',
            filter: 'drop-shadow(0 calc(10*var(--px)) calc(16*var(--px)) rgba(0,0,0,0.38))',
          }}
        >
          {/* Wooden Clothespin Peg */}
          <div
            className="w-[calc(18*var(--px))] h-[calc(46*var(--px))] rounded-[calc(2*var(--px))] -mb-[calc(18*var(--px))] z-20 relative"
            style={{
              background: 'linear-gradient(90deg, #D9B382 0%, #C89D66 50%, #B08249 100%)',
              boxShadow: '0 calc(2*var(--px)) calc(4*var(--px)) rgba(0,0,0,0.35)',
            }}
          >
            <div className="absolute top-[calc(18*var(--px))] inset-x-0 h-[calc(5*var(--px))] bg-[#858585] shadow-inner" />
          </div>

          {/* Polaroid Card Body */}
          <div
            className="w-full bg-[#FFFDF9] p-[calc(16*var(--px))] pb-[calc(24*var(--px))] rounded-[calc(4*var(--px))] flex flex-col items-center"
            style={{
              boxShadow: 'inset 0 0 calc(6*var(--px)) rgba(0,0,0,0.06)',
            }}
          >
            {/* Photo Viewport (Pastel Ocean / Sky Gradient) */}
            <div
              className="w-full aspect-square rounded-[calc(2*var(--px))] overflow-hidden relative"
              style={{
                background: 'linear-gradient(180deg, #A7D8F5 0%, #D4F2E4 50%, #A8E6CF 80%, #68A690 100%)',
              }}
            >
              <div className="absolute top-[calc(20*var(--px))] right-[calc(25*var(--px))] w-[calc(34*var(--px))] h-[calc(34*var(--px))] rounded-full bg-[#FFFDF9]/70" />
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M 0 70 Q 25 60 50 70 T 100 70 L 100 100 L 0 100 Z" fill="#4B8C78" opacity="0.6" />
                <path d="M 0 80 Q 25 72 50 80 T 100 80 L 100 100 L 0 100 Z" fill="#2D6052" />
              </svg>
            </div>

            {/* Handwritten Caption */}
            <span
              className="mt-[calc(12*var(--px))] text-[#2A0F2E] text-[calc(19*var(--px))] font-bold tracking-wide select-none"
              style={{ fontFamily: 'Permanent Marker, cursive' }}
            >
              Stories
            </span>
          </div>
        </div>

        {/* --- Polaroid 3 (Right: Memories) --- */}
        <div
          className="relative flex flex-col items-center transition-transform duration-300"
          style={{
            width: 'calc(280 * var(--px))',
            transform: 'rotate(-2deg)',
            filter: 'drop-shadow(0 calc(10*var(--px)) calc(16*var(--px)) rgba(0,0,0,0.38))',
          }}
        >
          {/* Wooden Clothespin Peg */}
          <div
            className="w-[calc(18*var(--px))] h-[calc(46*var(--px))] rounded-[calc(2*var(--px))] -mb-[calc(18*var(--px))] z-20 relative"
            style={{
              background: 'linear-gradient(90deg, #D9B382 0%, #C89D66 50%, #B08249 100%)',
              boxShadow: '0 calc(2*var(--px)) calc(4*var(--px)) rgba(0,0,0,0.35)',
            }}
          >
            <div className="absolute top-[calc(18*var(--px))] inset-x-0 h-[calc(5*var(--px))] bg-[#858585] shadow-inner" />
          </div>

          {/* Polaroid Card Body */}
          <div
            className="w-full bg-[#FFFDF9] p-[calc(16*var(--px))] pb-[calc(24*var(--px))] rounded-[calc(4*var(--px))] flex flex-col items-center"
            style={{
              boxShadow: 'inset 0 0 calc(6*var(--px)) rgba(0,0,0,0.06)',
            }}
          >
            {/* Photo Viewport (Pastel Desert Sunset) */}
            <div
              className="w-full aspect-square rounded-[calc(2*var(--px))] overflow-hidden relative"
              style={{
                background: 'linear-gradient(180deg, #FFF1A8 0%, #FFB38A 45%, #E5173F 85%, #7A2E5C 100%)',
              }}
            >
              <div className="absolute top-[calc(28*var(--px))] left-[calc(35*var(--px))] w-[calc(46*var(--px))] h-[calc(46*var(--px))] rounded-full bg-[#FFFFFF]/85" />
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M 0 75 Q 30 65 60 80 T 100 70 L 100 100 L 0 100 Z" fill="#992645" opacity="0.6" />
                <path d="M 0 85 Q 40 78 80 88 T 100 85 L 100 100 L 0 100 Z" fill="#5E1128" />
              </svg>
            </div>

            {/* Handwritten Caption */}
            <span
              className="mt-[calc(12*var(--px))] text-[#2A0F2E] text-[calc(19*var(--px))] font-bold tracking-wide select-none"
              style={{ fontFamily: 'Permanent Marker, cursive' }}
            >
              Memories
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
