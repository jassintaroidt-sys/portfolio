
interface TornHighlightProps {
  highlightPath: string;
  width: number;
  height: number;
}

export function TornHighlight({ highlightPath, width, height }: TornHighlightProps): JSX.Element | null {
  if (!highlightPath) return null;

  return (
    <div
      className="absolute bottom-0 left-0 w-full pointer-events-none select-none z-20 overflow-hidden"
      style={{ height: 'var(--tear-h, 60px)' }}
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <path
          d={highlightPath}
          fill="none"
          stroke="rgba(255, 255, 255, 0.45)"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export default TornHighlight;
