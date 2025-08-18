// app/components/HeroSplit.tsx
import Image from "next/image";
import Link from "next/link";

type Logo = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
};

type Props = {
  title: string;
  description?: string;
  ctaPrimary?: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  imageSrc: string;
  imageAlt?: string;
  logos?: Logo[];
  className?: string;
};

export default function HeroSplit({
  title,
  description,
  ctaPrimary,
  ctaSecondary,
  imageSrc,
  imageAlt = "",
  logos = [],
  className,
}: Props) {
  return (
    <section
      className={`relative min-h-[80vh] isolate overflow-hidden bg-black text-white ${className ?? ""}`}
    >
      {/* IMAGE
         - Mobile: relative block at top; face centered/bias right
         - Desktop (lg+): absolute, pinned right; crop from RIGHT using lg:object-left
      */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[21/9] lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-auto lg:aspect-auto">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          className="object-cover object-[70%_50%] sm:object-[72%_50%] md:object-[68%_50%] lg:object-center"
          sizes="(min-width:1024px) 50vw, 100vw"
        />

        {/* Desktop fade (left → right), narrow so 1024px isn't over-faded */}
        <div
          aria-hidden
          className="
            pointer-events-none absolute inset-y-0 left-0 hidden lg:block
            lg:w-[34%] xl:w-[28%] 2xl:w-[24%]
            bg-[linear-gradient(to_right,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.48)_38%,rgba(0,0,0,0.12)_70%,transparent_100%)]
          "
        />

        {/* Mobile fade (bottom → up) */}
        <div
          aria-hidden
          className="
            pointer-events-none absolute inset-x-0 bottom-0 lg:hidden
            h-[32%] sm:h-[36%] md:h-[40%]
            bg-[linear-gradient(to_top,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.5)_55%,transparent_100%)]
          "
        />
      </div>

      {/* COPY inside max-w-7xl */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 lg:h-[80vh]">
        {/* Container with proper bottom alignment */}
        <div className="py-10 sm:py-14 lg:h-full lg:flex lg:flex-col lg:justify-end lg:pb-20">
          <div className="max-w-xl">
            
            <div>
              {/* Announcement banner above title - improved for dark hero, left on desktop, center on mobile */}
              <div className="mb-8 flex justify-center lg:justify-start">
                <div className="relative rounded-full px-4 py-1.5 text-sm font-medium text-white/80 ring-1 ring-white/10 hover:ring-white/20 bg-gradient-to-r from-black/80 via-gray-900/80 to-black/60 backdrop-blur-lg shadow-lg">
                  <span className="mr-2">Announcing our next round of funding.</span>
              
                </div>
              </div>
              {/* Title and content */}
              <h1 className="text-4xl md:text-6xl font-semibold text-balance tracking-tight text-center lg:text-left">
                {title}
              </h1>

              {description && (
                <p className="mt-6 max-w-lg text-base md:text-lg text-white/75 text-balance text-center lg:text-left mx-auto lg:mx-0">
                  {description}
                </p>
              )}

              <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
                {ctaPrimary && (
                  <Link
                    href={ctaPrimary.href}
                    className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90"
                  >
                    {ctaPrimary.label}
                  </Link>
                )}
                {ctaSecondary && (
                  <Link
                    href={ctaSecondary.href}
                    className="inline-flex items-center rounded-full border border-white/25 bg-transparent px-6 py-3 text-sm font-medium text-white/90 hover:bg-white/10"
                  >
                    {ctaSecondary.label}
                  </Link>
                )}
              </div>

              {/* FEATURED IN — below CTAs */}
              {logos.length > 0 && (
                <div className="mt-12">
                  <p className="text-xs uppercase tracking-wider text-white/60 text-center lg:text-left">
                    Featured in
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-6 lg:flex lg:flex-wrap lg:items-center lg:gap-x-6 lg:gap-y-4 justify-items-center lg:justify-start">
                    {logos.map((logo, i) => {
                      // Calculate aspect ratio to reserve space - using 40px height instead of 24px
                      const aspectRatio = (logo.width ?? 96) / (logo.height ?? 32);
                      const reservedWidth = 40 * aspectRatio; // 40px height * aspect ratio
                      
                      return (
                        <div
                          key={i}
                          className="flex items-center justify-center"
                          style={{
                            width: `${reservedWidth}px`,
                            height: '40px',
                            minWidth: '60px', // Minimum width for very tall logos
                          }}
                        >
                          <Image
                            src={logo.src}
                            alt={logo.alt ?? "Logo"}
                            width={logo.width ?? 96}
                            height={logo.height ?? 32}
                            className="opacity-70 grayscale contrast-125 transition hover:opacity-100"
                            unoptimized
                            style={{
                              height: '40px',
                              width: 'auto',
                              maxWidth: '100%',
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              {/* /FEATURED IN */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}