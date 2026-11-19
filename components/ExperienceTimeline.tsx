"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function ExperienceTimeline({ children }: { children: ReactNode }) {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const markers = Array.from(list.querySelectorAll<HTMLElement>(".experience-marker"));
    if (markers.length === 0) return;

    let frame = 0;
    let active = -1;

    function update() {
      frame = 0;
      const first = markers[0].getBoundingClientRect();
      const last = markers[markers.length - 1].getBoundingClientRect();
      const trigger = window.innerHeight * 0.53;
      const start = first.top + first.height / 2;
      const span = Math.max(0, last.top + last.height / 2 - start);
      const progress = span ? Math.max(0, Math.min(1, (trigger - start) / span)) : 0;
      const next = markers.findLastIndex(marker => {
        const { top, height } = marker.getBoundingClientRect();
        return top + height / 2 <= trigger;
      });

      list?.style.setProperty("--timeline-length", `${span}px`);
      list?.style.setProperty("--timeline-progress", String(progress));

      if (next === active) return;
      markers[active]?.parentElement?.removeAttribute("data-active");
      markers[next]?.parentElement?.setAttribute("data-active", "");
      active = next;
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    const resize = new ResizeObserver(schedule);
    resize.observe(list);
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <ol ref={listRef} className="experience-list">
      {children}
    </ol>
  );
}
