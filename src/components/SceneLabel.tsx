import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";
import { colors, EASE_OUT } from "../theme";
import { arabicFont, latinFont } from "../fonts";
import { useResponsiveScale } from "../hooks";

const easeOut = Easing.bezier(...EASE_OUT);

export const SceneLabel: React.FC<{
  text: string;
  lang?: "ar" | "en";
  delay?: number;
  size?: number;
  align?: "center" | "start";
  bottom?: string;
  color?: string;
  weight?: number;
}> = ({
  text,
  lang = "ar",
  delay = 0,
  size = 44,
  align = "center",
  bottom = "9%",
  color = colors.white,
  weight = 600,
}) => {
  const frame = useCurrentFrame();
  const scale = useResponsiveScale();
  const t = Math.max(0, frame - delay);
  const opacity = interpolate(t, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const translateY = interpolate(t, [0, 22], [22, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom,
        display: "flex",
        justifyContent: align === "center" ? "center" : "flex-start",
        paddingInline: "7%",
        pointerEvents: "none",
      }}
    >
      <div
        dir={lang === "ar" ? "rtl" : "ltr"}
        style={{
          fontFamily: lang === "ar" ? arabicFont : latinFont,
          fontWeight: weight,
          fontSize: size * scale,
          color,
          opacity,
          transform: `translateY(${translateY}px)`,
          textAlign: align === "center" ? "center" : lang === "ar" ? "right" : "left",
          textShadow: "0 2px 24px rgba(0,0,0,0.35)",
          letterSpacing: lang === "en" ? "-0.01em" : "0",
          maxWidth: "88%",
          lineHeight: 1.3,
        }}
      >
        {text}
      </div>
    </div>
  );
};
