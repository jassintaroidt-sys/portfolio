import { DocItem } from './data';
import { Logo } from './Logo';
import { mediaUrl } from '../../../lib/media';

export interface DocumentProps {
  item: DocItem;
  className?: string;
  style?: React.CSSProperties;
}

export function Document({ item, className = '', style }: DocumentProps): JSX.Element {
  const padIndex = String(item.id).padStart(2, '0');

  return (
    <article
      className={`
        group relative bg-white select-none transition-all duration-300 ease-out
        hover:-translate-y-2 hover:shadow-2xl hover:z-30 cursor-pointer
        ${className}
      `}
      style={{
        border: '1px solid #000000',
        borderRadius: '2px',
        boxShadow: `
          0 4px 6px rgba(0, 0, 0, 0.08),
          0 10px 20px rgba(0, 0, 0, 0.12),
          0 1px 2px rgba(0, 0, 0, 0.05)
        `,
        transform: `rotate(${item.rot}deg)`,
        ...style,
      }}
      aria-label={`Document ${padIndex} of 10: ${item.company} (${item.tag})`}
    >
      {/* Red Staple Accent in Top-Left Corner per BRIEF §11.3 */}
      <div className="absolute top-2 left-2 z-20 pointer-events-none">
        <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
          {/* Staple shadow */}
          <rect x="2" y="3" width="18" height="6" rx="1.5" fill="rgba(0,0,0,0.25)" />
          {/* Metal Red Staple Bar */}
          <rect x="1" y="1" width="18" height="5" rx="1.5" fill="#E5173F" stroke="#99001F" strokeWidth="1" />
          <line x1="2" y1="2" x2="18" y2="2" stroke="#FFA3D0" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </div>

      {/* Sheet Content Wrapper */}
      <div className="w-full h-full p-4 md:p-5 flex flex-col justify-between relative bg-white">
        {/* Top Header: Numbering & Category Tag */}
        <div className="w-full flex items-center justify-between pl-6 text-[10px] md:text-xs font-mono font-bold tracking-wider">
          <span className="text-gray-400 group-hover:text-hot-pink transition-colors">
            {padIndex} / 10
          </span>
          <span className="px-2 py-0.5 rounded-sm bg-gray-100 group-hover:bg-[#FFE5EC] text-gray-700 group-hover:text-cherry-red transition-colors uppercase">
            {item.tag}
          </span>
        </div>

        {/* Center: Company Logo Display */}
        <div className="w-full my-auto py-3 px-2 flex items-center justify-center min-h-[90px] md:min-h-[120px]">
          <Logo
            src={mediaUrl(`img/${item.file}`)}
            alt={`${item.company} official logo`}
            company={item.company}
            className="max-h-16 md:max-h-20"
          />
        </div>

        {/* Bottom Footer: Reference Code & Company Name */}
        <div className="w-full pt-2 border-t border-gray-100 flex items-center justify-between text-[9px] md:text-[10px] font-mono text-gray-400">
          <span className="tracking-widest uppercase">{item.ref}</span>
          <span className="font-semibold text-gray-800 line-clamp-1 max-w-[120px] text-right">
            {item.company}
          </span>
        </div>
      </div>
    </article>
  );
}
