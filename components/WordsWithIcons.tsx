'use client';

import { Eye, AudioLines, Ear } from 'lucide-react';
import BlurReveal from './BlurReveal';
import { useStaggered } from '../hooks/useStaggered';

const ICONS = {
  seen: { Component: Eye, color: 'text-blue-500' },
  said: { Component: AudioLines, color: 'text-green-500' },
  heard: { Component: Ear, color: 'text-purple-500' },
};

export default function WordsWithIcons({
  text,
  inView,
  startDelay = 0,
}: {
  text?: string;
  inView: boolean;
  startDelay?: number;
}) {
  const delay = useStaggered(80, startDelay);
  if (!text) return null;
  const words = text.split(/\s+/);

  let counter = 0;

  return (
    <p className="mt-6 text-base md:text-lg leading-relaxed text-white/75 md:text-balance max-w-sm md:max-w-md lg:max-w-lg text-center lg:text-left mx-auto lg:mx-0">
      {words.map((word, i) => {
        const clean = word.replace(/[.,!?;:]/, '').toLowerCase() as keyof typeof ICONS;
        const icon = ICONS[clean];

        if (icon) {
          const Icon = icon.Component;
          return (
            <span key={i} className="inline-flex items-center mr-2 align-middle">
              <BlurReveal delay={delay(counter++)} inView={inView} className={`${icon.color} align-middle mr-1`}>
                <Icon size={20} className="align-middle mr-1" />
              </BlurReveal>
              <BlurReveal delay={delay(counter++)} inView={inView} className="align-middle">
                {word}
              </BlurReveal>
            </span>
          );
        }

        return (
          <BlurReveal key={i} delay={delay(counter++)} inView={inView} className="mr-2 align-middle">
            {word}
          </BlurReveal>
        );
      })}
    </p>
  );
}
