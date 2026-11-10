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
  const opacity = useTransform(scrollYProgress, [0, 0.45, 1], [1, 0.9, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ["0svh", "-75svh"]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <section ref={section} id="top" className="landing">
      <div className="landing-stage">
        <motion.div
          className="landing-content"
          style={reducedMotion ? undefined : { opacity, y }}
        >
          <h1 className="landing-name" aria-label={site.name}><span>Mannan Raj</span><span>Singh</span></h1>
        </motion.div>
        <motion.a
          className="landing-scroll"
          href="#about"
          aria-label="Scroll to about me"
          style={reducedMotion ? undefined : { opacity: cueOpacity }}
        >
          <span className="scroll-track" aria-hidden="true"><span /></span>
          <span>Scroll to explore</span>
        </motion.a>
      </div>
    </section>
  );
}
