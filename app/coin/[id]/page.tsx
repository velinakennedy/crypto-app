"use client";
import { useGetCoinQuery } from "../../redux/features/coinInfoSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CoinLink from "@/app/components/CoinLink";
import CoinMarketData from "@/app/components/CoinMarketData";
import CoinPriceInfo from "@/app/components/CoinPriceInfo";
import CoinDescription from "@/app/components/CoinDescription";

const CoinInfo = ({ params: { id } }: { params: { id: string } }) => {
  const currency = useSelector((state: RootState) => state.currency.value);
  const { currentData, isSuccess } = useGetCoinQuery(id);
  const hasData = currentData && isSuccess;

  return (
    <div>
      {hasData && (
        <div className="flex flex-col gap-3 2xl:gap-7 px-14 2xl:px-20 py-7 text-purple-text dark:text-white">
          <div className="flex 2xl:flex-row flex-col gap-3 2xl:gap-7">
            <CoinPriceInfo currentData={currentData} />
            <div className="grid grid-cols-2 bg-purple-secondary dark:bg-purple-market p-5 2xl:p-10 rounded-lg w-full text-sm md:text-base">
              <div className="flex flex-col gap-3 2xl:gap-7">
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
              <div className="flex flex-col gap-3 2xl:gap-7">
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
          <div className="gap-3 2xl:gap-7 grid md:grid-cols-2 row-start-3 pb-20 md:pb-0">
            <CoinDescription description={currentData.description.en} />
            <div className="flex flex-col gap-3 2xl:gap-7">
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
