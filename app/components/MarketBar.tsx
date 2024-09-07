/* eslint-disable quotes */
"use client";

import { useGetMarketDataQuery } from "../redux/features/marketDataSlice";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { RiCoinsFill } from "react-icons/ri";
import { GoTriangleUp } from "react-icons/go";
import ProgressBar from "./ProgressBar";
import formatCurrency from "@/utils/formatCurrency";
import getPercentage from "@/utils/getPercentage";
import MarketCapDisplay from "./MarketCapDisplay";
import BitCoinIcon from "../../public/BitCoinIcon.svg";
import EthereumIcon from "../../public/EthereumIcon.svg";

const MarketBar = () => {
  const { isLoading, data } = useGetMarketDataQuery("");
  const currency = useSelector((state: RootState) => state.currency.value);

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {data && (
        <div className="flex sm:flex justify-center items-center gap-10 bg-purple-text dark:bg-[#1e1932] px-10 p-3 h-full text-sm text-white">
          <div className="flex md:flex gap-2 xs:hidden">
            <span className="flex items-center gap-1 h-full font-thin">
              <RiCoinsFill />
              Coins
            </span>{" "}
            {data.data.active_cryptocurrencies}
          </div>
          <div className="flex md:flex items-center gap-2 xs:hidden">
            <GoTriangleUp className="text-green-300" /> {formatCurrency(data.data.total_market_cap[currency], 3, true, currency)}
          </div>
          <div className="flex sm:flex items-center gap-2 xs:hidden">
            {formatCurrency(data.data.total_volume[currency], 3, true, currency)}
            <ProgressBar
              barWidth={"5rem"}
              percent={getPercentage(data.data.total_volume[currency], data.data.total_market_cap[currency])}
              fillColor="#ffffff"
              barColor="#8686a9"
            />
          </div>
          <MarketCapDisplay percentage={Math.floor(data.data.market_cap_percentage.btc)} fillColor="#ea973d" barColor="#8686a9" icon={BitCoinIcon} />
          <MarketCapDisplay percentage={Math.floor(data.data.market_cap_percentage.eth)} fillColor="#849eff" barColor="#8686a9" icon={EthereumIcon} />
        </div>
      )}
    </div>
  );
};

export default MarketBar;
