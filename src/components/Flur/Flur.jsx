import Video from "../Video";
import styled from "./Flur.module.scss";
import animation from "../Animation.module.scss";

const Flur = ({ active }) => (
  <div className={`${styled.Flur} ${active ? animation.Active : animation.NoActive}`}>
    <Video active={active} name={"flur1"} />
  </div>
);

export default Flur;
