import React, { useState } from 'react';
import { mediaUrl } from '../../lib/media';

export interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  filePath: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholderText?: string;
}

export function SafeImage({
  filePath,
  alt,
  width,
  height,
  className = '',
  placeholderText,
  ...props
}: SafeImageProps): JSX.Element {
  const [hasError, setHasError] = useState(false);

  // Compute URLs
  const originalUrl = mediaUrl(`img/${filePath}`);
  const webpPath = filePath.replace(/\.(png|jpe?g)$/i, '.webp');
  const webpUrl = mediaUrl(`img/${webpPath}`);

  const aspectRatio = width && height ? `${width} / ${height}` : undefined;

  if (hasError) {
    return (
      <div
        className={`bg-rose-quartz/30 border border-dusty-rose/40 rounded-lg flex items-center justify-center p-4 text-center text-xs font-mono text-raspberry ${className}`}
        style={aspectRatio ? { aspectRatio } : undefined}
      >
        <span>{placeholderText ?? `[Image: ${filePath}]`}</span>
      </div>
    );
  }

  return (
    <picture>
      <source srcSet={webpUrl} type="image/webp" />
      <img
        src={originalUrl}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        crossOrigin="anonymous"
        onError={() => setHasError(true)}
        className={`block w-full h-auto object-contain ${className}`}
        style={aspectRatio ? { aspectRatio } : undefined}
        {...props}
      />
    </picture>
  );
}

export default SafeImage;
