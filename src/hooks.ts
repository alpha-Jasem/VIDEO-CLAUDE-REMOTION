import { useVideoConfig } from "remotion";

// Scenes are designed against a 720px-tall (1280x720) baseline.
// Scaling by height keeps proportions consistent across 16:9 and 9:16 exports.
export const useResponsiveScale = () => {
  const { height } = useVideoConfig();
  return height / 720;
};

// Captions must fit the frame's narrow side, otherwise they overflow in 9:16.
export const useTextScale = () => {
  const { width, height } = useVideoConfig();
  return Math.min(width, height) / 720;
};
