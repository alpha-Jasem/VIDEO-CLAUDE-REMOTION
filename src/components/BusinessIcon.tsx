import React from "react";

export type BusinessKind = "clinic" | "realestate" | "store" | "salon";

export const BusinessIcon: React.FC<{ kind: BusinessKind; size?: number; color?: string }> = ({
  kind,
  size = 16,
  color = "#fff",
}) => {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (kind) {
    case "clinic":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      );
    case "realestate":
      return (
        <svg {...common}>
          <path d="M3 11 12 4l9 7" />
          <path d="M5 10v10h14V10" />
          <path d="M10 20v-5h4v5" />
        </svg>
      );
    case "store":
      return (
        <svg {...common}>
          <path d="M5 8h14l-1 12H6L5 8Z" />
          <path d="M9 8V6a3 3 0 0 1 6 0v2" />
        </svg>
      );
    case "salon":
      return (
        <svg {...common}>
          <circle cx="6" cy="18" r="2.6" />
          <circle cx="6" cy="6" r="2.6" />
          <path d="M8.2 7.6 20 18M8.2 16.4 20 6" />
        </svg>
      );
  }
};
