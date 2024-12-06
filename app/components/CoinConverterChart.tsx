import { Area, AreaChart, Legend, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import CalculatorChartTooltip from "./CalculatorChartTooltip";
import { CoinChartData } from "@/typings";

const CoinConverterChart = ({ name, chartData }: { name: { fromCoin: string; toCoin: string }; chartData: CoinChartData[] }) => {
  return (
    <div className="relative flex flex-col justify-center items-center p-5 w-full h-full">
      <h1 className="pb-5 font-bold text-lg text-purple-text md:text-2xl dark:text-white self-start">
        {name.fromCoin} to {name.toCoin}
      </h1>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#04bfb4" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#04bfb4" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <XAxis dataKey="day" />
          <YAxis dataKey={name.toCoin} domain={["auto", "dataMax"]} hide />
          <Tooltip content={<CalculatorChartTooltip />} />
          <Legend />
          <Area dataKey={name.toCoin} type="natural" fill="url(#gradient)" fillOpacity={0.4} stroke="#04bfb4" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
export default CoinConverterChart;
