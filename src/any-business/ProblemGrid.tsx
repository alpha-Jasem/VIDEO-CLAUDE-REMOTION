import React from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, EASE_OUT } from "../theme";
import { arabicFont } from "../fonts";
import { ChatPhone } from "../components/ChatPhone";
import { SceneLabel } from "../components/SceneLabel";
import { useResponsiveScale } from "../hooks";
import { VERTICALS } from "./verticals";

const easeOut = Easing.bezier(...EASE_OUT);
const STAGGER = 14;

export const ProblemGrid: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const scale = useResponsiveScale();
  const portrait = height > width;
  const phoneSize = portrait ? 0.48 : 0.72;

  return (
    <AbsoluteFill style={{ background: colors.ink }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 45%, rgba(43,99,222,0.12) 0%, ${colors.ink} 65%)`,
        }}
      />
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: portrait ? "20%" : "6%",
        }}
      >
        <div
          dir="rtl"
          style={{
            display: "grid",
            gridTemplateColumns: portrait ? "repeat(2, auto)" : "repeat(4, auto)",
            gap: `${(portrait ? 26 : 34) * scale}px ${(portrait ? 22 : 34) * scale}px`,
          }}
        >
          {VERTICALS.map((v, i) => {
            const at = i * STAGGER;
            const t = frame - at;
            const opacity = interpolate(t, [0, 14], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: easeOut,
            });
            const y = interpolate(t, [0, 18], [24, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: easeOut,
            });
            return (
              <div
                key={v.kind}
                style={{
                  opacity,
                  transform: `translateY(${y}px)`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10 * scale,
                }}
              >
                <ChatPhone vertical={v} answered={false} delay={at} size={phoneSize} glow={0.18} />
                <div
                  style={{
                    fontFamily: arabicFont,
                    fontWeight: 500,
                    fontSize: 15 * scale,
                    color: "#8b93a3",
                  }}
                >
                  {v.label}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      <SceneLabel text="بأي نشاط… رسايل ما أحد رد عليها" delay={72} size={40} />

      {VERTICALS.map((v, i) => (
        <Sequence key={v.kind} from={i * STAGGER + 6} durationInFrames={20} layout="none">
          <Audio src={staticFile("audio/notification.wav")} volume={0.35} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
