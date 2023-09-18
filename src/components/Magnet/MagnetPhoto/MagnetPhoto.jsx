import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import animation from "../../Animation.module.scss";
import styled from "./MagnetPhoto.module.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// const userChangeTime = 2500;

const mockData = [
  "https://f.mirror-ai.net/x/LGZ3IxM82c47k5LqzbqNNuY2FdTuhi0uNpHkTynFx9WPS-yLvZvYofO0m_tZla8sVP_oidRkRN3tvEBQdXAaNZTglaiPXwvviyuCmBey2TSslZIsMj5dJIswrTlNYCjJ?sz=1080",
  "https://f.mirror-ai.net/x/erFV_amxpEbSCjwbqNJnGwdCFHctW20L_lG4VkIADZR-hPNQYRUzHxwzIO8XKY1QrK30uCa-j0XWoKW-dNYiJGLZ5XmJYPBqcS0LrXN-jKEQgeIEIqFIgUvsR21JGLYW?sz=1080",
  "https://f.mirror-ai.net/x/ySjEHMwP1njNw5e48U2efJr85QD-RhmIQ1zjzbPGukEIv3OuNkFPiW3bHYQU7OOptaJtTie15NxnkJlecAwfzs0EL-YKQJ91w-Xz_ZaTZgmeLHvUTD-r6P7LIyedurdt?sz=1080",
  "https://f.mirror-ai.net/x/_X3IEZlrHi9q5WorYydmUfsEoMoYC_hoUTVuqgxM2hcJCSOF-BbdvRewg6y6Qd8cqq2OH3U1U7SAyiCxJkaD9iMKB__6-ykSPkcm6nMvnkjoP3Za6Dtte_UfKmZmYrpu?sz=1080",
  "https://f.mirror-ai.net/x/ClxZ-Wr-a8KY5FojwxItr-OQsGo74PxCkbkUorsUJUWluKexw6zE-NUfuDP_jo9-4w2cPcSt4_TPk8P2n9N6k_yjXB_tNRKQLuRDY4rhEQpJLYfG4CB9qXKrjpD4rGPa?sz=1080",
  "https://f.mirror-ai.net/x/joVi37ls1lm3eAbk3tysiXKP6VvpYahekf_s70TrmoBGKCNNAbcSjJUaUx-sFufLO3shplXaxgNCSEztxl2gj_VjkcVWwLGZKq7alEMlQmYjxzEAV1JOcWZvzKcg7NTU?sz=1080",
];
const MagnetPhoto = ({ active, nextActiveComponent }) => {
  const carouselRef = useRef(null);
  const [users, setUsers] = useState([...mockData]);
  const [transitionTime, setTransitionTime] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false); // Добавляем состояние для отслеживания загрузки изображений
  const handleImageLoad = (evt) => {
    setIsLoading(true);
  };

  useLayoutEffect(() => {
    if (!nextActiveComponent) {
      return;
    }
    const fetchData = async () => {
      try {
        const response = await fetch(
          new Request(`https://api.magnetapp.co/demo/crunch/bodies/list`, {
            method: "GET",
            headers: {
              "content-type": "application/json",
            },
          })
        );
        const data = await response.json();
        if (!data || !data.Bodies) {
          return;
        }
        setUsers([...(data.Bodies || []).reverse(), ...mockData]);
      } catch (error) {
        console.warn("error");
      }
    };
    fetchData();
  }, [nextActiveComponent]);

  useLayoutEffect(() => {
    if (active && carouselRef.current) {
      carouselRef.current.moveTo(0);
    }
  }, [active]);

  useEffect(() => {
    setTransitionTime(active ? undefined : 0);
  }, [active]);

  return (
    <div className={`${styled.MagnetPhoto} ${active ? animation.Active : animation.NoActive}`}>
      <Carousel
        ref={carouselRef}
        dynamicHeight
        className={styled.User}
        showArrows={false}
        showStatus={false}
        showThumbs={false}
        showIndicators={false}
        infiniteLoop={true}
        autoPlay={active}
        selectedItem={active ? 0 : undefined}
        interval={5000}
        animationHandler={active ? "slide" : "none"}
        transitionTime={transitionTime}
      >
        {users.map((url) => (
          <div key={url} className={`${styled.UserItem} ${styled.Active}`}>
            <div className={styled.WrapPhoto}>
              <div className={`${styled.Photo} ${styled.Big} ${isLoading ? styled.PhotoLoaded : ""}`}>
                <img src={url} alt="" onLoad={handleImageLoad} />
              </div>
            </div>
          </div>
        ))}
      </Carousel>
      <div className={styled.Header}>
        <img src="/magnet/logo_magnet_horiz_white.svg" alt="logo" />
        <div className={styled.HeaderRight}>
          <img src="/magnet/live_text.svg" alt="live" />
          <img className={styled.HeaderRightDot} src="/magnet/live_oval.svg" alt="oval" />
        </div>
      </div>
    </div>
  );
};

export default MagnetPhoto;
