'use client';

import { useInViewOnce } from '@/hooks/useInViewOnce';
import { useStaggered } from '@/hooks/useStaggered';
import HeroBackground from '@/components/HeroBackground';
import HeroMedia from '@/components/HeroMedia';
import HeroText from '@/components/HeroText';
import FeaturedLogos from '@/components/FeaturedLogos';
import BlurReveal from '@/components/BlurReveal';

type Logo = { src: string; alt?: string; width?: number; height?: number };

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
  imageAlt = '',
  logos = [],
  className,
}: Props) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>({ threshold: 0.1 });
  const delayFn = useStaggered(80);

  return (
    <section className={`relative isolate overflow-hidden bg-black text-white ${className ?? ''}`}>
      <HeroBackground inView={inView} />
      <HeroMedia imageSrc={imageSrc} imageAlt={imageAlt} />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-8 sm:py-10 md:py-12 lg:min-h-screen lg:py-6 lg:flex lg:flex-col">
        <div
          ref={ref}
          className={`text-center lg:text-left ${
            (logos?.length ?? 0) > 0
              ? 'lg:flex-1 lg:flex lg:flex-col lg:justify-center'
              : 'lg:flex lg:flex-col lg:justify-end lg:pb-8'
          }`}
        >
          <HeroText
            title={title}
            description={description}
            ctaPrimary={ctaPrimary}
            ctaSecondary={ctaSecondary}
            inView={inView}
          />
        </div>


        {/* wrapp in way so it will shows center on smaller screens */}
{logos?.length ? (
  <BlurReveal delay={delayFn(10)} inView={inView} as="div" className="w-full">
    <FeaturedLogos logos={logos} />
  </BlurReveal>
) : null}

      </div>
    </section>
  );
}
