import { Container } from "./ui/Container";
import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <Container><div className="footer-line"><span>© {new Date().getFullYear()} {site.name}</span><a href="#top">Back to top ↑</a></div></Container>
    </footer>
  );
}
