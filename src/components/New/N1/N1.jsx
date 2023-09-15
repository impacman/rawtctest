import styled from "../New.module.scss";
import Video from "../../Video";

const N1 = ({ active }) => (
  <div className={styled.New}>
    <Video active={active} name={"new1"} />
  </div>
);

export default N1;
