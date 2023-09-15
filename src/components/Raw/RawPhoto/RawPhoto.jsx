import React, { useState, useEffect } from "react";
import styled from "./RawPhoto.module.scss";
import animation from "../../Animation.module.scss";
import Logo from "../Logo/Logo";

const logos = [1, 2, 3, 4, 5, 6, 7, 8];
const userChangeTime = 10000;

const users = [
  {
    userId: 1,
    birthday: null,
    name: "User, 1",
    latestRawPhoto: {
      primary: {
        reference: "https://www.raw.app/images/shorts/desktop/jpg/short-1-big.jpg",
      },
      secondary: {
        reference: "https://www.raw.app/images/shorts/desktop/jpg/short-1-min.jpg",
      },
    },
  },
  {
    userId: 2,
    birthday: null,
    name: "User, 2",
    latestRawPhoto: {
      primary: {
        reference: "https://www.raw.app/images/shorts/desktop/jpg/short-2-big.jpg",
      },
      secondary: {
        reference: "https://www.raw.app/images/shorts/desktop/jpg/short-2-min.jpg",
      },
    },
  },
  {
    userId: 3,
    birthday: null,
    name: "User, 3",
    latestRawPhoto: {
      primary: {
        reference: "https://www.raw.app/images/shorts/desktop/jpg/short-3-big.jpg",
      },
      secondary: {
        reference: "https://www.raw.app/images/shorts/desktop/jpg/short-3-min.jpg",
      },
    },
  },
  {
    userId: 4,
    birthday: null,
    name: "User, 4",
    latestRawPhoto: {
      primary: {
        reference: "https://www.raw.app/images/shorts/desktop/jpg/short-4-big.jpg",
      },
      secondary: {
        reference: "https://www.raw.app/images/shorts/desktop/jpg/short-4-min.jpg",
      },
    },
  },
  {
    userId: 5,
    birthday: null,
    name: "User, 5",
    latestRawPhoto: {
      primary: {
        reference: "https://www.raw.app/images/shorts/desktop/jpg/short-5-big.jpg",
      },
      secondary: {
        reference: "https://www.raw.app/images/shorts/desktop/jpg/short-5-min.jpg",
      },
    },
  },
  {
    userId: 6,
    birthday: null,
    name: "User, 6",
    latestRawPhoto: {
      primary: {
        reference: "https://www.raw.app/images/shorts/desktop/jpg/short-6-big.jpg",
      },
      secondary: {
        reference: "https://www.raw.app/images/shorts/desktop/jpg/short-6-min.jpg",
      },
    },
  },
  {
    userId: 7,
    birthday: null,
    name: "User, 7",
    latestRawPhoto: {
      primary: {
        reference: "https://www.raw.app/images/shorts/desktop/jpg/short-1-big.jpg",
      },
      secondary: {
        reference: "https://www.raw.app/images/shorts/desktop/jpg/short-1-min.jpg",
      },
    },
  },
  {
    userId: 8,
    birthday: null,
    name: "User, 8",
    latestRawPhoto: {
      primary: {
        reference: "https://www.raw.app/images/shorts/desktop/jpg/short-2-big.jpg",
      },
      secondary: {
        reference: "https://www.raw.app/images/shorts/desktop/jpg/short-2-min.jpg",
      },
    },
  },
  {
    userId: 9,
    birthday: null,
    name: "User, 9",
    latestRawPhoto: {
      primary: {
        reference: "https://www.raw.app/images/shorts/desktop/jpg/short-3-big.jpg",
      },
      secondary: {
        reference: "https://www.raw.app/images/shorts/desktop/jpg/short-3-min.jpg",
      },
    },
  },
  {
    userId: 10,
    birthday: null,
    name: "User, 10",
    latestRawPhoto: {
      primary: {
        reference: "https://www.raw.app/images/shorts/desktop/jpg/short-4-big.jpg",
      },
      secondary: {
        reference: "https://www.raw.app/images/shorts/desktop/jpg/short-4-min.jpg",
      },
    },
  },
];

const RawPhoto = ({ active }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // Добавляем состояние для отслеживания загрузки изображений

  useEffect(() => {
    if (active && isLoading) {
      const intervalId = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % users.length);
      }, userChangeTime);

      return () => clearInterval(intervalId);
    }
  }, [active, isLoading]);

  const handleImageLoad = (evt) => {
    setIsLoading(true);
  };

  return (
    <div className={`${styled.RawPhoto} ${active ? animation.Active : animation.NoActive}`}>
      <div className={styled.Animation}>
        <div className={`${styled.Scroll} ${styled.Left}`}>
          {logos.map((el) => (
            <div key={el} className={styled.Icon}>
              <Logo />
            </div>
          ))}
        </div>
        <div className={`${styled.Scroll} ${styled.Right}`}>
          {logos.map((el) => (
            <div key={el} className={styled.Icon}>
              <Logo />
            </div>
          ))}
        </div>
      </div>
      <div className={styled.User}>
        {users.map((user, index) => (
          <div key={user.userId} className={`${styled.UserItem} ${index === activeIndex ? styled.Active : ""}`}>
            <div className={styled.Name}>{user.name}</div>
            <div className={styled.WrapPhoto}>
              <div className={`${styled.Photo} ${styled.Big} ${isLoading ? styled.PhotoLoaded : ""}`}>
                <img src={user.latestRawPhoto.primary.reference} alt="" onLoad={handleImageLoad} />
              </div>
              <div className={`${styled.Photo} ${styled.Min} ${isLoading ? styled.PhotoLoaded : ""}`}>
                <img src={user.latestRawPhoto.secondary.reference} alt="" onLoad={handleImageLoad} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RawPhoto;
