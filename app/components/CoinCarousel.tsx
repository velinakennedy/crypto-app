"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useState } from "react";
import { removeCoin } from "../redux/features/activeCoinsSlice";
import chartLabels from "@/utils/chartLabels";
import CoinCharts from "./CoinCharts";
import { useGetChartDataQuery } from "../redux/features/coinChartInfoSlice";

const CoinCarousel = ({to, from}: {to: number, from: number}) => {
    const [id, setId] = useState<string>("");
    const [skip, setSkip] = useState<boolean>(true);
    const activeCoins = useSelector((state: RootState) => state.activeCoins.value);
    const dispatch = useDispatch();
    const currency = useSelector((state: RootState) => state.currency.value);
    const { currentData, isSuccess } = useGetChartDataQuery({
        id,
        currency,
        from,
        to,
    }, {skip});
    const hasData = currentData && isSuccess;

    const handleSelection = (name: string): void => {
        const exists = activeCoins.find((coin) => coin.id == name);
        if (exists) {
            dispatch(removeCoin(name));
            setSkip(true);
        } else if (activeCoins.length < 3 && !exists) {
            setId(name);
            setSkip(false);
        }
    };
    
    const labels = chartLabels(to, from);
  return (
     <div>
        <div onClick={() => handleSelection("bitcoin")}>bitcoin</div>
        <div onClick={() => handleSelection("tether")}>tether</div>
        <div onClick={() => handleSelection("ethereum")}>ethereum</div>
        <CoinCharts id={id} currentData={currentData} hasData={hasData} currentDate={to} labels={labels}/>
    </div>
  );
};
export default CoinCarousel;