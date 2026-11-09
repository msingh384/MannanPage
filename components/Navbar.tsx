"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navLinks, site } from "@/data/site";
import { cn } from "@/lib/utils";

const clamp = (n: number) => Math.max(0, Math.min(1, n));

export default function Navbar() {
  const [position, setPosition] = useState({ visible: false, active: 0, progress: navLinks.map(() => 0) });
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const mobilePanel = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const sections = navLinks.map(link => document.querySelector<HTMLElement>(link.href));
      if (sections.some(section => !section)) return;
      const scroll = window.scrollY;
      const probe = scroll + window.innerHeight * 0.4;
      const atBottom = scroll + window.innerHeight >= document.documentElement.scrollHeight - 4;
      const starts = sections.map(section => section!.getBoundingClientRect().top + scroll);
      const progress = sections.map((_, i) => {
        const end = starts[i + 1] ?? document.documentElement.scrollHeight - window.innerHeight * 0.6;
        return atBottom ? 1 : Math.round(clamp((probe - starts[i]) / Math.max(1, end - starts[i])) * 100);
      });
      const active = atBottom ? navLinks.length - 1 : Math.max(0, starts.findLastIndex(start => probe >= start));
      const visible = probe >= starts[0];
      setPosition(previous => previous.visible === visible && previous.active === active && previous.progress.every((value, i) => value === progress[i])
        ? previous : { visible, active, progress });
      if (!visible) setOpen(false);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    mobilePanel.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const total = Math.round(position.progress.reduce((sum, value) => sum + value, 0) / navLinks.length);
  const links = (mobile = false) => (
    <>
      <a href="#top" className="rail-name" onClick={() => setOpen(false)}>{site.name}<span>Back to top ↑</span></a>
      <ol
        className="rail-links"
        style={{ "--section-progress": Math.min(1, (position.active + position.progress[position.active] / 100) / (navLinks.length - 1)) } as CSSProperties}
      >
        {navLinks.map((link, i) => (
          <li key={link.href}>
            <a
              href={link.href}
              aria-current={position.active === i ? "location" : undefined}
              className={cn("rail-link", position.active === i && "is-active")}
              onClick={() => { setOpen(false); if (mobile) menuButton.current?.focus(); }}
            >
              <span aria-hidden="true" className={cn("rail-marker", i < position.active && "is-complete")} />
              <span className="rail-index">0{i + 1}</span>
              <span className="rail-label">{link.label}</span>
            </a>
          </li>
        ))}
      </ol>
      <div className="rail-footer">
        <a href={site.resumeUrl} target="_blank" rel="noreferrer">Resume<ArrowUpRight size={13} /></a>
        <div className="rail-reading" role="progressbar" aria-label="Page reading progress" aria-valuenow={total} aria-valuemin={0} aria-valuemax={100}>
          <span>0{position.active + 1} / 05</span><span>{total}%</span>
        </div>
      </div>
    </>
  );

  return (
    <>
      <aside className={cn("side-navigation", !position.visible && "navigation-hidden")} inert={!position.visible} aria-hidden={!position.visible}>
        <nav aria-label="Section navigation">{links()}</nav>
      </aside>
      <div className={cn("mobile-navigation", !position.visible && "navigation-hidden")} inert={!position.visible} aria-hidden={!position.visible}>
        <button
          ref={menuButton}
          type="button"
          className="mobile-menu-button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-section-menu"
          onClick={() => setOpen(value => !value)}
        >
          <span>{navLinks[position.active].label}</span>
          <span className="text-zinc-500">0{position.active + 1}/05</span>
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>
        <nav ref={mobilePanel} id="mobile-section-menu" aria-label="Mobile section navigation" className="mobile-section-panel" hidden={!open} inert={!open}>
          {links(true)}
        </nav>
      </div>
    </>
  );
}
