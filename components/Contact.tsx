import { ArrowUpRight, Mail } from "lucide-react";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { GithubIcon, LinkedinIcon } from "./ui/Icons";
import { site } from "@/data/site";

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <Container size="narrow">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-8 text-center sm:p-14">
            {/* Glow */}
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/15 blur-3xl" />
              <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />
            </div>

            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-300">
              05 · Contact
            </span>

            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl md:text-5xl">
              Let's build something together.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-pretty text-zinc-400">
              I'm open to internship chats, side project collabs, or just
              talking shop. The fastest way to reach me is email.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:${site.email}`}
                className="group inline-flex items-center gap-2 rounded-full bg-zinc-50 px-5 py-2.5 text-sm font-semibold text-zinc-950 shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_8px_30px_rgba(139,92,246,0.25)] transition hover:bg-white"
              >
                <Mail size={16} />
                {site.email}
                <ArrowUpRight
                  size={16}
                  className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>

            <div className="mt-6 flex items-center justify-center gap-1.5 text-zinc-300">
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
                href={site.resumeUrl}
                label="Resume"
                icon={<span className="text-[11px] font-semibold">CV</span>}
              />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
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
