import ProgressBar from "./ProgressBar";
import Image from "next/image";

const MarketCapDisplay = ({percentage, fillColor, barColor, icon}: {percentage: number, fillColor: string, barColor: string, icon: string}) => {
  return (
    <div className="flex items-center gap-2">
    <Image src={icon} alt="" />
    {percentage}%
    <ProgressBar barWidth={"5rem"} percent={percentage} fillColor={fillColor} barColor={barColor} />
  </div>
  );
};
export default MarketCapDisplay;