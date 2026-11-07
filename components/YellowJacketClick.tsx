"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Celebration = {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

const sizes = [28, 34, 26];
const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

/** Small admission-inspired confetti; decorative and never blocks navigation. */
export default function YellowJacketClick() {
  const [celebration, setCelebration] = useState<Celebration | null>(null);
  const sequence = useRef(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      // Pointer clicks work anywhere; keyboard activations use the target's center.
      const rect = event.target.getBoundingClientRect();
      setCelebration({
        id: ++sequence.current,
        x: clamp(event.detail === 0 ? rect.left + rect.width / 2 : event.clientX, 32, window.innerWidth - 32),
        y: clamp(event.detail === 0 ? rect.top + rect.height / 2 : event.clientY, 32, window.innerHeight - 32),
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  if (!celebration) return null;
  const { id, x, y, width, height } = celebration;
  const vertical = y > height - 150 ? -1 : 1;

  return (
    <div className="yellow-jacket-overlay" aria-hidden="true">
      {(reducedMotion ? [32] : sizes).map((size, i, particles) => {
        const drift = (i - 1) * 50;
        const endX = clamp(x + drift, 28, width - 28) - x;
        const endY = clamp(y + (80 + i * 12) * vertical, 28, height - 28) - y;
        return (
          <motion.div
            key={`${id}-${i}`}
            className="yellow-jacket-flight"
            style={{ left: x, top: y, width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2 }}
            initial={{ opacity: 0, x: 0, y: 0, rotate: 0 }}
            animate={reducedMotion
              ? { opacity: [0, 1, 1, 0] }
              : {
                  opacity: [0, 1, 1, 0],
                  x: [0, endX * 0.35, endX * 0.8, endX],
                  y: [0, -8, endY * 0.5, endY],
                  rotate: [0, i % 2 ? 12 : -12, i % 2 ? -8 : 8, 0],
                }}
            transition={{ duration: reducedMotion ? 0.5 : 1.15, delay: reducedMotion ? 0 : i * 0.055, ease: "easeInOut", times: [0, 0.18, 0.7, 1] }}
            onAnimationComplete={i === particles.length - 1
              ? () => setCelebration(current => current?.id === id ? null : current)
              : undefined}
          >
            <svg viewBox="0 0 80 80" width="100%" height="100%" focusable="false">
              <g className={reducedMotion ? undefined : "yellow-jacket-wings"}>
                <ellipse cx="27" cy="25" rx="10" ry="15" transform="rotate(-30 27 25)" fill="#eef5ff" stroke="#c7d6e8" strokeWidth="1.5" />
                <ellipse cx="47" cy="24" rx="9" ry="14" transform="rotate(24 47 24)" fill="#eef5ff" stroke="#c7d6e8" strokeWidth="1.5" />
              </g>
              <path d="m17 52-7 4 8 3" fill="#20202b" />
              <ellipse cx="34" cy="50" rx="22" ry="17" fill="#f7c948" stroke="#252330" strokeWidth="2" />
              <path d="M24 36q-5 14 0 28m12-30q-5 15 0 32" fill="none" stroke="#252330" strokeWidth="6" />
              <path d="m31 65-2 5m14-5 3 4" stroke="#252330" strokeWidth="2" strokeLinecap="round" />
              <path d="m51 29-3-8m12 8 4-7" fill="none" stroke="#252330" strokeWidth="2" strokeLinecap="round" />
              <circle cx="48" cy="20" r="2.5" fill="#f7c948" />
              <circle cx="64" cy="21" r="2.5" fill="#f7c948" />
              <circle cx="56" cy="42" r="16" fill="#f7c948" stroke="#252330" strokeWidth="2" />
              <ellipse cx="51" cy="41" rx="2.4" ry="3.3" fill="#252330" />
              <ellipse cx="63" cy="41" rx="2.4" ry="3.3" fill="#252330" />
              <circle cx="51.7" cy="40" r=".8" fill="white" />
              <circle cx="63.7" cy="40" r=".8" fill="white" />
              <ellipse cx="47" cy="47" rx="3" ry="1.7" fill="#ef9c55" fillOpacity=".7" />
              <ellipse cx="67" cy="47" rx="3" ry="1.7" fill="#ef9c55" fillOpacity=".7" />
              <path d="M53 48q4 5 8 0" fill="none" stroke="#252330" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </motion.div>
        );
      })}
    </div>
  );
}
