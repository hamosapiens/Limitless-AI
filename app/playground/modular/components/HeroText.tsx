'use client';

import Link from 'next/link';
import BlurReveal from './BlurReveal';
import WordsWithIcons from './WordsWithIcons';
import CTAs from './CTAs';
import { useStaggered } from '../hooks/useStaggered';

type CTA = { label: string; href: string };

export default function HeroText({
  title,
  description,
  ctaPrimary,
  ctaSecondary,
  inView,
}: {
  title: string;
  description?: string;
  ctaPrimary?: CTA;
  ctaSecondary?: CTA;
  inView: boolean;
}) {
  const delay = useStaggered(80);

  return (
    <div className="max-w-xl mt-0 mx-auto lg:mx-0 lg:mt-20">
      <BlurReveal delay={delay(0)} inView={inView}>
        <div className="mb-8 flex justify-center lg:justify-start">
          <div className="relative rounded-full px-4 py-1.5 text-[10px] sm:text-sm text-white/80 ring-1 ring-white/10 hover:ring-white/20 bg-gradient-to-r from-black/80 via-gray-900/80 to-black/60 backdrop-blur-lg shadow-lg">
            <Link href="#">
              <span className="mr-2">
                Order Pendant and Unlimited Plan Bundle for <span className="line-through opacity-60 mr-1">$787</span> $399
              </span>
            </Link>
          </div>
        </div>
      </BlurReveal>

      <BlurReveal delay={delay(1)} inView={inView}>
        <h1 className="text-4xl md:text-6xl font-bold text-balance tracking-tight leading-[1.2] text-center lg:text-left bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          {title}
        </h1>
      </BlurReveal>

      <WordsWithIcons text={description} inView={inView} startDelay={delay(2)} />

      <BlurReveal delay={delay(3)} inView={inView}>
        <CTAs primary={ctaPrimary} secondary={ctaSecondary} />
      </BlurReveal>
    </div>
  );
}
