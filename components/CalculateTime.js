export function calculateTime(startTime, endTime) {
  const differenceInSeconds = Math.floor((endTime - startTime) / 1000);
  const minutes = Math.floor(differenceInSeconds / 60);
  const seconds = differenceInSeconds % 60;
  return { minutes, seconds };
}
