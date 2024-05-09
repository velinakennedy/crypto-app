import { ActiveCoin, ChartDataOptions, CustomOptions } from "@/typings";
import { Chart as ChartJS, ChartArea, ChartDataset, ChartOptions } from "chart.js";
import { RefObject } from "react";
const formatChartData = (coinData: ActiveCoin[], chartType: string, chartRef: RefObject<ChartJS>) => {
    const chart = chartRef.current;
    const customOptions = (coin: number): CustomOptions => {
        switch(coin) {
            case 1: return {background: "1, 241, 227", border: "rgba(1, 241, 227, 1)", lineYAxis: "y1", barYAxis: "y4"};
            case 2: return {background: "125, 64, 255", border: "rgba(125, 64, 255, 1)", lineYAxis: "y2", barYAxis: "y5"};
            default: return {background: "227, 35, 255", border: "rgba(227, 35, 255, 1)", lineYAxis: "y", barYAxis: "y3"};
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
    }

    const createDataset = (coinChoice: number): ChartDataset<"line" | "bar"> => {
        const custom = customOptions(coinChoice);
        return {
            type: chartType === "line" ? "line" as const : "bar" as const,
            label: `${coinData[coinChoice].id[0].toUpperCase()}${coinData[coinChoice].id.slice(1)}`,
            backgroundColor: chart ? createGradient(chart.ctx, chart.chartArea, custom.background) : `rgba(${custom.background}, 0.5)`,
            borderColor: custom.border,
            yAxisID: chartType === "line" ? custom.lineYAxis : custom.barYAxis,
            pointStyle: false,
            fill: true,
            tension: 0.3,
            data: chartType === "line" ? coinData[coinChoice].data.prices.map(
              (element: number[]) => element[1]
            ): coinData[coinChoice].data.total_volumes.map(
                (element: number[]) => element[1]
              ),
        };
    };
    
    const datasets: ChartDataset<"line" | "bar">[]  = [];
    if (coinData) coinData.forEach((coin, index) => datasets.push(createDataset(index)));

    const options: ChartOptions  = {
        maintainAspectRatio: false,
        interaction: {
            mode: "nearest",
            axis: "x"
        },
        scales: {
            x: {
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
            y1: {
                display: false
            },
            y2: {
                display: false
            },
            y3: {
                display: false
            },
            y4: {
                display: false
            },
            y5: {
                display: false
            }
        },
        plugins: {
          legend: {
            display: true,
            position: "bottom",
            align: "start"
          },
        },
      };

    const chartData: ChartDataOptions = {
        datasets,
        options
    };

    return chartData;
  
};
export default formatChartData;