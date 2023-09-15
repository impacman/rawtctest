export const getVideosFromLocalStorage = () => {
  const cachedVideosData = localStorage.getItem("cachedVideos");
  if (cachedVideosData) {
    return JSON.parse(cachedVideosData);
  }
  return [];
};
