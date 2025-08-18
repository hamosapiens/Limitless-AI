"use client";

import { useEffect, useState } from "react";

type Route = "root" | "private-key" | "recovery-phrase" | "remove-wallet";

export default function BottomSheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [route, setRoute] = useState<Route>("root");

  useEffect(() => {
    if (!open) setRoute("root");
  }, [open]);

  // lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* sheet */}
      <div
        className="relative w-full bg-white rounded-t-2xl shadow-lg
                   animate-[sheetIn_.28s_ease-out] motion-reduce:animate-none"
      >
        {/* little handle */}
        <div className="flex justify-center py-2">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
        </div>

        <div className="relative overflow-hidden max-h-[80vh]"> {/* Add max-h here */}
          {/* root stays put */}
          <div className={`p-4 ${route !== "root" ? "opacity-60" : "opacity-100"} transition-opacity`}>
            <h2 className="text-lg font-semibold">Options</h2>
            <div className="mt-2 grid gap-2">
              <button onClick={() => setRoute("private-key")} className="w-full text-left px-4 py-3 rounded-lg border hover:bg-gray-50">
                View Private Key
              </button>
              <button onClick={() => setRoute("recovery-phrase")} className="w-full text-left px-4 py-3 rounded-lg border hover:bg-gray-50">
                View Recovery Phrase
              </button>
              <button onClick={() => setRoute("remove-wallet")} className="w-full text-left px-4 py-3 rounded-lg border border-red-300 text-red-600 hover:bg-red-50">
                Remove Wallet
              </button>
              <button onClick={onClose} className="w-full mt-3 px-4 py-2 rounded-lg border">
                Close
              </button>
            </div>
          </div>

          {/* detail slides UP inside */}
          <section
            className={`absolute inset-0 bg-white p-4
                        ${route === "root" ? "translate-y-full" : "translate-y-0"}
                        transition-transform duration-300 ease-out
                        motion-reduce:transition-none
                        overflow-y-auto`} // Add overflow-y-auto here
            aria-hidden={route === "root"}
            style={{ maxHeight: "calc(80vh - 48px)" }} // Optional: adjust for handle height
          >
            <div className="flex items-center gap-2 mb-3">
              <button onClick={() => setRoute("root")} className="px-2 py-1 rounded border text-sm">
                ← Back
              </button>
              <h3 className="text-lg font-semibold capitalize">{route.replace("-", " ")}</h3>
            </div>

            {route === "private-key" && (
              <p className="text-sm text-gray-600">
                Your Private Key is used to back up your wallet. Keep it secret and secure.
              </p>
            )}
            {route === "recovery-phrase" && (
              <p className="text-sm text-gray-600">
                Your recovery phrase restores access to your wallet. Never share it.
              </p>
            )}
            {route === "remove-wallet" && (
                <>
                <h1>Hello World!</h1>
              <p className="text-sm text-gray-600">
                This removes the wallet from this device. Make sure you have your recovery phrase.
                <br />
                Are you sure you want to proceed?
                <br />
                This removes the wallet from this device. Make sure you have your recovery phrase.
                <br />
                Are you sure you want to proceed?
                                This removes the wallet from this device. Make sure you have your recovery phrase.
                <br />
                Are you sure you want to proceed?
              </p>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg">
                Confirm
              </button>
                              <h1>Hello World!</h1>
              <p className="text-sm text-gray-600">
                This removes the wallet from this device. Make sure you have your recovery phrase.
                <br />
                Are you sure you want to proceed?
                <br />
                This removes the wallet from this device. Make sure you have your recovery phrase.
                <br />
                Are you sure you want to proceed?
                                This removes the wallet from this device. Make sure you have your recovery phrase.
                <br />
                Are you sure you want to proceed?
              </p>
                              <h1>Hello World!</h1>
              <p className="text-sm text-gray-600">
                This removes the wallet from this device. Make sure you have your recovery phrase.
                <br />
                Are you sure you want to proceed?
                <br />
                This removes the wallet from this device. Make sure you have your recovery phrase.
                <br />
                Are you sure you want to proceed?
                                This removes the wallet from this device. Make sure you have your recovery phrase.
                <br />
                Are you sure you want to proceed?
              </p>
                              <h1>Hello World!</h1>
              <p className="text-sm text-gray-600">
                This removes the wallet from this device. Make sure you have your recovery phrase.
                <br />
                Are you sure you want to proceed?
                <br />
                This removes the wallet from this device. Make sure you have your recovery phrase.
                <br />
                Are you sure you want to proceed?
                                This removes the wallet from this device. Make sure you have your recovery phrase.
                <br />
                Are you sure you want to proceed?
              </p>
</>
            )}
          </section>
        </div>
      </div>

      {/* keyframes for the sheet itself */}
      <style jsx>{`
        @keyframes sheetIn {
          from { transform: translateY(100%); }
          to   { transform: translateY(0%); }
        }
      `}</style>
    </div>
  );
}
