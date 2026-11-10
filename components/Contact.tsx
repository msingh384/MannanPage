import { ArrowUpRight } from "lucide-react";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { site } from "@/data/site";
import EmailContact from "./EmailContact";

export default function Contact() {
  return (
    <section id="contact" className="editorial-section contact-section">
      <Container>
        <SectionHeading eyebrow="05" title="Contact" />
        <Reveal y={28}>
          <div className="contact-layout">
            <div>
              <EmailContact />
              <div className="contact-socials">
                <a href={site.socials.github} target="_blank" rel="noreferrer">GitHub<ArrowUpRight size={13} /></a>
                <a href={site.socials.linkedin} target="_blank" rel="noreferrer">LinkedIn<ArrowUpRight size={13} /></a>
                <a href={site.resumeUrl} target="_blank" rel="noreferrer">Resume<ArrowUpRight size={13} /></a>
              </div>
            </div>
            <ArrowUpRight className="contact-symbol" aria-hidden="true" strokeWidth={0.7} />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
