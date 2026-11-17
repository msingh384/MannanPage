import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import EmailContact from "./EmailContact";

export default function Contact() {
  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-title">
      <div className="shell contact-inner">
        <div>
          <h2 id="contact-title">Let’s talk<span>.</span></h2>
          <EmailContact />
        </div>
        <div className="contact-links">
          <a href={site.socials.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={17} aria-hidden="true" /></a>
          <a href={site.socials.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={17} aria-hidden="true" /></a>
          <a href={site.resumeUrl} target="_blank" rel="noreferrer">Résumé <ArrowUpRight size={17} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}
