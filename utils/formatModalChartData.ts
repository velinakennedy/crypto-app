import { ModalChartDataOptions } from "@/typings";
import { Chart as ChartJS, ChartDataset } from "chart.js";
import { RefObject } from "react";
import createGradient from "./createGradient";
import chartConfig from "./chartConfig";
import chartLabels from "./chartLabels";
const formatModalChartData = (coinData: number[][], chartRef: RefObject<ChartJS>, name: string) => {
  const chart = chartRef.current;

  const createDataset = (): ChartDataset<"line"> => {
    const custom = { background: "125, 64, 255", border: "rgba(125, 64, 255, 1)" };
    return {
      type: "line" as const,
      label: name,
      backgroundColor: chart ? createGradient(chart.ctx, chart.chartArea, custom.background) : `rgba(${custom.background}, 0.5)`,
      borderColor: custom.border,
      pointStyle: false,
      fill: true,
      tension: 0.3,
      data: coinData.map((element: number[]) => element[1]),
    };
  };

  const dataset: ChartDataset<"line">[] = [];
  dataset.push(createDataset());

  const chartData: ModalChartDataOptions = {
    dataset,
    options: chartConfig("modal"),
    labels: chartLabels(coinData, ""),
  };

  return chartData;
};
export default formatModalChartData;
