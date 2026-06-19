"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useState } from "react";

const RING_SIZE = 36;
const DOT_SIZE = 8;
const INTERACTIVE_SELECTOR = 'a, button, [role="button"], [data-cursor="grow"]';

/**
 * Custom cursor:
 * - Small violet/indigo dot at the exact cursor position
 * - Larger ring that lags behind with spring physics
 * - Ring expands and fills more on hover of interactive elements
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

  // Center the elements by subtracting half their size before passing to spring
  const ringRawX = useTransform(mouseX, (v) => v - RING_SIZE / 2);
  const ringRawY = useTransform(mouseY, (v) => v - RING_SIZE / 2);
  const dotRawX = useTransform(mouseX, (v) => v - DOT_SIZE / 2);
  const dotRawY = useTransform(mouseY, (v) => v - DOT_SIZE / 2);

  // Ring lags noticeably (springy / soft)
  const ringX = useSpring(ringRawX, { damping: 22, stiffness: 260, mass: 0.5 });
  const ringY = useSpring(ringRawY, { damping: 22, stiffness: 260, mass: 0.5 });

  // Dot is much snappier (almost no lag)
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
    <>
      {/* Ring: larger, lags behind, scales on hover of interactive elements */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full"
        style={{
          x: ringX,
          y: ringY,
          width: RING_SIZE,
          height: RING_SIZE,
          opacity: visible ? 1 : 0,
          transition: "opacity 200ms ease",
        }}
        animate={{
          scale: pressed ? 0.85 : hovering ? 1.7 : 1,
        }}
        transition={{ type: "spring", damping: 22, stiffness: 380 }}
      >
        <div
          className="size-full rounded-full"
          style={{
            border: "1.5px solid rgba(196, 181, 253, 0.55)",
            background: hovering
              ? "radial-gradient(circle, rgba(139, 92, 246, 0.22) 0%, rgba(34, 211, 238, 0.10) 60%, transparent 100%)"
              : "radial-gradient(circle, rgba(139, 92, 246, 0.10) 0%, transparent 70%)",
            boxShadow:
              "0 0 18px rgba(139, 92, 246, 0.35), inset 0 0 8px rgba(34, 211, 238, 0.12)",
            transition: "background 220ms ease, box-shadow 220ms ease",
          }}
        />
      </motion.div>

      {/* Dot: small, exact cursor position, fades while hovering interactive */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[101] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          width: DOT_SIZE,
          height: DOT_SIZE,
          opacity: visible ? (hovering ? 0 : 1) : 0,
          background:
            "radial-gradient(circle, #ddd6fe 0%, #8b5cf6 55%, #6366f1 100%)",
          boxShadow:
            "0 0 14px rgba(139, 92, 246, 0.75), 0 0 4px rgba(196, 181, 253, 0.9)",
          transition: "opacity 180ms ease",
        }}
        animate={{ scale: pressed ? 0.6 : 1 }}
        transition={{ type: "spring", damping: 22, stiffness: 600 }}
      />
    </>
  );
}
