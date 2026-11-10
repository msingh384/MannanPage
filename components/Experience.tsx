import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { experiences } from "@/data/site";

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow="02" title="Experience" />
        <ol className="mt-10 space-y-4">
          {experiences.map((exp, i) => (
            <Reveal
              as="li"
              key={exp.company + exp.period}
              x={i % 2 === 0 ? -36 : 36}
              y={24}
              delay={i * 0.06}
            >
              <details className="group/experience overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] transition-colors hover:border-white/20">
                <summary className="flex cursor-pointer list-none items-center gap-5 p-6 [&::-webkit-details-marker]:hidden sm:p-7">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold tracking-tight text-zinc-50">{exp.company}</h3>
                    <p className="mt-1 text-sm text-zinc-400">{exp.role}</p>
                    <p className="mt-2 text-xs text-zinc-500">{exp.period} · {exp.location}</p>
                  </div>
                  <ChevronDown size={18} aria-hidden="true" className="shrink-0 text-zinc-500 transition-transform duration-300 group-open/experience:rotate-180" />
                </summary>
                <div className="border-t border-white/[0.06] px-6 pt-5 pb-6 sm:px-7 sm:pb-7">
                  <p className="text-sm leading-7 text-zinc-300">{exp.description}</p>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-zinc-400">
                    {exp.highlights.map(highlight => (
                      <li key={highlight} className="flex gap-3">
                        <span aria-hidden="true" className="mt-3 size-1 shrink-0 rounded-full bg-zinc-600" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  <ul aria-label={`${exp.company} technologies`} className="mt-5 flex flex-wrap gap-1.5">
                    {exp.stack.map(technology => (
                      <li key={technology} className="rounded border border-white/[0.06] bg-white/[0.03] px-2 py-1 text-xs text-zinc-300">{technology}</li>
                    ))}
                  </ul>
                  {exp.link && (
                    <a href={exp.link} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-1 text-xs text-violet-300 hover:text-violet-200">
                      {exp.company}<ArrowUpRight size={13} />
                    </a>
                  )}
                </div>
              </details>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
