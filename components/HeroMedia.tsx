'use client';

import Image from 'next/image';

export default function HeroMedia({ imageSrc, imageAlt }: { imageSrc: string; imageAlt?: string }) {
  return (
    <div className="relative w-full aspect-[16/10] sm:aspect-[21/9] lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-auto lg:aspect-auto select-none">
      <Image
        src={imageSrc}
        alt={imageAlt || ''}
        fill
        priority
        className="object-cover object-[70%_50%] sm:object-[72%_50%] md:object-[68%_50%] lg:object-center"
        sizes="(min-width:1024px) 50vw, 100vw"
      />

      {/* Desktop: side fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 hidden lg:block
                   lg:w-[34%] xl:w-[28%] 2xl:w-[24%]
                   bg-[linear-gradient(to_right,rgba(0,0,0,1.92)_0%,rgba(0,0,0,0.48)_38%,rgba(0,0,0,0.12)_70%,transparent_100%)]"
      />

      {/* Desktop: bottom fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 hidden lg:block
                   h-[32%] xl:h-[28%]
                   bg-[linear-gradient(to_top,rgba(0,0,0,1)_0%,rgba(0,0,0,0.5)_55%,transparent_100%)]"
      />

      {/* Mobile/tablet: bottom fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 lg:hidden
                   h-[32%] sm:h-[36%] md:h-[40%]
                   bg-[linear-gradient(to_top,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.5)_55%,transparent_100%)]"
      />
    </div>
  );
}
