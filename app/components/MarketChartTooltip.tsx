import { MarketTooltip } from "@/typings";

const MarketChartTooltip = ({ active, payload, label, color }: MarketTooltip) => {
  if (active && payload && payload.length && color) {
    return (
      <div className="bg-bg-light dark:bg-purple-market p-1.5 rounded-lg sm:max-w-32 xs:max-w-24 sm:text-[10px] lg:text-xs xs:text-[8px]">
        <p className="font-semibold">{label}</p>
        <p style={{ color: color }}>{`$${payload[0].value?.toFixed(5)}`}</p>
      </div>
    );
  }
  return null;
};
export default MarketChartTooltip;
