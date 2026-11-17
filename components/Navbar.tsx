import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";

export default function Navbar() {
  return (
    <header className="site-header" id="top">
      <div className="shell header-inner">
        <a className="wordmark" href="/" aria-label={`${site.name} home`}>M<span>R</span>S<span className="brand-dot">.</span></a>
        <nav aria-label="Main navigation">
          <a href="/#projects">Work</a>
          <a href="/#experience">Experience</a>
          <a href="/#about">About</a>
        </nav>
        <a href="/#contact" className="header-contact">Contact <ArrowUpRight size={15} aria-hidden="true" /></a>
      </div>
    </header>
  );
}
