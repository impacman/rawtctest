import { useState, useEffect } from "react";

import RawPhoto from "./components/Raw/RawPhoto";
import RawVideo from "./components/Raw/RawVideo";
import Eva from "./components/Eva";
import Flur from "./components/Flur";
import Flur2 from "./components/Flur2";
import Flur3 from "./components/Flur3";
import Sdg from "./components/Sdg";
import MagnetVideo from "./components/Magnet/MagnetVideo";
import MagnetPhoto from "./components/Magnet/MagnetPhoto";

import N1 from "./components/New/N1";
import N2 from "./components/New/N2";
import N3 from "./components/New/N3";
import N4 from "./components/New/N4";
import N5 from "./components/New/N5";
import N6 from "./components/New/N6";
import N7 from "./components/New/N7";
import N8 from "./components/New/N8";
import N9 from "./components/New/N9";

const ComponentDisplay = ({ component, nextComponent }) => (
  <>
    <RawPhoto active={component === "raw-photo" ? true : false} />
    <RawVideo active={component === "raw-video" ? true : false} />
    <MagnetPhoto active={component === "magnet-photo" ? true : false} nextActiveComponent={nextComponent === "magnet-photo"} />
    <MagnetVideo active={component === "magnet-video" ? true : false} />
    <Eva active={component === "eva" ? true : false} />
    <Sdg active={component === "sdg" ? true : false} />
    <Flur active={component === "flur1" ? true : false} />
    <Flur2 active={component === "flur2" ? true : false} />
    <Flur3 active={component === "flur3" ? true : false} />
    <N1 active={component === "new1" ? true : false} />
    <N2 active={component === "new2" ? true : false} />
    <N3 active={component === "new3" ? true : false} />
    <N4 active={component === "new4" ? true : false} />
    <N5 active={component === "new5" ? true : false} />
    <N6 active={component === "new6" ? true : false} />
    <N7 active={component === "new7" ? true : false} />
    <N8 active={component === "new8" ? true : false} />
    <N9 active={component === "new9" ? true : false} />
  </>
);

const App = () => {
  const [currentQueue, setCurrentQueue] = useState(1);
  const [pacmanData, setPacmanData] = useState([
    { id: "1", active: "1", component: "raw-photo", showTime: "100", queue: "1" },
    { id: "2", active: "1", component: "raw-video", showTime: "100", queue: "2" },
    { id: "3", active: "1", component: "sdg", showTime: "100", queue: "3" },
    { id: "4", active: "1", component: "flur1", showTime: "100", queue: "4" },
    { id: "5", active: "1", component: "flur2", showTime: "100", queue: "5" },
    { id: "6", active: "1", component: "flur3", showTime: "100", queue: "6" },
    { id: "7", active: "1", component: "magnet-photo", showTime: "100", queue: "7" },
    { id: "8", active: "0", component: "magnet-video", showTime: "100", queue: "8" },
    { id: "9", active: "1", component: "eva", showTime: "100", queue: "9" },
  ]);
  const [newData, setNewData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("https://sheetdb.io/api/v1/xy2342341o158x8j4z2");
      if (!response.ok) {
        throw new Error("Ошибка запроса к серверу");
      }
      const data = await response.json();
      setPacmanData(data);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  useEffect(() => {
    if (!pacmanData.length) return;

    setNewData(
      pacmanData.map((item) => ({
        id: parseInt(item.id),
        active: item.active.toUpperCase() === "1",
        component: item.component,
        showTime: parseInt(item.showTime),
        queue: parseInt(item.queue),
      }))
    );
  }, [pacmanData]);

  useEffect(() => {
    // Функция для получения следующей активной очереди
    const getNextActiveQueue = (currentQueue) => {
      let nextQueue = currentQueue + 1;
      if (nextQueue > newData.length) {
        nextQueue = 1; // Вернуться к первой очереди
      }

      while (nextQueue !== currentQueue) {
        // Проверить, есть ли активные компоненты в следующей очереди
        const nextActiveComponents = newData.filter((item) => item.queue === nextQueue && item.active);
        if (nextActiveComponents.length > 0) {
          return nextQueue;
        }

        nextQueue++;
        if (nextQueue > newData.length) {
          nextQueue = 1; // Вернуться к первой очереди
        }
      }

      // Если не найдено активных компонентов, вернуть текущую очередь
      return currentQueue;
    };

    const activeComponents = newData.filter((item) => item.queue === currentQueue && item.active);

    if (activeComponents.length > 0) {
      const nextComponent = activeComponents[0];

      const timer = setTimeout(() => {
        setCurrentQueue((prevQueue) => getNextActiveQueue(prevQueue));
      }, nextComponent.showTime);

      return () => clearTimeout(timer);
    } else {
      // Если нет активных компонентов для данной очереди, переключаемся на следующую активную очередь
      setCurrentQueue((prevQueue) => getNextActiveQueue(prevQueue));
    }
  }, [currentQueue, newData]);

  const activeComponents = newData.filter((item) => item.queue === currentQueue && item.active);
  let nextQueue = currentQueue + 1;
  if (nextQueue > newData.length) {
    nextQueue = 1; // Вернуться к первой очереди
  }
  const nextActiveComponent = newData.find((item) => item.queue === nextQueue && item.active);

  if (activeComponents.length === 0) {
    return null;
  }

  return activeComponents.map((item) => <ComponentDisplay key={item} component={item.component} nextComponent={nextActiveComponent && nextActiveComponent.component} />);
};

export default App;
