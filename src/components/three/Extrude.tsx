import React, { useMemo } from 'react';
import { isLowPowerDevice } from '../../lib/device';

export interface ExtrudeProps {
  depth: number; // total depth in px
  layers?: number; // override layer count
  className?: string;
  renderLayer: (layerIndex: number, totalLayers: number) => React.ReactNode;
}

export function Extrude({
  depth,
  layers,
  className = '',
  renderLayer,
}: ExtrudeProps): JSX.Element {
  const count = useMemo(() => {
    if (layers) return layers;
    return isLowPowerDevice() ? 3 : 7;
  }, [layers]);

  const step = depth / Math.max(1, count - 1);

  return (
    <div
      className={`relative transform-gpu ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {Array.from({ length: count }, (_, i) => {
        const z = i * step;
        const isTop = i === count - 1;
        const isBottom = i === 0;

        return (
          <div
            key={i}
            className="absolute inset-0 select-none"
            style={{
              transform: `translateZ(${z}px)`,
              opacity: isTop ? 1 : isBottom ? 0.9 : 0.85,
              filter: isTop ? 'none' : 'brightness(0.85)',
            }}
          >
            {renderLayer(i, count)}
          </div>
        );
      })}
    </div>
  );
}

export default Extrude;
