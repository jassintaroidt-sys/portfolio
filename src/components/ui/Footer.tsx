import React from 'react';

export interface FooterProps {
  rightContent?: React.ReactNode;
  className?: string;
  theme?: 'light' | 'dark';
}

export function Footer({
  rightContent = 'Creative Portfolio',
  className = '',
  theme = 'light',
}: FooterProps): JSX.Element {
  const isDark = theme === 'dark';

  return (
    <footer
      className={`
        w-full py-4 px-6 md:px-12
        flex flex-col sm:flex-row items-center justify-between gap-3
        font-mono text-xs uppercase tracking-wider select-none
        border-t
        ${
          isDark
            ? 'border-white/10 text-milk-white/70 bg-plum-night'
            : 'border-steel-lilac/30 text-ink/70 bg-transparent'
        }
        ${className}
      `}
    >
      <div className="font-semibold text-center sm:text-left">2026</div>

      <div className="font-bold text-center tracking-widest text-ink dark:text-milk-white">
        Jassinta Roid Triniti
      </div>

      <div className="text-center sm:text-right font-semibold">
        {rightContent}
      </div>
    </footer>
  );
}

export default Footer;
