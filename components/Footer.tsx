import { ArrowUp } from "lucide-react";
import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <a href="#top">Back to top <ArrowUp size={15} aria-hidden="true" /></a>
      </div>
    </footer>
  );
}
