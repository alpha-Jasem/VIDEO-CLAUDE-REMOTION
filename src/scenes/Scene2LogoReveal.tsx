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
import { useResponsiveScale } from "../hooks";

const easeOut = Easing.bezier(...EASE_OUT);

// Deterministic pseudo-random (stable across independently-rendered frames).
const seeded = (seed: number) => {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

const PARTICLE_COUNT = 70;

const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
  const angle = seeded(i * 3.1) * Math.PI * 2;
  const radius = 340 + seeded(i * 7.7) * 420;
  return {
    startX: Math.cos(angle) * radius,
    startY: Math.sin(angle) * radius,
    targetOffsetX: (seeded(i * 5.3) - 0.5) * 160,
    targetOffsetY: (seeded(i * 9.1) - 0.5) * 160,
    size: 2 + seeded(i * 4.2) * 4,
    delay: seeded(i * 2.6) * 22,
    hueMix: seeded(i * 6.8),
  };
});

export const Scene2LogoReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const scale = useResponsiveScale();

  const particlesOpacity = interpolate(frame, [0, 12, 55, 74], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const logoOpacity = interpolate(frame, [58, 76], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const logoScale = interpolate(frame, [58, 80], [0.94, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });

  return (
    <AbsoluteFill style={{ background: colors.ink }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 50%, rgba(110,86,253,0.18) 0%, ${colors.ink} 70%)`,
        }}
      />

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "relative", width: 1, height: 1, transform: `scale(${scale})` }}>
          {particles.map((p, i) => {
            const localT = Math.max(0, Math.min(1, (frame - p.delay) / 40));
            const eased = Easing.bezier(...EASE_OUT)(localT);
            const x = p.startX + (p.targetOffsetX - p.startX) * eased;
            const y = p.startY + (p.targetOffsetY - p.startY) * eased;
            const color =
              p.hueMix < 0.34 ? colors.skyBlue : p.hueMix < 0.67 ? colors.violet : colors.lavender;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: x,
                  top: y,
                  width: p.size,
                  height: p.size,
                  borderRadius: "50%",
                  background: color,
                  opacity: particlesOpacity,
                  boxShadow: `0 0 ${p.size * 2.2}px ${color}`,
                }}
              />
            );
          })}

          <div
            style={{
              position: "absolute",
              left: -140,
              top: -140,
              width: 280,
              height: 280,
              opacity: logoOpacity,
              transform: `scale(${logoScale})`,
            }}
          >
            <Img
              src={staticFile("madar-mark.png")}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
        </div>
      </AbsoluteFill>

      <SceneLabel text="Introducing Madar.ai" lang="en" delay={82} size={36} weight={600} />

      <Sequence from={60} durationInFrames={30} layout="none">
        <Audio src={staticFile("audio/logo-chime.wav")} volume={0.45} />
      </Sequence>
    </AbsoluteFill>
  );
};
