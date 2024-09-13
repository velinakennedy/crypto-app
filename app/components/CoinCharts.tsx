import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addCoin } from "../redux/features/activeCoinsSlice";
import { useEffect, useState } from "react";
import { ActiveCoin, AllCoinChartData, CoinData } from "@/typings";
import formatDate from "@/utils/formatDate";
import formatCoinChartData from "@/utils/formatCoinChartData";
import PriceVolumeCharts from "./PriceVolumeCharts";
import MultiChart from "./MultiChart";

const CoinCharts = ({ currentData, hasData, id }: { currentData: CoinData; hasData: boolean; id: string }) => {
  const [data, setData] = useState<AllCoinChartData | undefined>(undefined);
  const activeCoins = useSelector((state: RootState) => state.activeCoins.value);
  const dispatch = useDispatch();
  const { status, to, from } = useSelector((state: RootState) => state.timeframe);
  const chartDate = to ? formatDate(to) : undefined;

  useEffect(() => {
    if (activeCoins.length < 3 && hasData) {
      const data: ActiveCoin = {
        id: id,
        data: currentData,
      };
      dispatch(addCoin(data));
    }
  }, [hasData, id, currentData, activeCoins, dispatch, status, from]);

  useEffect(() => {
    const isSuccess = activeCoins.length > 0;
    if (isSuccess) {
      const prices = formatCoinChartData(activeCoins, "price", from * 1000, status);
      const volumes = formatCoinChartData(activeCoins, "volume", from * 1000, status);
      setData({ priceData: prices, volumeData: volumes });
    } else {
      setData(undefined);
    }
  }, [activeCoins, from]);
  return (
    <div>
      {data && (
        <div>
          <PriceVolumeCharts data={data} chartDate={chartDate} />
          <MultiChart data={data} chartDate={chartDate} />
        </div>
      )}
    </div>
  );
};
export default CoinCharts;
