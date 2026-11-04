"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

export function Reveal({
  children,
  delay = 0,
  y = 32,
  className,
}: Props) {
  const element = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: element,
    offset: ["start end", "start 0.65"],
  });
  // Keep staggered cards tied to scrolling, rather than a timed entrance.
  const start = Math.min(delay, 0.2);
  const translateY = useTransform(scrollYProgress, [start, 1], [y, 0]);
  const smoothY = useSpring(translateY, { stiffness: 220, damping: 32, mass: 0.4 });
  const opacity = useTransform(scrollYProgress, [start, 0.85], [0.35, 1]);

  return (
    <motion.div
      ref={element}
      className={className}
      style={reducedMotion ? undefined : { y: smoothY, opacity }}
    >
      {children}
    </motion.div>
  );
}
