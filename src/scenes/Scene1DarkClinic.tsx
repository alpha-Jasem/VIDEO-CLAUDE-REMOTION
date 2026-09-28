import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Easing,
  Audio,
  Sequence,
  staticFile,
} from "remotion";
import { colors, EASE_OUT } from "../theme";
import { SceneLabel } from "../components/SceneLabel";
import { useResponsiveScale } from "../hooks";

const easeOut = Easing.bezier(...EASE_OUT);

const messages = [
  { text: "السلام عليكم، أبي أحجز موعد", at: 18 },
  { text: "في مواعيد بكرة الصبح؟", at: 46 },
  { text: "حد موجود؟", at: 78 },
];

export const Scene1DarkClinic: React.FC = () => {
  const frame = useCurrentFrame();
  const scale = useResponsiveScale();

  const vignette = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
    easing: easeOut,
  });

  const phoneGlow = interpolate(frame, [10, 40], [0.15, 0.55], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });

  return (
    <AbsoluteFill style={{ background: colors.ink }}>
      {/* room ambience */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 38%, rgba(43,99,222,${phoneGlow * 0.35}) 0%, ${colors.ink} 62%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,${
            0.55 * vignette
          }) 100%)`,
        }}
      />

      {/* phone */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            transform: `scale(${scale})`,
            width: 210,
            height: 430,
            borderRadius: 34,
            background: "#05060a",
            border: "2px solid rgba(255,255,255,0.08)",
            boxShadow: `0 0 ${60 * phoneGlow}px ${18 * phoneGlow}px rgba(43,99,222,${
              phoneGlow * 0.5
            })`,
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
              background: `linear-gradient(180deg, #0e1522 0%, #090c13 100%)`,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              gap: 8,
              padding: 14,
              overflow: "hidden",
            }}
          >
            {messages.map((m, i) => {
              const t = frame - m.at;
              const opacity = interpolate(t, [0, 14], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: easeOut,
              });
              const x = interpolate(t, [0, 16], [-14, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: easeOut,
              });
              return (
                <div
                  key={i}
                  dir="rtl"
                  style={{
                    opacity,
                    transform: `translateX(${x}px)`,
                    alignSelf: "flex-start",
                    background: "#1c2530",
                    color: "#c7cedb",
                    fontFamily: "system-ui, sans-serif",
                    fontSize: 11.5,
                    padding: "7px 10px",
                    borderRadius: 12,
                    borderBottomRightRadius: 3,
                    maxWidth: "84%",
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 5,
                  }}
                >
                  <span>{m.text}</span>
                  <span style={{ color: "#5b6472", fontSize: 9, flexShrink: 0 }}>✓</span>
                </div>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>

      <SceneLabel text="كم مريض راسلك وما لقى رد؟" delay={55} size={40} />

      {messages.map((m, i) => (
        <Sequence key={i} from={m.at} durationInFrames={20} layout="none">
          <Audio src={staticFile("audio/notification.wav")} volume={0.5} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
