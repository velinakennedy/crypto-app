import formatCurrency from "@/utils/formatCurrency";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import formatDate from "@/utils/formatDate";
import Image from "next/image";
import Link from "next/link";
import CoinLink from "./CoinLink";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import PriceChange from "./PriceChange";

const CoinPriceInfo = ({ currentData }: { currentData: any }) => {
  const currency = useSelector((state: RootState) => state.currency.value);
  return (
    <>
      <div className="md:flex gap-3 2xl:gap-7 hidden w-full">
        <div className="flex flex-col gap-3 2xl:gap-4">
          <div className="flex flex-col justify-center items-center gap-7 bg-purple-secondary dark:bg-purple-market p-10 rounded-lg h-full">
            <Link href={currentData.links.homepage[0]} target="_blank">
              <Image loader={() => currentData.image.large} src={currentData.image.large} width={80} height={80} alt="coin logo" />
            </Link>
            <h1>{currentData.name}</h1>
          </div>
          <div className="md:inline-block hidden">
            <CoinLink link={currentData.links.homepage[0]} />
          </div>
        </div>
        <div className="flex flex-col justify-center bg-purple-secondary dark:bg-purple-market p-10 rounded-lg w-full">
          <div className="flex flex-wrap justify-center gap-3">
            <span className="font-semibold text-3xl">{formatCurrency(currentData.market_data.current_price[currency], 6, false, currency)}</span>
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

      <div className="flex flex-col gap-3 md:hidden w-full">
        <div className="flex flex-col gap-3 bg-purple-secondary dark:bg-purple-market p-8 rounded-lg w-full">
          <div className="flex justify-between">
            <div className="font-thin">
              <h1>{currentData.name}</h1>
              <h2>({currentData.symbol.toUpperCase()})</h2>
            </div>
            <Link href={currentData.links.homepage[0]} target="_blank">
              <Image loader={() => currentData.image.large} src={currentData.image.large} width={45} height={45} alt="coin logo" />
            </Link>
          </div>
          <div className="flex justify-start gap-3">
            <span className="font-semibold text-xl">{formatCurrency(currentData.market_data.current_price[currency], 6, false, currency)}</span>
            <span className="font-semibold text-lg">
              <PriceChange value={currentData.market_data.price_change_percentage_24h} />
            </span>
          </div>
          <div className="gap-2 grid grid-cols-2">
            <div className="flex flex-col justify-center items-center gap-1 border-1 border-purple-border p-2 rounded-lg">
              <h3 className="font-semibold dark:font-normal text-sm">All time high:</h3>{" "}
              <div className="flex">
                <IoMdArrowDropup className="text-2xl text-green-500 dark:text-teal-positive" />
                <span className="font-bold text-md">{formatCurrency(currentData.market_data.ath[currency], 6, false, currency)}</span>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-1 border-1 border-purple-border p-2 rounded-lg">
              <h3 className="font-semibold dark:font-normal text-sm">All time low:</h3>
              <div className="flex">
                <IoMdArrowDropdown className="text-2xl text-red-negative" />
                <span className="font-bold text-md">{formatCurrency(currentData.market_data.atl[currency], 6, false, currency)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CoinPriceInfo;
