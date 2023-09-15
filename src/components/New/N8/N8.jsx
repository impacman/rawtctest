import styled from "../New.module.scss";
import Video from "../../Video";

const N8 = ({ active }) => (
  <div className={styled.New}>
    <Video active={active} name={"new8"} />
  </div>
);

export default N8;
