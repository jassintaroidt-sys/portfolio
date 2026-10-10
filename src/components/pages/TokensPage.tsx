
interface ColorSwatch {
  token: string;
  name: string;
  hex: string;
  usage: string;
}

const PINKS: ColorSwatch[] = [
  { token: '--hot-pink', name: 'hot-pink', hex: '#FF2E93', usage: 'Primary button, glow reveal, strong accent' },
  { token: '--barbie-pink', name: 'barbie-pink', hex: '#E91E8C', usage: 'Button hover, accent text, stickers' },
  { token: '--raspberry', name: 'raspberry', hex: '#D81B72', usage: 'Accent line, icons, small pink text' },
  { token: '--bubblegum', name: 'bubblegum', hex: '#FF8DC7', usage: 'Highlight block, badge' },
  { token: '--candy-pink', name: 'candy-pink', hex: '#FFB3D9', usage: 'Open locker body, stickers' },
  { token: '--blush', name: 'blush', hex: '#FFD6E8', usage: 'Soft section background' },
  { token: '--rose-quartz', name: 'rose-quartz', hex: '#F7CAD0', usage: 'Cards, papers' },
  { token: '--powder-pink', name: 'powder-pink', hex: '#FDE4EC', usage: 'Bright section background' },
  { token: '--dusty-rose', name: 'dusty-rose', hex: '#E8A5B8', usage: 'Tinted shadows' },
  { token: '--cherry-red', name: 'cherry-red', hex: '#E5173F', usage: 'Red italic headlines, staples, pins' },
  { token: '--lipstick-red', name: 'lipstick-red', hex: '#C8102E', usage: 'Magazine elements' },
  { token: '--coral-pop', name: 'coral-pop', hex: '#FF6F6F', usage: 'Playful accents' },
  { token: '--peach-fizz', name: 'peach-fizz', hex: '#FFB38A', usage: 'Highlight block, labels' },
  { token: '--apricot', name: 'apricot', hex: '#FFD3B0', usage: 'Soft highlights' },
];

const PURPLES: ColorSwatch[] = [
  { token: '--lavender', name: 'lavender', hex: '#BFA8E5', usage: 'Envelopes, cards, locker' },
  { token: '--lilac', name: 'lilac', hex: '#D4C1F5', usage: 'Section background, highlights' },
  { token: '--wisteria', name: 'wisteria', hex: '#A98BDA', usage: 'Secondary accents' },
  { token: '--orchid', name: 'orchid', hex: '#DA9AF2', usage: 'Glow, gradients' },
  { token: '--grape-soda', name: 'grape-soda', hex: '#7B4FB8', usage: 'Text over pastel' },
  { token: '--berry', name: 'berry', hex: '#7A2E5C', usage: 'Open locker interior' },
  { token: '--aubergine', name: 'aubergine', hex: '#4B1D4F', usage: 'Dark gradients' },
  { token: '--plum-night', name: 'plum-night', hex: '#2A0F2E', usage: 'Main dark background' },
];

const MINTS: ColorSwatch[] = [
  { token: '--mint-cream', name: 'mint-cream', hex: '#D4F2E4', usage: 'Soft background' },
  { token: '--pastel-mint', name: 'pastel-mint', hex: '#A8E6CF', usage: 'Highlights, camera, cards' },
  { token: '--matcha', name: 'matcha', hex: '#B7D9A8', usage: 'Plant details' },
  { token: '--sage', name: 'sage', hex: '#A9C4A0', usage: 'Neutral accents' },
  { token: '--baby-blue', name: 'baby-blue', hex: '#BFE3F5', usage: 'Highlights, icons' },
  { token: '--sky-pastel', name: 'sky-pastel', hex: '#A7D8F5', usage: 'Pastel accents' },
  { token: '--periwinkle', name: 'periwinkle', hex: '#B8C4F2', usage: 'Accents' },
  { token: '--notebook-blue', name: 'notebook-blue', hex: '#8FB8E8', usage: 'Lined paper ruling' },
  { token: '--steel-lilac', name: 'steel-lilac', hex: '#B9B8CC', usage: 'Closed locker steel' },
];

const YELLOWS: ColorSwatch[] = [
  { token: '--butter', name: 'butter', hex: '#FFF1A8', usage: 'Highlights, sticky notes' },
  { token: '--lemon-chiffon', name: 'lemon-chiffon', hex: '#FFF6C9', usage: 'Soft highlights' },
  { token: '--vanilla', name: 'vanilla', hex: '#FFF8EE', usage: 'Warm cream background' },
  { token: '--aged-paper', name: 'aged-paper', hex: '#F3E3B8', usage: 'Yellowed paper, pinboard' },
  { token: '--honey', name: 'honey', hex: '#F6D76B', usage: 'Honey accents' },
  { token: '--milk-white', name: 'milk-white', hex: '#FFFDF9', usage: 'White paper, text on dark' },
  { token: '--pure-white', name: 'pure-white', hex: '#FFFFFF', usage: 'Personal Brand canvas (mandatory)' },
];

const NEUTRALS: ColorSwatch[] = [
  { token: '--ink', name: 'ink', hex: '#1B1017', usage: 'Primary text' },
  { token: '--espresso', name: 'espresso', hex: '#2B1B17', usage: 'Text on paper' },
  { token: '--cocoa', name: 'cocoa', hex: '#5A3A2E', usage: 'Wood details' },
  { token: '--walnut', name: 'walnut', hex: '#7A4A32', usage: 'Umbrella handle, wood shelf' },
  { token: '--pearl', name: 'pearl', hex: '#F4EFF1', usage: 'Light neutral' },
  { token: '--warm-grey', name: 'warm-grey', hex: '#D9D3D6', usage: 'Lines, shadows' },
  { token: '--chrome', name: 'chrome', hex: '#C9CCD5', usage: 'Polished metal' },
  { token: '--gold', name: 'gold', hex: '#D4A64A', usage: 'Frames, trophy' },
  { token: '--champagne', name: 'champagne', hex: '#EBD08C', usage: 'Gold highlights' },
  { token: '--staple-red', name: 'staple-red', hex: '#D7263D', usage: 'Paper staples, pins' },
];

const GRADIENTS = [
  { name: '--grad-plum-night', css: 'linear-gradient(160deg, #2A0F2E 0%, #4B1D4F 55%, #7A2E5C 100%)' },
  { name: '--grad-cotton-candy', css: 'linear-gradient(135deg, #FFD6E8 0%, #E3D4FA 50%, #CDEBF8 100%)' },
  { name: '--grad-bubblegum', css: 'linear-gradient(135deg, #FF8DC7 0%, #FF2E93 100%)' },
  { name: '--grad-lilac-mint', css: 'linear-gradient(135deg, #D4C1F5 0%, #D4F2E4 100%)' },
];

const ADDITIONALS: ColorSwatch[] = [
  { token: '--mist', name: 'mist', hex: '#E9EBF2', usage: 'Opening page background' },
  { token: '--cloud', name: 'cloud', hex: '#E3E6EE', usage: 'Opening gradient accent' },
  { token: '--locker-steel-hi', name: 'locker-steel-hi', hex: '#DADCE8', usage: 'Locker door highlight' },
  { token: '--locker-steel-mid', name: 'locker-steel-mid', hex: '#B9B8CC', usage: 'Locker steel body' },
  { token: '--locker-steel-lo', name: 'locker-steel-lo', hex: '#9A9BB2', usage: 'Locker steel shadow' },
  { token: '--locker-rail', name: 'locker-rail', hex: '#34323F', usage: 'Dark pillar rails' },
  { token: '--locker-rivet', name: 'locker-rivet', hex: '#7C7D91', usage: 'Locker rivets' },
  { token: '--chrome-hi', name: 'chrome-hi', hex: '#FFFFFF', usage: 'Specular chrome' },
  { token: '--chrome-lo', name: 'chrome-lo', hex: '#8F93A3', usage: 'Dark chrome facet' },
  { token: '--handle-black', name: 'handle-black', hex: '#14121A', usage: 'Recessed handle cup' },
  { token: '--open-rail', name: 'open-rail', hex: '#F7B8D6', usage: 'Open locker pink rails' },
  { token: '--open-ceiling', name: 'open-ceiling', hex: '#FFC2E0', usage: 'Interior ceiling' },
  { token: '--open-shelf', name: 'open-shelf', hex: '#F7A8CF', usage: 'Shelf surface' },
  { token: '--open-shelf-edge', name: 'open-shelf-edge', hex: '#FFE3F0', usage: 'Shelf highlight lip' },
  { token: '--interior-deep', name: 'interior-deep', hex: '#5A1E45', usage: 'Interior ambient occlusion' },
  { token: '--interior-wall', name: 'interior-wall', hex: '#8E3568', usage: 'Back wall tone' },
  { token: '--gold-1', name: 'gold-1', hex: '#FFF3C4', usage: 'Gold specular' },
  { token: '--gold-2', name: 'gold-2', hex: '#F0D27A', usage: 'Gold bright' },
  { token: '--gold-3', name: 'gold-3', hex: '#D4A64A', usage: 'Gold base' },
  { token: '--gold-4', name: 'gold-4', hex: '#9A6F1E', usage: 'Gold shade' },
  { token: '--leather-pink-hi', name: 'leather-pink-hi', hex: '#FFC6E0', usage: 'Pink leather highlight' },
  { token: '--camera-mint', name: 'camera-mint', hex: '#A8E6CF', usage: 'Camera body' },
  { token: '--camera-pink', name: 'camera-pink', hex: '#F8C8DC', usage: 'Camera strap' },
  { token: '--camera-lilac', name: 'camera-lilac', hex: '#CDB8EE', usage: 'Lens & dial' },
  { token: '--camera-blue', name: 'camera-blue', hex: '#B5D8F0', usage: 'Lens ring' },
  { token: '--wood-hi', name: 'wood-hi', hex: '#A9714F', usage: 'Wood highlight' },
  { token: '--twine', name: 'twine', hex: '#C9A66B', usage: 'Polaroid string' },
];

function SwatchGrid({ title, swatches }: { title: string; swatches: ColorSwatch[] }) {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold font-sentient mb-4 text-ink flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-hot-pink inline-block"></span>
        {title}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {swatches.map((s) => (
          <div
            key={s.token}
            className="border border-warm-grey/50 rounded-xl overflow-hidden shadow-sm bg-white p-3 flex flex-col justify-between transition-transform hover:-translate-y-1 hover:shadow-md"
          >
            <div
              className="w-full h-16 rounded-lg mb-2 shadow-inner border border-black/5"
              style={{ backgroundColor: s.hex }}
            />
            <div>
              <p className="font-mono text-xs font-bold text-ink">{s.token}</p>
              <p className="font-mono text-[11px] text-gray-500">{s.hex}</p>
              <p className="text-[11px] text-gray-600 mt-1 line-clamp-2" title={s.usage}>
                {s.usage}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function TokensPage(): JSX.Element {
  return (
    <main className="min-h-screen bg-mist p-6 md:p-12 font-poppins grain">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 pb-6 border-b border-warm-grey/60 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <a
              href="#/"
              className="inline-block text-xs font-mono font-bold text-hot-pink mb-2 hover:underline"
            >
              ← Back to Main App
            </a>
            <h1 className="text-3xl md:text-5xl font-bold font-sentient text-ink">
              Design System Tokens
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              BRIEF §2 — CSS Variables, Named Gradients, and Tailwind Utilities
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur px-4 py-2 rounded-lg border border-warm-grey/50 text-xs font-mono">
            <code>route: /#/__tokens</code>
          </div>
        </header>

        {/* Named Gradients */}
        <section className="mb-12">
          <h2 className="text-xl font-bold font-sentient mb-4 text-ink flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-hot-pink inline-block"></span>
            §2.6 Named Gradients
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {GRADIENTS.map((g) => (
              <div
                key={g.name}
                className="rounded-xl overflow-hidden shadow-sm bg-white border border-warm-grey/50 p-3"
              >
                <div
                  className="w-full h-20 rounded-lg mb-2 shadow-inner"
                  style={{ background: g.css }}
                />
                <p className="font-mono text-xs font-bold text-ink">{g.name}</p>
              </div>
            ))}
          </div>
        </section>

        <SwatchGrid title="§2.1 Pink Palette" swatches={PINKS} />
        <SwatchGrid title="§2.2 Purple / Lavender Palette" swatches={PURPLES} />
        <SwatchGrid title="§2.3 Mint / Green / Pastel Blue Palette" swatches={MINTS} />
        <SwatchGrid title="§2.4 Yellow / Cream / Paper Palette" swatches={YELLOWS} />
        <SwatchGrid title="§2.5 Neutral & Metal Palette" swatches={NEUTRALS} />
        <SwatchGrid title="§2.7 Additional Section & Prop Colors" swatches={ADDITIONALS} />
      </div>
    </main>
  );
}
