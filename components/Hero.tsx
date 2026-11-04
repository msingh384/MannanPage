"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { site } from "@/data/site";

export default function Hero() {
  const section = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end end"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9], [1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -70]);

  return (
    <section ref={section} id="top" className="landing">
      <div className="landing-stage">
        <div className="landing-light" aria-hidden="true" />
        <motion.div
          className="landing-content"
          style={reducedMotion ? undefined : { opacity, y }}
        >
          <h1 className="landing-name">{site.name}</h1>
        </motion.div>
        <a className="landing-scroll" href="#about" aria-label="Scroll to about me">
          <span className="scroll-track" aria-hidden="true"><span /></span>
          <span>Scroll to explore</span>
        </a>
      </div>
    </section>
  );
}
