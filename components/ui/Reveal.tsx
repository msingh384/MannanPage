"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

type Props = {
  children: ReactNode;
  delay?: number;
  x?: number;
  y?: number;
  className?: string;
  as?: "div" | "li";
};

/** Reveal once, then leave the content stable and fully readable. */
export function Reveal({
  children,
  delay = 0,
  x = 0,
  y = 26,
  className,
  as = "div",
}: Props) {
  const reducedMotion = useReducedMotion();
  const Element = as === "li" ? motion.li : motion.div;
  const variants: Variants = {
    hidden: { opacity: 0, x, y },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.7,
        ease,
        delay,
        delayChildren: delay + 0.06,
        staggerChildren: 0.075,
      },
    },
  };

  return (
    <Element
      className={className}
      initial={reducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.08, margin: "0px 0px -40px 0px" }}
      variants={reducedMotion ? {} : variants}
    >
      {children}
    </Element>
  );
}

/** Inherits its parent's reveal so related pieces arrive in sequence. */
export function RevealItem({ children, className }: {
  children: ReactNode;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={reducedMotion ? {} : {
        hidden: { opacity: 0, y: 12 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
