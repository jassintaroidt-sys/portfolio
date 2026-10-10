import { Pushpin } from '../ui/Pushpin';

export function NotesPage(): JSX.Element {
  return (
    <div
      className="w-full max-w-2xl mx-auto py-8 px-4 select-none flex flex-col items-center"
      data-lenis-prevent
    >
      {/* Notebook Paper Sheet with Blue Ruled Lines */}
      <div
        className="relative w-full rounded-xl p-8 md:p-12 overflow-hidden flex flex-col items-center"
        style={{
          backgroundColor: '#FFFDF9',
          backgroundImage: `
            repeating-linear-gradient(180deg, transparent 0, transparent 35px, #8FB8E8 35px, #8FB8E8 36px)
          `,
          boxShadow: `
            0 16px 36px rgba(0,0,0,0.18),
            inset 0 0 30px rgba(255, 238, 220, 0.4)
          `,
          minHeight: '480px',
        }}
      >
        {/* Top Pushpin */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20">
          <Pushpin color="hot-pink" size={32} />
        </div>

        {/* Note Title */}
        <div className="text-center pt-4 mb-8">
          <h2
            className="text-2xl md:text-3xl font-bold text-ink"
            style={{ fontFamily: 'Caveat, cursive' }}
          >
            3 Keys to Marketing &amp; Content Success
          </h2>
        </div>

        {/* 3 Colorful Sticky Note Cards */}
        <div className="w-full flex flex-col sm:flex-row gap-5 items-center justify-center my-auto">
          {/* Sticky 1: Awareness (Butter Yellow) */}
          <div
            className="w-48 h-48 p-5 rounded-md flex flex-col justify-between transition-transform hover:scale-105 hover:rotate-1"
            style={{
              backgroundColor: '#FFF1A8',
              boxShadow: '0 8px 18px rgba(0,0,0,0.15)',
              transform: 'rotate(-2deg)',
            }}
          >
            <span className="text-2xl">✨</span>
            <span
              className="text-3xl font-bold text-amber-950"
              style={{ fontFamily: 'Caveat, cursive' }}
            >
              Awareness
            </span>
            <div className="w-full h-1 bg-amber-400/50 rounded-full" />
          </div>

          {/* Sticky 2: Engagement (Bubblegum Pink) */}
          <div
            className="w-48 h-48 p-5 rounded-md flex flex-col justify-between transition-transform hover:scale-105 hover:-rotate-1"
            style={{
              backgroundColor: '#FFB3D9',
              boxShadow: '0 8px 18px rgba(0,0,0,0.15)',
              transform: 'rotate(2.5deg)',
            }}
          >
            <span className="text-2xl">💬</span>
            <span
              className="text-3xl font-bold text-[#7A2E5C]"
              style={{ fontFamily: 'Caveat, cursive' }}
            >
              Engagement
            </span>
            <div className="w-full h-1 bg-pink-400/50 rounded-full" />
          </div>

          {/* Sticky 3: Conversion (Pastel Mint) */}
          <div
            className="w-48 h-48 p-5 rounded-md flex flex-col justify-between transition-transform hover:scale-105 hover:rotate-1"
            style={{
              backgroundColor: '#A8E6CF',
              boxShadow: '0 8px 18px rgba(0,0,0,0.15)',
              transform: 'rotate(-1.5deg)',
            }}
          >
            <span className="text-2xl">🚀</span>
            <span
              className="text-3xl font-bold text-[#1F4E3D]"
              style={{ fontFamily: 'Caveat, cursive' }}
            >
              Conversion
            </span>
            <div className="w-full h-1 bg-emerald-400/50 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
