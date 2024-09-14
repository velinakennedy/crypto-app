import formatDate from "./formatDate";
import formatTime from "./formatTime";

const chartLabels = (coinData: number, timeframe: string): string => {
  const timestamp: string = timeframe === "1D" ? `${formatTime(coinData / 1000)}` : `${formatDate(coinData / 1000, true)}`;
  return timestamp;
};
export default chartLabels;
