"use client";

import { useGetMarketDataQuery } from "../redux/features/marketDataSlice";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { RiCoinsFill } from "react-icons/ri";
import { GoTriangleUp } from "react-icons/go";

const MarketBar = () => {
    const {isLoading, data} = useGetMarketDataQuery("");
    const currency = useSelector((state: RootState) => state.currency.value);

    if (isLoading) {
     return <div>Loading...</div>;
    }

  return (
    <div className="flex items-center justify-center h-full gap-10 p-3 px-10 text-white bg-purple-text">
      <div className="flex gap-2">
        <span className="flex items-center h-full gap-1 font-thin">
          <RiCoinsFill />
          Coins
        </span>{" "}
        {data.data.active_cryptocurrencies}
      </div>
      <div className="flex items-center gap-2">
        <GoTriangleUp className="text-green-300" />{" "}
        {new Intl.NumberFormat("en-US", {
          maximumSignificantDigits: 3,
          style: "currency",
          currency: `${currency}`,
          notation: "compact",
          compactDisplay: "short",
        }).format(data.data.total_market_cap[currency])}
      </div>
      <div className="flex items-center gap-2">
        {new Intl.NumberFormat("en-US", {
          maximumSignificantDigits: 3,
          style: "currency",
          currency: `${currency}`,
          notation: "compact",
          compactDisplay: "short",
        }).format(data.data.total_volume[currency])}
      </div>
      <div className="flex items-center gap-2">
        {Math.floor(data.data.market_cap_percentage.btc)}%
      </div>
      <div className="flex items-center gap-2">
        {Math.floor(data.data.market_cap_percentage.eth)}%
      </div>
    </div>
  );
};

export default MarketBar;