import styled from "../New.module.scss";
import Video from "../../Video";
import animation from "../../Animation.module.scss";

const N6 = ({ active }) => <div className={`${styled.New} ${active ? animation.Active : animation.NoActive}`}>{active && <Video active={active} name={"new1"} />}</div>;

export default N6;
