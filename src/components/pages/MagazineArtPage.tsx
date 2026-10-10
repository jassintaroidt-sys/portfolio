import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import { VINTAGE_CINDY_PHOTOS } from '../../data/documents';
import { mediaUrl } from '../../lib/media';

export interface CollageElement {
  id: string;
  type: 'photo' | 'text' | 'vector';
  src?: string;
  text?: string;
  fontFamily?: string;
  color?: string;
  vectorKind?: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  zIndex: number;
}

export function MagazineArtPage(): JSX.Element {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [elements, setElements] = useState<CollageElement[]>([
    {
      id: 'default-title',
      type: 'text',
      text: 'VOGUE',
      fontFamily: 'Bodoni Moda, serif',
      color: '#FFFFFF',
      x: 80,
      y: 40,
      scale: 1.2,
      rotation: 0,
      zIndex: 10,
    },
    {
      id: 'default-script',
      type: 'text',
      text: 'Fashion Editorial',
      fontFamily: 'Pinyon Script, cursive',
      color: '#FF2E93',
      x: 120,
      y: 120,
      scale: 1.3,
      rotation: -5,
      zIndex: 11,
    },
    {
      id: 'default-photo',
      type: 'photo',
      src: mediaUrl('img/Vintage Cindy 1.jpg'),
      x: 60,
      y: 180,
      scale: 0.9,
      rotation: 2,
      zIndex: 5,
    },
  ]);

  const [history, setHistory] = useState<CollageElement[][]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'photos' | 'typography' | 'stickers'>('photos');
  const [isSaving, setIsSaving] = useState(false);

  // Push state to undo stack
  const pushState = (newElements: CollageElement[]) => {
    setHistory((prev) => [...prev.slice(-15), elements]);
    setElements(newElements);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    if (last) {
      setElements(last);
      setHistory((prev) => prev.slice(0, -1));
    }
  };

  const handleReset = () => {
    pushState([]);
    setSelectedId(null);
  };

  // Add items from tray
  const addPhoto = (fileName: string) => {
    const newItem: CollageElement = {
      id: `photo-${Date.now()}`,
      type: 'photo',
      src: mediaUrl(`img/${fileName}`),
      x: 80 + Math.random() * 40,
      y: 120 + Math.random() * 40,
      scale: 0.85,
      rotation: (Math.random() - 0.5) * 10,
      zIndex: elements.length + 1,
    };
    pushState([...elements, newItem]);
    setSelectedId(newItem.id);
  };

  const addText = (text: string, fontFamily: string, color: string) => {
    const newItem: CollageElement = {
      id: `text-${Date.now()}`,
      type: 'text',
      text,
      fontFamily,
      color,
      x: 90 + Math.random() * 30,
      y: 100 + Math.random() * 30,
      scale: 1,
      rotation: (Math.random() - 0.5) * 8,
      zIndex: elements.length + 1,
    };
    pushState([...elements, newItem]);
    setSelectedId(newItem.id);
  };

  const addVector = (vectorKind: string) => {
    const newItem: CollageElement = {
      id: `vector-${Date.now()}`,
      type: 'vector',
      vectorKind,
      x: 100 + Math.random() * 40,
      y: 140 + Math.random() * 40,
      scale: 1,
      rotation: (Math.random() - 0.5) * 12,
      zIndex: elements.length + 1,
    };
    pushState([...elements, newItem]);
    setSelectedId(newItem.id);
  };

  // Transform operations
  const updateTransform = (id: string, deltaX: number, deltaY: number, deltaScale = 0, deltaRot = 0) => {
    setElements((prev) =>
      prev.map((el) => {
        if (el.id !== id) return el;
        return {
          ...el,
          x: Math.max(0, Math.min(360, el.x + deltaX)),
          y: Math.max(0, Math.min(520, el.y + deltaY)),
          scale: Math.max(0.4, Math.min(2.5, el.scale + deltaScale)),
          rotation: el.rotation + deltaRot,
        };
      })
    );
  };

  const bringToFront = (id: string) => {
    const maxZ = Math.max(0, ...elements.map((e) => e.zIndex));
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, zIndex: maxZ + 1 } : el))
    );
  };

  const deleteElement = (id: string) => {
    pushState(elements.filter((el) => el.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      updateTransform(id, 0, -8);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      updateTransform(id, 0, 8);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      updateTransform(id, -8, 0);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      updateTransform(id, 8, 0);
    } else if (e.key === '+' || e.key === '=') {
      e.preventDefault();
      updateTransform(id, 0, 0, 0.1);
    } else if (e.key === '-' || e.key === '_') {
      e.preventDefault();
      updateTransform(id, 0, 0, -0.1);
    } else if (e.key === '[') {
      e.preventDefault();
      updateTransform(id, 0, 0, 0, -6);
    } else if (e.key === ']') {
      e.preventDefault();
      updateTransform(id, 0, 0, 0, 6);
    } else if (e.key === 'Delete' || e.key === 'Backspace') {
      e.preventDefault();
      deleteElement(id);
    }
  };

  // Save as image
  const handleSaveImage = async () => {
    if (!canvasRef.current) return;
    try {
      setIsSaving(true);
      const dataUrl = await toPng(canvasRef.current, { quality: 0.95 });
      const link = document.createElement('a');
      link.download = 'jassinta-magazine-collage.png';
      link.href = dataUrl;
      link.click();
    } catch {
      // Graceful fallback
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center py-4 px-2 select-none" data-lenis-prevent>
      {/* Title */}
      <div className="text-center mb-4">
        <h2
          className="text-2xl md:text-3xl font-bold text-ink"
          style={{ fontFamily: 'Bodoni Moda, serif' }}
        >
          Let&apos;s put together a fashion magazine!
        </h2>
        <p className="font-poppins text-xs text-gray-600 mt-1">
          Pick photos, stylish stickers &amp; typography to compose your custom editorial spread
        </p>
      </div>

      {/* Editor Main Canvas & Tray Layout */}
      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-6 items-center justify-center">
        {/* ================= EDITORIAL MAGAZINE SPREAD (CANVAS) ================= */}
        <div className="flex flex-col items-center">
          <div
            ref={canvasRef}
            className="relative w-[340px] md:w-[480px] h-[480px] md:h-[660px] rounded-r-lg rounded-l-sm bg-[#EBA6C0] p-6 overflow-hidden shadow-2xl flex flex-col justify-between"
            style={{
              backgroundImage: 'radial-gradient(circle at 70% 30%, #F5BACB 0%, #EBA6C0 60%, #DF88A7 100%)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.35), inset 15px 0 25px rgba(0,0,0,0.2)',
            }}
            onClick={() => setSelectedId(null)}
          >
            {/* Center Book Spine Shadow */}
            <div className="absolute left-0 inset-y-0 w-8 bg-gradient-to-r from-black/40 via-black/15 to-transparent pointer-events-none z-30" />

            {/* Rendered Collage Elements */}
            {elements.map((el) => {
              const isSelected = selectedId === el.id;
              return (
                <div
                  key={el.id}
                  tabIndex={0}
                  onKeyDown={(e) => handleKeyDown(e, el.id)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedId(el.id);
                  }}
                  className={`absolute cursor-move select-none transition-shadow ${
                    isSelected ? 'ring-2 ring-hot-pink shadow-2xl' : ''
                  }`}
                  style={{
                    left: `${el.x}px`,
                    top: `${el.y}px`,
                    transform: `scale(${el.scale}) rotate(${el.rotation}deg)`,
                    transformOrigin: 'center center',
                    zIndex: el.zIndex,
                  }}
                >
                  {el.type === 'photo' && el.src && (
                    <div className="bg-white p-2.5 pb-4 rounded-sm shadow-md pointer-events-none">
                      <img
                        src={el.src}
                        alt="Vintage Cindy"
                        className="w-28 md:w-36 h-auto object-contain rounded-xs"
                      />
                    </div>
                  )}

                  {el.type === 'text' && (
                    <div
                      className="whitespace-nowrap px-2 py-1 font-bold pointer-events-none drop-shadow-md"
                      style={{
                        fontFamily: el.fontFamily,
                        color: el.color,
                        fontSize: el.fontFamily?.includes('Bodoni') ? '42px' : '36px',
                      }}
                    >
                      {el.text}
                    </div>
                  )}

                  {el.type === 'vector' && (
                    <div className="w-16 h-16 flex items-center justify-center pointer-events-none filter drop-shadow-md">
                      {el.vectorKind === 'heart' && (
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="#FF2E93">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      )}
                      {el.vectorKind === 'star' && (
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="#FFD700">
                          <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
                        </svg>
                      )}
                      {el.vectorKind === 'camera' && (
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="#A8E6CF">
                          <rect x="2" y="6" width="20" height="14" rx="3" />
                          <circle cx="12" cy="13" r="4" fill="#7A2E5C" />
                        </svg>
                      )}
                      {el.vectorKind === 'sparkle' && (
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="#BFA8E5">
                          <path d="M12 0 L14 9 L23 12 L14 15 L12 24 L10 15 L1 12 L10 9 Z" />
                        </svg>
                      )}
                      {el.vectorKind === 'lipstick' && (
                        <svg width="36" height="52" viewBox="0 0 24 36" fill="none">
                          <rect x="6" y="16" width="12" height="18" rx="2" fill="#2A0F2E" />
                          <rect x="7" y="10" width="10" height="6" fill="#D4AF37" />
                          <path d="M7 10 L15 6 L17 10 Z" fill="#E5173F" />
                        </svg>
                      )}
                      {el.vectorKind === 'ribbon' && (
                        <svg width="52" height="38" viewBox="0 0 52 38" fill="#FF2E93">
                          <path d="M26 14 C18 6, 4 8, 8 20 C10 26, 26 22, 26 22 C26 22, 42 26, 44 20 C48 8, 34 6, 26 14 Z" />
                          <circle cx="26" cy="18" r="4" fill="#FFF" />
                        </svg>
                      )}
                    </div>
                  )}

                  {/* Active Handle & Quick Action Bar when Selected */}
                  {isSelected && (
                    <div className="absolute -top-9 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white/95 px-2 py-0.5 rounded-full shadow-lg border border-hot-pink text-[10px] z-50">
                      <button
                        type="button"
                        onClick={() => updateTransform(el.id, 0, 0, 0.1)}
                        className="px-1 font-bold text-hot-pink hover:scale-110"
                        title="Enlarge (+)"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => updateTransform(el.id, 0, 0, -0.1)}
                        className="px-1 font-bold text-hot-pink hover:scale-110"
                        title="Shrink (-)"
                      >
                        -
                      </button>
                      <button
                        type="button"
                        onClick={() => updateTransform(el.id, 0, 0, 0, 15)}
                        className="px-1 font-bold text-berry hover:scale-110"
                        title="Rotate right"
                      >
                        ↻
                      </button>
                      <button
                        type="button"
                        onClick={() => bringToFront(el.id)}
                        className="px-1 text-gray-600 hover:text-black"
                        title="Bring forward"
                      >
                        ▲
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteElement(el.id)}
                        className="px-1 font-bold text-red-600 hover:scale-110"
                        title="Delete"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-3 mt-4">
            <button
              type="button"
              onClick={handleSaveImage}
              disabled={isSaving}
              className="px-4 py-2 rounded-full bg-hot-pink hover:bg-barbie-pink text-white font-bold text-xs shadow-md transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              {isSaving ? 'Exporting...' : '💾 Save as Image'}
            </button>
            <button
              type="button"
              onClick={handleUndo}
              disabled={history.length === 0}
              className="px-3 py-2 rounded-full bg-white hover:bg-gray-100 text-ink border border-warm-grey text-xs font-semibold shadow-xs disabled:opacity-40"
            >
              ⤺ Undo
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-2 rounded-full bg-white hover:bg-gray-100 text-ink border border-warm-grey text-xs font-semibold shadow-xs"
            >
              ↺ Reset
            </button>
          </div>
        </div>

        {/* ================= TRAY / ASSET PALETTE ================= */}
        <div className="w-full lg:w-[380px] bg-white rounded-xl p-4 shadow-lg border border-warm-grey flex flex-col h-[460px] md:h-[620px]">
          {/* Tab Headers */}
          <div className="flex rounded-lg bg-gray-100 p-1 mb-4">
            <button
              type="button"
              onClick={() => setActiveTab('photos')}
              className={`flex-1 py-1.5 rounded-md text-xs font-bold transition-all ${
                activeTab === 'photos' ? 'bg-white text-hot-pink shadow-xs' : 'text-gray-500 hover:text-black'
              }`}
            >
              Photos (17)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('typography')}
              className={`flex-1 py-1.5 rounded-md text-xs font-bold transition-all ${
                activeTab === 'typography' ? 'bg-white text-hot-pink shadow-xs' : 'text-gray-500 hover:text-black'
              }`}
            >
              Typography
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('stickers')}
              className={`flex-1 py-1.5 rounded-md text-xs font-bold transition-all ${
                activeTab === 'stickers' ? 'bg-white text-hot-pink shadow-xs' : 'text-gray-500 hover:text-black'
              }`}
            >
              Stickers
            </button>
          </div>

          {/* Tab Content 1: Photos */}
          {activeTab === 'photos' && (
            <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-3 gap-2">
              {VINTAGE_CINDY_PHOTOS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => addPhoto(p.file)}
                  className="relative group rounded border border-gray-200 overflow-hidden hover:border-hot-pink transition-all aspect-[3/4]"
                  title={`Add ${p.title}`}
                >
                  <img
                    src={mediaUrl(`img/${p.file}`)}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-hot-pink/20 opacity-0 group-hover:opacity-100 flex items-center justify-center font-bold text-white text-xs">
                    + Add
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Tab Content 2: Typography */}
          {activeTab === 'typography' && (
            <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => addText('VOGUE', 'Bodoni Moda, serif', '#FFFFFF')}
                className="w-full py-3 px-4 rounded-lg bg-pink-100 hover:bg-pink-200 text-ink font-bold text-2xl text-center border border-pink-300"
                style={{ fontFamily: 'Bodoni Moda, serif' }}
              >
                VOGUE
              </button>
              <button
                type="button"
                onClick={() => addText('Fashion', 'Pinyon Script, cursive', '#FF2E93')}
                className="w-full py-3 px-4 rounded-lg bg-pink-100 hover:bg-pink-200 text-hot-pink font-normal text-3xl text-center border border-pink-300"
                style={{ fontFamily: 'Pinyon Script, cursive' }}
              >
                Fashion
              </button>
              <button
                type="button"
                onClick={() => addText('OOTD', 'Bebas Neue, sans-serif', '#2A0F2E')}
                className="w-full py-3 px-4 rounded-lg bg-pink-100 hover:bg-pink-200 text-ink font-bold text-2xl text-center border border-pink-300 tracking-wider"
                style={{ fontFamily: 'Bebas Neue, sans-serif' }}
              >
                OOTD
              </button>
              <button
                type="button"
                onClick={() => addText('EDITORIAL', 'Sentient, serif', '#E5173F')}
                className="w-full py-3 px-4 rounded-lg bg-pink-100 hover:bg-pink-200 text-cherry-red font-bold text-xl text-center border border-pink-300 tracking-widest"
                style={{ fontFamily: 'Sentient, serif' }}
              >
                EDITORIAL
              </button>
            </div>
          )}

          {/* Tab Content 3: Stickers */}
          {activeTab === 'stickers' && (
            <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-3 gap-3 p-2">
              {[
                { name: 'Heart', kind: 'heart', color: '#FF2E93' },
                { name: 'Star', kind: 'star', color: '#FFD700' },
                { name: 'Camera', kind: 'camera', color: '#A8E6CF' },
                { name: 'Sparkle', kind: 'sparkle', color: '#BFA8E5' },
                { name: 'Lipstick', kind: 'lipstick', color: '#E5173F' },
                { name: 'Ribbon', kind: 'ribbon', color: '#FF2E93' },
              ].map((s) => (
                <button
                  key={s.kind}
                  type="button"
                  onClick={() => addVector(s.kind)}
                  className="p-3 rounded-lg bg-gray-50 hover:bg-pink-50 border border-gray-200 hover:border-hot-pink flex flex-col items-center justify-center gap-1 transition-all"
                >
                  <span className="text-xl">✨</span>
                  <span className="text-[11px] font-bold text-gray-700">{s.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
