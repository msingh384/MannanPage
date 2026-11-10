import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { education } from "@/data/site";

export default function Education() {
  return (
    <section id="education" className="editorial-section">
      <Container>
        <SectionHeading eyebrow="04" title="Education" />
        {education.map(e => (
          <Reveal key={e.school} y={28}>
            <div className="education-layout">
              <div>
                <p className="small-label">{e.period} / {e.location}</p>
                <h3>{e.school}</h3>
                <p className="education-degree">{e.degree}</p>
                <ul className="education-highlights">{e.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul>
              </div>
              {e.gpa && <div className="education-gpa"><span>{e.gpa.split(" / ")[0]}</span><p>GPA / 4.00</p></div>}
            </div>
            <details className="coursework">
              <summary>Coursework<span aria-hidden="true">+</span></summary>
              <p>{e.coursework.join(" / ")}</p>
            </details>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}
