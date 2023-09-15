import Video from "../Video";
import styled from "./Sdg.module.scss";
import animation from "../Animation.module.scss";

const Sdg = ({ active }) => (
  <div className={`${styled.Sdg} ${active ? animation.Active : animation.NoActive}`}>
    <Video active={active} name={"sdg"} />
  </div>
);

export default Sdg;
