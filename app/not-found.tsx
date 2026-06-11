import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid bg-grid-fade" />
        <div className="absolute left-1/2 top-1/2 aspect-square w-[80%] -translate-x-1/2 -translate-y-1/2 glow-conic opacity-50" />
      </div>

      <div className="mx-auto w-full max-w-3xl px-6 text-center sm:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
          Error · 404
        </p>
        <h1 className="mt-5 text-balance text-5xl font-semibold tracking-tight text-zinc-50 sm:text-6xl md:text-7xl">
          <span className="gradient-text">Lost in the void.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-pretty text-base text-zinc-400 sm:text-lg">
          Whatever you were looking for isn&apos;t here. Probably a typo, a
          stale link, or a route I haven&apos;t built yet.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full bg-zinc-50 px-5 py-2.5 text-sm font-semibold text-zinc-950 shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_8px_30px_rgba(139,92,246,0.25)] transition hover:bg-white"
          >
            <ArrowLeft
              size={15}
              className="transition group-hover:-translate-x-0.5"
            />
            Back home
          </Link>
        </div>
      </div>
    </section>
  );
}
