import React from "react";
import { useResponsiveScale } from "../hooks";

export const PhoneFrame: React.FC<{
  children: React.ReactNode;
  glow?: number;
  glowColor?: string;
}> = ({ children, glow = 0.3, glowColor = "43,99,222" }) => {
  const scale = useResponsiveScale();
  return (
    <div
      style={{
        transform: `scale(${scale})`,
        width: 210,
        height: 430,
        borderRadius: 34,
        background: "#05060a",
        border: "2px solid rgba(255,255,255,0.08)",
        boxShadow: `0 0 ${60 * glow}px ${18 * glow}px rgba(${glowColor},${glow * 0.85})`,
        padding: 10,
        display: "flex",
        flexDirection: "column",
        gap: 8,
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
  );
};
