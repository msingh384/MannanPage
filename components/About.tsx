import { skills } from "@/data/site";

export default function About() {
  return (
    <section id="about" className="about-section" aria-labelledby="about-title">
      <div className="shell split-section">
        <div><h2 id="about-title" data-scroll-reveal>About me<span>.</span></h2></div>
        <div>
          <p className="about-lead" data-scroll-reveal>I’m a computer science senior at Georgia Tech.</p>
          <p>I got hooked on writing software in high school after deploying my first project. Since then, I’ve worked on backend services, full-stack apps, low-level systems, and applied machine learning.</p>
          <p>Outside of school and work, I play sports and golf. At Georgia Tech, I’m involved in Greek life, the Sikh Students Association, and student government.</p>
          <dl className="expertise-grid">
            {skills.map(group => <div key={group.group} data-scroll-reveal><dt className="label">{group.group}</dt><dd>{group.items.join(", ")}</dd></div>)}
          </dl>
        </div>
      </div>
    </section>
  );
}
