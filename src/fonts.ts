import { loadFont as loadArabic } from "@remotion/google-fonts/NotoSansArabic";
import { loadFont as loadLatin } from "@remotion/google-fonts/Inter";

export const { fontFamily: arabicFont } = loadArabic("normal", {
  weights: ["500", "700"],
  subsets: ["arabic"],
});

export const { fontFamily: latinFont } = loadLatin("normal", {
  weights: ["500", "600", "700"],
  subsets: ["latin"],
});
