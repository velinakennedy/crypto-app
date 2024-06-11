import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { GoDotFill } from "react-icons/go";
import formatCurrency from "@/utils/formatCurrency";
import ProgressBar from "./ProgressBar";
import getPercentage from "@/utils/getPercentage";

const MarketTableBar = ({ dividend, divisor, color }: {dividend: number, divisor: number, color: string}) => {
    const currency = useSelector((state: RootState) => state.currency.value);
    const result: number = getPercentage(dividend, divisor);

  return (
    <div className="flex flex-col items-center justify-center w-full p-4">
        <div className="flex justify-between w-full">
            <p className="flex items-center text-sm font-thin" style={{color:`rgba(${color},0.5)`}}><GoDotFill style={{color:`rgb(${color})`}}/> {formatCurrency(dividend, 3, true, currency)}</p>
            <p className="flex items-center text-sm font-thin"><GoDotFill style={{color:`rgba(${color},0.5)`}}/> {formatCurrency(divisor, 3, true, currency)}</p>
        </div>
        <ProgressBar barWidth={"100%"} percent={result > 100 ? 100 : result} fillColor={`rgb(${color})`} barColor={`rgba(${color},0.5)`} />
    </div>
  );
};
export default MarketTableBar;