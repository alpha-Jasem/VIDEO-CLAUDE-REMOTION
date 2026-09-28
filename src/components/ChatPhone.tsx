import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";
import { colors, gradients, EASE_OUT } from "../theme";
import { arabicFont } from "../fonts";
import { PhoneFrame } from "./PhoneFrame";
import { BusinessIcon } from "./BusinessIcon";
import type { Vertical } from "../any-business/verticals";

const easeOut = Easing.bezier(...EASE_OUT);

const enter = (frame: number, at: number) => {
  const t = frame - at;
  return {
    opacity: interpolate(t, [0, 10], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easeOut,
    }),
    transform: `translateY(${interpolate(t, [0, 12], [10, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easeOut,
    })}px) scale(${interpolate(t, [0, 12], [0.92, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: easeOut,
    })})`,
  };
};

const CheckIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg width={11} height={11} viewBox="0 0 24 24" fill="none">
    <path d="M4 12.5 9.5 18 20 6" stroke={color} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TypingDots: React.FC<{ from: number; to: number }> = ({ from, to }) => {
  const frame = useCurrentFrame();
  if (frame < from || frame >= to) return null;
  return (
    <div
      style={{
        alignSelf: "flex-start",
        background: "#1c2530",
        borderRadius: 12,
        padding: "8px 11px",
        display: "flex",
        gap: 4,
      }}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "#8b93a3",
            opacity: 0.35 + 0.65 * Math.abs(Math.sin((frame - from) * 0.3 - i * 0.7)),
          }}
        />
      ))}
    </div>
  );
};

export const ChatPhone: React.FC<{
  vertical: Vertical;
  answered: boolean;
  delay?: number;
  size?: number;
  glow?: number;
}> = ({ vertical, answered, delay = 0, size = 1, glow = 0.35 }) => {
  const frame = useCurrentFrame();
  const askAt = delay + 6;
  const typingAt = askAt + 12;
  const replyAt = askAt + 26;
  const doneAt = replyAt + 22;

  const bubbleBase: React.CSSProperties = {
    fontFamily: arabicFont,
    fontSize: 11.5,
    lineHeight: 1.55,
    padding: "7px 11px",
    borderRadius: 13,
    maxWidth: "84%",
  };

  return (
    <PhoneFrame size={size} glow={glow} glowColor={answered ? vertical.accentRgb : "43,99,222"}>
      <div
        dir="rtl"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 11px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: `rgba(${vertical.accentRgb},0.18)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <BusinessIcon kind={vertical.kind} size={13} color={vertical.accent} />
        </div>
        <div style={{ fontFamily: arabicFont, lineHeight: 1.25, minWidth: 0 }}>
          <div style={{ color: "#e8ebf1", fontSize: 11, fontWeight: 700 }}>{vertical.name}</div>
          <div style={{ color: answered ? colors.skyBlue : "#6b7280", fontSize: 8.5 }}>
            {answered ? "يرد عبر مدار" : "آخر ظهور أمس"}
          </div>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          gap: 7,
          padding: 12,
        }}
      >
        <div
          dir="rtl"
          style={{
            ...bubbleBase,
            ...enter(frame, askAt),
            alignSelf: "flex-end",
            background: "#1f3b33",
            color: "#e3efe9",
            borderBottomRightRadius: 3,
          }}
        >
          <div>{vertical.ask}</div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 3,
              fontSize: 8,
              color: "#8fb3a5",
              marginTop: 1,
            }}
          >
            <span>٢:١٤ ص</span>
            <CheckIcon color={answered ? colors.skyBlue : "#6b7a74"} />
          </div>
        </div>

        {answered && (
          <>
            <TypingDots from={typingAt} to={replyAt} />
            {frame >= replyAt && (
              <div
                dir="rtl"
                style={{
                  ...bubbleBase,
                  ...enter(frame, replyAt),
                  alignSelf: "flex-start",
                  background: gradients.brandGlow,
                  color: "#fff",
                  borderBottomLeftRadius: 3,
                }}
              >
                {vertical.reply}
              </div>
            )}
            {frame >= doneAt && (
            <div
              dir="rtl"
              style={{
                ...enter(frame, doneAt),
                alignSelf: "center",
                display: "flex",
                alignItems: "center",
                gap: 5,
                marginTop: 4,
                padding: "4px 10px",
                borderRadius: 999,
                border: `1px solid rgba(${vertical.accentRgb},0.45)`,
                background: `rgba(${vertical.accentRgb},0.12)`,
                color: vertical.accent,
                fontFamily: arabicFont,
                fontSize: 9.5,
                fontWeight: 700,
              }}
            >
              <CheckIcon color={vertical.accent} />
              <span>{vertical.done}</span>
            </div>
            )}
          </>
        )}
      </div>
    </PhoneFrame>
  );
};
