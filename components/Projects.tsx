"use client";

import { ArrowUpRight } from "lucide-react";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { GithubIcon } from "./ui/Icons";
import { projects, type Project } from "@/data/site";
import { cn } from "@/lib/utils";

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="03 · Projects"
          title="Things I've built."
          description="A mix of school projects, side projects, and weekend experiments. Click through for code or live demos."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:gap-6">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      className={cn(
        "card-glow group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition hover:border-white/15 hover:bg-white/[0.035] sm:p-7",
        project.featured && "sm:col-span-2",
      )}
    >
      {/* Top accent gradient on hover */}
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
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub repo"
              className="grid size-8 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.02] transition hover:border-white/20 hover:bg-white/[0.06] hover:text-zinc-100"
            >
              <GithubIcon size={15} />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              aria-label="Live demo"
              className="grid size-8 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.02] transition hover:border-white/20 hover:bg-white/[0.06] hover:text-zinc-100"
            >
              <ArrowUpRight size={15} />
            </a>
          )}
        </div>
      </div>

      <p className="mt-4 text-sm font-medium text-zinc-300">{project.blurb}</p>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
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
