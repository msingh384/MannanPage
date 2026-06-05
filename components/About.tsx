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
              eyebrow="01 · About"
              title="A quick intro."
              description="I'm a CS student who likes building tools that feel inevitable — software where you stop noticing the software."
            />
          </div>

          <Reveal className="space-y-5 text-pretty text-base leading-relaxed text-zinc-400 sm:text-lg lg:col-span-7">
            <p>
              I started writing code seriously in high school and got hooked
              after my first time deploying something real to the internet.
              Since then I've worked across the stack — backend services,
              full-stack apps, a bit of low-level systems, and increasingly
              applied ML.
            </p>
            <p>
              Right now I'm a Computer Science undergrad at{" "}
              <span className="text-zinc-100">Georgia Tech</span>, interning at{" "}
              <span className="text-zinc-100">Amazon</span> for the summer.
              Outside of school and work I'm usually shipping side projects,
              reading systems papers, or reviewing PRs for friends.
            </p>
            <p className="text-zinc-500">
              <span className="text-zinc-300">Quick placeholder section</span> —
              swap this prose with whatever feels right when you have your
              specifics ready.
            </p>

            <div className="!mt-10 grid gap-4 sm:grid-cols-2">
              {skills.map((group) => (
                <div
                  key={group.group}
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
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
