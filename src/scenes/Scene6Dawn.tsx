import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Easing, Img, staticFile } from "remotion";
import { colors, EASE_OUT } from "../theme";
import { SceneLabel } from "../components/SceneLabel";
import { useResponsiveScale } from "../hooks";
import { latinFont } from "../fonts";

const easeOut = Easing.bezier(...EASE_OUT);

export const Scene6Dawn: React.FC = () => {
  const frame = useCurrentFrame();
  const scale = useResponsiveScale();

  const dawnProgress = interpolate(frame, [0, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });

  const buildingOpacity = interpolate(frame, [15, 55], [0, 0.65], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });

  const logoOpacity = interpolate(frame, [45, 78], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const logoY = interpolate(frame, [45, 78], [14, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });

  const glowPulse = 0.6 + 0.4 * Math.sin(frame * 0.12);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.ink} 0%, ${colors.night} ${
          40 - dawnProgress * 15
        }%, ${colors.night} 55%, ${colors.dawn} ${140 - dawnProgress * 60}%)`,
      }}
    >
      {/* sunrise glow */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 100%, rgba(255,155,84,${
            0.55 * dawnProgress
          }) 0%, rgba(255,155,84,0) 55%)`,
        }}
      />

      {/* abstract clinic silhouette */}
      <div
        style={{
          position: "absolute",
          bottom: -46,
          left: "50%",
          transform: `translateX(-50%) scale(${scale})`,
          opacity: buildingOpacity,
          width: 420,
          height: 130,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 260,
            height: 108,
            background: "#070810",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            position: "relative",
            boxShadow: "0 -2px 0 rgba(255,255,255,0.03)",
          }}
        >
          {/* glowing sign strip — clinic still "responding" */}
          <div
            style={{
              position: "absolute",
              top: 18,
              left: "50%",
              transform: "translateX(-50%)",
              width: 130,
              height: 8,
              borderRadius: 4,
              background: colors.skyBlue,
              opacity: glowPulse,
              boxShadow: `0 0 ${16 * glowPulse}px 4px rgba(79,163,255,0.6)`,
            }}
          />
          {/* windows */}
          <div style={{ position: "absolute", top: 44, left: 22, display: "flex", gap: 14 }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  width: 16,
                  height: 20,
                  borderRadius: 2,
                  background: i === 2 ? "rgba(79,163,255,0.5)" : "rgba(255,255,255,0.045)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", paddingBottom: "18%" }}>
        <div
          style={{
            transform: `translateY(${logoY}px) scale(${scale})`,
            opacity: logoOpacity,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
          }}
        >
          <Img
            src={staticFile("madar-logo-transparent.png")}
            style={{ width: 92, height: 92, objectFit: "contain" }}
          />
          <div
            style={{
              fontFamily: latinFont,
              color: colors.white,
              fontWeight: 600,
              fontSize: 22,
              letterSpacing: "-0.01em",
            }}
          >
            Madar<span style={{ color: colors.skyBlue }}>.ai</span>
          </div>
        </div>
      </AbsoluteFill>

      <SceneLabel
        text="عيادتك ترد حتى وهي مقفلة"
        delay={95}
        size={38}
        bottom="24%"
      />
      <SceneLabel
        text="madar.software"
        lang="en"
        delay={125}
        size={22}
        bottom="17.5%"
        color={colors.skyBlue}
        weight={500}
      />
    </AbsoluteFill>
  );
};
