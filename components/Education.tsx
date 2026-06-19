import { GraduationCap, MapPin } from "lucide-react";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { Spotlight } from "./ui/Spotlight";
import { education } from "@/data/site";

export default function Education() {
  return (
    <section id="education" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="04 · Education"
          title="Currently learning."
          description="Some classes, a lot of office hours, and the occasional 3am debugging session."
        />

        <div className="mt-14 space-y-6">
          {education.map((e, i) => (
            <Reveal key={e.school} delay={i * 0.06}>
              <article className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition hover:border-white/15 sm:p-8">
                <Spotlight
                  size={580}
                  color="rgba(245, 158, 11, 0.20)"
                  accent="rgba(244, 114, 182, 0.10)"
                />
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="grid size-12 shrink-0 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-amber-400/20 via-rose-400/10 to-violet-500/20 text-amber-200 shadow-inner">
                      <GraduationCap size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight text-zinc-50 sm:text-xl">
                        {e.school}
                      </h3>
                      <p className="mt-1 text-sm text-zinc-300">{e.degree}</p>
                      <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-zinc-500">
                        <MapPin size={12} className="opacity-70" />
                        {e.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-start gap-1 text-sm sm:items-end">
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-300">
                      {e.period}
                    </span>
                    {e.gpa && (
                      <span className="text-xs text-zinc-500">
                        GPA · {e.gpa}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-2">
                  <div>
                    <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                      Highlights
                    </h4>
                    <ul className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-400">
                      {e.highlights.map((h, idx) => (
                        <li key={idx} className="flex gap-3">
                          <span className="mt-2 inline-block size-1 shrink-0 rounded-full bg-zinc-600" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                      Coursework
                    </h4>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {e.coursework.map((c) => (
                        <li
                          key={c}
                          className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-1 text-xs text-zinc-300"
                        >
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
