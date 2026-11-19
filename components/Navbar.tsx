import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <header className="site-header" id="top">
      <div className="shell header-inner">
        <Link className="wordmark" href="/" aria-label={`${site.name} home`}>M<span>R</span>S<span className="brand-dot">.</span></Link>
        <nav aria-label="Main navigation">
          <Link href="/#projects">Work</Link>
          <Link href="/#experience">Experience</Link>
          <Link href="/#about">About</Link>
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          <Link href="/#contact" className="header-contact">Contact <ArrowUpRight size={15} aria-hidden="true" /></Link>
        </div>
      </div>
    </header>
  );
}
