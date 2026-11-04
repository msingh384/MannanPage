/** A fixed, decorative sky shared by every section. */
export default function SpaceBackground() {
  return (
    <div className="space-background" aria-hidden="true">
      <svg
        className="space-stars"
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        {Array.from({ length: 100 }, (_, i) => (
          <circle
            key={i}
            cx={((i * 719 + 137) % 1591) + 4}
            cy={((i * i * 127 + i * 337 + 71) % 991) + 4}
            r={i % 13 === 0 ? 1.1 : i % 3 === 0 ? 0.75 : 0.5}
            fill={i % 7 === 0 ? "#b8c5e8" : "#ffffff"}
            opacity={i % 13 === 0 ? 0.48 : i % 3 === 0 ? 0.26 : 0.14}
          />
        ))}
      </svg>
    </div>
  );
}
