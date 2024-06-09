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
  ChartDataset,
  LineController,
  BarController
} from "chart.js";
import formatChartData from "@/utils/formatChartData";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addCoin, editCoin } from "../redux/features/activeCoinsSlice";
import { useEffect, useRef, useState } from "react";
import { ActiveCoin, ChartCoinData, ChartDataOptions } from "@/typings";
import formatDate from "@/utils/formatDate";
import chartLabels from "@/utils/chartLabels";

const CoinCharts = ({currentData, hasData, id, currentDate}: {currentData: ChartCoinData, hasData: boolean, id: string, currentDate: number}) => {
  ChartJS.register(
    CategoryScale,
    LineElement,
    BarElement,
    LinearScale,
    PointElement,
    Legend,
    Tooltip,
    Filler,
    LineController,
    BarController
  );
  const [lineChartData, setLineChartData] = useState<ChartDataOptions>({datasets: [], options: {}});
  const [barChartData, setBarChartData] = useState<ChartDataOptions>({datasets: [], options: {}});
  const [multiChartData, setMultiChartData] = useState<ChartDataset<"line" | "bar">[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const chartRef = useRef<ChartJS>(null);
  const activeCoins = useSelector((state: RootState) => state.activeCoins.value);
  const dispatch = useDispatch();
  const chartDate = formatDate(currentDate);
  const {status} = useSelector (
    (state: RootState ) => state.timeframe
  );
  
  useEffect(() => {
    if (hasData) {
      const data: ActiveCoin = {
        id: id,
        data: currentData
      };
      if (activeCoins.find((coin: ActiveCoin) => coin.id === data.id)) {
        dispatch(editCoin(data));
      } else if (activeCoins.length < 3) {
        dispatch(addCoin(data));
      }
      setLabels(chartLabels(currentData.prices, status));
    }
  }, [hasData, id, currentData, activeCoins, dispatch, status]);

  useEffect(() => {
    const isSuccess = activeCoins.length > 0 && chartRef.current;
    if (isSuccess) {
      const updatedLineData: ChartDataOptions = formatChartData(activeCoins, "line", chartRef);
      const updatedBarData: ChartDataOptions = formatChartData(activeCoins, "bar", chartRef);
      const updatedMultiData: ChartDataset<"line" | "bar">[] = [];
      setLineChartData(updatedLineData);
      setBarChartData(updatedBarData);
      updatedLineData.datasets.forEach((dataset) => updatedMultiData.push(dataset));
      updatedBarData.datasets.forEach((dataset) => updatedMultiData.push(dataset));
      setMultiChartData(updatedMultiData);
    } else {
      setLineChartData({datasets: [], options: {}});
      setBarChartData({datasets: [], options: {}});
      setMultiChartData([]);
    }
  }, [activeCoins]);

  return (
    <div>
          <div>
          <div className="w-full grid-cols-2 gap-10 p-10 hidden xl:grid">
          <div className="w-full flex flex-col items-center justify-center relative lg:h-[30vh] xl:h-[30vh] p-10 rounded-lg bg-purple-secondary dark:bg-purple-secondary-dark" >
            <h1 className="self-start pb-5 font-bold text-2xl md:text-lg text-purple-text dark:text-white">{chartDate}</h1>
          <Chart
            type= "line"
            ref={chartRef}
            options={lineChartData.options}
            data={{labels: labels, datasets: lineChartData.datasets}} height="100%"
          />
          </div>
          <div className="w-full flex flex-col items-center justify-center relative lg:h-[30vh] xl:h-[30vh] p-10 rounded-lg bg-purple-secondary dark:bg-purple-secondary-dark" >
          <div className="self-start pb-5 text-purple-text dark:text-white">
          <h1 className="font-bold text-2xl md:text-lg">Volume 24h</h1>
          <h2 className="text-lg md:text-sm font-thin">{chartDate}</h2>
          </div>
          <Chart
            type= "bar"
            options={barChartData.options}
            data={{labels: labels, datasets: barChartData.datasets}} height="100%"
          />
          </div>
        </div>
        
          <div className="m-10 flex flex-col items-center justify-center relative h-[30vh] sm:h-[30vh] md:h-[30vh] lg:h-[30vh] xl:hidden p-10 rounded-lg bg-purple-secondary dark:bg-purple-secondary-dark" >
          <div className="self-start pb-5 text-purple-text dark:text-white">
          <h1 className="font-bold text-2xl sm:text-xl">{chartDate}</h1>
          </div>
          <Chart
            type= "line"
            options={barChartData.options}
            data={{labels: labels, datasets: multiChartData}} height="100%"
          />
          </div>
        </div>
    </div>
  );
};
export default CoinCharts;
