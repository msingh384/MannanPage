"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { site, type Project } from "@/data/site";

type Cover = { src: string; category: string; position: string };

export default function ProjectCard({ project, cover, index }: { project: Project; cover: Cover; index: number }) {
  const media = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [hovering, setHovering] = useState(false);
  const [opened, setOpened] = useState(false);
  const reduced = useReducedMotion();
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const { scrollYProgress } = useScroll({ target: media, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);
  const hasRepo = project.github && project.github !== site.socials.github;
  const href = hasRepo ? project.github : site.socials.github;

  useEffect(() => {
    if (!opened) return;
    const previous = document.body.style.overflowY;
    document.body.style.overflowY = "hidden";
    return () => { document.body.style.overflowY = previous; };
  }, [opened]);

  const openDetails = () => {
    setHovering(false);
    dialog.current?.showModal();
    setOpened(true);
  };

  return (
    <article>
      <motion.button
        ref={media}
        type="button"
        className="project-shot"
        aria-label={`Explore ${project.title}`}
        aria-haspopup="dialog"
        initial={reduced ? false : { clipPath: "inset(0 0 18% 0)", opacity: 0.4 }}
        whileInView={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
        viewport={{ amount: 0.1, once: false }}
        transition={{ duration: reduced ? 0 : 0.85, ease: [0.22, 1, 0.36, 1] }}
        onClick={openDetails}
        onPointerMove={event => {
          if (event.pointerType !== "mouse" || reduced) return;
          const rect = event.currentTarget.getBoundingClientRect();
          cursorX.set(event.clientX - rect.left);
          cursorY.set(event.clientY - rect.top);
          setHovering(true);
        }}
        onPointerLeave={() => setHovering(false)}
      >
        <motion.span className="project-image-layer" style={reduced ? undefined : { y: imageY }}>
          <Image src={cover.src} alt="" fill sizes="(max-width: 767px) 100vw, 45vw" style={{ objectPosition: cover.position }} />
        </motion.span>
        <span className="shot-index">0{index + 1}</span>
        <span className="shot-category">{cover.category}</span>
        <span className="shot-arrow"><ArrowUpRight size={24} /></span>
        {!reduced && (
          <motion.span className="shot-follower" aria-hidden="true" style={{ x: cursorX, y: cursorY }} animate={{ opacity: hovering ? 1 : 0, scale: hovering ? 1 : 0.7 }} transition={{ duration: 0.2 }}>
            Explore<ArrowUpRight size={14} />
          </motion.span>
        )}
      </motion.button>
      <div className="project-meta">
        <h3><button type="button" onClick={openDetails} aria-haspopup="dialog">{project.title}</button></h3>
        <p>{project.blurb}</p>
        <div className="project-bottom">
          <span>{project.stack.slice(0, 3).join(" / ")}</span>
          <div><button type="button" onClick={openDetails}>Explore ↗</button><a href={href} target="_blank" rel="noreferrer">{hasRepo ? "Code" : "GitHub profile"} ↗</a></div>
        </div>
      </div>
      <dialog
        ref={dialog}
        className="project-dialog"
        aria-labelledby={`project-title-${index}`}
        onClose={() => setOpened(false)}
        onClick={event => { if (event.target === dialog.current) dialog.current.close(); }}
      >
        <div className="project-dialog-panel">
          <div className="dialog-toolbar"><span>{cover.category}</span><button type="button" onClick={() => dialog.current?.close()} aria-label="Close project details" autoFocus><X size={20} /></button></div>
          <div className="dialog-cover"><Image src={cover.src} alt="" fill sizes="(max-width: 767px) 100vw, 800px" style={{ objectPosition: cover.position }} /></div>
          <div className="dialog-copy">
            <span className="small-label">PROJECT / 0{index + 1}</span>
            <h2 id={`project-title-${index}`}>{project.title}</h2>
            <p>{project.description}</p>
            <ul aria-label="Technologies">{project.stack.map(technology => <li key={technology}>{technology}</li>)}</ul>
            {project.image && <figure><Image src={project.image} alt={project.imageAlt ?? `${project.title} application`} width={2048} height={1139} sizes="(max-width: 767px) 100vw, 750px" /><figcaption>Inside {project.title}</figcaption></figure>}
            <a href={href} target="_blank" rel="noreferrer" className="dialog-cta">{hasRepo ? "View the code" : "Visit GitHub profile"}<ArrowUpRight size={16} /></a>
            {project.demo && <a href={project.demo} target="_blank" rel="noreferrer" className="quiet-link">Live demo ↗</a>}
          </div>
        </div>
      </dialog>
    </article>
  );
}
