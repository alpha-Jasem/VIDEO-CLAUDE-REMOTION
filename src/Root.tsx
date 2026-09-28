import "./index.css";
import { Composition } from "remotion";
import { MadarLaunch, TOTAL_DURATION } from "./MadarLaunch";
import { MadarAnyBusiness, ANY_BUSINESS_DURATION } from "./MadarAnyBusiness";

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
      <Composition
        id="MadarAnyBusiness16x9"
        component={MadarAnyBusiness}
        durationInFrames={ANY_BUSINESS_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="MadarAnyBusiness9x16"
        component={MadarAnyBusiness}
        durationInFrames={ANY_BUSINESS_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
