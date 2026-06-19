"use client";

import { ArrowUpRight, Sparkles } from "lucide-react";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { Spotlight } from "./ui/Spotlight";
import { GithubIcon } from "./ui/Icons";
import { projects, type Project } from "@/data/site";
import { cn } from "@/lib/utils";

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="03 · Projects"
          title="Things I've built."
          description="A mix of school projects, side projects, and weekend experiments. Click through for code or live demos."
        />

        {featured.length > 0 && (
          <div
            className={cn(
              "mt-14 grid gap-5 lg:gap-6",
              featured.length === 1 ? "grid-cols-1" : "lg:grid-cols-2",
            )}
          >
            {featured.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <FeaturedCard project={p} />
              </Reveal>
            ))}
          </div>
        )}

        {others.length > 0 && (
          <div
            className={cn(
              "grid gap-5 sm:grid-cols-2 lg:gap-6",
              featured.length > 0 ? "mt-5 lg:mt-6" : "mt-14",
            )}
          >
            {others.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

function FeaturedCard({ project }: { project: Project }) {
  return (
    <article className="card-glow group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-7 transition hover:border-white/15 sm:p-8">
      <Spotlight
        size={680}
        color="rgba(139, 92, 246, 0.28)"
        accent="rgba(34, 211, 238, 0.14)"
      />
      {/* gradient halo on hover */}
      <div className="pointer-events-none absolute -inset-x-20 -top-32 h-64 bg-[radial-gradient(ellipse_at_center,_rgba(139,92,246,0.18)_0%,_transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="grid size-11 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-violet-500/40 via-indigo-500/30 to-cyan-400/25 text-zinc-50 shadow-inner"
            aria-hidden
          >
            <span className="font-mono text-[11px] font-semibold">
              {project.title
                .split(" ")
                .slice(0, 2)
                .map((w) => w[0])
                .join("")}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="inline-flex w-fit items-center gap-1 rounded-full border border-violet-400/20 bg-violet-400/10 px-2 py-0.5 text-[10px] font-mono font-medium uppercase tracking-[0.18em] text-violet-300">
              <Sparkles size={9} />
              Featured
            </span>
            <h3 className="mt-1.5 text-xl font-semibold tracking-tight text-zinc-50 sm:text-2xl">
              {project.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-zinc-400">
          {project.github && (
            <CardIcon
              href={project.github}
              label="GitHub repo"
              icon={<GithubIcon size={15} />}
            />
          )}
          {project.demo && (
            <CardIcon
              href={project.demo}
              label="Live demo"
              icon={<ArrowUpRight size={15} />}
            />
          )}
        </div>
      </div>

      <p className="mt-5 text-base font-medium text-zinc-200">{project.blurb}</p>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400 sm:text-[15px]">
        {project.description}
      </p>

      <ul className="mt-6 flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <li
            key={s}
            className="rounded-md border border-white/[0.08] bg-white/[0.04] px-2 py-1 text-xs text-zinc-300"
          >
            {s}
          </li>
        ))}
      </ul>
    </article>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card-glow group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition hover:border-white/15 hover:bg-white/[0.035] sm:p-7">
      <Spotlight
        size={480}
        color="rgba(139, 92, 246, 0.22)"
        accent="rgba(99, 102, 241, 0.10)"
      />
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent opacity-0 transition group-hover:opacity-100" />

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="grid size-10 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-violet-500/30 via-indigo-500/20 to-cyan-400/20 text-zinc-200 shadow-inner"
            aria-hidden
          >
            <span className="font-mono text-xs">
              {project.title
                .split(" ")
                .slice(0, 2)
                .map((w) => w[0])
                .join("")}
            </span>
          </div>
          <h3 className="text-lg font-semibold tracking-tight text-zinc-50 sm:text-xl">
            {project.title}
          </h3>
        </div>

        <div className="flex items-center gap-1.5 text-zinc-400">
          {project.github && (
            <CardIcon
              href={project.github}
              label="GitHub repo"
              icon={<GithubIcon size={15} />}
            />
          )}
          {project.demo && (
            <CardIcon
              href={project.demo}
              label="Live demo"
              icon={<ArrowUpRight size={15} />}
            />
          )}
        </div>
      </div>

      <p className="mt-4 text-sm font-medium text-zinc-300">{project.blurb}</p>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
        {project.description}
      </p>

      <ul className="mt-6 flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <li
            key={s}
            className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-xs text-zinc-300"
          >
            {s}
          </li>
        ))}
      </ul>
    </article>
  );
}

function CardIcon({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="grid size-8 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.02] transition hover:border-white/20 hover:bg-white/[0.06] hover:text-zinc-100"
    >
      {icon}
    </a>
  );
}
