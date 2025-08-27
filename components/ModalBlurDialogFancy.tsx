// components/ModalBlurDialogFancy.tsx
'use client';

import * as React from 'react';
import BlurReveal from '@/components/BlurReveal';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { XIcon } from 'lucide-react';

export type FancyModalItem = {
  title: string;
  description?: string;
  imageSrc?: string;
};

export function ModalBlurDialogFancy({
  open,
  onOpenChange,
  item,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item?: FancyModalItem | null;
}) {
const visible = !!item;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
className="
  fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
  w-[92%] max-w-[660px] min-h-[320px]
  rounded-2xl border border-white/10 
  bg-gradient-to-b from-neutral-900/90 to-neutral-950
  backdrop-blur-md
  pt-8 pb-4 px-0
  shadow-3xl outline-none z-50

  data-[state=open]:animate-in  data-[state=closed]:animate-out
  data-[state=open]:fade-in-0   data-[state=closed]:fade-out-0
  data-[state=open]:zoom-in-95  data-[state=closed]:zoom-out-95
  duration-150 ease-out
"

      >


        {visible && (
          <div className="relative">
            <BlurReveal inView={open} delay={100} as="div" className="w-full">
              <DialogHeader className="border-b border-white/10 px-7 pb-5">
                <div className="flex items-center justify-between gap-4">
                  <DialogTitle className="text-2xl font-normal tracking-tight text-white">
                    {item!.title}
                  </DialogTitle>
                  <DialogClose
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white/90 ring-1 ring-white/20 backdrop-blur transition hover:bg-black/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    aria-label="Close"
                  >
                    <XIcon className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </DialogClose>
                </div>
              </DialogHeader>

              <div className="px-6 py-6 space-y-4">
                {!!item!.imageSrc && (
                  <img
                    src={item!.imageSrc}
                    alt={item!.title}
                    className="w-full h-56 object-cover object-top rounded-xl border border-white/10"
                  />
                )}
                {!!item!.description && (
                  <p className="text-white/80 text-base leading-relaxed">
                    {item!.description}
                  </p>
                )}
              </div>
            </BlurReveal>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
