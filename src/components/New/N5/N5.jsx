import styled from "../New.module.scss";
import Video from "../../Video";

const N5 = ({ active }) => (
  <div className={styled.New}>
    <Video active={active} name={"new5"} />
  </div>
);

export default N5;
