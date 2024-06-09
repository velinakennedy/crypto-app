"use client";
import { useDispatch } from "react-redux";
import { updateTimeframe } from "../redux/features/chartTimeframeSlice";

const ChartTimeframe = () => {
    const timeframes = ["1D", "7D", "14D", "1M", "1Y"];
    const dispatch = useDispatch();
    
  return (
    <div className="w-full p-10">
        <div className="flex justify-between lg:md:w-[40vw] sm:w-full gap-8 p-2 rounded-lg dark:bg-purple-secondary-dark">
        {timeframes.map((time) => {
            return <div key={time} className="dark:bg-purple-hover-dark cursor-pointer px-6 py-2 rounded-lg shadow-md dark:shadow-purple-hover-dark" onClick={() => dispatch(updateTimeframe(time))}>{time}</div>;
        })}
        </div>
    </div>
  );
};
export default ChartTimeframe;