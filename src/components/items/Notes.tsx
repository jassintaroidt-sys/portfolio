import { HoverLabel } from '../ui/HoverLabel';

export interface NotesProps {
  interactive?: boolean;
}

export function Notes({ interactive = true }: NotesProps): JSX.Element {
  const handleClick = () => {
    if (interactive) {
      window.location.hash = '#/notes';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (interactive && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      window.location.hash = '#/notes';
    }
  };

  const content = (
    <div
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label="Spiral Notes Book — Read campaign notes and thoughts"
      className="relative select-none outline-none group cursor-pointer focus-visible:ring-4 focus-visible:ring-hot-pink rounded-sm"
      style={{
        width: 'calc(520 * var(--px))',
        height: 'calc(760 * var(--px))',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Contact Shadow onto Shelf */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-[50%] pointer-events-none"
        style={{
          width: 'calc(480 * var(--px))',
          height: 'calc(40 * var(--px))',
          background: 'radial-gradient(ellipse at center, rgba(12, 2, 16, 0.75) 0%, rgba(12, 2, 16, 0) 75%)',
          filter: 'blur(calc(5 * var(--px)))',
          transform: 'translateY(35%)',
        }}
      />

      {/* Main Notebook Container with Spiral Bindings on Left */}
      <div
        className="w-full h-full relative rounded-r-[calc(14*var(--px))] rounded-l-[calc(4*var(--px))] flex transition-transform duration-300 group-hover:scale-[1.02]"
        style={{
          boxShadow: `
            calc(10*var(--px)) calc(16*var(--px)) calc(24*var(--px)) rgba(0,0,0,0.4),
            inset 0 0 calc(8*var(--px)) rgba(255,255,255,0.4)
          `,
        }}
      >
        {/* Left Metal Wire-O Twin Spiral Column */}
        <div
          className="w-[calc(48*var(--px))] h-full relative flex-shrink-0 z-20 flex flex-col justify-around py-[calc(28*var(--px))] items-center bg-[#E8C0D2]"
          style={{
            boxShadow: 'inset calc(-2*var(--px)) 0 calc(4*var(--px)) rgba(0,0,0,0.25)',
          }}
        >
          {/* 18 Twin Spiral Metal Wire Loops */}
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={i}
              className="w-[calc(56*var(--px))] h-[calc(16*var(--px))] -ml-[calc(8*var(--px))] relative flex items-center"
            >
              {/* Silver Wire Loop with Chrome Highlights */}
              <div
                className="w-full h-full rounded-[calc(8*var(--px))] border-[calc(3*var(--px))] border-[#B0B5C0]"
                style={{
                  background: 'linear-gradient(180deg, #FFFFFF 0%, #D8DDE6 40%, #8A92A0 80%, #FFFFFF 100%)',
                  boxShadow: '0 calc(2*var(--px)) calc(3*var(--px)) rgba(0,0,0,0.35)',
                }}
              />
              {/* Hole punch in book paper */}
              <div className="absolute right-[calc(10*var(--px))] w-[calc(8*var(--px))] h-[calc(8*var(--px))] rounded-full bg-[#3D142A]" />
            </div>
          ))}
        </div>

        {/* Notebook Cover (Pink Leatherette / Soft Rose Quartz Paper) */}
        <div
          className="flex-1 h-full relative rounded-r-[calc(14*var(--px))] flex flex-col justify-between items-center p-[calc(40*var(--px))] select-none overflow-hidden"
          style={{
            backgroundColor: '#F7CAD0',
            backgroundImage: `
              radial-gradient(circle at 75% 30%, rgba(255,255,255,0.4) 0%, transparent 65%),
              linear-gradient(145deg, #FADCE2 0%, #F5BACB 50%, #EAA2B8 100%)
            `,
          }}
        >
          {/* Subtle Leather Texture Sheen */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              background: 'repeating-radial-gradient(circle at 50% 50%, transparent 0, rgba(0,0,0,0.03) 1px, transparent 2px)',
            }}
          />

          {/* Top Sticky Index Flag / Tab */}
          <div className="w-full flex justify-end">
            <div
              className="px-[calc(16*var(--px))] py-[calc(4*var(--px))] rounded-t-[calc(4*var(--px))] text-white font-mono text-[calc(11*var(--px))] tracking-widest uppercase bg-[#FF8DC7] shadow-sm -mr-[calc(40*var(--px))]"
            >
              MEMO
            </div>
          </div>

          {/* Centered Large Bold Title: "NOTES" */}
          <div className="relative z-10 flex flex-col items-center my-auto">
            <h1
              className="font-black tracking-[calc(8*var(--px))] uppercase text-center leading-none text-[#FF2E93]"
              style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: 'calc(140*var(--px))',
                textShadow: `
                  0 calc(2*var(--px)) 0 #FFFFFF,
                  0 calc(4*var(--px)) calc(10*var(--px)) rgba(216, 27, 114, 0.35)
                `,
              }}
            >
              NOTES
            </h1>
            <span
              className="text-[#9C3868] text-[calc(16*var(--px))] font-semibold tracking-[calc(6*var(--px))] uppercase mt-[calc(10*var(--px))]"
            >
              STRATEGY & SCRIPTS
            </span>
          </div>

          {/* Bottom Clean Ruled Lines / Watermark */}
          <div className="w-full flex flex-col gap-[calc(8*var(--px))] opacity-40 px-[calc(16*var(--px))]">
            <div className="w-full h-[calc(1.5*var(--px))] bg-[#BA5482]" />
            <div className="w-full h-[calc(1.5*var(--px))] bg-[#BA5482]" />
            <div className="w-3/4 h-[calc(1.5*var(--px))] bg-[#BA5482]" />
          </div>
        </div>

        {/* Visible Cream Page Block on the Right Edge */}
        <div
          className="w-[calc(18*var(--px))] h-[calc(97%)] my-auto rounded-r-[calc(4*var(--px))] flex-shrink-0"
          style={{
            background: 'repeating-linear-gradient(180deg, #FFFDF9 0px, #F0E8D5 2px, #FFFDF9 4px)',
            boxShadow: 'inset calc(2*var(--px)) 0 calc(3*var(--px)) rgba(0,0,0,0.25)',
          }}
        />
      </div>
    </div>
  );

  if (!interactive) {
    return content;
  }

  return (
    <HoverLabel text="Notes" subtext="Read Campaign Notes">
      {content}
    </HoverLabel>
  );
}
