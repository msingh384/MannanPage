"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function YellowJacketClick() {
  const flight = useRef(0);
  const [activeFlight, setActiveFlight] = useState<number | null>(null);

  function launch() {
    setActiveFlight(++flight.current);
  }

  return (
    <span className="yellow-jacket-trigger">
      <button type="button" className="yellow-jacket-button" aria-label="Georgia Tech: launch a yellow jacket" onClick={launch}>
        Georgia Tech
      </button>
      {activeFlight !== null && (
        <motion.span
          key={activeFlight}
          className="yellow-jacket-flight"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.15, times: [0, 0.1, 0.83, 1] }}
          onAnimationComplete={() => setActiveFlight(current => current === activeFlight ? null : current)}
        >
        <svg viewBox="0 0 80 80" width="100%" height="100%" focusable="false">
          <g className="yellow-jacket-wings">
            <ellipse cx="27" cy="25" rx="10" ry="15" transform="rotate(-30 27 25)" fill="#eef5ff" stroke="#c7d6e8" strokeWidth="1.5" />
            <ellipse cx="47" cy="24" rx="9" ry="14" transform="rotate(24 47 24)" fill="#eef5ff" stroke="#c7d6e8" strokeWidth="1.5" />
          </g>
          <path d="m17 52-7 4 8 3" fill="#20202b" />
          <ellipse cx="34" cy="50" rx="22" ry="17" fill="#f7c948" stroke="#252330" strokeWidth="2" />
          <path d="M24 36q-5 14 0 28m12-30q-5 15 0 32" fill="none" stroke="#252330" strokeWidth="6" />
          <path d="m31 65-2 5m14-5 3 4" stroke="#252330" strokeWidth="2" strokeLinecap="round" />
          <path d="m51 29-3-8m12 8 4-7" fill="none" stroke="#252330" strokeWidth="2" strokeLinecap="round" />
          <circle cx="48" cy="20" r="2.5" fill="#f7c948" />
          <circle cx="64" cy="21" r="2.5" fill="#f7c948" />
          <circle cx="56" cy="42" r="16" fill="#f7c948" stroke="#252330" strokeWidth="2" />
          <ellipse cx="51" cy="41" rx="2.4" ry="3.3" fill="#252330" />
          <ellipse cx="63" cy="41" rx="2.4" ry="3.3" fill="#252330" />
          <circle cx="51.7" cy="40" r=".8" fill="white" />
          <circle cx="63.7" cy="40" r=".8" fill="white" />
          <ellipse cx="47" cy="47" rx="3" ry="1.7" fill="#ef9c55" fillOpacity=".7" />
          <ellipse cx="67" cy="47" rx="3" ry="1.7" fill="#ef9c55" fillOpacity=".7" />
          <path d="M53 48q4 5 8 0" fill="none" stroke="#252330" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
        </motion.span>
      )}
    </span>
  );
}
