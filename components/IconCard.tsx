// components/IconCard.tsx
import { ReactNode } from "react";

interface IconCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  rounded?: 'all' | 'left' | 'right' | 'none';
  iconSize?: { width: number; height: number };
}

export default function IconCard({ icon, title, description, rounded = 'all', iconSize }: IconCardProps) {
  let roundedClass = '';
  if (rounded === 'all') roundedClass = 'rounded-2xl';
  else if (rounded === 'left') roundedClass = 'rounded-l-2xl';
  else if (rounded === 'right') roundedClass = 'rounded-r-2xl';
  // none: no rounded class

  return (
    <div
      className={`
    h-full w-full min-w-[220px] max-w-xs sm:min-w-[280px] md:min-w-0 bg-white/40
    hover:bg-neutral-100/20 gap-3 snap-start flex items-center flex-col
    p-4 sm:p-5.5
    ${roundedClass}
    border border-transparent hover:border-black/10 hover:border-dashed transition-colors duration-200
  `}
    >
      <span className="opacity-80 backdrop-blur-md" style={iconSize ? { width: iconSize.width, height: iconSize.height, display: 'inline-block' } : {}}>
        {icon}
      </span>
      <div className="flex flex-col gap-1">
        <h6 className="text-[15px] sm:text-[14px] text-black/70 tracking-tight">{title}</h6>
        <p className="text-[12px] sm:text-[11px] text-black/40 text-balance tracking-tight">{description}</p>
      </div>
    </div>
  );
}
