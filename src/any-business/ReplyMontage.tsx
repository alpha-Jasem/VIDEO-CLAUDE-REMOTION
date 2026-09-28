import React from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { colors, EASE_OUT } from "../theme";
import { arabicFont } from "../fonts";
import { ChatPhone } from "../components/ChatPhone";
import { BusinessIcon } from "../components/BusinessIcon";
import { SceneLabel } from "../components/SceneLabel";
import { useResponsiveScale } from "../hooks";
import { VERTICALS, type Vertical } from "./verticals";

const easeOut = Easing.bezier(...EASE_OUT);
export const SEGMENT = 84;
export const REPLY_MONTAGE_DURATION = SEGMENT * VERTICALS.length;

const Segment: React.FC<{ vertical: Vertical; index: number }> = ({ vertical, index }) => {
  const frame = useCurrentFrame();
  const scale = useResponsiveScale();

  const fade = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const chipY = interpolate(frame, [0, 14], [-12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });

  return (
    <AbsoluteFill style={{ background: colors.night, opacity: fade }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 48%, rgba(${vertical.accentRgb},0.16) 0%, ${colors.night} 62%)`,
        }}
      />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 22 * scale,
          paddingBottom: "7%",
        }}
      >
        <div
          dir="rtl"
          style={{
            transform: `translateY(${chipY}px)`,
            display: "flex",
            alignItems: "center",
            gap: 10 * scale,
            padding: `${7 * scale}px ${16 * scale}px`,
            borderRadius: 999,
            border: `1px solid rgba(${vertical.accentRgb},0.4)`,
            background: `rgba(${vertical.accentRgb},0.1)`,
          }}
        >
          <BusinessIcon kind={vertical.kind} size={18 * scale} color={vertical.accent} />
          <span
            style={{
              fontFamily: arabicFont,
              fontWeight: 700,
              fontSize: 18 * scale,
              color: vertical.accent,
            }}
          >
            {vertical.label}
          </span>
          <div style={{ display: "flex", gap: 4 * scale, marginInlineStart: 6 * scale }}>
            {VERTICALS.map((_, i) => (
              <div
                key={i}
                style={{
                  width: 6 * scale,
                  height: 6 * scale,
                  borderRadius: "50%",
                  background: i === index ? vertical.accent : "rgba(255,255,255,0.18)",
                }}
              />
            ))}
          </div>
        </div>

        <ChatPhone vertical={vertical} answered delay={0} size={0.92} glow={0.4} />
      </AbsoluteFill>

      <Sequence from={32} durationInFrames={20} layout="none">
        <Audio src={staticFile("audio/notification.wav")} volume={0.4} />
      </Sequence>
    </AbsoluteFill>
  );
};

export const ReplyMontage: React.FC = () => {
  return (
    <AbsoluteFill>
      {VERTICALS.map((v, i) => (
        <Sequence key={v.kind} from={i * SEGMENT} durationInFrames={SEGMENT}>
          <Segment vertical={v} index={i} />
        </Sequence>
      ))}
      <SceneLabel text="مدار يرد… على أي شي" delay={20} size={40} bottom="6%" />
    </AbsoluteFill>
  );
};
