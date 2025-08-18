import type { ReactNode } from "react";
import PlaygroundBackLink from "./PlaygroundBackLink";

export default function PlaygroundLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <header className="p-4">
        <PlaygroundBackLink />
      </header>
      <main>{children}</main>
    </div>
  );
}