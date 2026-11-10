import { ArrowUpRight, Plus } from "lucide-react";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { experiences } from "@/data/site";

export default function Experience() {
  return (
    <section id="experience" className="editorial-section">
      <Container>
        <SectionHeading eyebrow="02" title="Experience" />
        <ol className="experience-list">
          {experiences.map((exp, i) => (
            <Reveal as="li" key={exp.company} y={28} delay={i * 0.05}>
              <details className="experience-entry">
                <summary>
                  <span className="entry-number">0{i + 1}</span>
                  <div className="entry-main"><h3>{exp.company}</h3><p>{exp.role}</p><span className="entry-date-mobile">{exp.period}</span></div>
                  <span className="entry-date">{exp.period}</span>
                  <span className="entry-toggle"><Plus size={18} aria-hidden="true" /></span>
                </summary>
                <div className="entry-content">
                  <p className="entry-location">{exp.location}</p>
                  <p>{exp.description}</p>
                  <ul>{exp.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul>
                  <p className="entry-stack">{exp.stack.join(" / ")}</p>
                  {exp.link && <a href={exp.link} target="_blank" rel="noreferrer" className="quiet-link">{exp.company}<ArrowUpRight size={13} /></a>}
                </div>
              </details>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
