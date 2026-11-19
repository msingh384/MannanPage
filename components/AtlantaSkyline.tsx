import type { CSSProperties } from "react";

const buildings = [
  { name: "Westin Peachtree Plaza", height: 33, shape: "round" },
  { name: "Marriott Marquis", height: 25, shape: "flat" },
  { name: "Bank of America Plaza", height: 45, shape: "spire" },
  { name: "191 Peachtree Tower", height: 36, shape: "twin" },
  { name: "Georgia-Pacific Tower", height: 29, shape: "flat" },
  { name: "SunTrust Plaza", height: 38, shape: "spire" },
  { name: "Equitable Building", height: 23, shape: "flat" },
];

export default function AtlantaSkyline() {
  return (
    <span className="atlanta-window" role="img" aria-label="Stylized Atlanta skyline">
      <span className="atlanta-sky" />
      <span className="atlanta-buildings" aria-hidden="true">
        {buildings.map(({ name, height, shape }) => (
          <span key={name} className="atlanta-building" data-shape={shape} style={{ "--building-height": `${height}px` } as CSSProperties} />
        ))}
      </span>
    </span>
  );
}
