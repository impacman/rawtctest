import { useEffect, useRef } from "react";
import styled from "./Video.module.scss";

const Video = ({ active, name }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;

    active ? videoRef.current.play() : videoRef.current.pause();
  }, [active]);

  return (
    <div className={styled.Video}>
      <video ref={videoRef} controls={false} loop autoPlay muted="muted" playsInline preload="auto">
        <source src={`/video/${name}.mp4`} type="video/mp4" />
        {/* <source src={`/video/${name}.webm`} type="video/webm" /> */}
      </video>
    </div>
  );
};

export default Video;
