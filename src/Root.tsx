import "./index.css";
import { Composition } from "remotion";
import { MadarLaunch, TOTAL_DURATION } from "./MadarLaunch";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MadarLaunch16x9"
        component={MadarLaunch}
        durationInFrames={TOTAL_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="MadarLaunch9x16"
        component={MadarLaunch}
        durationInFrames={TOTAL_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
