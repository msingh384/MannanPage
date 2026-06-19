"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Soft cursor-following glow.
 * - Hidden on touch devices (no hover capability)
 * - Hidden if the user prefers reduced motion
 * - mix-blend-mode: plus-lighter brightens underlying content with a violet tint
 *   without washing out text legibility
 * - Spring physics give the trailing-light feel
 */
export default function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);

  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);

  // Trailing blob (slightly laggy)
  const blobX = useSpring(mouseX, { damping: 24, stiffness: 180, mass: 0.6 });
  const blobY = useSpring(mouseY, { damping: 24, stiffness: 180, mass: 0.6 });

  // Smaller leading dot (snappier, less lag)
  const dotX = useSpring(mouseX, { damping: 30, stiffness: 600, mass: 0.3 });
  const dotY = useSpring(mouseY, { damping: 30, stiffness: 600, mass: 0.3 });

  useEffect(() => {
    const hoverable = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => setEnabled(hoverable.matches && !reducedMotion.matches);
    update();
    hoverable.addEventListener("change", update);
    reducedMotion.addEventListener("change", update);
    return () => {
      hoverable.removeEventListener("change", update);
      reducedMotion.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [enabled, mouseX, mouseY, visible]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      style={{ mixBlendMode: "plus-lighter" }}
    >
      {/* Big trailing blob */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          x: blobX,
          y: blobY,
          width: 520,
          height: 520,
          opacity: visible ? 1 : 0,
          background:
            "radial-gradient(circle, rgba(139,92,246,0.18) 0%, rgba(99,102,241,0.10) 28%, rgba(34,211,238,0.05) 55%, transparent 75%)",
          transition: "opacity 400ms ease",
          filter: "blur(2px)",
        }}
      />

      {/* Smaller leading core */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          x: dotX,
          y: dotY,
          width: 140,
          height: 140,
          opacity: visible ? 1 : 0,
          background:
            "radial-gradient(circle, rgba(196,181,253,0.45) 0%, rgba(165,180,252,0.18) 40%, transparent 75%)",
          transition: "opacity 250ms ease",
        }}
      />
    </div>
  );
}
