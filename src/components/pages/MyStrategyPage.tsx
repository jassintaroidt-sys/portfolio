import { STRATEGY_STEPS } from '../../data/documents';

export function MyStrategyPage(): JSX.Element {
  return (
    <div
      className="w-full max-w-4xl mx-auto py-8 px-4 select-none"
      data-lenis-prevent
    >
      {/* Title & Introduction */}
      <div className="text-center mb-8">
        <h2
          className="text-3xl md:text-4xl font-bold text-ink"
          style={{ fontFamily: 'Bodoni Moda, serif' }}
        >
          My Strategy
        </h2>
        <p className="font-serif italic text-base md:text-lg text-gray-700 mt-2 max-w-xl mx-auto">
          &ldquo;My strategy for managing social media content usually unfolds in several stages.&rdquo;
        </p>
      </div>

      {/* 7-Step Winding Roadmap Container */}
      <div className="relative flex flex-col gap-6 items-center">
        {/* Central Vertical Connector Ribbon Line */}
        <div className="absolute top-8 bottom-8 left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-hot-pink via-bubblegum to-wisteria hidden md:block" />

        {STRATEGY_STEPS.map((step, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div
              key={step.step}
              className={`relative w-full flex items-center gap-6 ${
                isEven ? 'md:flex-row' : 'md:flex-row-reverse'
              } flex-col`}
            >
              {/* Step Card Box */}
              <div
                className="w-full md:w-[46%] bg-white p-6 rounded-2xl border-2 border-warm-grey/70 hover:border-hot-pink transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 relative"
              >
                {/* Number Badge */}
                <div
                  className="absolute -top-3.5 left-6 px-3 py-0.5 rounded-full bg-hot-pink text-white font-mono font-bold text-xs shadow-sm"
                >
                  STEP 0{step.step}
                </div>

                <div className="pt-2">
                  <h3
                    className="text-lg md:text-xl font-bold text-ink mb-1"
                    style={{ fontFamily: 'Sentient, serif' }}
                  >
                    {step.title}
                  </h3>

                  <p className="font-poppins text-xs md:text-sm text-gray-700 italic mb-3">
                    {step.description}
                  </p>

                  {/* AI Enhancement Tip per BRIEF §10.6 */}
                  {step.tip && (
                    <div className="bg-pink-50/80 p-2.5 rounded-lg border-l-3 border-hot-pink text-[11px] md:text-xs text-ink/80 flex items-start gap-1.5">
                      <span className="font-bold text-hot-pink uppercase">TIP:</span>
                      <span>{step.tip}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Step Central Marker Node */}
              <div className="relative z-10 w-12 h-12 rounded-full bg-white border-4 border-hot-pink shadow-md flex items-center justify-center font-bold text-hot-pink font-mono text-sm">
                {step.step}
              </div>

              {/* Spacer on Opposite Side for Balanced Grid */}
              <div className="hidden md:block md:w-[46%]" />
            </div>
          );
        })}

        {/* Feedback Loop Ribbon to Step 3 per BRIEF §10.6 */}
        <div className="w-full max-w-md mt-6 p-4 rounded-xl bg-gradient-to-r from-powder-pink to-lilac/30 border-2 border-dashed border-hot-pink flex items-center justify-between text-center">
          <div className="w-full flex items-center justify-center gap-3 text-hot-pink font-bold text-sm">
            <span>↺</span>
            <span>FEEDBACK LOOP: Repeat &amp; Improve back to Step 03 (Content Plan)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
