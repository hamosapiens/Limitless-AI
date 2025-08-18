// create page for reveal staggered
"use client";

import { useEffect, useRef, useState } from "react";
import RevealStaggered from "./RevealStaggered";


export default function RevealStaggeredPage() {
  const [items, setItems] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Simulate fetching items
    setTimeout(() => {
      setItems(["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"]);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-8">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-lg p-6 relative">
        <h1 className="text-2xl font-bold mb-4 text-center">Reveal Staggered Example</h1>
        <input
          ref={inputRef}
          type="text"
          placeholder="Type to add items..."
          className="border p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={(e) => {
            if (e.key === "Enter" && inputRef.current?.value) {
              setItems((prev) => [...prev, inputRef.current?.value ?? ""]);
              inputRef.current.value = "";
            }
          }}
        />
        <RevealStaggered
          items={items.map((item, i) => (
            <div
              key={i}
              className="w-full rounded-lg border px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 transition"
            >
              {item}
            </div>
          ))}
          delayStep={150}
          className="space-y-2"
        />
      </div>
    </div>
  );
}