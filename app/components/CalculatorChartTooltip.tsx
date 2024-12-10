import { TooltipProps } from "recharts";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import formatCurrency from "@/utils/formatCurrency";

const CalculatorChartTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  const currency = useSelector((state: RootState) => state.currency.value);
  if (active && payload && payload.length) {
    return (
      <div className="bg-bg-light dark:bg-purple-market sm:p-3 xs:p-1 rounded-lg md:text-sm sm:text-xs xs:text-[9px]">
        <p className="font-bold">{label}</p>
        <p className="text-[#04bfb4]">{`${formatCurrency(payload[0].value, 4, false, currency)}`}</p>
      </div>
    );
  }
  return null;
};
export default CalculatorChartTooltip;
