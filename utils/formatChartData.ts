import { ActiveCoin, ChartDataOptions, CustomOptions } from "@/typings";
import { Chart as ChartJS, ChartDataset } from "chart.js";
import { RefObject } from "react";
import createGradient from "./createGradient";
import chartConfig from "./chartConfig";
const formatChartData = (
  coinData: ActiveCoin[],
  chartType: string,
  chartRef: RefObject<ChartJS>,
  startDate: number
) => {
  const chart = chartRef.current;
  const customOptions = (coin: number): CustomOptions => {
    switch (coin) {
      case 1:
        return {
          background: "1, 241, 227",
          border: "rgba(1, 241, 227, 1)",
          lineYAxis: "y1",
          barYAxis: "y4",
        };
      case 2:
        return {
          background: "125, 64, 255",
          border: "rgba(125, 64, 255, 1)",
          lineYAxis: "y2",
          barYAxis: "y5",
        };
      default:
        return {
          background: "227, 35, 255",
          border: "rgba(227, 35, 255, 1)",
          lineYAxis: "y",
          barYAxis: "y3",
        };
    }
  };

  const createDataset = (coinChoice: number): ChartDataset<"line" | "bar"> => {
    const custom = customOptions(coinChoice);
    const dataByTimeframe =
      chartType === "line"
        ? coinData[coinChoice].data.prices.filter(
            (element: number[]) => element[0] >= startDate
          )
        : coinData[coinChoice].data.total_volumes.filter(
            (element: number[]) => element[0] >= startDate
          );
    return {
      type: chartType === "line" ? ("line" as const) : ("bar" as const),
      label: `${coinData[coinChoice].id[0].toUpperCase()}${coinData[
        coinChoice
      ].id.slice(1)}`,
      backgroundColor: chart
        ? createGradient(chart.ctx, chart.chartArea, custom.background)
        : `rgba(${custom.background}, 0.5)`,
      borderColor: custom.border,
      yAxisID: chartType === "line" ? custom.lineYAxis : custom.barYAxis,
      pointStyle: false,
      fill: true,
      tension: 0.3,
      data: dataByTimeframe.map((element: number[]) => element[1]),
    };
  };

  const datasets: ChartDataset<"line" | "bar">[] = [];
  if (coinData)
    coinData.forEach((coin, index) => datasets.push(createDataset(index)));

  const chartData: ChartDataOptions = {
    datasets,
    options: chartConfig("large"),
  };

  return chartData;
};
export default formatChartData;
