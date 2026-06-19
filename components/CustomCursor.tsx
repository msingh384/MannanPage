"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useState } from "react";

const DOT_SIZE = 10;
const INTERACTIVE_SELECTOR = 'a, button, [role="button"], [data-cursor="grow"]';

/**
 * Custom cursor — single colored dot.
 * - Small violet/indigo gradient dot at the cursor position
 * - Snappy spring follow (almost no lag)
 * - Scales up + glows brighter on hover of interactive elements
 * - Shrinks slightly on mousedown for click feedback
 * - Hides on touch / coarse-pointer devices and respects reduced-motion
 * - Native cursor is hidden via .has-custom-cursor on <html>
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);

  // Center the dot by subtracting half its size before passing to spring
  const dotRawX = useTransform(mouseX, (v) => v - DOT_SIZE / 2);
  const dotRawY = useTransform(mouseY, (v) => v - DOT_SIZE / 2);

  // Snappy spring: very little lag
  const dotX = useSpring(dotRawX, { damping: 30, stiffness: 900, mass: 0.2 });
  const dotY = useSpring(dotRawY, { damping: 30, stiffness: 900, mass: 0.2 });

  // Detect hover-capable + reduced-motion
  useEffect(() => {
    const hoverable = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(hoverable.matches && !reduced.matches);
    update();
    hoverable.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      hoverable.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  // Mount listeners + toggle native cursor hiding
  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null;
      if (t?.closest?.(INTERACTIVE_SELECTOR)) setHovering(true);
    };
    const onOut = (e: MouseEvent) => {
      const t = e.target as Element | null;
      const r = e.relatedTarget as Element | null;
      const wasInteractive = !!t?.closest?.(INTERACTIVE_SELECTOR);
      const stillInteractive = !!r?.closest?.(INTERACTIVE_SELECTOR);
      if (wasInteractive && !stillInteractive) setHovering(false);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [enabled, mouseX, mouseY, visible]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full"
      style={{
        x: dotX,
        y: dotY,
        width: DOT_SIZE,
        height: DOT_SIZE,
        opacity: visible ? 1 : 0,
        background:
          "radial-gradient(circle, #ddd6fe 0%, #8b5cf6 55%, #6366f1 100%)",
        boxShadow: hovering
          ? "0 0 24px rgba(139, 92, 246, 0.95), 0 0 8px rgba(196, 181, 253, 1)"
          : "0 0 14px rgba(139, 92, 246, 0.75), 0 0 4px rgba(196, 181, 253, 0.9)",
        transition: "opacity 200ms ease, box-shadow 220ms ease",
      }}
      animate={{
        scale: pressed ? 0.6 : hovering ? 1.7 : 1,
      }}
      transition={{ type: "spring", damping: 22, stiffness: 500 }}
    />
  );
}
