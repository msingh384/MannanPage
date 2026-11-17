"use client";

import { useEffect } from "react";

export default function ScrollMotion() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: no-preference)");
    if (!preference.matches || !("IntersectionObserver" in window) || typeof Element.prototype.animate !== "function") return;

    const animations = new Set<Animation>();
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);

        // Leave content already seen or reached via an anchor in its resting state.
        if (entry.boundingClientRect.top < window.innerHeight * 0.55) continue;

        const animation = entry.target.animate(
          [{ opacity: 0.28, translate: "0 25px" }, { opacity: 1, translate: "0 0" }],
          { duration: 650, easing: "cubic-bezier(.22, 1, .36, 1)" },
        );
        animations.add(animation);
        const forget = () => animations.delete(animation);
        animation.onfinish = forget;
        animation.oncancel = forget;
      }
    }, { rootMargin: "0px 0px -24px 0px" });

    document.querySelectorAll("[data-scroll-reveal]").forEach(element => observer.observe(element));

    const stop = () => {
      observer.disconnect();
      animations.forEach(animation => animation.cancel());
      animations.clear();
    };

    preference.addEventListener("change", stop);
    return () => {
      preference.removeEventListener("change", stop);
      stop();
    };
  }, []);

  return null;
}
