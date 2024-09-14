import { Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Area, ComposedChart, BarChart } from "recharts";
import { AllCoinChartData } from "@/typings";
import CustomChartTooltip from "./CustomChartTooltip";
import formatIdList from "@/utils/formatIdList";
import { colors } from "@/utils/pickColor";

const PriceVolumeCharts = ({ data, chartDate }: { data: AllCoinChartData; chartDate: string | undefined }) => {
  const { priceIdList, volumeIdList } = formatIdList({ ...data.priceData[0], ...data.volumeData[0] });
  return (
    <div className="gap-10 hidden xl:grid grid-cols-2 p-10 w-full">
      <div className="relative flex flex-col justify-center items-center bg-purple-secondary dark:bg-purple-secondary-dark p-10 rounded-lg w-full lg:h-[30vh] xl:h-[30vh] min-h-72">
        <h1 className="pb-5 font-bold text-2xl text-purple-text md:text-lg dark:text-white self-start">{chartDate}</h1>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data.priceData}>
            <defs>
              <linearGradient id="0" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#E323FF" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#E323FF" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7D40FF" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#7D40FF" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#04bfb4" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#04bfb4" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" />
            {priceIdList.map((coinId) => (
              <YAxis key={coinId} dataKey={`${coinId}`} yAxisId={`${coinId}`} domain={["auto", "dataMax"]} allowDataOverflow hide />
            ))}
            <Tooltip content={<CustomChartTooltip />} />
            <Legend
              formatter={(value) => (
                <span className="sm:text-base xs:text-[12px]">{`${
                  value.includes("price") ? value.split("price")[1] : value.split("volume")[1]
                }`}</span>
              )}
            />
            {priceIdList.map((coinId, index) => (
              <Area
                key={coinId}
                dataKey={`${coinId}`}
                type="natural"
                fill={`url(#${index})`}
                fillOpacity={0.4}
                stroke={`${colors[index]}`}
                stackId="a"
                yAxisId={`${coinId}`}
              />
            ))}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className="relative flex flex-col justify-center items-center bg-purple-secondary dark:bg-purple-secondary-dark p-10 rounded-lg w-full lg:h-[30vh] xl:h-[30vh] min-h-72">
        <div className="pb-5 text-purple-text dark:text-white self-start">
          <h1 className="font-bold text-2xl md:text-lg">Volume 24h</h1>
          <h2 className="font-thin text-lg md:text-sm">{chartDate}</h2>
        </div>
        <ResponsiveContainer width="100%">
          <BarChart data={data.volumeData}>
            <defs>
              <linearGradient id="0" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#E323FF" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#E323FF" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7D40FF" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#7D40FF" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#04bfb4" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#04bfb4" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" />
            {volumeIdList.map((coinId) => (
              <YAxis key={coinId} dataKey={`${coinId}`} yAxisId={`${coinId}`} domain={["auto", "dataMax"]} allowDataOverflow hide />
            ))}
            <Tooltip content={<CustomChartTooltip />} />
            <Legend
              formatter={(value) => (
                <span className="sm:text-base xs:text-[12px]">{`${
                  value.includes("price") ? value.split("price")[1] : value.split("volume")[1]
                }`}</span>
              )}
            />
            {volumeIdList.map((coinId, index) => (
              <Bar key={coinId} dataKey={`${coinId}`} type="natural" fill={`url(#${index})`} fillOpacity={0.7} yAxisId={`${coinId}`} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default PriceVolumeCharts;
