import About from "@/components/About";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import CustomCursor from "@/components/CustomCursor";
import ScrollMotion from "@/components/ui/ScrollMotion";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <ScrollMotion />
      <div className="reading-progress" aria-hidden="true" />
      <Hero />
      <Projects />
      <Experience />
      <About />
      <Education />
      <Contact />
    </>
  );
}
