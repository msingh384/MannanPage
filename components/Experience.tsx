import { ArrowUpRight, Plus } from "lucide-react";
import { experiences } from "@/data/site";
import ExperienceTimeline from "./ExperienceTimeline";

export default function Experience() {
  return (
    <section id="experience" className="shell split-section" aria-labelledby="experience-title">
      <div className="experience-heading"><h2 id="experience-title">Experience<span>.</span></h2></div>
      <ExperienceTimeline>
        {experiences.map(experience => (
          <li key={experience.company} className="experience-entry">
            <span className="experience-marker" aria-hidden="true" />
            <article className="experience-row">
              <p className="label">{experience.period} · {experience.location}</p>
              <h3>{experience.link ? <a href={experience.link} target="_blank" rel="noreferrer">{experience.company} <ArrowUpRight size={19} aria-hidden="true" /></a> : experience.company}</h3>
              <p className="role">{experience.role}</p>
              <p>{experience.description}</p>
              <p className="experience-contribution">{experience.contribution}</p>
              <details>
                <summary><Plus size={15} aria-hidden="true" /> Role details</summary>
                <ul className="highlights">{experience.highlights.map(item => <li key={item}>{item}</li>)}</ul>
                <ul className="tags" aria-label="Technologies">{experience.stack.map(item => <li key={item}>{item}</li>)}</ul>
              </details>
            </article>
          </li>
        ))}
      </ExperienceTimeline>
    </section>
  );
}
