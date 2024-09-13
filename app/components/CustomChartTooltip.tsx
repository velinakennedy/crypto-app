import formatCurrency from "@/utils/formatCurrency";
import { useSelector } from "react-redux";
import { TooltipProps } from "recharts";
import { RootState } from "../redux/store";
import formatIdList from "@/utils/formatIdList";

const CustomChartTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  const currency = useSelector((state: RootState) => state.currency.value);
  if (active && payload && payload.length) {
    const { priceIdList, volumeIdList } = formatIdList(payload[0].payload);
    const textColors = ["text-[#E323FF]", "text-[#7D40FF]", "text-[#04bfb4]"];

    return (
      <div className="bg-bg-light dark:bg-purple-market sm:p-3 xs:p-1 rounded-lg md:text-sm sm:text-xs xs:text-[9px]">
        <p className="font-bold">{label}</p>
        {priceIdList.length > 0 && <p className="italic">Prices: </p>}
        {priceIdList.map((item, index) => (
          <p key={index} className={textColors[index]}>{`${item.split("price")[1]}: ${formatCurrency(
            payload[0].payload[item],
            4,
            false,
            currency
          )}`}</p>
        ))}
        {volumeIdList.length > 0 && <p className="italic">24h Volume: </p>}
        {volumeIdList.map((item, index) => (
          <p key={index} className={textColors[index]}>{`${item.split("volume")[1]}: ${payload[0].payload[item]}`}</p>
        ))}
      </div>
    );
  }
  return null;
};
export default CustomChartTooltip;
