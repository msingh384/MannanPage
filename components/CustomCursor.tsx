"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

const interactive = 'a[href], button:not(:disabled), summary';
const spring = { stiffness: 420, damping: 32, mass: 0.55 };

export default function CustomCursor() {
  const ring = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-48);
  const y = useMotionValue(-48);
  const followX = useSpring(x, spring);
  const followY = useSpring(y, spring);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const cursor = ring.current;
    if (!cursor) return;

    let surface: HTMLElement | null = null;
    let visible = false;

    const hide = () => {
      visible = false;
      cursor.removeAttribute("data-visible");
      cursor.removeAttribute("data-over-link");
      cursor.removeAttribute("data-pressed");
      surface?.removeAttribute("data-pointer-active");
      surface = null;
    };

    const move = (event: PointerEvent) => {
      if (!media.matches || event.pointerType !== "mouse" || !(event.target instanceof Element)) return;
      if (event.target.closest("dialog")) {
        hide();
        return;
      }

      x.set(event.clientX);
      y.set(event.clientY);
      if (!visible) {
        followX.jump(event.clientX);
        followY.jump(event.clientY);
        cursor.setAttribute("data-visible", "");
        visible = true;
      }

      cursor.toggleAttribute("data-over-link", Boolean(event.target.closest(interactive)));
      const nextSurface = event.target.closest<HTMLElement>("[data-pointer-surface]");
      if (surface !== nextSurface) {
        surface?.removeAttribute("data-pointer-active");
        surface = nextSurface;
      }

      if (surface) {
        const bounds = surface.getBoundingClientRect();
        surface.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
        surface.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
        surface.setAttribute("data-pointer-active", "");
      }
    };

    const press = (event: PointerEvent) => {
      if (visible && event.pointerType === "mouse" && event.button === 0) cursor.setAttribute("data-pressed", "");
    };
    const release = () => cursor.removeAttribute("data-pressed");

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", press, { passive: true });
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", hide);
    window.addEventListener("blur", hide);
    window.addEventListener("scroll", hide, { passive: true });
    document.documentElement.addEventListener("pointerleave", hide);
    media.addEventListener("change", hide);

    return () => {
      hide();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", hide);
      window.removeEventListener("blur", hide);
      window.removeEventListener("scroll", hide);
      document.documentElement.removeEventListener("pointerleave", hide);
      media.removeEventListener("change", hide);
    };
  }, [x, y, followX, followY]);

  return <motion.div ref={ring} className="cursor-follower" style={{ x: followX, y: followY }} aria-hidden="true"><span /></motion.div>;
}
