import { ActiveCoin, Option, ChartDataOptions, CustomOptions } from "@/typings";
import { ChartDataset } from "chart.js";
const formatChartData = (coinData: ActiveCoin[], chartType: string) => {
    const customOptions = (coin: number): CustomOptions => {
        switch(coin) {
            case 1: return {background: "rgba(227, 35, 255, 0.3)", border: "rgba(227, 35, 255, 1)", yAxis: "y1"};
            case 2: return {background: "rgba(125, 64, 255, 0.3)", border: "rgba(125, 64, 255, 1)", yAxis: "y2"};
            default: return {background: "rgba(1, 241, 227, 0.3)", border: "rgba(1, 241, 227, 1)", yAxis: "y"};
        }
    };

    const createDataset = (coinChoice: number): ChartDataset<"line" | "bar"> => {
        const custom = customOptions(coinChoice);
        return {
            type: chartType === "line" ? "line" as const : "bar" as const,
            label: `${coinData[coinChoice].id[0].toUpperCase()}${coinData[coinChoice].id.slice(1)}`,
            backgroundColor: custom.background,
            borderColor: custom.border,
            yAxisID: custom.yAxis,
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

    const options: Option = {
        maintainAspectRation: false,
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