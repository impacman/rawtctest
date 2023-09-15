import styled from "../New.module.scss";
import Video from "../../Video";

const N4 = ({ active }) => (
  <div className={styled.New}>
    <Video active={active} name={"new4"} />
  </div>
);

export default N4;
