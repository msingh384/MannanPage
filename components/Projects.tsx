import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
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
    <section id="projects" className="editorial-section">
      <Container>
        <SectionHeading eyebrow="03" title="Projects" />
        <div className="showcase-grid">
          {projects.map((project, i) => (
            <Reveal key={project.title} y={44} delay={(i % 2) * 0.08} className="showcase-item">
              <ProjectCard project={project} cover={covers[i]} index={i} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
