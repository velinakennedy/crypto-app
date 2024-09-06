"use client";
import Image from "next/image";
import { useGetCoinQuery } from "../../redux/features/coinInfoSlice";
import formatDate from "@/utils/formatDate";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import PriceChange from "../../components/PriceChange";
import formatCurrency from "@/utils/formatCurrency";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import CoinLink from "@/app/components/CoinLink";
import CoinMarketData from "@/app/components/CoinMarketData";

const CoinInfo = ({ params: { id } }: { params: { id: string } }) => {
  const currency = useSelector((state: RootState) => state.currency.value);
  const { currentData, isSuccess } = useGetCoinQuery(id);
  const hasData = currentData && isSuccess;

  return (
    <div>
      {hasData && (
        <div className="gap-7 grid grid-rows-[20rem_10rem_20rem] mx-20 mt-7 text-purple-text dark:text-white">
          <div className="gap-7 grid grid-cols-2 row-start-1">
            <div className="gap-7 grid grid-cols-2">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col justify-center items-center gap-7 bg-purple-secondary dark:bg-purple-market p-10 rounded-lg h-full">
                  <Image loader={() => currentData.image.large} src={currentData.image.large} width={80} height={80} alt="coin logo" />
                  <h1>{currentData.name}</h1>
                </div>
                <CoinLink link={currentData.links.homepage[0]} />
              </div>
              <div className="bg-purple-secondary dark:bg-purple-market p-10 rounded-lg">
                <div className="flex flex-wrap justify-center gap-3">
                  <span className="font-semibold text-3xl">
                    {formatCurrency(currentData.market_data.current_price[currency], 6, false, currency)}
                  </span>
                  <span className="font-semibold text-xl">
                    <PriceChange value={currentData.market_data.price_change_percentage_24h} />
                  </span>
                </div>
                <div className="flex flex-col items-center gap-3 mt-10">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <IoMdArrowDropup className="text-4xl text-green-500 dark:text-teal-positive" />
                      <h3 className="font-semibold dark:font-normal">All time high:</h3>{" "}
                      <span className="font-bold text-xl">{formatCurrency(currentData.market_data.ath[currency], 6, false, currency)}</span>
                    </div>
                    <div className="dark:font-thin text-sm">{formatDate(currentData.market_data.ath_date[currency])}</div>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <IoMdArrowDropdown className="text-4xl text-red-negative" />
                      <h3 className="font-semibold dark:font-normal">All time low:</h3>{" "}
                      <div className="font-bold text-xl">{formatCurrency(currentData.market_data.atl[currency], 6, false, currency)}</div>
                    </div>
                    <div className="dark:font-thin text-sm">{formatDate(currentData.market_data.atl_date[currency])}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 bg-purple-secondary dark:bg-purple-market p-10 rounded-lg">
              <div className="flex flex-col gap-7">
                <CoinMarketData title="Market Cap" value={currentData.market_data.market_cap[currency]} currency={currency} />
                <CoinMarketData
                  title="Fully Diluted Valuation"
                  value={currentData.market_data.fully_diluted_valuation[currency]}
                  currency={currency}
                />
                <CoinMarketData
                  title="Volume/Market"
                  value={currentData.market_data.market_cap[currency] / currentData.market_data.total_volume[currency]}
                  currency={currency}
                />
              </div>
              <div className="flex flex-col gap-7">
                <CoinMarketData title="Total Volume" value={currentData.market_data.total_volume[currency]} currency={currency} />
                <CoinMarketData
                  title="Circulating Supply"
                  value={currentData.market_data.circulating_supply}
                  symbol={currentData.symbol.toUpperCase()}
                />
                <CoinMarketData title="Max Supply" value={currentData.market_data.max_supply} symbol={currentData.symbol.toUpperCase()} />
              </div>
            </div>
          </div>
          <h1 className="flex items-end font-bold text-2xl">Description </h1>
          <div className="gap-7 grid grid-cols-2 row-start-3">
            <div dangerouslySetInnerHTML={{ __html: currentData.description.en }}></div>
            <div className="flex flex-col gap-7">
              <CoinLink link={currentData.links.blockchain_site[1]} />
              <CoinLink link={currentData.links.blockchain_site[2]} />
              <CoinLink link={currentData.links.blockchain_site[3]} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default CoinInfo;
