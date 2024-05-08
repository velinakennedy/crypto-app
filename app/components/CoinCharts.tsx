import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LineElement,
  BarElement,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";
import formatChartData from "@/utils/formatChartData";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addCoin } from "../redux/features/activeCoinsSlice";
import { useEffect } from "react";
import { ChartCoinData } from "@/typings";
import formatDate from "@/utils/formatDate";

const CoinCharts = ({currentData, hasData, id, currentDate, labels}: {currentData: ChartCoinData, hasData: boolean, id: string, currentDate: number, labels: string[]}) => {
  ChartJS.register(
    CategoryScale,
    LineElement,
    BarElement,
    LinearScale,
    PointElement,
    Legend,
    Tooltip,
    Filler
  );
  const activeCoins = useSelector((state: RootState) => state.activeCoins.value);
  const dispatch = useDispatch();
  const data = hasData ? {
    id: id,
    data: currentData
  }: null;

  useEffect(() => {
    if (activeCoins.length < 3 && data) {
      dispatch(addCoin(data));
    }
  });

  const lineChartData = activeCoins.length > 0 ? formatChartData(activeCoins, "line") : null;
  const barChartData = activeCoins.length > 0 ? formatChartData(activeCoins, "bar") : null;
  const hasChartData = lineChartData && barChartData;
  const date = formatDate(currentDate*1000);
  return (
    <div>
      {hasChartData && (
        <div className="w-full grid md:grid-rows-2 lg:grid-cols-2 gap-10 p-10">
          <div className="w-full flex flex-col items-center justify-center relative sm:h-[10vh] md:h-[30vh] lg:h-[30vh] 2xl:h-[40vh] p-10 rounded-lg bg-purple-secondary dark:bg-purple-secondary-dark" >
            <h1 className="self-start pb-5 font-bold text-2xl md:text-lg text-purple-text dark:text-white">{date}</h1>
          <Chart
            type= "line"
            options={lineChartData.options}
            data={{labels: labels.map((element: string) =>
              element
            ), datasets: lineChartData.datasets}} height="100%"
          />
          </div>
          <div className="w-full flex flex-col items-center justify-center relative sm:h-[10vh] md:h-[30vh] lg:h-[30vh] 2xl:h-[40vh] p-10 rounded-lg bg-purple-secondary dark:bg-purple-secondary-dark" >
          <div className="self-start pb-5 text-purple-text dark:text-white">
          <h1 className="font-bold text-2xl md:text-lg">Volume 24h</h1>
          <h2 className="text-lg md:text-sm font-thin">{date}</h2>
          </div>
          <Chart
            type= "bar"
            options={barChartData.options}
            data={{labels: labels.map((element: string) =>
              element
            ), datasets: barChartData.datasets}} height="100%"
          />
          </div>
        </div>
      )}
    </div>
  );
};
export default CoinCharts;
