"use client";
import Image from "next/image";
import { useGetCoinQuery } from "../../redux/features/coinInfoSlice";
import copyLink from "@/utils/copyLink";
import formatDate from "@/utils/formatDate";
import { IoCopyOutline } from "react-icons/io5";
import { FaLink } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import PriceChange from "../../components/PriceChange";
import formatCurrency from "@/utils/formatCurrency";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";

const CoinInfo = ({ params: { id } }: { params: { id: string } }) => {
  const currency = useSelector((state: RootState) => state.currency.value);
  const { currentData, isSuccess } = useGetCoinQuery(id);
  const hasData = currentData && isSuccess;
  // if (hasData) console.log(currentData);
  return (
    <div>
      {hasData && (
        <div className="grid grid-cols-2 mx-20 my-7 gap-7 text-purple-text dark:text-white">
          <div className="grid grid-cols-2 gap-7">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col items-center justify-center h-full p-10 rounded-lg dark:bg-purple-market bg-purple-secondary gap-7">
                <Image
                  loader={() => currentData.image.large}
                  src={currentData.image.large}
                  width={80}
                  height={80}
                  alt="coin logo"
                />
                <h1>{currentData.name}</h1>
              </div>
              <div className="flex items-center justify-center gap-3 rounded-lg p-7 dark:bg-purple-market bg-purple-secondary">
                <button
                  onClick={() =>
                    window.open(currentData.links.homepage[0], "_blank")
                  }
                >
                  <FaLink />
                </button>
                {currentData.links.homepage[0]}
                <button onClick={() => copyLink(currentData.links.homepage[0])}>
                  <IoCopyOutline />
                </button>
              </div>
            </div>
            <div className="p-10 rounded-lg dark:bg-purple-market bg-purple-secondary">
              <div className="flex flex-wrap justify-center gap-3">
                <span className="text-3xl font-semibold">{formatCurrency(currentData.market_data.current_price[currency], 6, false, currency)}</span>
                <span className="text-xl font-semibold"><PriceChange value={currentData.market_data.price_change_percentage_24h} /></span>
              </div> 
              <div className="flex flex-col items-center gap-3 mt-10">
                <div>
                <div className="flex flex-wrap items-center gap-3"><span><IoMdArrowDropup className="text-4xl text-green-500 dark:text-teal-positive"/></span>All time high: <span className="text-xl font-semibold">{formatCurrency(currentData.market_data.ath[currency], 6, false, currency)}</span></div>
                <div className="text-sm font-thin">{formatDate(currentData.market_data.ath_date[currency])}</div>
                </div>
                <div>
                <div className="flex flex-wrap items-center gap-3"><span><IoMdArrowDropdown className="text-4xl text-red-negative"/></span>All time low: <span className="text-xl font-semibold">{formatCurrency(currentData.market_data.atl[currency], 6, false, currency)}</span></div>
                <div className="text-sm font-thin">{formatDate(currentData.market_data.atl_date[currency])}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 p-10 rounded-lg dark:bg-purple-market bg-purple-secondary">
            <div className="flex flex-col items-center justify-center gap-7">
              <h2 className="font-thin">Market Cap</h2>
              <p className="font-semibold">{formatCurrency(currentData.market_data.market_cap[currency], 5, true, currency)}</p>
              <h2 className="font-thin">Fully Diluted Valuation</h2>
              <p className="font-semibold">{formatCurrency(currentData.market_data.fully_diluted_valuation[currency], 5, true, currency)}</p>
              <h2 className="font-thin">Volume/Market</h2>
              <p className="font-semibold">{formatCurrency(currentData.market_data.market_cap[currency]/currentData.market_data.total_volume[currency], 5, true, currency)}</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-7">
              <h2 className="font-thin">Total Volume</h2>
              <p className="font-semibold">{formatCurrency(currentData.market_data.total_volume[currency], 5, true, currency)}</p>
              <h2 className="font-thin">Circulating Supply</h2>
              <p className="font-semibold">{formatCurrency(currentData.market_data.circulating_supply, 5, true)} {currentData.symbol.toUpperCase()}</p>
              <h2 className="font-thin">Max Supply</h2>
              <p className="font-semibold">{formatCurrency(currentData.market_data.max_supply, 5, true)} {currentData.symbol.toUpperCase()}</p>
            </div>
          </div>
        <p>{currentData.description.en}</p>
        </div>
      )}
    </div>
  );
};
export default CoinInfo;
