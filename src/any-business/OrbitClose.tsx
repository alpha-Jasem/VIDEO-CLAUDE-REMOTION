import React from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, EASE_OUT } from "../theme";
import { latinFont } from "../fonts";
import { BusinessIcon } from "../components/BusinessIcon";
import { SceneLabel } from "../components/SceneLabel";
import { useResponsiveScale, useTextScale } from "../hooks";
import { VERTICALS } from "./verticals";

const easeOut = Easing.bezier(...EASE_OUT);
const RX = 190;
const RY = 70;

export const OrbitClose: React.FC = () => {
  const frame = useCurrentFrame();
  const scale = useResponsiveScale();
  const textScale = useTextScale();
  const { width } = useVideoConfig();
  const orbitScale = Math.min(scale, (width * 0.85) / (RX * 2 + 60));

  const logoIn = interpolate(frame, [0, 26], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const orbitIn = interpolate(frame, [14, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const spin = frame * 0.014;

  const icons = VERTICALS.map((v, i) => {
    const a = spin + (i / VERTICALS.length) * Math.PI * 2;
    const x = Math.cos(a) * RX * orbitIn;
    const y = Math.sin(a) * RY * orbitIn;
    const depth = (Math.sin(a) + 1) / 2; // 0 = back, 1 = front
    return { v, x, y, depth };
  });

  const renderIcon = ({ v, x, y, depth }: (typeof icons)[number]) => (
    <div
      key={v.kind}
      style={{
        position: "absolute",
        left: x - 22,
        top: y - 22,
        width: 44,
        height: 44,
        borderRadius: "50%",
        background: "#141824",
        border: `1px solid rgba(${v.accentRgb},0.5)`,
        boxShadow: `0 0 ${14 + depth * 14}px rgba(${v.accentRgb},${0.2 + depth * 0.3})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: orbitIn * (0.45 + depth * 0.55),
        transform: `scale(${0.75 + depth * 0.35})`,
      }}
    >
      <BusinessIcon kind={v.kind} size={20} color={v.accent} />
    </div>
  );

  return (
    <AbsoluteFill style={{ background: colors.ink }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 42%, rgba(110,86,253,${
            0.22 * logoIn
          }) 0%, rgba(43,99,222,${0.08 * logoIn}) 35%, ${colors.ink} 70%)`,
        }}
      />

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", paddingBottom: "16%" }}>
        <div style={{ position: "relative", width: 1, height: 1, transform: `scale(${orbitScale})` }}>
          {/* orbit path */}
          <div
            style={{
              position: "absolute",
              left: -RX,
              top: -RY,
              width: RX * 2,
              height: RY * 2,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.07)",
              opacity: orbitIn,
            }}
          />
          {icons.filter((i) => i.depth < 0.5).map(renderIcon)}

          <div
            style={{
              position: "absolute",
              left: -70,
              top: -70,
              width: 140,
              height: 140,
              opacity: logoIn,
              transform: `scale(${0.9 + logoIn * 0.1})`,
            }}
          >
            <Img
              src={staticFile("madar-mark.png")}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>

          {icons.filter((i) => i.depth >= 0.5).map(renderIcon)}
        </div>
      </AbsoluteFill>

      <SceneLabel text="أي نشاط… مدار يرد" delay={40} size={42} bottom="24%" weight={700} />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: "17%",
          textAlign: "center",
          fontFamily: latinFont,
          fontWeight: 500,
          fontSize: 22 * textScale,
          color: colors.skyBlue,
          opacity: interpolate(frame, [70, 88], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        madar.software
      </div>

      <Sequence from={2} durationInFrames={36} layout="none">
        <Audio src={staticFile("audio/logo-chime.wav")} volume={0.4} />
      </Sequence>
    </AbsoluteFill>
  );
};
