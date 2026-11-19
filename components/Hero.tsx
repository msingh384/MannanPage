import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import YellowJacketClick from "./YellowJacketClick";
import AtlantaSkyline from "./AtlantaSkyline";

export default function Hero() {
  return (
    <section className="hero shell" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="label hero-role"><span className="hero-role-dot" aria-hidden="true" />{site.role} · <YellowJacketClick /></p>
        <h1 id="hero-title">Mannan<br />Raj <em>Singh.</em></h1>
        <p className="hero-description">I build software across backend systems, full-stack applications, and machine learning.</p>
        <div className="hero-actions">
          <a href="#projects" className="button button-primary">Explore my work <ArrowDown size={16} aria-hidden="true" /></a>
          <a href={site.resumeUrl} target="_blank" rel="noreferrer" className="text-link">View résumé <ArrowUpRight size={16} aria-hidden="true" /></a>
        </div>
      </div>
      <figure className="hero-portrait" data-pointer-surface>
        <div className="portrait-orbit" aria-hidden="true" />
        <div className="portrait-frame">
          <Image src="/avatar.jpg" alt={site.name} fill sizes="(max-width: 720px) 90vw, 36vw" preload />
        </div>
        <span className="portrait-glow" aria-hidden="true" />
        <figcaption className="label">
          <span>{site.location}</span>
          <AtlantaSkyline />
        </figcaption>
      </figure>
    </section>
  );
}
