import { TooltipProps } from "recharts";

const CalculatorChartTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-bg-light dark:bg-purple-market sm:p-3 xs:p-1 rounded-lg md:text-sm sm:text-xs xs:text-[9px]">
        <p className="font-bold">{label}</p>
        <p className="text-[#04bfb4]">{`$${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};
export default CalculatorChartTooltip;
