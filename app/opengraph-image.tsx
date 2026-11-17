import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const runtime = "edge";
export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    <div style={{
      display: "flex", flexDirection: "column", justifyContent: "space-between",
      width: "100%", height: "100%", padding: 72, background: "#192820", color: "#f5f4ee",
    }}>
      <div style={{ display: "flex", color: "#d9ee7a", fontSize: 25 }}>MRS.</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", fontSize: 92, letterSpacing: -5 }}>{site.name}</div>
        <div style={{ display: "flex", color: "#d9ee7a", fontSize: 32 }}>{site.role} · Georgia Tech</div>
      </div>
      <div style={{ display: "flex", color: "#cad5cc", fontSize: 21 }}>{site.location}</div>
    </div>,
    size,
  );
}
