import styled from "../New.module.scss";
import Video from "../../Video";

const N3 = ({ active }) => (
  <div className={styled.New}>
    <Video active={active} name={"new3"} />
  </div>
);

export default N3;
