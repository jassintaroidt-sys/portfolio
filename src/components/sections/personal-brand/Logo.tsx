import { useState } from 'react';

export interface LogoProps {
  src: string;
  alt: string;
  company: string;
  className?: string;
}

export function Logo({ src, alt, company, className = '' }: LogoProps): JSX.Element {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    // Minimalist geometric monogram fallback per BRIEF §11.3
    const initials = company
      .split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 3)
      .toUpperCase();

    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center p-3 select-none ${className}`}
        aria-label={alt}
      >
        <div className="w-16 h-16 rounded-full border-2 border-black flex items-center justify-center font-bold font-mono text-xl tracking-widest text-ink bg-gray-50">
          {initials}
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-gray-600 mt-2 text-center line-clamp-1">
          {company}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      loading="lazy"
      className={`w-full h-full object-contain filter contrast-[1.05] ${className}`}
    />
  );
}
