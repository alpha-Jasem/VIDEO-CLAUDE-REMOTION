import React from "react";
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "./theme";
import { Scene1DarkClinic } from "./scenes/Scene1DarkClinic";
import { Scene2LogoReveal } from "./scenes/Scene2LogoReveal";
import { Scene3WhatsApp } from "./scenes/Scene3WhatsApp";
import { Scene4VoiceCall } from "./scenes/Scene4VoiceCall";
import { Scene5Booking } from "./scenes/Scene5Booking";
import { Scene6Dawn } from "./scenes/Scene6Dawn";

const SCENES = [
  { from: 0, duration: 120, Component: Scene1DarkClinic },
  { from: 120, duration: 120, Component: Scene2LogoReveal },
  { from: 240, duration: 240, Component: Scene3WhatsApp },
  { from: 480, duration: 210, Component: Scene4VoiceCall },
  { from: 690, duration: 180, Component: Scene5Booking },
  { from: 870, duration: 180, Component: Scene6Dawn },
] as const;

export const TOTAL_DURATION = 1050; // 35s @ 30fps

export const MadarLaunch: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const globalFade = interpolate(
    frame,
    [0, 14, durationInFrames - 18, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ background: colors.ink, opacity: globalFade }}>
      {SCENES.map(({ from, duration, Component }, i) => (
        <Sequence key={i} from={from} durationInFrames={duration}>
          <Component />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
