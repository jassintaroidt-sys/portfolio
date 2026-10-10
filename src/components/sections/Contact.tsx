import { useState } from 'react';
import { EmbeddedIndexButton } from '../nav/EmbeddedIndexButton';

export function Contact(): JSX.Element {
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);

  const handleCopy = (text: string, field: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => {
      setCopiedField((curr) => (curr === field ? null : curr));
    }, 2000);
  };

  const handleOpenIndex = () => {
    window.dispatchEvent(new CustomEvent('open-toc'));
  };

  return (
    <section
      id="contact"
      className="torn-next-section relative w-full min-h-[100svh] flex flex-col justify-between bg-gradient-to-b from-[#4B1D4F] via-[#2A0F2E] to-[#1A091D] text-white grain overflow-hidden select-none px-6 md:px-12 lg:px-20 pb-6 z-[10]"
    >
      {/* Background Atmosphere Grain & Dim Pattern per BRIEF §18 */}
      <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay grain" />
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-hot-pink/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-grape-soda/15 blur-3xl pointer-events-none" />

      {/* Top Header Row with In-section INDEX Button (§18 & §7) */}
      <div className="relative z-10 w-full flex items-center justify-between pb-8 pt-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-hot-pink animate-pulse" />
          <span className="font-mono text-xs uppercase font-bold tracking-widest text-pink-200/80">
            SECTION 08 · GET IN TOUCH
          </span>
        </div>

        {/* Dedicated In-section INDEX Button (Contact kanan atas per BRIEF §7 & §18) */}
        <EmbeddedIndexButton dark={true} onClick={handleOpenIndex} />
      </div>

      {/* Main 3-Column Content (1-Column Stacked on Mobile) (§18) */}
      <div className="relative z-10 w-full max-w-6xl mx-auto my-auto py-12 md:py-20 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-center text-center">
        {/* Column 1: Email */}
        <div className="flex flex-col items-center group">
          <h2 className="font-serif text-[clamp(2.2rem,1.8rem+3.2vw,66px)] font-bold text-white mb-4 tracking-tight leading-tight">
            Email
          </h2>
          <a
            href="mailto:jassintaroidt@gmail.com"
            className="font-poppins italic text-[clamp(1.1rem,0.9rem+0.8vw,1.556rem)] text-white/90 hover:text-candy-pink hover:underline hover:decoration-hot-pink decoration-2 underline-offset-4 transition-colors mb-3"
          >
            jassintaroidt@gmail.com
          </a>
          <button
            type="button"
            onClick={() => handleCopy('jassintaroidt@gmail.com', 'email')}
            className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-[11px] font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
            aria-label="Copy email address"
          >
            {copiedField === 'email' ? '✓ Copied!' : 'Copy'}
          </button>
        </div>

        {/* Column 2: Social Media */}
        <div className="flex flex-col items-center group">
          <h2 className="font-serif text-[clamp(2.2rem,1.8rem+3.2vw,66px)] font-bold italic text-white mb-4 tracking-tight leading-tight">
            Social Media
          </h2>
          <a
            href="https://www.instagram.com/jassinta.roid/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-poppins italic text-[clamp(1.1rem,0.9rem+0.8vw,1.556rem)] text-white/90 hover:text-candy-pink hover:underline hover:decoration-hot-pink decoration-2 underline-offset-4 transition-colors mb-3 flex items-center gap-1.5"
          >
            <span>Instagram: @jassinta.roid</span>
            <span className="text-xs font-mono font-bold">↗</span>
          </a>
          <span className="font-mono text-[11px] text-white/50 uppercase tracking-wider">
            DIRECT MESSAGE &amp; UPDATES
          </span>
        </div>

        {/* Column 3: WA/Phone */}
        <div className="flex flex-col items-center group">
          <h2 className="font-serif text-[clamp(2.2rem,1.8rem+3.2vw,66px)] font-bold text-white mb-4 tracking-tight leading-tight">
            WA/Phone
          </h2>
          <div className="flex flex-col items-center gap-1 mb-3">
            <a
              href="https://wa.me/6281919032518"
              target="_blank"
              rel="noopener noreferrer"
              className="font-poppins italic text-[clamp(1.1rem,0.9rem+0.8vw,1.556rem)] text-white/90 hover:text-candy-pink hover:underline hover:decoration-hot-pink decoration-2 underline-offset-4 transition-colors flex items-center gap-1.5"
            >
              <span>+62 81919 0325 18</span>
              <span className="text-xs font-mono font-bold">↗</span>
            </a>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/6281919032518"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-[11px] font-bold transition-all hover:scale-105 active:scale-95"
            >
              WhatsApp
            </a>
            <a
              href="tel:+6281919032518"
              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-[11px] font-bold transition-all hover:scale-105 active:scale-95"
            >
              Call
            </a>
            <button
              type="button"
              onClick={() => handleCopy('+6281919032518', 'phone')}
              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-[11px] font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
              aria-label="Copy phone number"
            >
              {copiedField === 'phone' ? '✓ Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </div>

      {/* Screen-Wide Full Footer per BRIEF §7.5 & §18:
          | 2026                    Jassinta Roid Triniti                       INDEX   |
      */}
      <footer className="relative z-10 w-full pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono uppercase tracking-widest text-white/60 select-none gap-2">
        <span>2026</span>
        <span className="text-center font-bold text-white tracking-widest">
          JASSINTA ROID TRINITI
        </span>
        <button
          type="button"
          onClick={handleOpenIndex}
          className="hover:text-hot-pink transition-colors font-bold cursor-pointer"
        >
          INDEX
        </button>
      </footer>
    </section>
  );
}

export default Contact;
