export const colors = {
  ink: "#12141C",
  blue: "#2B63DE",
  violet: "#6E56FD",
  night: "#0C1A2E",
  skyBlue: "#4FA3FF",
  lavender: "#A78BFA",
  dawn: "#FF9B54",
  dawnWarm: "#FFC178",
  white: "#F5F7FA",
  whatsapp: "#25D366",
} as const;

export const gradients = {
  nightSky: `linear-gradient(180deg, ${colors.ink} 0%, ${colors.night} 100%)`,
  dawnSky: `linear-gradient(180deg, ${colors.night} 0%, ${colors.dawn} 120%)`,
  brandGlow: `linear-gradient(135deg, ${colors.skyBlue} 0%, ${colors.violet} 50%, ${colors.lavender} 100%)`,
} as const;

// Apple-like easing: quick decisive start, long soft settle.
export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_IN_OUT: [number, number, number, number] = [0.65, 0, 0.35, 1];
