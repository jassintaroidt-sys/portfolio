import { documents } from './data';
import { Document } from './Document';

export interface DocumentCanvasProps {
  parallaxOffset?: { x: number; y: number };
}

export function DocumentCanvas({ parallaxOffset = { x: 0, y: 0 } }: DocumentCanvasProps): JSX.Element {
  return (
    <div className="relative w-full overflow-visible">
      {/* ================= DESKTOP COLLAGE VIEW (md and up) ================= */}
      <div
        className="hidden md:block relative w-full overflow-visible"
        style={{ height: '980px' }}
      >
        {documents.map((doc) => {
          // Dynamic Parallax translation based on item depth weight
          const shiftX = parallaxOffset.x * doc.depth;
          const shiftY = parallaxOffset.y * doc.depth;

          return (
            <div
              key={doc.id}
              className="absolute transition-transform duration-150 ease-out"
              style={{
                left: `${doc.x}%`,
                top: `${doc.y}%`,
                width: 'clamp(180px, 15vw, 230px)',
                height: 'clamp(210px, 18vw, 270px)',
                transform: `translate(${shiftX}px, ${shiftY}px)`,
                zIndex: Math.round(doc.depth * 10),
              }}
            >
              <Document item={doc} className="w-full h-full" />
            </div>
          );
        })}
      </div>

      {/* ================= MOBILE 2-COLUMN VIEW (sm & smaller) ================= */}
      <div className="grid grid-cols-2 gap-4 md:hidden py-4 px-2">
        {documents.map((doc) => (
          <div key={doc.id} className="w-full aspect-[1/1.2] flex items-center justify-center">
            <Document item={doc} className="w-full h-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
