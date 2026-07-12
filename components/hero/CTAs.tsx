'use client';

import Link from 'next/link';

type CTA = { label: string; href: string };

export default function CTAs({ primary, secondary }: { primary?: CTA; secondary?: CTA }) {
  if (!primary && !secondary) return null;
  return (
    <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
      {primary && (
        <Link
          href={primary.href}
          className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90"
        >
          {primary.label}
        </Link>
      )}
      {secondary && (
        <Link
          href={secondary.href}
          className="inline-flex items-center rounded-full border border-white/25 bg-transparent px-6 py-3 text-sm font-medium text-white/90 hover:bg-white/10"
        >
          {secondary.label}
        </Link>
      )}
    </div>
  );
}
