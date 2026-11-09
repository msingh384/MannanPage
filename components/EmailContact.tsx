"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { site } from "@/data/site";

export default function EmailContact() {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  useEffect(() => {
    if (status === "idle") return;
    const timeout = window.setTimeout(() => setStatus("idle"), 3000);
    return () => window.clearTimeout(timeout);
  }, [status]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <a
          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(site.email)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Email ${site.email} in Gmail (opens in a new tab)`}
          className="group inline-flex items-center gap-2 rounded-full bg-zinc-50 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-white"
        >
          <Mail size={16} />
          {site.email}
          <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
        <button
          type="button"
          onClick={copyEmail}
          aria-label="Copy email address"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-xs text-zinc-300 transition hover:border-white/20 hover:text-white"
        >
          {status === "copied" ? <Check size={14} /> : <Copy size={14} />}
          {status === "copied" ? "Copied" : "Copy email"}
        </button>
      </div>
      <p className="mt-3 text-xs text-zinc-500">
        Opens Gmail · <a href={`mailto:${site.email}`} className="text-zinc-400 underline underline-offset-4 hover:text-zinc-200">Use your email app</a>
      </p>
      <p role="status" className="mt-1 text-xs text-zinc-400">
        {status === "copied" ? "Email address copied." : status === "error" ? `Copy unavailable. Email me at ${site.email}.` : ""}
      </p>
    </div>
  );
}
