import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Easing, Img, staticFile } from "remotion";
import { colors, gradients, EASE_OUT } from "../theme";
import { SceneLabel } from "../components/SceneLabel";
import { PhoneFrame } from "../components/PhoneFrame";

const easeOut = Easing.bezier(...EASE_OUT);

const Bubble: React.FC<{
  outgoing?: boolean;
  delay: number;
  children: React.ReactNode;
}> = ({ outgoing, delay, children }) => {
  const frame = useCurrentFrame();
  const t = frame - delay;
  const opacity = interpolate(t, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const y = interpolate(t, [0, 14], [10, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const scale = interpolate(t, [0, 14], [0.9, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });

  return (
    <div
      dir="rtl"
      style={{
        opacity,
        transform: `translateY(${y}px) scale(${scale})`,
        alignSelf: outgoing ? "flex-end" : "flex-start",
        background: outgoing ? gradients.brandGlow : "#1c2530",
        color: outgoing ? "#fff" : "#c7cedb",
        fontFamily: "system-ui, sans-serif",
        fontSize: 11.5,
        lineHeight: 1.5,
        padding: "8px 11px",
        borderRadius: 13,
        borderBottomLeftRadius: outgoing ? 3 : 13,
        borderBottomRightRadius: outgoing ? 13 : 3,
        maxWidth: "82%",
      }}
    >
      {children}
    </div>
  );
};

const TimeChip: React.FC<{ label: string; selected: boolean; delay: number }> = ({
  label,
  selected,
  delay,
}) => {
  const frame = useCurrentFrame();
  const t = frame - delay;
  const opacity = interpolate(t, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pulse = interpolate(t, [95, 108, 118], [1, 1.08, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });

  return (
    <div
      style={{
        opacity,
        transform: selected ? `scale(${pulse})` : undefined,
        border: `1.5px solid ${selected ? colors.skyBlue : "rgba(255,255,255,0.18)"}`,
        background: selected ? "rgba(79,163,255,0.16)" : "transparent",
        color: selected ? colors.skyBlue : "#c7cedb",
        borderRadius: 9,
        padding: "5px 9px",
        fontSize: 10.5,
        fontFamily: "system-ui, sans-serif",
        display: "inline-block",
      }}
    >
      {label}
    </div>
  );
};

export const Scene3WhatsApp: React.FC = () => {
  const frame = useCurrentFrame();

  const headerOpacity = interpolate(frame, [0, 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: colors.night }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 45%, rgba(37,211,102,0.08) 0%, ${colors.night} 65%)`,
        }}
      />

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <PhoneFrame glow={0.4} glowColor="37,211,102">
          <div
            dir="rtl"
            style={{
              opacity: headerOpacity,
              display: "flex",
              alignItems: "center",
              gap: 7,
              padding: "9px 11px",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              flexShrink: 0,
            }}
          >
            <Img
              src={staticFile("madar-mark.png")}
              style={{ width: 20, height: 20, objectFit: "contain" }}
            />
            <span style={{ color: "#e8ebf1", fontSize: 11.5, fontWeight: 600, fontFamily: "system-ui, sans-serif" }}>
              مدار
            </span>
            <span
              style={{
                marginInlineStart: "auto",
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: colors.whatsapp,
              }}
            />
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
            <Bubble outgoing delay={20}>
              أبي أحجز موعد الأسبوع الجاي
            </Bubble>

            <Bubble delay={65}>
              <div style={{ marginBottom: 6 }}>تفضل، عندنا هذي الأوقات:</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                <TimeChip label="الثلاثاء ٥ م" selected delay={72} />
                <TimeChip label="الأربعاء ١١ ص" selected={false} delay={78} />
              </div>
            </Bubble>

            <Bubble delay={155}>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span>تم تأكيد موعدك الثلاثاء الساعة ٥ م</span>
                <span style={{ color: colors.skyBlue, fontSize: 13 }}>✓</span>
              </div>
            </Bubble>
          </div>
        </PhoneFrame>
      </AbsoluteFill>

      <SceneLabel text="يرد على الواتساب" delay={195} size={40} />
    </AbsoluteFill>
  );
};
