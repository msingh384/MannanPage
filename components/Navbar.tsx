"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, site } from "@/data/site";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    navLinks.forEach((link) => {
      const el = document.querySelector(link.href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-white/10 bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
        <Link
          href="#top"
          className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight"
          aria-label={`${site.name} — home`}
        >
          <span className="relative grid size-8 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-violet-500/40 via-indigo-500/30 to-cyan-400/30 shadow-lg shadow-violet-500/20 ring-1 ring-white/15 transition-transform group-hover:scale-105">
            <Image
              src="/avatar.jpg"
              alt={site.name}
              width={64}
              height={64}
              priority
              className="size-full object-cover"
            />
          </span>
          <span className="hidden text-zinc-100 sm:inline">{site.name}</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-sm transition-colors",
                    isActive
                      ? "bg-white/[0.06] text-zinc-50"
                      : "text-zinc-400 hover:text-zinc-100",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-sm font-medium text-zinc-200 transition hover:border-white/20 hover:bg-white/[0.08]"
          >
            Resume
            <span className="text-zinc-500 transition group-hover:translate-x-0.5 group-hover:text-zinc-300">
              ↗
            </span>
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          className="md:hidden rounded-md border border-white/10 bg-white/[0.04] p-2 text-zinc-300"
          onClick={() => setOpen((s) => !s)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden border-t border-white/10 bg-background/90 backdrop-blur-xl transition-[max-height] duration-300",
          open ? "max-h-80" : "max-h-0",
        )}
      >
        <ul className="px-6 py-3">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-2 py-2.5 text-sm text-zinc-300 hover:bg-white/[0.04] hover:text-zinc-50"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="block rounded-md px-2 py-2.5 text-sm text-zinc-300 hover:bg-white/[0.04] hover:text-zinc-50"
            >
              Resume ↗
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
