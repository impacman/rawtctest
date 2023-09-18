import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import ComponentDisplay from "../ComponentDisplay";

const Controller = () => {
  const time = 60000;
  const [currentQueue, setCurrentQueue] = useState(1);
  const [pacmanData, setPacmanData] = useState([
    { id: "1", active: "0", component: "raw-photo", showTime: "1000", queue: "1" },
    { id: "2", active: "0", component: "raw-video", showTime: "1000", queue: "2" },
    { id: "3", active: "0", component: "sdg", showTime: "1000", queue: "3" },
    { id: "4", active: "0", component: "flur1", showTime: "1000", queue: "4" },
    { id: "5", active: "0", component: "flur2", showTime: "1000", queue: "5" },
    { id: "6", active: "1", component: "flur3", showTime: "2000", queue: "6" },
    { id: "7", active: "1", component: "magnet-photo", showTime: "60000", queue: "7" },
    { id: "8", active: "0", component: "magnet-video", showTime: "1000", queue: "8" },
    { id: "9", active: "0", component: "eva", showTime: "1000", queue: "9" },
  ]);
  const [newData, setNewData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("https://sheetdb.io/api/v1/xy1onio45158x8j4z2");
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

  //   // const intervalId = setInterval(fetchData, time);
  //   // return () => clearInterval(intervalId);
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
      setCurrentQueue((prevQueue) => getNextActiveQueue(prevQueue));
    }
  }, [currentQueue, newData]);

  const activeComponents = newData.filter((item) => item.queue === currentQueue && item.active);

  let nextQueue = currentQueue + 1;
  nextQueue > newData.length && (nextQueue = 1);

  const nextActiveComponent = newData.find((item) => item.queue === nextQueue && item.active);

  if (activeComponents.length === 0) {
    return null;
  }

  return activeComponents.map((item) => (
    <AnimatePresence key={item.id}>
      <ComponentDisplay component={item.component} nextComponent={nextActiveComponent && nextActiveComponent.component} />
    </AnimatePresence>
  ));
};

export default Controller;
