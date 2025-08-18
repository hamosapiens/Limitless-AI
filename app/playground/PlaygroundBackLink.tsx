"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PlaygroundBackLink() {
  const pathname = usePathname();
  // Only show if not exactly "/playground"
  if (pathname === "/playground") return null;
  return (
    // make sticky and fixed to the bottom
    <div className="fixed bottom-10 left-0 right-0 bg-white dark:bg-zinc-950 p-4 shadow-md z-50 w-[200px]">
    <Link
      href="/playground"
      className="text-sm text-blue-600 underline hover:text-blue-800"
    >
      ← Playground Home
    </Link>
    </div>
  );
}