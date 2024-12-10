import { CoinChartData, CoinDataItem } from "@/typings";
import chartLabels from "./chartLabels";

export const convert = (amount: number, fromCurrency: number, toCurrency: number): number => {
  return +((fromCurrency / toCurrency) * amount).toFixed(4);
};

export const convertAll = (
  fromCoinPrices: [[number, number]],
  toCoinPrices: [[number, number]],
  coinName: string,
  startDate: number,
  status: string
) => {
  const formattedPrices: CoinChartData[] = [];
  if (toCoinPrices.length < fromCoinPrices.length) {
    toCoinPrices.map((data: [number, number], index: number) => {
      if (data[0] >= startDate) {
        const dataItem: CoinChartData = {
          day: chartLabels(data[0], status),
          [coinName]: +(fromCoinPrices[index][1] / data[1]).toFixed(4),
        };
        formattedPrices.push(dataItem);
      }
    });
  } else {
    fromCoinPrices.map((data: [number, number], index: number) => {
      if (data[0] >= startDate) {
        const dataItem: CoinChartData = {
          day: chartLabels(data[0], status),
          [coinName]: +(data[1] / toCoinPrices[index][1]).toFixed(4),
        };
        formattedPrices.push(dataItem);
      }
    });
  }
  return formattedPrices;
};
