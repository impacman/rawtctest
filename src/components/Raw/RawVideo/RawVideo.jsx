import Video from "../../Video";
import styled from "./RawVideo.module.scss";

const RawVideo = ({ active }) => (
  <div className={`${styled.RawVideo} ${active ? styled.active : ""}`}>
    <Video active={active} name={"raw"} />
  </div>
);

export default RawVideo;
