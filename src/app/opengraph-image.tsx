import { ImageResponse } from "next/og";

export const alt = "ARGILLA — Shaped by earth. Architectural ceramic surfaces, an independent design concept.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", padding: "64px", background: "#e6dccd", color: "#26211d", flexDirection: "column", justifyContent: "space-between" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, letterSpacing: 4 }}><span>ARCHITECTURAL CERAMIC SURFACES</span><span>DESIGN CONCEPT</span></div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "column" }}><span style={{ fontSize: 150, letterSpacing: -8 }}>ARGILLA</span><span style={{ fontSize: 38 }}>Shaped by earth.</span></div>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}><div style={{ width: 82, height: 155, background: "#a85436" }} /><div style={{ width: 82, height: 225, background: "#b99a7c" }} /><div style={{ width: 82, height: 185, background: "#5d5148" }} /></div>
      </div>
      <div style={{ display: "flex", borderTop: "1px solid #968d82", paddingTop: 20, fontSize: 18 }}>Earth · Stone · Terracotta · Marble · Minimal · Artisan</div>
    </div>, size,
  );
}
