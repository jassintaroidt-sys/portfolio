import { TOC_SECTIONS } from './tocData';
import { useLenis } from '../../lib/scroll';

export interface TocInlineProps {
  activeSectionId?: string;
  className?: string;
}

export function TocInline({ activeSectionId, className = '' }: TocInlineProps): JSX.Element {
  const { scrollTo } = useLenis();

  // 2 columns per BRIEF §7
  const col1 = TOC_SECTIONS.slice(0, 5);
  const col2 = TOC_SECTIONS.slice(5);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      scrollTo(el, { offset: -20, duration: 1.4 });
    }
  };

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-ink/80 ${className}`}
    >
      <div className="flex flex-col gap-1">
        {col1.map((item) => {
          const isActive = activeSectionId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleClick(item.id)}
              className={`text-left hover:text-hot-pink transition-colors ${
                isActive ? 'text-hot-pink font-bold underline' : ''
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-1">
        {col2.map((item) => {
          const isActive = activeSectionId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleClick(item.id)}
              className={`text-left hover:text-hot-pink transition-colors ${
                isActive ? 'text-hot-pink font-bold underline' : ''
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default TocInline;
