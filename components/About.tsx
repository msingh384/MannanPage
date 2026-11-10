import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { skills } from "@/data/site";

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="01"
              title="About"
            />
          </div>

          <div className="space-y-5 text-pretty text-base leading-relaxed text-zinc-400 sm:text-lg lg:col-span-7">
            <Reveal x={24} y={24}>
              <p>
                I started writing code seriously in high school and got hooked
                after my first time deploying something real to the internet.
                Since then I&apos;ve worked across the stack — backend services,
                full-stack apps, a bit of low-level systems, and increasingly
                applied ML.
              </p>
            </Reveal>
            <Reveal x={24} y={24}>
              <p>
                Right now I&apos;m a Computer Science senior at{" "}
                <span className="text-zinc-100">Georgia Tech</span>. I completed a
                Software Development Engineer internship at{" "}
                <span className="text-zinc-100">Amazon</span> in summer 2026,
                working on B2B Payments.
              </p>
            </Reveal>
            <Reveal x={24} y={24}>
              <p>
                Outside of school and work, I enjoy playing sports and getting out
                on the golf course. I&apos;m also involved around Georgia Tech
                through Greek life, the Sikh Students Association, and student
                government.
              </p>
            </Reveal>

            <div className="!mt-10 grid gap-4 sm:grid-cols-2">
              {skills.map((group, i) => (
                <Reveal
                  key={group.group}
                  x={i % 2 === 0 ? -28 : 28}
                  y={24}
                  className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5"
                >
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                    {group.group}
                  </h3>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-1 text-xs text-zinc-300"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
