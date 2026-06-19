"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  size?: number;
  color?: string;
  className?: string;
};

/**
 * Drop inside any relatively-positioned card. Listens for mouse moves on the
 * parent and renders a radial gradient at the cursor position. Uses CSS
 * variables for performance (no React re-render on every mouse move).
 */
export function Spotlight({
  size = 480,
  color = "rgba(139, 92, 246, 0.12)",
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;

    if (typeof window !== "undefined") {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
      const fineHover = window.matchMedia("(hover: hover) and (pointer: fine)");
      if (reduced.matches || !fineHover.matches) return;
    }

    const onMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };
    const onEnter = () => setHovered(true);
    const onLeave = () => setHovered(false);

    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseenter", onEnter);
    parent.addEventListener("mouseleave", onLeave);
    return () => {
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseenter", onEnter);
      parent.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={[
        "pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        opacity: hovered ? 1 : 0,
        background: `radial-gradient(${size}px circle at var(--mx, 50%) var(--my, 50%), ${color}, transparent 45%)`,
      }}
    />
  );
}
