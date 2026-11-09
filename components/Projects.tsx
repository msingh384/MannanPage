import { ArrowUpRight, ImageIcon } from "lucide-react";
import { Container } from "./ui/Container";
import { Reveal, RevealItem } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { projects, site, type Project } from "@/data/site";

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow="03 · Projects" title="Selected projects." />
        <div className="mt-10 grid auto-rows-fr gap-5 sm:gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal
              key={project.title}
              x={i % 2 === 0 ? -36 : 36}
              y={24}
              delay={(i % 2) * 0.06}
              className="h-full"
            >
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const hasRepo = project.github && project.github !== site.socials.github;

  return (
    <article className="flex h-full flex-col rounded-md border border-white/10 bg-[#0e0e14]/80 p-6 transition-colors duration-300 hover:border-white/25 sm:p-8">
      <RevealItem>
        <h3 className="text-xl font-semibold tracking-tight text-zinc-50">
          {project.title}
        </h3>
      </RevealItem>
      <RevealItem className="flex-1">
        <p className="mt-3 text-sm leading-7 text-zinc-400">{project.blurb}</p>
      </RevealItem>
      <RevealItem className="mt-5">
        <ul aria-label={`${project.title} technologies`} className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-zinc-500">
          {project.stack.slice(0, 4).map(technology => <li key={technology}>{technology}</li>)}
        </ul>
        <div className="mt-5 flex flex-wrap items-center gap-5 border-t border-white/[0.06] pt-4 text-xs text-zinc-300">
          <a
            href={hasRepo ? project.github : site.socials.github}
            target="_blank"
            rel="noreferrer"
            aria-label={hasRepo ? `View ${project.title} code on GitHub` : "View Mannan’s GitHub profile"}
            className="inline-flex items-center gap-2 transition hover:text-white"
          >
            {hasRepo ? "View code" : "GitHub profile"}<ArrowUpRight size={13} />
          </a>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition hover:text-white">
              Live demo<ArrowUpRight size={13} />
            </a>
          )}
          {project.image && (
            <a href={project.image} target="_blank" rel="noreferrer" aria-label={`Preview ${project.title} screenshot`} className="inline-flex items-center gap-2 transition hover:text-white">
              <ImageIcon size={13} />Preview
            </a>
          )}
        </div>
      </RevealItem>
    </article>
  );
}
