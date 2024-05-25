"use client";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LineElement,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler,
  LineController
} from "chart.js";
import { useEffect, useRef, useState } from "react";
import formatMarketChartData from "@/utils/formatMarketChartData";
import { MarketChartDataOptions } from "@/typings";
const MarketChart = ({data}: {data: [number, number[]]}) => {
    ChartJS.register(
        CategoryScale,
        LineElement,
        LinearScale,
        PointElement,
        Legend,
        Tooltip,
        Filler,
        LineController
    );
    const chartRef = useRef<ChartJS>(null);
    const [lineChartData, setLineChartData] = useState<MarketChartDataOptions>({dataset: [], options: {}});
    const [everyThreeHours, setEveryThreeHours] = useState<number[]>([]);

    useEffect(() => {
      const filteredData = data[1].filter((data, index) => {
        if (index === 0 || index % 3 === 0) {
          return data;
        }
      });
      setEveryThreeHours(filteredData);
      if (chartRef.current) {
        const isPositive: boolean = data[0] >= 0;
        const newLineData: MarketChartDataOptions = formatMarketChartData(everyThreeHours, isPositive, chartRef);
        setLineChartData(newLineData);
      }
    }, [data, everyThreeHours]);

  return (
    <div className="w-[20vw] relative h-[8vh]" >
        <Chart
            type= "line"
            ref={chartRef}
            options={lineChartData.options}
            data={{labels: everyThreeHours.map((price, index) => index), datasets: lineChartData.dataset}} height="100%"
        />
    </div>
  );
};
export default MarketChart;