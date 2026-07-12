import * as React from "react";

export function RichText({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <div className="text-white/80 text-sm text-pretty sm:text-base tracking-tight leading-relaxed whitespace-pre-line">
      {text}
    </div>
  );
}
