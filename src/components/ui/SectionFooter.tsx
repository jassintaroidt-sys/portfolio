// src/components/ui/SectionFooter.tsx — BRIEF §7.5 Full-Width Section Footer
import React from 'react';

export interface SectionFooterProps {
  rightElement?: React.ReactNode;
  className?: string;
  dark?: boolean;
}

export function SectionFooter({
  rightElement = 'Creative Portfolio',
  className = '',
  dark = false,
}: SectionFooterProps): JSX.Element {
  return (
    <footer
      className={`w-full shrink-0 px-6 md:px-12 py-3 flex flex-col sm:flex-row items-center justify-between font-mono text-[11px] uppercase tracking-widest select-none border-t ${
        dark
          ? 'border-white/10 text-white/50'
          : 'border-warm-grey/60 text-ink/70'
      } ${className}`}
    >
      <span>2026</span>
      <span className="font-semibold text-center my-0.5 sm:my-0">
        Jassinta Roid Triniti
      </span>
      <span>{rightElement}</span>
    </footer>
  );
}

export default SectionFooter;
