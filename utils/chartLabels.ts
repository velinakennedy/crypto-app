import formatDate from "./formatDate";
import formatTime from "./formatTime";

const chartLabels = (coinData: number[][], timeframe: string) => {
  const timestamps: string[] = [];
  timeframe === "1D"
    ? coinData.map((data: any) => timestamps.push(`${formatDate(data[0] / 1000, true)} ${formatTime(data[0] / 1000)}`))
    : coinData.map((data: any) => timestamps.push(formatDate(data[0] / 1000, true)));
  return timestamps;
};
export default chartLabels;
