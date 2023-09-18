import styled from "../New.module.scss";
import Video from "../../Video";
import animation from "../../Animation.module.scss";

const N8 = ({ active }) => <div className={`${styled.New} ${active ? animation.Active : animation.NoActive}`}>{active && <Video active={active} name={"new1"} />}</div>;

export default N8;
