import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="shell missing-page">
      <p className="label">Error 404</p>
      <h1>Page unavailable<span>.</span></h1>
      <Link href="/" className="button button-primary"><ArrowLeft size={16} aria-hidden="true" /> Back home</Link>
    </section>
  );
}
