import Image from "next/image";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { skills } from "@/data/site";

export default function About() {
  return (
    <section id="about" className="editorial-section">
      <Container>
        <SectionHeading eyebrow="01" title="About" />
        <div className="about-grid">
          <div className="about-copy">
            <Reveal x={-24}>
              <p className="bio-lead">Computer Science senior at <span>Georgia Tech</span>, building across systems, full-stack, and applied ML.</p>
            </Reveal>
            <Reveal y={24}>
              <p>I started writing code seriously in high school and got hooked after deploying something real to the internet. Since then, I&apos;ve worked on backend services, full-stack apps, low-level systems, and increasingly, applied ML.</p>
              <p>In summer 2026, I completed a Software Development Engineer internship on <span>Amazon&apos;s B2B Payments</span> team.</p>
              <p>Outside of school and work, I play sports and golf. Around GT, I&apos;m involved in Greek life, the Sikh Students Association, and student government.</p>
            </Reveal>
          </div>
          <Reveal x={24} className="portrait-wrap">
            <Image src="/avatar.jpg" alt="Mannan Raj Singh" width={600} height={750} sizes="(max-width: 767px) 80vw, 30vw" className="portrait-image" />
            <div className="portrait-caption"><span>Mannan Raj Singh</span><span>Atlanta, GA</span></div>
          </Reveal>
        </div>
        <div className="expertise-grid">
          {skills.map((group, i) => (
            <Reveal key={group.group} delay={i * 0.04} y={24}>
              <h3>{group.group}</h3>
              <p>{group.items.join(" / ")}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
