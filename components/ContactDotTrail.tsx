"use client";

import { useEffect, useRef } from "react";

const hold = 1000;
const fade = 450;

export default function ContactDotTrail() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const board = canvas.current;
    const section = board?.parentElement;
    const context = board?.getContext("2d");
    if (!board || !section || !context) return;

    const preference = window.matchMedia("(any-hover: hover) and (prefers-reduced-motion: no-preference)");
    const dots = new Map<number, { x: number; y: number; litAt: number }>();
    let previous: { x: number; y: number } | null = null;
    let spacing = 19;
    let width = 0;
    let height = 0;
    let frame = 0;
    let timer = 0;

    function render(now: number) {
      frame = 0;
      context!.clearRect(0, 0, width, height);
      let nextFade = Infinity;
      let fading = false;

      for (const [key, dot] of dots) {
        const age = now - dot.litAt;
        if (age >= hold + fade) {
          dots.delete(key);
          continue;
        }
        if (age >= hold) fading = true;
        else nextFade = Math.min(nextFade, hold - age);

        context!.globalAlpha = Math.min(1, (hold + fade - age) / fade);
        context!.beginPath();
        context!.arc((dot.x + .5) * spacing, (dot.y + .5) * spacing, 2.65, 0, Math.PI * 2);
        context!.fill();
      }

      if (fading) schedule();
      else if (Number.isFinite(nextFade)) timer = window.setTimeout(schedule, nextFade);
    }

    function schedule() {
      window.clearTimeout(timer);
      if (!frame) frame = requestAnimationFrame(render);
    }

    function reset() {
      previous = null;
      dots.clear();
      schedule();
    }

    const resize = new ResizeObserver(([entry]) => {
      ({ width, height } = entry.contentRect);
      spacing = parseFloat(getComputedStyle(board).getPropertyValue("--contact-dot-spacing")) || 19;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      board.width = Math.round(width * ratio);
      board.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.fillStyle = "#fff";
      reset();
    });
    resize.observe(board);

    function move(event: PointerEvent) {
      if (!preference.matches || event.pointerType === "touch" || !width || !height) return;

      const bounds = board!.getBoundingClientRect();
      const x = Math.floor((event.clientX - bounds.left) / spacing);
      const y = Math.floor((event.clientY - bounds.top) / spacing);
      const columns = Math.ceil(width / spacing);
      if (x < 0 || y < 0 || x >= columns || y >= Math.ceil(height / spacing)) return;

      const from = previous ?? { x, y };
      const steps = Math.max(1, Math.abs(x - from.x), Math.abs(y - from.y));
      const now = performance.now();

      for (let step = 1; step <= steps; step++) {
        const cellX = from.x + Math.round((x - from.x) * step / steps);
        const cellY = from.y + Math.round((y - from.y) * step / steps);
        dots.set(cellY * columns + cellX, { x: cellX, y: cellY, litAt: now });
      }
      previous = { x, y };
      schedule();
    }

    const leave = () => { previous = null; };
    section.addEventListener("pointermove", move, { passive: true });
    section.addEventListener("pointerleave", leave);
    window.addEventListener("scroll", leave, { passive: true });
    preference.addEventListener("change", reset);

    return () => {
      resize.disconnect();
      section.removeEventListener("pointermove", move);
      section.removeEventListener("pointerleave", leave);
      window.removeEventListener("scroll", leave);
      preference.removeEventListener("change", reset);
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, []);

  return <canvas ref={canvas} className="contact-dot-trail" aria-hidden="true" />;
}
