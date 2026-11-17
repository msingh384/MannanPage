import { projects } from "@/data/site";
import ProjectCard from "./ProjectCard";

const covers = [
  { src: "/images/cinema.jpg", category: "AI / Film", position: "center 65%" },
  { src: "/images/nutrition.jpg", category: "AI / Nutrition", position: "center" },
  { src: "/images/phone.jpg", category: "Mobile / Automation", position: "center 60%" },
  { src: "/images/signal.jpg", category: "ML / Signal processing", position: "center" },
];

export default function Projects() {
  return (
    <section id="projects" className="work-section" aria-labelledby="projects-title">
      <div className="shell">
        <div className="section-intro">
          <div><p className="label">Portfolio</p><h2 id="projects-title">Selected work<span>.</span></h2></div>
          <p>Projects in applied AI, mobile automation, and signal processing.</p>
        </div>
        <div className="showcase-grid">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} cover={covers[i]} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
