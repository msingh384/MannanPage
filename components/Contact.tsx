import { Container } from "./ui/Container";
import { Reveal, RevealItem } from "./ui/Reveal";
import { GithubIcon, LinkedinIcon } from "./ui/Icons";
import { site } from "@/data/site";
import EmailContact from "./EmailContact";

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

            <RevealItem>
              <p className="font-mono text-xs tracking-[0.18em] text-zinc-500">05</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl md:text-5xl">
                Contact
              </h2>
            </RevealItem>
            <RevealItem>
              <EmailContact />

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
            </RevealItem>
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
