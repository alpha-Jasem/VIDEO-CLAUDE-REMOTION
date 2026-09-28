import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Easing,
  Img,
  Audio,
  Sequence,
  staticFile,
} from "remotion";
import { colors, EASE_OUT } from "../theme";
import { SceneLabel } from "../components/SceneLabel";
import { PhoneFrame } from "../components/PhoneFrame";

const easeOut = Easing.bezier(...EASE_OUT);
const seeded = (seed: number) => {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

const BAR_COUNT = 22;
const barSeeds = Array.from({ length: BAR_COUNT }, (_, i) => seeded(i * 4.4));

const Waveform: React.FC<{ active: boolean }> = ({ active }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3, height: 34 }}>
      {barSeeds.map((s, i) => {
        const phase = s * Math.PI * 2;
        const speed = 0.35 + s * 0.25;
        const amp = active ? 0.35 + 0.65 * Math.abs(Math.sin(frame * speed * 0.15 + phase)) : 0.12;
        return (
          <div
            key={i}
            style={{
              width: 2.4,
              height: 6 + amp * 26,
              borderRadius: 2,
              background: colors.skyBlue,
              opacity: 0.55 + amp * 0.45,
              transition: "height 0.05s linear",
            }}
          />
        );
      })}
    </div>
  );
};

const Caption: React.FC<{ text: string; delay: number; duration: number }> = ({
  text,
  delay,
  duration,
}) => {
  const frame = useCurrentFrame();
  const t = frame - delay;
  const opacity = interpolate(
    t,
    [0, 10, duration - 12, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: easeOut }
  );
  return (
    <div
      dir="rtl"
      style={{
        opacity,
        position: "absolute",
        bottom: 16,
        left: 12,
        right: 12,
        textAlign: "center",
        color: "#dfe4ee",
        fontSize: 10.5,
        fontFamily: "system-ui, sans-serif",
        lineHeight: 1.5,
      }}
    >
      {text}
    </div>
  );
};

export const Scene4VoiceCall: React.FC = () => {
  const frame = useCurrentFrame();

  const avatarPulse = 1 + 0.04 * Math.sin(frame * 0.2);
  const uiOpacity = interpolate(frame, [0, 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });

  const timerSeconds = Math.max(0, Math.floor(frame / 30));
  const mm = String(Math.floor(timerSeconds / 60)).padStart(2, "0");
  const ss = String(timerSeconds % 60).padStart(2, "0");

  return (
    <AbsoluteFill style={{ background: colors.night }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 40%, rgba(79,163,255,0.14) 0%, ${colors.night} 68%)`,
        }}
      />

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <PhoneFrame glow={0.42} glowColor="79,163,255">
          <div
            style={{
              opacity: uiOpacity,
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 14,
              position: "relative",
              padding: 16,
            }}
          >
            <div
              style={{
                width: 68,
                height: 68,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.94)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${avatarPulse})`,
                boxShadow: "0 0 24px 6px rgba(79,163,255,0.35)",
              }}
            >
              <Img
                src={staticFile("madar-logo-transparent.png")}
                style={{ width: 42, height: 42, objectFit: "contain" }}
              />
            </div>

            <div style={{ textAlign: "center", fontFamily: "system-ui, sans-serif" }}>
              <div style={{ color: "#e8ebf1", fontSize: 13, fontWeight: 600 }}>مدار</div>
              <div style={{ color: "#7c8494", fontSize: 10, marginTop: 2 }}>
                {mm}:{ss}
              </div>
            </div>

            <Waveform active={frame > 15 && frame < 195} />

            <Caption
              text="أبغى أأجل موعدي الأسبوع الجاي"
              delay={30}
              duration={55}
            />
            <Caption
              text="تم، أجلته ليوم الخميس الساعة ٤"
              delay={100}
              duration={65}
            />
          </div>
        </PhoneFrame>
      </AbsoluteFill>

      <SceneLabel text="ويرد على المكالمات" delay={172} size={40} />

      <Sequence from={16} durationInFrames={178} layout="none">
        <Audio src={staticFile("audio/voice-pulse.wav")} volume={0.16} loop />
      </Sequence>
    </AbsoluteFill>
  );
};
