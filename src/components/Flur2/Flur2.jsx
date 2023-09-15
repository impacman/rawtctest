import Video from "../Video";
import styled from "./Flur2.module.scss";
import animation from "../Animation.module.scss";

const Flur2 = ({ active }) => (
  <div className={`${styled.Flur2} ${active ? animation.Active : animation.NoActive}`}>
    <Video active={active} name={"flur2"} />
  </div>
);

export default Flur2;
