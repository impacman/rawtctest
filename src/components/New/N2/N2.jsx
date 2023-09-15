import styled from "../New.module.scss";
import Video from "../../Video";

const N2 = ({ active }) => (
  <div className={styled.New}>
    <Video active={active} name={"new2"} />
  </div>
);

export default N2;
