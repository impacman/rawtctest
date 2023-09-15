import Video from "../../Video";
import styled from "./Magnet.module.scss";
import animation from "../../Animation.module.scss";

const Magnet = ({ active }) => <div className={`${styled.Magnet} ${active ? animation.Active : animation.NoActive}`}>{/* <Video active={active} name={"magnet"} /> */}</div>;

export default Magnet;
