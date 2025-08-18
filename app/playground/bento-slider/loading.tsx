export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="w-full max-w-[1440px] mx-auto flex flex-col gap-9 md:gap-10 px-4 md:px-16 py-12">
        <div className="h-12 w-2/3 mx-auto rounded bg-gray-200 animate-pulse mb-8" aria-hidden="true" />
        <div className="grid md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="rounded-xl p-6 md:p-8 shadow ring-1 ring-black/5 bg-slate-100 flex flex-col gap-4 animate-pulse"
              aria-hidden="true"
            >
              <div className="h-6 w-1/2 bg-gray-200 rounded" />
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-2/3 bg-gray-200 rounded" />
              <div className="h-32 w-full bg-gray-200 rounded mt-4" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}