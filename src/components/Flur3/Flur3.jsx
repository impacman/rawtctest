import Video from "../Video";
import styled from "./Flur3.module.scss";
import animation from "../Animation.module.scss";

const Flur3 = ({ active }) => (
  <div className={`${styled.Flur3} ${active ? animation.Active : animation.NoActive}`}>
    <Video active={active} name={"flur3"} />
  </div>
);

export default Flur3;
