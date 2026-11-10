"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { site } from "@/data/site";

export default function EmailContact() {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  useEffect(() => {
    if (status === "idle") return;
    const timeout = window.setTimeout(() => setStatus("idle"), 3000);
    return () => window.clearTimeout(timeout);
  }, [status]);

  const copy = async () => {
    try { await navigator.clipboard.writeText(site.email); setStatus("copied"); }
    catch { setStatus("error"); }
  };

  return (
    <div className="email-contact">
      <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(site.email)}`} target="_blank" rel="noopener noreferrer" className="email-address" aria-label={`Email ${site.email} in Gmail (opens in a new tab)`}>{site.email}</a>
      <div className="email-options">
        <a href={`mailto:${site.email}`}>Use email app ↗</a>
        <button type="button" onClick={copy}>{status === "copied" ? <Check size={12} /> : <Copy size={12} />}{status === "copied" ? "Copied" : "Copy address"}</button>
      </div>
      <p role="status" className="email-status">{status === "error" ? `Copy unavailable. Email me at ${site.email}.` : status === "copied" ? "Email address copied." : ""}</p>
    </div>
  );
}
