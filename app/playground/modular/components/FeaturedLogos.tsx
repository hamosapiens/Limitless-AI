'use client';

import Image from 'next/image';

type Logo = { src: string; alt?: string; width?: number; height?: number };

export default function FeaturedLogos({ logos = [] }: { logos?: Logo[] }) {
  if (!logos.length) return null;

  return (
    <div className="w-full">
      <div className="mt-10 lg:pb-8 flex flex-col items-center lg:items-start">
        <p className="text-xs uppercase tracking-wider text-white/60 text-center lg:text-left">Featured in</p>
        <div className="mt-4 inline-grid grid-cols-[max-content_max-content] justify-center gap-x-20 gap-y-4 lg:flex lg:flex-wrap lg:items-center lg:gap-x-8 lg:gap-y-4 lg:justify-start">
          {logos.map((logo, i) => {
            const aspectRatio = (logo.width ?? 96) / (logo.height ?? 32);
            const reservedWidth = 40 * aspectRatio;
            return (
              <div
                key={i}
                className="flex items-center justify-center w-full"
                style={{ width: `${reservedWidth}px`, height: '40px', minWidth: '60px' }}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt ?? 'Logo'}
                  width={logo.width ?? 96}
                  height={logo.height ?? 32}
                  className="opacity-70 grayscale contrast-125 transition hover:opacity-100"
                  unoptimized
                  style={{ height: '40px', width: 'auto', maxWidth: '100%' }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
