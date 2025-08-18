"use client";

import { useState } from "react";
import BottomSheetSide from "./BottomSheet-side";
import BottomSheets from "./BottomSheet";
import BottomSheetZoom from "./BottomSheetZoom";
import BottomSheetReveal from "./BottomSheetReveal";


export default function Page() {
  const [openSide, setOpenSide] = useState(false);
  const [openSheet, setOpenSheet] = useState(false);
  const [openZoom, setOpenZoom] = useState(false);
  const [openReveal, setOpenReveal] = useState(false); // Add state for reveal

  return (
    <main className="p-6">
      <button
        onClick={() => setOpenSide(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Open Sheet Side
      </button>
      <BottomSheetSide open={openSide} onClose={() => setOpenSide(false)} />

      <button
        onClick={() => setOpenSheet(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Open Sheet
      </button>
      <BottomSheets open={openSheet} onClose={() => setOpenSheet(false)} />

      <button
        onClick={() => setOpenZoom(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Open Sheet Zoom
      </button>
      <BottomSheetZoom open={openZoom} onClose={() => setOpenZoom(false)} />

      <button
        onClick={() => setOpenReveal(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Open Sheet Reveal
      </button>
      <BottomSheetReveal open={openReveal} onClose={() => setOpenReveal(false)} />

      <div className="h-[100vh]">
        <h1 className="text-2xl font-bold mb-4">Bottom Sheet Playground</h1>
        <p className="mb-6">Click the buttons to open different bottom sheets.</p>
      </div>
    </main>
  );
}
