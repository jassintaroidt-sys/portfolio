import { Plate } from './Plate';
import { Vent } from './Vent';
import { Handle } from './Handle';

export interface LockerDoorProps {
  number: string;
  isPinkDoor?: boolean;
  onOpenClick?: () => void;
}

export function LockerDoor({
  number,
  isPinkDoor = false,
  onOpenClick,
}: LockerDoorProps): JSX.Element {
  return (
    <div
      className={`
        relative select-none flex flex-col justify-between overflow-hidden
        border shadow-xl
        ${
          isPinkDoor
            ? 'bg-gradient-to-r from-[#FFC2E0] via-[#FFB3D9] to-[#F7A8CF] border-[#FFA3D0]'
            : 'bg-gradient-to-r from-[#D1D3DF] via-[#B9B8CC] to-[#A8A9BF] border-[#C4C5D6]'
        }
      `}
      style={{
        width: 'calc(1080 * var(--px))',
        height: 'calc(3240 * var(--px))',
        padding: 'calc(80 * var(--px)) calc(60 * var(--px))',
        boxShadow: isPinkDoor
          ? 'inset 0 0 16px rgba(255,46,147,0.2), 0 4px 12px rgba(0,0,0,0.25)'
          : 'inset 0 0 16px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.3)',
      }}
    >
      {/* 3 Hinge Tabs on the Right Edge (Top, Middle, Bottom) */}
      <div
        className="absolute right-0 top-24 w-2 h-10 rounded-l shadow-md border-y border-l border-black/40"
        style={{
          width: 'calc(16 * var(--px))',
          height: 'calc(64 * var(--px))',
          top: 'calc(160 * var(--px))',
          background: isPinkDoor ? '#E099BC' : '#8A8B9C',
        }}
      />
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-10 rounded-l shadow-md border-y border-l border-black/40"
        style={{
          width: 'calc(16 * var(--px))',
          height: 'calc(64 * var(--px))',
          background: isPinkDoor ? '#E099BC' : '#8A8B9C',
        }}
      />
      <div
        className="absolute right-0 bottom-24 w-2 h-10 rounded-l shadow-md border-y border-l border-black/40"
        style={{
          width: 'calc(16 * var(--px))',
          height: 'calc(64 * var(--px))',
          bottom: 'calc(160 * var(--px))',
          background: isPinkDoor ? '#E099BC' : '#8A8B9C',
        }}
      />

      {/* Embossed / Beveled Inner Border Frame */}
      <div
        className="absolute pointer-events-none rounded-xl"
        style={{
          inset: 'calc(36 * var(--px))',
          border: isPinkDoor
            ? 'calc(6 * var(--px)) solid rgba(255, 255, 255, 0.45)'
            : 'calc(6 * var(--px)) solid rgba(255, 255, 255, 0.35)',
          boxShadow: isPinkDoor
            ? 'inset 0 2px 6px rgba(0,0,0,0.12), 0 2px 4px rgba(255,255,255,0.4)'
            : 'inset 0 2px 6px rgba(0,0,0,0.2), 0 2px 4px rgba(255,255,255,0.4)',
        }}
      />

      {/* Vertical Stamped Crease Line down the center */}
      <div
        className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: 'calc(4 * var(--px))',
          background: isPinkDoor
            ? 'linear-gradient(90deg, rgba(0,0,0,0.08), rgba(255,255,255,0.3))'
            : 'linear-gradient(90deg, rgba(0,0,0,0.12), rgba(255,255,255,0.35))',
        }}
      />

      {/* TOP SECTION: Number Plate + Top Vents */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        <Plate number={number} isPinkDoor={isPinkDoor} />
        <div style={{ marginTop: 'calc(60 * var(--px))' }}>
          <Vent isPinkDoor={isPinkDoor} />
        </div>
      </div>

      {/* MIDDLE SECTION: Door 03 Typography & OPEN Button OR Steel Door Handle */}
      <div className="relative z-20 my-auto flex flex-col items-center justify-center">
        {isPinkDoor ? (
          <div className="flex flex-col items-center text-center">
            {/* Block-highlight Typography per BRIEF §9.3 */}
            <div
              className="flex flex-col items-center"
              style={{ gap: 'calc(24 * var(--px))' }}
            >
              {/* Line 1: Content (Regular, bg --bubblegum) + that (Regular, bg --butter) */}
              <div
                className="flex items-center justify-center"
                style={{ gap: 'calc(16 * var(--px))' }}
              >
                <span
                  className="font-sentient font-normal text-ink shadow-sm"
                  style={{
                    backgroundColor: 'var(--bubblegum, #FF8DC7)',
                    fontSize: 'calc(84 * var(--px))',
                    padding: 'calc(15 * var(--px)) calc(36 * var(--px))',
                    lineHeight: 1,
                  }}
                >
                  Content
                </span>
                <span
                  className="font-sentient font-normal text-ink shadow-sm"
                  style={{
                    backgroundColor: 'var(--butter, #FFF1A8)',
                    fontSize: 'calc(84 * var(--px))',
                    padding: 'calc(15 * var(--px)) calc(36 * var(--px))',
                    lineHeight: 1,
                  }}
                >
                  that
                </span>
              </div>

              {/* Line 2: is (Italic, bg --pastel-mint) + Felt, (Italic, bg --lilac) */}
              <div
                className="flex items-center justify-center"
                style={{ gap: 'calc(16 * var(--px))' }}
              >
                <span
                  className="font-sentient italic text-ink shadow-sm"
                  style={{
                    backgroundColor: 'var(--pastel-mint, #A8E6CF)',
                    fontSize: 'calc(84 * var(--px))',
                    padding: 'calc(15 * var(--px)) calc(34 * var(--px))',
                    lineHeight: 1,
                  }}
                >
                  is
                </span>
                <span
                  className="font-sentient italic text-ink shadow-sm"
                  style={{
                    backgroundColor: 'var(--lilac, #D4C1F5)',
                    fontSize: 'calc(84 * var(--px))',
                    padding: 'calc(15 * var(--px)) calc(34 * var(--px))',
                    lineHeight: 1,
                  }}
                >
                  Felt,
                </span>
              </div>

              {/* Line 3: Shared, (Bold, bg --baby-blue) */}
              <div className="flex items-center justify-center">
                <span
                  className="font-sentient font-bold text-ink shadow-sm"
                  style={{
                    backgroundColor: 'var(--baby-blue, #BFE3F5)',
                    fontSize: 'calc(88 * var(--px))',
                    padding: 'calc(15 * var(--px)) calc(48 * var(--px))',
                    lineHeight: 1,
                  }}
                >
                  Shared,
                </span>
              </div>

              {/* Line 4: Remembered (Bold Italic, bg --peach-fizz) */}
              <div className="flex items-center justify-center">
                <span
                  className="font-sentient font-bold italic text-ink shadow-sm"
                  style={{
                    backgroundColor: 'var(--peach-fizz, #FFB38A)',
                    fontSize: 'calc(88 * var(--px))',
                    padding: 'calc(15 * var(--px)) calc(48 * var(--px))',
                    lineHeight: 1,
                  }}
                >
                  Remembered
                </span>
              </div>
            </div>

            {/* StickerButton ▶ OPEN per BRIEF §9.3 */}
            <div style={{ marginTop: 'calc(100 * var(--px))' }}>
              <button
                type="button"
                onClick={onOpenClick}
                className={`
                  relative inline-flex items-center justify-center
                  cursor-pointer select-none
                  font-sentient font-bold text-white
                  rounded-full border-4 border-white
                  transition-all duration-200 ease-out
                  hover:scale-105 active:scale-95
                  focus-visible:outline-3 focus-visible:outline-hot-pink focus-visible:outline-offset-2
                `}
                style={{
                  minHeight: 'calc(175 * var(--px))',
                  padding: 'calc(32 * var(--px)) calc(96 * var(--px))',
                  fontSize: 'calc(70 * var(--px))',
                  transform: 'rotate(-1.5deg)',
                  background: 'linear-gradient(135deg, #FF2E93 0%, #E91E8C 60%, #D81B72 100%)',
                  boxShadow:
                    '0 calc(10 * var(--px)) calc(24 * var(--px)) rgba(233, 30, 140, 0.45), 0 calc(4 * var(--px)) 0 rgba(0,0,0,0.15)',
                }}
                aria-label="Open Locker"
              >
                {/* Play triangle SVG (54 units) */}
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  style={{
                    width: 'calc(54 * var(--px))',
                    height: 'calc(54 * var(--px))',
                    marginRight: 'calc(18 * var(--px))',
                  }}
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span>OPEN</span>
              </button>
            </div>
          </div>
        ) : (
          <Handle />
        )}
      </div>

      {/* BOTTOM SECTION: Bottom Vents */}
      <div className="relative z-10 flex flex-col items-center">
        <Vent isPinkDoor={isPinkDoor} />
      </div>
    </div>
  );
}

export default LockerDoor;
