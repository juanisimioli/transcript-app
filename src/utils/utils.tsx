export const formatTime = (time: number): string => {
  const minutes: number = Math.floor(time / 60);
  const seconds: number = Math.floor(time % 60);

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
};
