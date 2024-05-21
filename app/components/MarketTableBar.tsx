import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { GoDotFill } from "react-icons/go";
import formatCurrency from "@/utils/formatCurrency";
import ProgressBar from "./ProgressBar";
import getPercentage from "@/utils/getPercentage";

const MarketTableBar = ({ dividend, divisor }: {dividend: number, divisor: number}) => {
    const currency = useSelector((state: RootState) => state.currency.value);
    const result: number = getPercentage(dividend, divisor);
    const colorOptions = ["194, 118, 33", "99, 117, 194", "48, 223, 161", "243, 234, 47", "77,238, 229", "240, 97, 66"];
    const color = colorOptions[Math.floor(Math.random() * 6)];
  return (
    <div className="flex flex-col items-center justify-center w-full p-4">
        <div className="flex justify-between w-full">
            <p className="flex items-center"><GoDotFill /> {formatCurrency(dividend, 3, true, currency)}</p>
            <p className="flex items-center"><GoDotFill /> {formatCurrency(divisor, 3, true, currency)}</p>
        </div>
        <ProgressBar percent={result} fillColor={`rgb(${color})`} barColor={`rgba(${color},0.5)`} />
    </div>
  );
};
export default MarketTableBar;