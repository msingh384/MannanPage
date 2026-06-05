import { ArrowUpRight } from "lucide-react";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { experiences } from "@/data/site";

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-32">
      {/* subtle accent line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <Container>
        <SectionHeading
          eyebrow="02 · Experience"
          title="Where I've been working."
          description="Internships, teaching, and the occasional side gig."
        />

        <ol className="relative mt-14 border-l border-white/[0.08]">
          {experiences.map((exp, i) => (
            <Reveal key={exp.company + exp.period} delay={i * 0.05}>
              <li className="group relative pb-12 pl-8 last:pb-0">
                {/* Timeline marker */}
                <span className="absolute -left-[5px] top-1.5 grid size-2.5 place-items-center rounded-full bg-zinc-950 ring-2 ring-white/20 transition group-hover:ring-violet-400/70">
                  <span className="size-1 rounded-full bg-violet-400" />
                </span>

                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition hover:border-white/15 hover:bg-white/[0.035] sm:p-8">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="text-lg font-semibold tracking-tight text-zinc-50 sm:text-xl">
                      {exp.role}{" "}
                      <span className="text-zinc-500">·</span>{" "}
                      {exp.link ? (
                        <a
                          href={exp.link}
                          target="_blank"
                          rel="noreferrer"
                          className="link-underline inline-flex items-center gap-1 text-violet-300 hover:text-violet-200"
                        >
                          {exp.company}
                          <ArrowUpRight size={14} className="opacity-70" />
                        </a>
                      ) : (
                        <span className="text-violet-300">{exp.company}</span>
                      )}
                    </h3>
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">
                      {exp.period}
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-zinc-500">{exp.location}</p>

                  <p className="mt-4 text-sm leading-relaxed text-zinc-300 sm:text-base">
                    {exp.description}
                  </p>

                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-zinc-400">
                    {exp.highlights.map((h, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span className="mt-2 inline-block size-1 shrink-0 rounded-full bg-zinc-600" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {exp.stack.map((s) => (
                      <li
                        key={s}
                        className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-1 text-xs text-zinc-300"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
