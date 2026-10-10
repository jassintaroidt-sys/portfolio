import { HoverLabel } from '../ui/HoverLabel';

export interface BooksProps {
  interactive?: boolean;
}

export function Books({ interactive = true }: BooksProps): JSX.Element {
  const handleClick = () => {
    if (interactive) {
      window.location.hash = '#/my-strategy';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (interactive && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      window.location.hash = '#/my-strategy';
    }
  };

  // 6 Standing book colors & heights (against left wall)
  const standingBooks = [
    { color: '#A9644D', highlight: '#C57E65', height: 680, width: 62 }, // Terakota
    { color: '#E8A5B8', highlight: '#F5BACB', height: 660, width: 56 }, // Pink muda
    { color: '#A9C4A0', highlight: '#BFD7B8', height: 720, width: 68 }, // Sage
    { color: '#BFA8E5', highlight: '#D4C1F5', height: 700, width: 64 }, // Lavender
    { color: '#A8E6CF', highlight: '#C4F2E1', height: 730, width: 62 }, // Mint
    { color: '#BFE3F5', highlight: '#D8EFFC', height: 690, width: 66 }, // Baby-blue
  ];

  // 10 Horizontal stacked books (ordered top to bottom)
  const stackedBooks = [
    { color: '#D89EAE', highlight: '#E8B3C1', height: 60 }, // 1: dusty-pink
    { color: '#BAA3E4', highlight: '#CDBBF2', height: 62 }, // 2: lavender
    { color: '#A4C19C', highlight: '#B8D4B1', height: 64 }, // 3: sage
    { color: '#A7D8F5', highlight: '#BFE3F5', height: 60 }, // 4: baby-blue
    { color: '#FFF8EE', highlight: '#FFFFFF', height: 66 }, // 5: krem
    { color: '#FFB38A', highlight: '#FFCBB0', height: 62 }, // 6: salmon
    { color: '#FFF1A8', highlight: '#FFF8C4', height: 64 }, // 7: butter
    { color: '#9BB894', highlight: '#AFD0A7', height: 62 }, // 8: sage
    { color: '#8FB8E8', highlight: '#A6C8F2', height: 64 }, // 9: biru muda
    { color: '#CE8B9D', highlight: '#DF9EAF', height: 68 }, // 10: dusty-pink
  ];

  const content = (
    <div
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label="Bookshelf Collection — Explore strategy and execution frameworks"
      className="relative select-none outline-none group cursor-pointer focus-visible:ring-4 focus-visible:ring-hot-pink rounded-sm"
      style={{
        width: 'calc(1050 * var(--px))',
        height: 'calc(780 * var(--px))',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Contact Shadow onto Shelf */}
      <div
        className="absolute bottom-0 left-0 rounded-[50%] pointer-events-none"
        style={{
          width: 'calc(1020 * var(--px))',
          height: 'calc(44 * var(--px))',
          background: 'radial-gradient(ellipse at center, rgba(10, 2, 14, 0.8) 0%, rgba(10, 2, 14, 0) 75%)',
          filter: 'blur(calc(6 * var(--px)))',
          transform: 'translateY(35%)',
        }}
      />

      <div className="w-full h-full flex items-end transition-transform duration-300 group-hover:scale-[1.015]">
        {/* ================= LEFT: 6 STANDING BOOKS ================= */}
        <div className="flex items-end h-full flex-shrink-0 z-10">
          {standingBooks.map((b, i) => (
            <div
              key={i}
              className="relative flex flex-col justify-between rounded-t-[calc(3*var(--px))]"
              style={{
                width: `calc(${b.width} * var(--px))`,
                height: `calc(${b.height} * var(--px))`,
                background: `linear-gradient(90deg, ${b.color} 0%, ${b.highlight} 45%, ${b.color} 100%)`,
                boxShadow: `
                  inset calc(2*var(--px)) 0 calc(3*var(--px)) rgba(255,255,255,0.4),
                  inset calc(-2*var(--px)) 0 calc(4*var(--px)) rgba(0,0,0,0.35),
                  calc(2*var(--px)) 0 calc(6*var(--px)) rgba(0,0,0,0.25)
                `,
              }}
            >
              {/* Embossed Thin Spine Accent Lines (Top & Bottom) */}
              <div className="w-full pt-[calc(35*var(--px))] px-[calc(6*var(--px))] flex flex-col gap-[calc(4*var(--px))]">
                <div className="w-full h-[calc(1.5*var(--px))] bg-black/25 shadow-sm" />
                <div className="w-full h-[calc(1*var(--px))] bg-white/40" />
              </div>

              {/* Center subtle blind deboss rib */}
              <div className="w-full px-[calc(8*var(--px))] flex flex-col gap-[calc(3*var(--px))] opacity-50">
                <div className="w-full h-[calc(1*var(--px))] bg-black/20" />
                <div className="w-full h-[calc(1*var(--px))] bg-white/30" />
              </div>

              {/* Bottom Spine Accent Lines */}
              <div className="w-full pb-[calc(35*var(--px))] px-[calc(6*var(--px))] flex flex-col gap-[calc(4*var(--px))]">
                <div className="w-full h-[calc(1.5*var(--px))] bg-black/25 shadow-sm" />
                <div className="w-full h-[calc(1*var(--px))] bg-white/40" />
              </div>
            </div>
          ))}
        </div>

        {/* ================= RIGHT: 10 HORIZONTAL STACKED BOOKS ================= */}
        <div
          className="flex-1 flex flex-col-reverse justify-end pb-[calc(2*var(--px))] pl-[calc(12*var(--px))]"
          style={{
            maxWidth: 'calc(650 * var(--px))',
          }}
        >
          {stackedBooks.map((b, i) => (
            <div
              key={i}
              className="w-full relative flex items-center justify-between rounded-[calc(3*var(--px))]"
              style={{
                height: `calc(${b.height} * var(--px))`,
                background: `linear-gradient(180deg, ${b.highlight} 0%, ${b.color} 50%, ${b.color} 100%)`,
                boxShadow: `
                  inset 0 calc(1.5*var(--px)) calc(2*var(--px)) rgba(255,255,255,0.6),
                  inset 0 calc(-2*var(--px)) calc(3*var(--px)) rgba(0,0,0,0.35),
                  0 calc(3*var(--px)) calc(5*var(--px)) rgba(0,0,0,0.2)
                `,
                marginBottom: '-1px',
              }}
            >
              {/* Subtle Embossed Spine Grooves */}
              <div className="pl-[calc(28*var(--px))] flex gap-[calc(6*var(--px))] opacity-60">
                <div className="w-[calc(1.5*var(--px))] h-[calc(30*var(--px))] bg-black/30" />
                <div className="w-[calc(1*var(--px))] h-[calc(30*var(--px))] bg-white/40" />
              </div>

              {/* Right Paper Edge / Page Block Cream Texture */}
              <div
                className="w-[calc(38*var(--px))] h-[calc(80%)] rounded-r-[calc(2*var(--px))] mr-[calc(4*var(--px))]"
                style={{
                  background: 'repeating-linear-gradient(180deg, #FFFDF9 0px, #F0E8D5 2px, #FFFDF9 4px)',
                  boxShadow: 'inset calc(2*var(--px)) 0 calc(4*var(--px)) rgba(0,0,0,0.3)',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (!interactive) {
    return content;
  }

  return (
    <HoverLabel text="My Strategy" subtext="View Strategic Frameworks">
      {content}
    </HoverLabel>
  );
}
