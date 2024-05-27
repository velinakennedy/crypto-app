import { ColorOptions, MarketChartDataOptions } from "@/typings";
import { Chart as ChartJS, ChartArea, ChartDataset, ChartOptions } from "chart.js";
import { RefObject } from "react";
const formatMarketChartData = (priceData: number[], isPositive: boolean, chartRef: RefObject<ChartJS>) => {
    const chart = chartRef.current;
    const pickColor = (): ColorOptions => {
        if (isPositive) {
            return {background: "39, 208, 208", border: "rgba(39, 208, 208, 1)"};
        } else {
            return {background: "254, 35, 100", border: "rgba(254, 35, 100, 1)"};
        }
    };

    const createGradient = (ctx: CanvasRenderingContext2D, area: ChartArea, color: string): CanvasGradient => {
        const colorStart = `rgba(${color}, 0.1)`;
        const colorMid = `rgba(${color}, 0.4)`;
        const colorEnd = `rgba(${color}, 0.7)`;
      
        const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);
      
        gradient.addColorStop(0, colorStart);
        gradient.addColorStop(0.5, colorMid);
        gradient.addColorStop(1, colorEnd);
      
        return gradient;
    };

    const createDataset = (): ChartDataset<"line"> => {
        const custom = pickColor();
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

    const options: ChartOptions  = {
        maintainAspectRatio: false,
        interaction: {
            mode: "nearest",
            axis: "x"
        },
        scales: {
            x: {
                display: false,
                ticks: {
                    display: true,
                },
                grid: {
                    display: false
                }
            },
            y: {
                display: false
            },
        },
        plugins: {
          legend: {
            display: false
          },
        },
      };

    const chartData: MarketChartDataOptions = {
        dataset,
        options
    };

    return chartData;
  
};
export default formatMarketChartData;