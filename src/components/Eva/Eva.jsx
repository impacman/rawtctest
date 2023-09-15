import Video from "../Video";
import styled from "./Eva.module.scss";
import animation from "../Animation.module.scss";

const Eva = ({ active }) => (
  <div className={`${styled.Eva} ${active ? animation.Active : animation.NoActive}`}>
    <Video active={active} name={"eva"} />
  </div>
);

export default Eva;
