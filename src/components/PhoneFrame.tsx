import React from "react";
import { useResponsiveScale } from "../hooks";

const W = 210;
const H = 430;
// content-box: 10px padding + 2px border on each side
const OUTER_W = W + 24;
const OUTER_H = H + 24;

export const PhoneFrame: React.FC<{
  children: React.ReactNode;
  glow?: number;
  glowColor?: string;
  size?: number;
}> = ({ children, glow = 0.3, glowColor = "43,99,222", size = 1 }) => {
  const s = useResponsiveScale() * size;
  return (
    <div style={{ width: OUTER_W * s, height: OUTER_H * s, flexShrink: 0 }}>
      <div
        style={{
          transform: `scale(${s})`,
          transformOrigin: "top left",
          width: W,
          height: H,
          borderRadius: 34,
          background: "#05060a",
          border: "2px solid rgba(255,255,255,0.08)",
          boxShadow: `0 0 ${60 * glow}px ${18 * glow}px rgba(${glowColor},${glow * 0.85})`,
          padding: 10,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            flex: 1,
            borderRadius: 24,
            background: "linear-gradient(180deg, #0e1522 0%, #090c13 100%)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
