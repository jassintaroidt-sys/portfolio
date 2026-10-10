
export interface PhotoFrameProps {
  src: string;
  alt: string;
  caption?: string;
  aspectRatio?: string; // e.g., '1/1', '4/3', '16/9'
  rotation?: number;
  className?: string;
  onClick?: () => void;
}

export function PhotoFrame({
  src,
  alt,
  caption,
  aspectRatio,
  rotation = 0,
  className = '',
  onClick,
}: PhotoFrameProps): JSX.Element {
  return (
    <figure
      onClick={onClick}
      className={`
        relative inline-block bg-white p-3 md:p-4 rounded-sm
        transition-transform duration-200 ease-out hover:scale-[1.02]
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      style={{
        transform: `rotate(${rotation}deg)`,
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.25)',
      }}
    >
      {/* Thick white border container that never crops (§5) */}
      <div
        className="relative overflow-hidden bg-pearl/40 flex items-center justify-center"
        style={aspectRatio ? { aspectRatio } : undefined}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-contain block max-h-[70vh]"
        />
      </div>

      {caption && (
        <figcaption className="mt-3 text-center font-permanent-marker text-xs md:text-sm text-ink/90 tracking-wide">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export default PhotoFrame;
