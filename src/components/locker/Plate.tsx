export interface PlateProps {
  number: string;
  isPinkDoor?: boolean;
}

export function Plate({ number, isPinkDoor = false }: PlateProps): JSX.Element {
  return (
    <div
      className={`
        relative mx-auto rounded-lg select-none flex items-center justify-between
        border shadow-md
        ${
          isPinkDoor
            ? 'bg-gradient-to-b from-[#FFE3F0] to-[#F7B8D6] border-white/80 shadow-rose-quartz/50'
            : 'bg-gradient-to-b from-[#FFFFFF] via-[#E8E9F0] to-[#C9CCD5] border-white/90 shadow-black/15'
        }
      `}
      style={{
        width: 'calc(480 * var(--px))',
        height: 'calc(120 * var(--px))',
        padding: '0 calc(28 * var(--px))',
      }}
    >
      {/* Left Dome Screw */}
      <div
        className="rounded-full shadow-inner border border-black/20 flex items-center justify-center"
        style={{
          width: 'calc(24 * var(--px))',
          height: 'calc(24 * var(--px))',
          background: 'radial-gradient(circle at 35% 35%, #FFFFFF, #9A9BB2)',
        }}
      >
        <div
          className="bg-black/30 rounded-full"
          style={{ width: 'calc(10 * var(--px))', height: 'calc(10 * var(--px))' }}
        />
      </div>

      {/* Door Number */}
      <span
        className={`font-bebas-neue font-bold tracking-widest text-center leading-none ${
          isPinkDoor ? 'text-raspberry' : 'text-ink'
        }`}
        style={{
          fontSize: 'calc(80 * var(--px))',
          textShadow: isPinkDoor
            ? '0 1px 0 rgba(255,255,255,0.8)'
            : '0 1px 0 rgba(255,255,255,0.9), 0 -1px 0 rgba(0,0,0,0.2)',
        }}
      >
        {number}
      </span>

      {/* Right Dome Screw */}
      <div
        className="rounded-full shadow-inner border border-black/20 flex items-center justify-center"
        style={{
          width: 'calc(24 * var(--px))',
          height: 'calc(24 * var(--px))',
          background: 'radial-gradient(circle at 35% 35%, #FFFFFF, #9A9BB2)',
        }}
      >
        <div
          className="bg-black/30 rounded-full"
          style={{ width: 'calc(10 * var(--px))', height: 'calc(10 * var(--px))' }}
        />
      </div>
    </div>
  );
}

export default Plate;
