import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const runtime = "edge";
export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#08080b",
          backgroundImage:
            "radial-gradient(circle at 25% 0%, rgba(139,92,246,0.35) 0%, transparent 55%), radial-gradient(circle at 100% 100%, rgba(34,211,238,0.18) 0%, transparent 55%)",
          color: "#f4f4f5",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica",
        }}
      >
        {/* top row — monogram + handle */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background:
                "linear-gradient(135deg, #8b5cf6 0%, #6366f1 55%, #22d3ee 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: -0.5,
              boxShadow: "0 0 0 1px rgba(255,255,255,0.1)",
            }}
          >
            MR
          </div>
          <div
            style={{
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: 16,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#a1a1aa",
            }}
          >
            mannanrajsingh.vercel.app
          </div>
        </div>

        {/* main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 84,
              lineHeight: 1.05,
              fontWeight: 600,
              letterSpacing: -3,
              maxWidth: 1000,
            }}
          >
            <span>{site.name}</span>
          </div>
          <div
            style={{
              fontSize: 36,
              lineHeight: 1.25,
              fontWeight: 400,
              letterSpacing: -0.8,
              color: "#a1a1aa",
              maxWidth: 900,
            }}
          >
            {site.role} · Georgia Tech CS · Amazon Intern
          </div>
        </div>

        {/* bottom — status pill */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#34d399",
              boxShadow: "0 0 16px #34d399",
            }}
          />
          <div
            style={{
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: 16,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#d4d4d8",
            }}
          >
            {site.status.label}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
