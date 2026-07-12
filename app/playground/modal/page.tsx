// app/playground/modal-fancy/page.tsx
'use client'

import { ModalBlurDialogFancy } from '@/components/ModalBlurDialogFancy';

import { useState } from 'react';

export default function Page() {
  const [open, setOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#161616] text-white grid place-items-center p-6">
      <div className="mx-auto max-w-[800px] text-center">
        <h1 className="mb-6 text-4xl font-normal tracking-tight">Blur Reveal Modal</h1>
        <p className="mx-auto mb-8 max-w-[600px] text-white/70">
          Progressive content blur and layered veils, on top of shadcn Dialog.
        </p>
        <ModalBlurDialogFancy open={open} onOpenChange={setOpen} />
      </div>
    </main>
  );
}
