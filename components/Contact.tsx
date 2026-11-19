import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import EmailContact from "./EmailContact";
import ContactDrawing from "./ContactDrawing";

export default function Contact() {
  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-title" data-pointer-surface>
      <ContactDrawing>
        <div>
          <h2 id="contact-title" data-scroll-reveal>Let’s talk<span>.</span></h2>
          <EmailContact />
        </div>
        <div className="contact-links" data-scroll-reveal>
          <a href={site.socials.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={17} aria-hidden="true" /></a>
          <a href={site.socials.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={17} aria-hidden="true" /></a>
          <a href={site.resumeUrl} target="_blank" rel="noreferrer">Résumé <ArrowUpRight size={17} aria-hidden="true" /></a>
        </div>
      </ContactDrawing>
    </section>
  );
}
