import { cn } from "@/lib/utils";
import { Reveal, RevealItem } from "./Reveal";

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: Props) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <RevealItem>
        <p className="font-mono text-xs tracking-[0.18em] text-zinc-500">
          {eyebrow}
        </p>
      </RevealItem>
      <RevealItem>
        <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </RevealItem>
      {description && (
        <RevealItem>
          <p className="mt-4 text-balance text-base leading-relaxed text-zinc-400 sm:text-lg">
            {description}
          </p>
        </RevealItem>
      )}
    </Reveal>
  );
}
