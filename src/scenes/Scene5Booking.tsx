import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Easing,
  spring,
  useVideoConfig,
} from "remotion";
import { colors, gradients, EASE_OUT } from "../theme";
import { SceneLabel } from "../components/SceneLabel";
import { useResponsiveScale } from "../hooks";

const easeOut = Easing.bezier(...EASE_OUT);

const BellIcon: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = colors.violet }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 3a5 5 0 0 0-5 5v3.2c0 .6-.24 1.18-.66 1.6L5 14.2V16h14v-1.8l-1.34-1.4a2.27 2.27 0 0 1-.66-1.6V8a5 5 0 0 0-5-5Z"
      fill={color}
    />
    <path d="M9.5 18a2.5 2.5 0 0 0 5 0h-5Z" fill={color} />
  </svg>
);

const CheckIcon: React.FC<{ size?: number }> = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M4 12.5 9.5 18 20 6" stroke="#fff" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const slots = [
  { time: "٣ م", filled: false },
  { time: "٤ م", filled: true },
  { time: "٥ م", filled: false },
];

export const Scene5Booking: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = useResponsiveScale();

  const cardOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });
  const cardY = interpolate(frame, [0, 22], [16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeOut,
  });

  const eventScale = spring({ frame: frame - 32, fps, config: { damping: 12, stiffness: 140 } });
  const eventProgress = Math.min(1, Math.max(0, eventScale));

  const bannerY = spring({ frame: frame - 108, fps, config: { damping: 14, stiffness: 120 } });
  const bannerOpacity = interpolate(frame, [104, 118], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: colors.ink }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 55%, rgba(43,99,222,0.14) 0%, ${colors.ink} 70%)`,
        }}
      />

      {/* reminder banner */}
      <div
        style={{
          position: "absolute",
          top: `${18 + (1 - bannerY) * -8}%`,
          left: "50%",
          transform: `translate(-50%, ${(1 - bannerY) * -40}px) scale(${scale})`,
          opacity: bannerOpacity,
          width: 260,
          background: "rgba(28,31,38,0.92)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 16,
          padding: "10px 12px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          boxShadow: "0 12px 30px rgba(0,0,0,0.4)",
        }}
      >
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 9,
            background: gradients.brandGlow,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <BellIcon color="#fff" />
        </div>
        <div dir="rtl" style={{ fontFamily: "system-ui, sans-serif", lineHeight: 1.35 }}>
          <div style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>مدار</div>
          <div style={{ color: "#b7bcc7", fontSize: 11 }}>تذكير: موعدك بعد ساعة</div>
        </div>
      </div>

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div
          dir="rtl"
          style={{
            transform: `scale(${scale}) translateY(${cardY}px)`,
            opacity: cardOpacity,
            width: 260,
            background: "#161922",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 20,
            padding: 18,
            fontFamily: "system-ui, sans-serif",
            boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
          }}
        >
          <div style={{ color: "#8f95a3", fontSize: 11, marginBottom: 12 }}>الخميس، ٢ نوفمبر</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {slots.map((s, i) => (
              <div
                key={i}
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "9px 11px",
                  borderRadius: 11,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  opacity: s.filled ? 1 - eventProgress * 0.94 : 1,
                }}
              >
                <span style={{ color: "#565d6b", fontSize: 11.5 }}>{s.time}</span>
                <span style={{ color: "#3a4048", fontSize: 10 }}>متاح</span>

                {s.filled && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      background: gradients.brandGlow,
                      borderRadius: 11,
                      padding: "9px 11px",
                      opacity: eventProgress,
                      transform: `scale(${0.85 + eventScale * 0.15})`,
                      transformOrigin: "center",
                    }}
                  >
                    <span style={{ color: "#fff", fontSize: 12, fontWeight: 600 }}>موعد — مدار</span>
                    <div
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.22)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <CheckIcon size={9} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </AbsoluteFill>

      <SceneLabel text="الموعد ينحجز لحاله" delay={140} size={40} />
    </AbsoluteFill>
  );
};
