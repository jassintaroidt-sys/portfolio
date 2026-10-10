
interface TornFiberEdgeProps {
  fiberPath: string;
  width: number;
  height: number;
}

export function TornFiberEdge({ fiberPath, width, height }: TornFiberEdgeProps): JSX.Element | null {
  if (!fiberPath) return null;

  return (
    <div
      className="absolute bottom-0 left-0 w-full pointer-events-none select-none z-10 overflow-hidden"
      style={{ height: 'var(--tear-h, 60px)' }}
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <path
          d={fiberPath}
          fill="none"
          stroke="var(--milk-white, #FFFDF9)"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeOpacity="0.85"
        />
      </svg>
    </div>
  );
}

export default TornFiberEdge;
