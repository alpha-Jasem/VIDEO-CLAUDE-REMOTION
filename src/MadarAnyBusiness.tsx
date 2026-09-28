import React from "react";
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "./theme";
import { ProblemGrid } from "./any-business/ProblemGrid";
import { ReplyMontage, REPLY_MONTAGE_DURATION } from "./any-business/ReplyMontage";
import { OrbitClose } from "./any-business/OrbitClose";
import { Scene2LogoReveal } from "./scenes/Scene2LogoReveal";
import { Scene4VoiceCall } from "./scenes/Scene4VoiceCall";

const PROBLEM = 150;
const LOGO = 120;
const VOICE = 210;
const CLOSE = 180;

const at = {
  problem: 0,
  logo: PROBLEM,
  replies: PROBLEM + LOGO,
  voice: PROBLEM + LOGO + REPLY_MONTAGE_DURATION,
  close: PROBLEM + LOGO + REPLY_MONTAGE_DURATION + VOICE,
};

export const ANY_BUSINESS_DURATION = at.close + CLOSE;

export const MadarAnyBusiness: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const globalFade = interpolate(
    frame,
    [0, 12, durationInFrames - 18, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ background: colors.ink, opacity: globalFade }}>
      <Sequence from={at.problem} durationInFrames={PROBLEM}>
        <ProblemGrid />
      </Sequence>
      <Sequence from={at.logo} durationInFrames={LOGO}>
        <Scene2LogoReveal />
      </Sequence>
      <Sequence from={at.replies} durationInFrames={REPLY_MONTAGE_DURATION}>
        <ReplyMontage />
      </Sequence>
      <Sequence from={at.voice} durationInFrames={VOICE}>
        <Scene4VoiceCall />
      </Sequence>
      <Sequence from={at.close} durationInFrames={CLOSE}>
        <OrbitClose />
      </Sequence>
    </AbsoluteFill>
  );
};
