"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal";

type Props = { eyebrow: string; title: string; className?: string };

export function SectionHeading({ eyebrow, title, className = "" }: Props) {
  const reduced = useReducedMotion();
  return (
    <Reveal y={0} className={`section-heading ${className}`}>
      <motion.span aria-hidden="true" className="heading-rule" variants={reduced ? {} : { hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] } } }} />
      <motion.h2 aria-label={title} variants={reduced ? {} : { visible: { transition: { staggerChildren: 0.025 } } }}>
        {Array.from(title + ".").map((letter, i) => (
          <span key={i} className={`heading-letter-mask${i === title.length ? " heading-period" : ""}`} aria-hidden="true">
            <motion.span variants={reduced ? {} : { hidden: { y: "110%" }, visible: { y: "0%", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }}>{letter === " " ? "\u00a0" : letter}</motion.span>
          </span>
        ))}
      </motion.h2>
      <span className="section-number">/{eyebrow}</span>
    </Reveal>
  );
}
