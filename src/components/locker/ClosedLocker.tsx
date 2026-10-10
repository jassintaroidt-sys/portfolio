import { LockerCabinet } from './LockerCabinet';
import { LockerDoor } from './LockerDoor';

export interface ClosedLockerProps {
  onOpenClick?: () => void;
}

export function ClosedLocker({ onOpenClick }: ClosedLockerProps): JSX.Element {
  return (
    <LockerCabinet isOpenState={false}>
      {/* Door 01 */}
      <LockerDoor number="01" isPinkDoor={false} />

      {/* Divider Post 1 (86 units) with rivets */}
      <div
        className="h-full flex flex-col justify-around items-center border-x border-black/40"
        style={{
          width: 'calc(86 * var(--px))',
          background: 'linear-gradient(90deg, #424050 0%, #2A2834 50%, #424050 100%)',
        }}
      >
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="rounded-full shadow-inner border border-black/40"
            style={{
              width: 'calc(14 * var(--px))',
              height: 'calc(14 * var(--px))',
              background: 'radial-gradient(circle at 35% 35%, #DADCE8, #7C7D91)',
            }}
          />
        ))}
      </div>

      {/* Door 02 */}
      <LockerDoor number="02" isPinkDoor={false} />

      {/* Divider Post 2 (86 units) with rivets */}
      <div
        className="h-full flex flex-col justify-around items-center border-x border-black/40"
        style={{
          width: 'calc(86 * var(--px))',
          background: 'linear-gradient(90deg, #424050 0%, #2A2834 50%, #424050 100%)',
        }}
      >
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="rounded-full shadow-inner border border-black/40"
            style={{
              width: 'calc(14 * var(--px))',
              height: 'calc(14 * var(--px))',
              background: 'radial-gradient(circle at 35% 35%, #DADCE8, #7C7D91)',
            }}
          />
        ))}
      </div>

      {/* Door 03 (Pink Door with Typography and ▶ OPEN) */}
      <LockerDoor number="03" isPinkDoor={true} onOpenClick={onOpenClick} />

      {/* Divider Post 3 (86 units) with rivets */}
      <div
        className="h-full flex flex-col justify-around items-center border-x border-black/40"
        style={{
          width: 'calc(86 * var(--px))',
          background: 'linear-gradient(90deg, #424050 0%, #2A2834 50%, #424050 100%)',
        }}
      >
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="rounded-full shadow-inner border border-black/40"
            style={{
              width: 'calc(14 * var(--px))',
              height: 'calc(14 * var(--px))',
              background: 'radial-gradient(circle at 35% 35%, #DADCE8, #7C7D91)',
            }}
          />
        ))}
      </div>

      {/* Door 04 */}
      <LockerDoor number="04" isPinkDoor={false} />

      {/* Divider Post 4 (86 units) with rivets */}
      <div
        className="h-full flex flex-col justify-around items-center border-x border-black/40"
        style={{
          width: 'calc(86 * var(--px))',
          background: 'linear-gradient(90deg, #424050 0%, #2A2834 50%, #424050 100%)',
        }}
      >
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="rounded-full shadow-inner border border-black/40"
            style={{
              width: 'calc(14 * var(--px))',
              height: 'calc(14 * var(--px))',
              background: 'radial-gradient(circle at 35% 35%, #DADCE8, #7C7D91)',
            }}
          />
        ))}
      </div>

      {/* Door 05 */}
      <LockerDoor number="05" isPinkDoor={false} />
    </LockerCabinet>
  );
}

export default ClosedLocker;
