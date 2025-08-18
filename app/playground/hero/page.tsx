// app/page.tsx
import Image from "next/image";

export default function Page() {
  return (
    <main className="relative min-h-screen bg-[#eef3f8] p-4 md:p-8">
      {/* browser chrome */}
      <div className="mx-auto max-w-[1200px] rounded-2xl bg-white shadow-[0_10px_40px_rgba(16,24,40,.08)] ring-1 ring-slate-100">
        {/* header */}
        <header className="flex items-center justify-between px-6 md:px-10 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-8 w-8 place-content-center rounded-full bg-blue-600/10 ring-1 ring-blue-100">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
            </div>
            <span className="font-semibold text-slate-900">TrustLine</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
            <a href="#" className="hover:text-slate-900">Features</a>
            <a href="#" className="hover:text-slate-900">Pricing</a>
            <a href="#" className="hover:text-slate-900">About</a>
            <a href="#" className="hover:text-slate-900">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            <button className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Sign in
            </button>
            <button className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">
              Book a demo
            </button>
          </div>
        </header>

        {/* hero */}
        <section className="relative overflow-hidden px-6 pb-16 pt-8 md:px-10 md:pb-24 md:pt-16">
          {/* dotted / dashed flow background */}
          <BackgroundFlows />

          <div className="mx-auto max-w-3xl text-center relative">
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-6xl">
              Trusted 3rd Party
              <br className="hidden md:block" />
              <span className="md:whitespace-nowrap"> Cancellation Solution</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-slate-600">
              TrustLine automates third-party support requests, speeding up responses
              while keeping your processes secure.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
              >
                Get started
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
              >
                View live demo
              </a>
            </div>
          </div>

          {/* left: “without/with” mini card */}
          <div className="absolute left-6 top-24 hidden md:block">
            <MiniToggleCard />
          </div>

          {/* right: secured proxy card */}
          <div className="absolute right-6 top-28 hidden md:block">
            <SecurityCard />
          </div>

          {/* bottom left: customers grid */}
          <div className="absolute left-8 bottom-10 hidden md:block">
            <CustomersCard />
          </div>

          {/* bottom right: teams card */}
          <div className="absolute right-8 bottom-10 hidden md:block">
            <TeamsCard />
          </div>

          {/* center badge “TrustLine” */}
          <div className="pointer-events-none absolute inset-x-0 bottom-[22%] flex items-center justify-center">
            <div className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow ring-1 ring-slate-200">
              TrustLine
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

/* ---------- Pieces ---------- */

function MiniToggleCard() {
  return (
    <div className="w-[180px] rounded-xl bg-white p-3 shadow-lg ring-1 ring-slate-100">
      <div className="flex items-center justify-between rounded-lg bg-slate-50 p-2">
        <span className="text-[11px] text-slate-600">Without TrustLine</span>
        <span className="text-[11px] font-semibold text-slate-900">8%</span>
      </div>
      <div className="mt-2 flex items-center justify-between rounded-lg bg-green-50 p-2">
        <span className="text-[11px] text-slate-700">With TrustLine</span>
        <span className="text-[11px] font-semibold text-emerald-700">75%</span>
      </div>
    </div>
  );
}

function SecurityCard() {
  return (
    <div className="grid w-[180px] place-content-center rounded-xl bg-white p-3 shadow-lg ring-1 ring-slate-100">
      <div className="relative grid h-28 w-28 place-content-center rounded-xl bg-gradient-to-b from-slate-50 to-white ring-1 ring-slate-100">
        <div className="h-10 w-10 rounded-xl bg-emerald-500/10 ring-1 ring-emerald-100 grid place-content-center">
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="h-5 w-5 fill-none stroke-emerald-600"
          >
            <path
              d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4Z"
              strokeWidth="1.5"
            />
            <path d="M8 12l2.5 2.5L16 9" strokeWidth="1.5" />
          </svg>
        </div>
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle,rgba(16,185,129,.12)_1px,transparent_1px)] bg-[length:12px_12px]" />
      </div>
      <span className="mt-2 text-center text-[11px] text-slate-600">
        Secured Proxy Protection
      </span>
    </div>
  );
}

function CustomersCard() {
  return (
    <div className="w-[260px] rounded-2xl bg-white p-3 shadow-lg ring-1 ring-slate-100">
      <div className="mb-2 text-[11px] font-medium text-slate-500">Your Customers</div>
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square overflow-hidden rounded-xl bg-slate-100 ring-1 ring-slate-200"
          >
            <img
              src={`https://picsum.photos/seed/p${i}/200/200`}
              alt=""
              width={200}
              height={200}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={`e${i}`} className="aspect-square rounded-xl bg-slate-50 ring-1 ring-slate-100" />
        ))}
      </div>
    </div>
  );
}

function TeamsCard() {
  return (
    <div className="w-[290px] rounded-2xl bg-white p-3 shadow-lg ring-1 ring-slate-100">
      <div className="mb-2 text-[11px] font-medium text-slate-500">Your CX Team</div>
      <div className="grid grid-cols-3 gap-3">
        {["Team 1", "AI", "Team 2", "Automation", "Brain", "Team 3"].map((t, i) => (
          <div
            key={t}
            className="grid aspect-square place-content-center rounded-xl bg-slate-50 text-[11px] font-medium text-slate-700 ring-1 ring-slate-100"
          >
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}

function BackgroundFlows() {
  return (
    <>
      {/* soft backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,.06),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(16,185,129,.06),transparent_60%)]" />
      {/* dashed lines */}
      <svg
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
        viewBox="0 0 1200 640"
        aria-hidden
      >
        <defs>
          <pattern id="dash" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M0 8 H16" stroke="#BFD3EA" strokeDasharray="4 6" />
          </pattern>
          <linearGradient id="fade" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#C7D7EE" stopOpacity=".8" />
            <stop offset="100%" stopColor="#C7D7EE" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* vertical rails */}
        <rect x="140" y="0" width="2" height="640" fill="url(#fade)" />
        <rect x="600" y="0" width="2" height="640" fill="url(#fade)" />
        <rect x="1060" y="0" width="2" height="640" fill="url(#fade)" />

        {/* flowing dashed paths */}
        <path
          d="M120 60 C 200 60, 240 140, 300 160 S 420 220, 520 200 720 120, 820 160 980 220, 1080 200"
          fill="none"
          stroke="url(#fade)"
          strokeWidth="10"
        />
        <path
          d="M120 120 C 200 120, 240 200, 300 220 S 420 280, 520 260 720 180, 820 220 980 280, 1080 260"
          fill="none"
          stroke="url(#dash)"
          strokeWidth="2"
        />
        <path
          d="M120 520 C 240 520, 360 460, 480 460 S 720 520, 840 520 1000 520, 1080 520"
          fill="none"
          stroke="url(#dash)"
          strokeWidth="2"
        />
      </svg>
    </>
  );
}
