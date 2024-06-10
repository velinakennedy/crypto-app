"use client";
import { useDispatch, useSelector } from "react-redux";
import { updateTimeframe } from "../redux/features/chartTimeframeSlice";
import { RootState } from "../redux/store";

const ChartTimeframe = () => {
    const timeframes = ["1D", "7D", "14D", "1M", "1Y"];
    const dispatch = useDispatch();
    const {status} = useSelector (
      (state: RootState ) => state.timeframe
    );
    
  return (
    <div className="w-full p-10">
        <div className="flex justify-center lg:md:w-[35rem] sm:w-3/4 gap-8 p-2 rounded-lg dark:bg-purple-secondary-dark bg-purple-secondary ">
        {timeframes.map((time) => {
            return <div key={time} className={`z-0 p-[1.3px] rounded-lg ${status === time ? "bg-gradient-to-b from-purple-border dark:to-[#3c3d7e80] to-[#7779f880]" : ""}`}><div className={`${status === time ? "dark:bg-purple-hover-dark dark:shadow-[#7779f833] shadow-[#7779f84d] bg-[#a2a4e8] shadow-md" : ""} z-1 cursor-pointer px-6 py-2 rounded-lg`} onClick={() => dispatch(updateTimeframe(time))}>{time}</div></div>;
        })}
        </div>
    </div>
  );
};
export default ChartTimeframe;