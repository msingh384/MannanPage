import { Plus } from "lucide-react";
import { education } from "@/data/site";

export default function Education() {
  return (
    <section id="education" className="shell split-section" aria-labelledby="education-title">
      <div><h2 id="education-title" data-scroll-reveal>Education<span>.</span></h2></div>
      <div>
        {education.map(item => (
          <article key={item.school} className="experience-row" data-scroll-reveal>
            <p className="label">{item.period} · {item.location}</p>
            <h3>{item.school}</h3>
            <p className="role">{item.degree}{item.gpa && ` · ${item.gpa} GPA`}</p>
            <ul className="highlights">{item.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul>
            <details>
              <summary><Plus size={15} aria-hidden="true" /> Coursework</summary>
              <ul className="tags">{item.coursework.map(course => <li key={course}>{course}</li>)}</ul>
            </details>
          </article>
        ))}
      </div>
    </section>
  );
}
