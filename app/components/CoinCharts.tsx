"use client";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useGetChartDataQuery } from "../redux/features/coinChartInfoSlice";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LineElement,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";
import formatChartLabel from "@/utils/formatChartLabel";

const CoinCharts = () => {
  Chart.register(
    CategoryScale,
    LineElement,
    LinearScale,
    PointElement,
    Legend,
    Tooltip,
    Filler
  );
  const currency = useSelector((state: RootState) => state.currency.value);
  const id = "bitcoin";
  const to = Math.floor(Date.now() / 1000);
  const from = to - 86400;
  const { currentData, isSuccess } = useGetChartDataQuery({
    id,
    currency,
    from,
    to,
  });
  const hasData = currentData && isSuccess;

  const options = {
    maintainAspectRation: false,
    scales: {
        x: {
            ticks: {
                display: false,
            },
            grid: {
                display: false
            }
        }
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        borderColor: "rgba(112, 114, 234, 1)"
      },
    },
  };
  return (
    <div>
      {hasData && (
        <div className="w-full grid grid-cols-2">
          <div className="w-full flex items-center relative h-[10vh] p-10 rounded-lg bg-purple-secondary dark:bg-purple-secondary-dark" >
          <Line
            options={options}
            data={{
              labels: currentData.prices.map((element: number[]) =>
                formatChartLabel(to, element[0])
              ),
              datasets: [
                {
                  backgroundColor: "rgba(113, 115, 235, 0.3)",
                  borderColor: "rgba(112, 114, 234, 1)",
                  pointStyle: false,
                  fill: true,
                  data: currentData.prices.map(
                    (element: number[]) => element[1]
                  ),
                },
              ],
            }}
          />
          </div>
        </div>
      )}
    </div>
  );
};
export default CoinCharts;
