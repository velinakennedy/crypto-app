import { Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Area, ComposedChart } from "recharts";
import { AllCoinChartData, CoinChartData } from "@/typings";
import CustomChartTooltip from "./CustomChartTooltip";
import { colors } from "@/utils/pickColor";
import formatIdList from "@/utils/formatIdList";

const MultiChart = ({ data, chartDate }: { data: AllCoinChartData; chartDate: string | undefined }) => {
  const combinedData: CoinChartData[] = [];
  data.priceData.forEach((item, index) => {
    combinedData.push({ ...item, ...data.volumeData[index] });
  });

  const { coinIdList, priceIdList, volumeIdList } = formatIdList(combinedData[0]);
  return (
    <div>
      <div className="relative flex flex-col justify-center items-center xl:hidden bg-purple-secondary dark:bg-purple-secondary-dark m-10 p-10 rounded-lg h-[30vh] xs:h-[30vh] min-h-72">
        <div className="pb-5 text-purple-text dark:text-white self-start">
          <h1 className="font-bold lg:text-2xl xs:text-xl">{chartDate}</h1>
        </div>
        <ResponsiveContainer width="100%">
          <ComposedChart data={combinedData}>
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
            {coinIdList?.map((coinId) => (
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
              <>
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
              </>
            ))}
            {volumeIdList.map((coinId, index) => (
              <>
                <Bar key={coinId} dataKey={`${coinId}`} type="natural" fill={`url(#${index})`} fillOpacity={0.7} yAxisId={`${coinId}`} stackId="b" />
              </>
            ))}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default MultiChart;
