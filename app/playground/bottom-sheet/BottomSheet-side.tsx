"use client";

import { useState, useEffect } from "react";

type SheetRoute = "root" | "private-key" | "recovery-phrase" | "remove-wallet";

export default function BottomSheetSide({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [route, setRoute] = useState<SheetRoute>("root");

  // Reset view when closing
  useEffect(() => {
    if (!open) setRoute("root");
  }, [open]);

  // Body scroll lock
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div className="relative w-full bg-white rounded-t-2xl shadow-lg transition-transform duration-300 ease-out">
        {/* Handle */}
        <div className="flex justify-center py-2">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
        </div>

        <div className="relative overflow-hidden min-h-[200px]">
          {/* Root View */}
          <div
            className={`p-4 space-y-2 transition-transform duration-300 ${
              route !== "root" ? "-translate-x-full" : "translate-x-0"
            }`}
          >
            <h2 className="text-lg font-semibold">Options</h2>
            <button
              onClick={() => setRoute("private-key")}
              className="block w-full text-left px-4 py-3 rounded-lg border hover:bg-gray-50"
            >
              View Private Key
            </button>
            <button
              onClick={() => setRoute("recovery-phrase")}
              className="block w-full text-left px-4 py-3 rounded-lg border hover:bg-gray-50"
            >
              View Recovery Phrase
            </button>
            <button
              onClick={() => setRoute("remove-wallet")}
              className="block w-full text-left px-4 py-3 rounded-lg border border-red-300 text-red-600 hover:bg-red-50"
            >
              Remove Wallet
            </button>
            <button
              onClick={onClose}
              className="block w-full text-center px-4 py-2 rounded-lg border mt-4"
            >
              Close
            </button>
          </div>

          {/* Detail View */}
          <div
            className={`absolute inset-0 p-4 transition-transform duration-300 ${
              route === "root" ? "translate-x-full" : "translate-x-0"
            }`}
          >
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={() => setRoute("root")}
                className="px-2 py-1 rounded border text-sm"
              >
                ← Back
              </button>
              <h2 className="text-lg font-semibold capitalize">
                {route.replace("-", " ")}
              </h2>
            </div>

            {route === "private-key" && (
              <p className="text-sm text-gray-600">
                Your Private Key is used to back up your wallet. Keep it safe.
              </p>
            )}
            {route === "recovery-phrase" && (
              <p className="text-sm text-gray-600">
                Your recovery phrase lets you restore your wallet. Keep it secure.
              </p>
            )}
            {route === "remove-wallet" && (
              <p className="text-sm text-gray-600">
                This will remove your wallet from the device. Ensure you have your recovery phrase.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
