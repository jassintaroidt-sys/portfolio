export function Handle(): JSX.Element {
  return (
    <div
      className="relative mx-auto rounded-xl flex flex-col items-center justify-between overflow-hidden shadow-inner border border-black/50"
      style={{
        width: 'calc(210 * var(--px))',
        height: 'calc(530 * var(--px))',
        padding: 'calc(24 * var(--px)) 0',
        background: 'linear-gradient(180deg, #100E17 0%, #1A1822 50%, #0D0C13 100%)',
        boxShadow:
          'inset 0 6px 12px rgba(0,0,0,0.85), inset 0 0 4px rgba(0,0,0,0.9), 0 1px 0 rgba(255,255,255,0.4)',
      }}
    >
      {/* Chrome Latch Bar (78 x 310) */}
      <div
        className="rounded-lg shadow-md border border-white/60 flex flex-col items-center justify-center gap-1 relative overflow-hidden"
        style={{
          width: 'calc(78 * var(--px))',
          height: 'calc(310 * var(--px))',
          background: 'linear-gradient(90deg, #8F93A3 0%, #FFFFFF 35%, #DADCE8 60%, #8F93A3 100%)',
          boxShadow: '0 4px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.8)',
        }}
      >
        {/* 3 Horizontal Grip Ridges */}
        {Array.from({ length: 3 }, (_, i) => (
          <div
            key={i}
            className="w-3/4 rounded-full bg-black/40 shadow-inner"
            style={{
              height: 'calc(8 * var(--px))',
              marginBottom: 'calc(10 * var(--px))',
              borderBottom: '1px solid rgba(255,255,255,0.5)',
            }}
          />
        ))}
      </div>

      {/* Circular Keyhole with Slot */}
      <div
        className="rounded-full relative flex items-center justify-center border border-black/60 shadow-inner"
        style={{
          width: 'calc(68 * var(--px))',
          height: 'calc(68 * var(--px))',
          background: 'radial-gradient(circle at 35% 35%, #DADCE8, #4D4E5C)',
        }}
      >
        {/* Black key slot */}
        <div
          className="bg-black rounded-full relative flex flex-col items-center"
          style={{ width: 'calc(26 * var(--px))', height: 'calc(26 * var(--px))' }}
        >
          {/* Key slit line */}
          <div
            className="bg-black absolute top-full w-1"
            style={{
              width: 'calc(12 * var(--px))',
              height: 'calc(18 * var(--px))',
              marginTop: 'calc(-6 * var(--px))',
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Handle;
