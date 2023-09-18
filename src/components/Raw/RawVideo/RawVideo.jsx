import Video from "../../Video";
import animation from "../../Animation.module.scss";
import styled from "./RawVideo.module.scss";

const RawVideo = ({ active }) => (
  <div className={`${styled.RawVideo} ${active ? animation.Active : animation.NoActive}`}>
    <Video active={active} name={"raw"} />
  </div>
);

export default RawVideo;
