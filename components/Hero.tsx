"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Mail } from "lucide-react";
import { Container } from "./ui/Container";
import { GithubIcon, LinkedinIcon } from "./ui/Icons";
import { site } from "@/data/site";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32"
    >
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid bg-grid-fade" />
        <div className="absolute left-1/2 top-[-30%] aspect-square w-[110%] -translate-x-1/2 glow-conic opacity-70" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <Container>
        <div className="flex flex-col items-start gap-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-zinc-300 backdrop-blur"
          >
            <span className="relative inline-block size-1.5 rounded-full bg-emerald-400 text-emerald-400 pulse-dot" />
            <span className="font-mono uppercase tracking-[0.18em]">
              {site.status.label}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            className="text-balance text-5xl font-semibold tracking-[-0.03em] text-zinc-50 sm:text-6xl md:text-7xl lg:text-[5.5rem] lg:leading-[1.02]"
          >
            <span className="text-zinc-400">Hey, I&apos;m </span>
            <span className="gradient-text">{site.name}.</span>
            <span className="mt-2 block text-zinc-400">
              I build software that&apos;s{" "}
              <span className="text-zinc-50">fast</span>,{" "}
              <span className="text-zinc-50">thoughtful</span>, and{" "}
              <span className="text-zinc-50">robust</span>.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="max-w-xl text-pretty text-base leading-relaxed text-zinc-400 sm:text-lg"
          >
            CS undergrad at <Highlight>Georgia Tech</Highlight>, currently
            interning at <Highlight>Amazon</Highlight>. I care about clean
            systems, sharp UI, and shipping things people actually want to use.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            className="flex flex-wrap items-center gap-3"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-zinc-50 px-5 py-2.5 text-sm font-semibold text-zinc-950 shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_8px_30px_rgba(139,92,246,0.25)] transition hover:bg-white"
            >
              Get in touch
              <ArrowUpRight
                size={16}
                className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-zinc-200 backdrop-blur transition hover:border-white/20 hover:bg-white/[0.06]"
            >
              View projects
              <ArrowDown
                size={15}
                className="transition group-hover:translate-y-0.5"
              />
            </a>

            <div className="ml-1 flex items-center gap-1">
              <SocialIcon
                href={site.socials.github}
                label="GitHub"
                icon={<GithubIcon size={16} />}
              />
              <SocialIcon
                href={site.socials.linkedin}
                label="LinkedIn"
                icon={<LinkedinIcon size={16} />}
              />
              <SocialIcon
                href={`mailto:${site.email}`}
                label="Email"
                icon={<Mail size={16} />}
              />
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Subtle scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to next section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-zinc-500 transition hover:text-zinc-300 sm:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.25em]">
          Scroll
        </span>
        <span className="relative grid size-7 place-items-center overflow-hidden rounded-full border border-white/10">
          <motion.span
            animate={{ y: [-8, 8, -8] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="block size-1 rounded-full bg-zinc-300"
          />
        </span>
      </motion.a>
    </section>
  );
}

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative font-medium text-zinc-100">
      {children}
      <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-gradient-to-r from-violet-400/60 via-indigo-400/60 to-cyan-400/60" />
    </span>
  );
}

function SocialIcon({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
      className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-zinc-50"
    >
      {icon}
    </a>
  );
}
