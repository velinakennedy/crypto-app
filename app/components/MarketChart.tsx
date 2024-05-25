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

    useEffect(() => {
      if (chartRef.current) {
        const isPositive: boolean = data[0] >= 0;
        const newLineData: MarketChartDataOptions = formatMarketChartData(data[1], isPositive, chartRef);
        setLineChartData(newLineData);
      }
    }, [data]);

  return (
    <div className=" w-[30vh] flex items-center justify-center relative h-[5vh] p-3 rounded-lg" >
        <Chart
            type= "line"
            ref={chartRef}
            options={lineChartData.options}
            data={{labels: data[1].map((price, index) => index), datasets: lineChartData.dataset}} height="100%"
        />
    </div>
  );
};
export default MarketChart;