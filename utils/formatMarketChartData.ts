import { MarketChartDataOptions } from "@/typings";
import { Chart as ChartJS, ChartDataset } from "chart.js";
import { RefObject } from "react";
import pickColor from "./pickColor";
import createGradient from "./createGradient";
import chartConfig from "./chartConfig";
const formatMarketChartData = (priceData: number[], isPositive: boolean, chartRef: RefObject<ChartJS>) => {
    const chart = chartRef.current;

    const createDataset = (): ChartDataset<"line"> => {
        const custom = pickColor(isPositive);
        return {
            type: "line" as const,
            backgroundColor: chart ? createGradient(chart.ctx, chart.chartArea, custom.background) : `rgba(${custom.background}, 0.5)`,
            borderColor: custom.border,
            pointStyle: false,
            fill: true,
            tension: 0.3,
            data: priceData.map(
              (price: number) => price
            ),
        };
    };

    const dataset: ChartDataset<"line">[]  = [];
    dataset.push(createDataset());

    const chartData: MarketChartDataOptions = {
        dataset,
        options: chartConfig("small")
    };

    return chartData;
  
};
export default formatMarketChartData;