import { HoverLabel } from '../ui/HoverLabel';

export interface MagazineStackProps {
  interactive?: boolean;
}

export function MagazineStack({ interactive = true }: MagazineStackProps): JSX.Element {
  const handleClick = () => {
    if (interactive) {
      window.location.hash = '#/magazine-art';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (interactive && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      window.location.hash = '#/magazine-art';
    }
  };

  const content = (
    <div
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label="Vogue Magazine Stack — View editorial and magazine art works"
      className="relative select-none outline-none group cursor-pointer focus-visible:ring-4 focus-visible:ring-hot-pink rounded-sm"
      style={{
        width: 'calc(740 * var(--px))',
        height: 'calc(960 * var(--px))',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Contact Shadow onto Shelf */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-[50%] pointer-events-none"
        style={{
          width: 'calc(680 * var(--px))',
          height: 'calc(44 * var(--px))',
          background: 'radial-gradient(ellipse at center, rgba(10, 2, 14, 0.75) 0%, rgba(10, 2, 14, 0) 75%)',
          filter: 'blur(calc(5 * var(--px)))',
          transform: 'translateY(40%)',
        }}
      />

      {/* Behind Magazines (Thickness Stack & Secondary Spines) */}
      <div
        className="absolute top-[calc(12*var(--px))] left-[calc(40*var(--px))] w-[calc(680*var(--px))] h-[calc(940*var(--px))] rounded-[calc(6*var(--px))]"
        style={{
          background: '#C7829E',
          boxShadow: 'calc(-12*var(--px)) 0 calc(16*var(--px)) rgba(0,0,0,0.3)',
          transform: 'translateZ(-15px) rotate(-1.5deg)',
        }}
      />
      <div
        className="absolute top-[calc(6*var(--px))] left-[calc(22*var(--px))] w-[calc(700*var(--px))] h-[calc(950*var(--px))] rounded-[calc(6*var(--px))]"
        style={{
          background: '#DF95B3',
          boxShadow: 'calc(-8*var(--px)) 0 calc(12*var(--px)) rgba(0,0,0,0.25)',
          transform: 'translateZ(-8px) rotate(-0.8deg)',
        }}
      />

      {/* Main Front Magazine Book */}
      <div
        className="relative w-full h-full rounded-[calc(8*var(--px))] overflow-hidden flex transition-transform duration-300 group-hover:scale-[1.015]"
        style={{
          boxShadow: `
            calc(8*var(--px)) calc(16*var(--px)) calc(24*var(--px)) rgba(0,0,0,0.4),
            inset 0 0 calc(8*var(--px)) rgba(255,255,255,0.4)
          `,
        }}
      >
        {/* Left Book Spine (Darker Pink with Embossed Crease Line) */}
        <div
          className="w-[calc(44*var(--px))] h-full relative flex-shrink-0 flex items-center justify-center"
          style={{
            background: 'linear-gradient(90deg, #9C5774 0%, #BA6E8D 60%, #85445F 100%)',
            boxShadow: 'inset calc(-2*var(--px)) 0 calc(4*var(--px)) rgba(0,0,0,0.4)',
          }}
        >
          <span
            className="text-white/60 tracking-[calc(6*var(--px))] text-[calc(14*var(--px))] uppercase font-bold transform -rotate-90 select-none whitespace-nowrap"
            style={{ fontFamily: 'Bodoni Moda, serif' }}
          >
            VOGUE · SPECIAL ISSUE 2025
          </span>
        </div>

        {/* Front Cover Face (Dusty Rose / Bubblegum Pink Paper) */}
        <div
          className="flex-1 h-full relative flex flex-col justify-between p-[calc(40*var(--px))] select-none"
          style={{
            backgroundColor: '#EBA6C0',
            backgroundImage: `
              radial-gradient(circle at 75% 20%, rgba(255,255,255,0.25) 0%, transparent 60%),
              linear-gradient(180deg, #F0B3CB 0%, #E293B1 100%)
            `,
          }}
        >
          {/* Subtle Paper Texture & Lighting */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(0,0,0,0.15) 100%)',
            }}
          />

          {/* Top Metadata Header */}
          <div className="relative z-10 flex justify-between items-start text-white/90 text-[calc(13*var(--px))] font-semibold tracking-wider uppercase">
            <div className="leading-tight flex flex-col">
              <span>LIFESTYLE</span>
              <span>BEAUTY</span>
              <span>FASHION</span>
              <span>SELF LOVE</span>
            </div>
            <div className="text-right leading-tight flex flex-col">
              <span>VOL. 12</span>
              <span>APR 2025</span>
            </div>
          </div>

          {/* Center Brand & Art Arch Graphic */}
          <div className="relative z-10 flex flex-col items-center my-auto">
            {/* VOGUE Title */}
            <h1
              className="text-white font-extrabold tracking-[calc(4*var(--px))] leading-none text-center select-none"
              style={{
                fontFamily: 'Bodoni Moda, serif',
                fontSize: 'calc(138*var(--px))',
                textShadow: '0 calc(3*var(--px)) calc(6*var(--px)) rgba(0,0,0,0.15)',
              }}
            >
              VOGUE
            </h1>
            <span
              className="text-white/90 text-[calc(18*var(--px))] font-semibold tracking-[calc(14*var(--px))] uppercase mt-[calc(4*var(--px))]"
            >
              MAGAZINE
            </span>

            {/* Editorial Arch Graphic Silhouette */}
            <div
              className="relative w-[calc(260*var(--px))] h-[calc(230*var(--px))] mt-[calc(28*var(--px))] flex flex-col items-center justify-end"
            >
              {/* Layered Arches */}
              <div
                className="absolute inset-0 rounded-t-full border-[calc(12*var(--px))] border-white/40 pointer-events-none"
              />
              <div
                className="absolute inset-[calc(20*var(--px))] rounded-t-full bg-white/25 flex items-center justify-center overflow-hidden"
              >
                <div
                  className="w-[calc(130*var(--px))] h-[calc(160*var(--px))] rounded-t-full bg-[#D682A4]/60"
                />
              </div>

              {/* Script Subtitle Overlay */}
              <div className="relative z-10 text-center pb-[calc(20*var(--px))]">
                <span
                  className="text-white text-[calc(38*var(--px))] leading-none font-normal drop-shadow-sm select-none"
                  style={{ fontFamily: 'Pinyon Script, cursive' }}
                >
                  Better Things Ahead ♡
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Footer & Barcode */}
          <div className="relative z-10 flex justify-between items-end">
            <div className="text-white/90 text-[calc(12*var(--px))] font-bold tracking-wider leading-tight uppercase flex flex-col">
              <span>SMALL STEPS</span>
              <span>MAKE BIG</span>
              <span>CHANGES</span>
              <div className="w-[calc(36*var(--px))] h-[calc(2*var(--px))] bg-white/70 mt-[calc(4*var(--px))]" />
            </div>

            {/* Barcode Strip */}
            <div
              className="bg-white px-[calc(10*var(--px))] py-[calc(6*var(--px))] rounded-[calc(2*var(--px))] shadow-sm flex flex-col items-center"
            >
              <div className="flex gap-[calc(2.5*var(--px))] h-[calc(30*var(--px))] items-end">
                <div className="w-[calc(2*var(--px))] h-full bg-black" />
                <div className="w-[calc(1*var(--px))] h-full bg-black" />
                <div className="w-[calc(3*var(--px))] h-full bg-black" />
                <div className="w-[calc(2*var(--px))] h-full bg-black" />
                <div className="w-[calc(4*var(--px))] h-full bg-black" />
                <div className="w-[calc(1*var(--px))] h-full bg-black" />
                <div className="w-[calc(3*var(--px))] h-full bg-black" />
                <div className="w-[calc(2*var(--px))] h-full bg-black" />
                <div className="w-[calc(4*var(--px))] h-full bg-black" />
                <div className="w-[calc(1*var(--px))] h-full bg-black" />
                <div className="w-[calc(2*var(--px))] h-full bg-black" />
              </div>
              <span className="text-black font-mono text-[calc(9*var(--px))] tracking-widest mt-[calc(2*var(--px))]">
                9 772977 256006
              </span>
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
    <HoverLabel text="Magazine Art" subtext="View Editorial Designs">
      {content}
    </HoverLabel>
  );
}
