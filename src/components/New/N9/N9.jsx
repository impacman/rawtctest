import styled from "../New.module.scss";
import Video from "../../Video";

const N9 = ({ active }) => (
  <div className={styled.New}>
    <Video active={active} name={"new9"} />
  </div>
);

export default N9;
