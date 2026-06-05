import { Container } from "./ui/Container";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./ui/Icons";
import { site } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/[0.06] py-10">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
              © {year} {site.name}
            </p>
            <p className="mt-1 text-sm text-zinc-400">
              Built with Next.js, Tailwind, and a lot of coffee.
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <FooterIcon
              href={site.socials.github}
              label="GitHub"
              icon={<GithubIcon size={15} />}
            />
            <FooterIcon
              href={site.socials.linkedin}
              label="LinkedIn"
              icon={<LinkedinIcon size={15} />}
            />
            <FooterIcon
              href={`mailto:${site.email}`}
              label="Email"
              icon={<Mail size={15} />}
            />
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterIcon({
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
      className="grid size-8 place-items-center rounded-md border border-white/[0.08] bg-white/[0.02] text-zinc-400 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-zinc-100"
    >
      {icon}
    </a>
  );
}
