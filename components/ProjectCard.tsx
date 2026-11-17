"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { site, type Project } from "@/data/site";

type Cover = { src: string; category: string; position: string };

export default function ProjectCard({ project, cover, index }: { project: Project; cover: Cover; index: number }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const hasRepo = project.github && project.github !== site.socials.github;
  const href = project.github ?? site.socials.github;
  const titleId = `project-title-${index}`;

  return (
    <article className="project-card" data-scroll-reveal>
      <button type="button" className="project-shot" data-pointer-surface aria-label={`Explore ${project.title}`} aria-haspopup="dialog" onClick={() => dialog.current?.showModal()}>
        <Image src={cover.src} alt="" fill sizes="(max-width: 720px) 90vw, 45vw" style={{ objectPosition: cover.position }} />
        <span className="shot-glow" aria-hidden="true" />
        <span className="shot-arrow"><ArrowUpRight size={23} aria-hidden="true" /></span>
      </button>
      <div className="project-meta">
        <p className="label">{cover.category}</p>
        <h3>{project.title}</h3>
        <p>{project.blurb}</p>
        <div className="project-bottom">
          <button type="button" aria-haspopup="dialog" onClick={() => dialog.current?.showModal()}>Project details <ArrowUpRight size={14} aria-hidden="true" /></button>
          <a href={href} target="_blank" rel="noreferrer">{hasRepo ? "Code" : "GitHub profile"} <ArrowUpRight size={14} aria-hidden="true" /></a>
        </div>
      </div>
      <dialog ref={dialog} className="project-dialog" aria-labelledby={titleId} onClick={event => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}>
        <div className="project-dialog-panel">
          <div className="dialog-toolbar">
            <span className="label">{cover.category}</span>
            <button type="button" onClick={() => dialog.current?.close()} aria-label="Close project details" autoFocus><X size={22} /></button>
          </div>
          <h2 id={titleId}>{project.title}</h2>
          <p>{project.description}</p>
          <ul className="tags" aria-label="Technologies">{project.stack.map(technology => <li key={technology}>{technology}</li>)}</ul>
          {project.image && <figure><Image src={project.image} alt={project.imageAlt ?? `${project.title} application`} width={2048} height={1139} sizes="(max-width: 720px) 90vw, 650px" /><figcaption>Inside {project.title}</figcaption></figure>}
          <div className="hero-actions">
            <a href={href} target="_blank" rel="noreferrer" className="button button-primary">{hasRepo ? "View the code" : "Visit GitHub profile"} <ArrowUpRight size={16} aria-hidden="true" /></a>
            {project.demo && <a href={project.demo} target="_blank" rel="noreferrer" className="text-link">Live demo <ArrowUpRight size={16} aria-hidden="true" /></a>}
          </div>
        </div>
      </dialog>
    </article>
  );
}
