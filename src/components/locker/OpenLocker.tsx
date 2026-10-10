import { LockerCabinet } from './LockerCabinet';
import { CompartmentOpen } from './CompartmentOpen';
import { DoorCard } from './DoorCard';
import {
  Certificate,
  Trophy,
  MagazineStack,
  Camera,
  Shoes,
  Polaroids,
  Envelope,
  Books,
  Notes,
  Bag,
  Umbrella,
} from '../items';

export function OpenLocker(): JSX.Element {
  return (
    <LockerCabinet isOpenState={true}>
      {/* ================= LOCKER 01: CLOSED DOOR WITH SERVICES CARD ================= */}
      <div
        className="relative select-none rounded-[calc(8*var(--px))] overflow-hidden flex flex-col justify-between"
        style={{
          width: 'calc(1080 * var(--px))',
          height: 'calc(3240 * var(--px))',
          background: 'linear-gradient(135deg, #FFBBDC 0%, #FFA6D2 40%, #F58DBE 100%)',
          boxShadow: `
            inset 0 0 calc(20*var(--px)) rgba(216, 27, 114, 0.25),
            0 calc(8*var(--px)) calc(20*var(--px)) rgba(0,0,0,0.3)
          `,
          border: 'calc(4*var(--px)) solid #FFCFE6',
        }}
      >
        <DoorCard variant="services" />
      </div>

      {/* Divider Post 1 (86 units) */}
      <div
        className="h-full flex flex-col justify-around items-center border-x border-[#9E4D74]"
        style={{
          width: 'calc(86 * var(--px))',
          background: 'linear-gradient(90deg, #BA6E8D 0%, #D48BAA 50%, #A85779 100%)',
        }}
      >
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="rounded-full shadow-inner border border-[#7A2E5C]"
            style={{
              width: 'calc(14 * var(--px))',
              height: 'calc(14 * var(--px))',
              background: 'radial-gradient(circle at 35% 35%, #FFFFFF, #E8A5B8)',
            }}
          />
        ))}
      </div>

      {/* ================= LOCKER 02: OPEN COMPARTMENT ================= */}
      <CompartmentOpen
        shelfTop={
          <div className="relative w-full h-full flex items-end justify-center">
            {/* Certificate hanging on back wall */}
            <div className="absolute top-[calc(60*var(--px))] left-1/2 -translate-x-1/2 z-10">
              <Certificate />
            </div>
            {/* Trophy in front on the right, resting on shelf */}
            <div className="absolute right-[calc(20*var(--px))] bottom-0 z-20">
              <Trophy />
            </div>
          </div>
        }
        shelfMiddle={
          <div className="relative w-full h-full flex items-end justify-between px-[calc(10*var(--px))]">
            {/* Magazine stack standing on left */}
            <div className="relative z-10 bottom-0">
              <MagazineStack />
            </div>
            {/* Camera in front on right, resting on shelf */}
            <div className="absolute right-[calc(10*var(--px))] bottom-0 z-20">
              <Camera />
            </div>
          </div>
        }
        shelfBottom={
          <div className="relative w-full h-full flex items-end justify-center">
            {/* Pink Retro Runners on floor */}
            <Shoes />
          </div>
        }
      />

      {/* Divider Post 2 (86 units) */}
      <div
        className="h-full flex flex-col justify-around items-center border-x border-[#9E4D74]"
        style={{
          width: 'calc(86 * var(--px))',
          background: 'linear-gradient(90deg, #BA6E8D 0%, #D48BAA 50%, #A85779 100%)',
        }}
      >
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="rounded-full shadow-inner border border-[#7A2E5C]"
            style={{
              width: 'calc(14 * var(--px))',
              height: 'calc(14 * var(--px))',
              background: 'radial-gradient(circle at 35% 35%, #FFFFFF, #E8A5B8)',
            }}
          />
        ))}
      </div>

      {/* ================= LOCKER 03: CLOSED DOOR WITH INTRO VIDEO CARD ================= */}
      <div
        className="relative select-none rounded-[calc(8*var(--px))] overflow-hidden flex flex-col justify-between"
        style={{
          width: 'calc(1080 * var(--px))',
          height: 'calc(3240 * var(--px))',
          background: 'linear-gradient(135deg, #FFBBDC 0%, #FFA6D2 40%, #F58DBE 100%)',
          boxShadow: `
            inset 0 0 calc(20*var(--px)) rgba(216, 27, 114, 0.25),
            0 calc(8*var(--px)) calc(20*var(--px)) rgba(0,0,0,0.3)
          `,
          border: 'calc(4*var(--px)) solid #FFCFE6',
        }}
      >
        <DoorCard variant="intro" />
      </div>

      {/* Divider Post 3 (86 units) */}
      <div
        className="h-full flex flex-col justify-around items-center border-x border-[#9E4D74]"
        style={{
          width: 'calc(86 * var(--px))',
          background: 'linear-gradient(90deg, #BA6E8D 0%, #D48BAA 50%, #A85779 100%)',
        }}
      >
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="rounded-full shadow-inner border border-[#7A2E5C]"
            style={{
              width: 'calc(14 * var(--px))',
              height: 'calc(14 * var(--px))',
              background: 'radial-gradient(circle at 35% 35%, #FFFFFF, #E8A5B8)',
            }}
          />
        ))}
      </div>

      {/* ================= LOCKER 04: OPEN COMPARTMENT ================= */}
      <CompartmentOpen
        shelfTop={
          <div className="relative w-full h-full flex flex-col justify-between items-center">
            {/* Hanging Polaroids on twine */}
            <div className="w-full relative z-10 pt-[calc(30*var(--px))]">
              <Polaroids />
            </div>
            {/* Lavender Envelope resting on shelf surface */}
            <div className="relative z-20 pb-0">
              <Envelope />
            </div>
          </div>
        }
        shelfMiddle={
          <div className="relative w-full h-full flex items-end justify-between">
            {/* Books flush against left wall */}
            <div className="relative z-10 bottom-0 left-0">
              <Books />
            </div>
            {/* Notes notebook standing upright on right */}
            <div className="absolute right-[calc(20*var(--px))] bottom-0 z-20">
              <Notes />
            </div>
          </div>
        }
        shelfBottom={
          <div className="relative w-full h-full flex items-end justify-between px-[calc(20*var(--px))]">
            {/* Pink Hobo Handbag in bottom-left corner */}
            <div className="relative z-20 bottom-0 left-0">
              <Bag />
            </div>
            {/* Polka dot Umbrella leaning against right wall, tilted 7.5deg */}
            <div className="absolute right-[calc(20*var(--px))] bottom-0 z-10">
              <Umbrella />
            </div>
          </div>
        }
      />

      {/* Divider Post 4 (86 units) */}
      <div
        className="h-full flex flex-col justify-around items-center border-x border-[#9E4D74]"
        style={{
          width: 'calc(86 * var(--px))',
          background: 'linear-gradient(90deg, #BA6E8D 0%, #D48BAA 50%, #A85779 100%)',
        }}
      >
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="rounded-full shadow-inner border border-[#7A2E5C]"
            style={{
              width: 'calc(14 * var(--px))',
              height: 'calc(14 * var(--px))',
              background: 'radial-gradient(circle at 35% 35%, #FFFFFF, #E8A5B8)',
            }}
          />
        ))}
      </div>

      {/* ================= LOCKER 05: CLOSED DOOR WITH STACK & TOOLS CARD ================= */}
      <div
        className="relative select-none rounded-[calc(8*var(--px))] overflow-hidden flex flex-col justify-between"
        style={{
          width: 'calc(1080 * var(--px))',
          height: 'calc(3240 * var(--px))',
          background: 'linear-gradient(135deg, #F0E6FA 0%, #E2D3F5 40%, #CEB8EE 100%)',
          boxShadow: `
            inset 0 0 calc(20*var(--px)) rgba(123, 79, 184, 0.2),
            0 calc(8*var(--px)) calc(20*var(--px)) rgba(0,0,0,0.3)
          `,
          border: 'calc(4*var(--px)) solid #EFE8FA',
        }}
      >
        <DoorCard variant="stack" />
      </div>
    </LockerCabinet>
  );
}
