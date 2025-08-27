// components/RichTextPB.tsx
import * as React from "react";

export function RichTextPB({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <div className="text-white/80 text-sm text-pretty sm:text-base text-pretty tracking-tight leading-relaxed whitespace-pre-line">
      {text}
    </div>
  );
}
