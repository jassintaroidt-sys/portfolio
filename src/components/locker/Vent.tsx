export interface VentProps {
  isPinkDoor?: boolean;
}

export function Vent({ isPinkDoor = false }: VentProps): JSX.Element {
  return (
    <div
      className="flex flex-col items-center justify-between mx-auto"
      style={{
        width: 'calc(700 * var(--px))',
        gap: 'calc(18 * var(--px))',
      }}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          className={`w-full rounded-full relative overflow-hidden ${
            isPinkDoor ? 'bg-[#5A1E45]' : 'bg-[#2B2933]'
          }`}
          style={{
            height: 'calc(28 * var(--px))',
            boxShadow: isPinkDoor
              ? 'inset 0 3px 5px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.6)'
              : 'inset 0 4px 6px rgba(0,0,0,0.7), 0 1px 0 rgba(255,255,255,0.5)',
          }}
        >
          {/* Bottom highlight lip for recessed 3D effect */}
          <div
            className="absolute bottom-0 left-0 w-full"
            style={{
              height: 'calc(4 * var(--px))',
              background: isPinkDoor ? 'rgba(255, 220, 240, 0.4)' : 'rgba(255, 255, 255, 0.3)',
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default Vent;
