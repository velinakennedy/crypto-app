"use client";
import Image from "next/image";
import { useGetCoinQuery } from "../../redux/features/coinInfoSlice";
import copyLink from "@/utils/copyLink";
import { IoCopyOutline } from "react-icons/io5";
import { FaLink } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import PriceChange from "../../components/PriceChange";
import formatCurrency from "@/utils/formatCurrency";

const CoinInfo = ({ params: { id } }: { params: { id: string } }) => {
  const currency = useSelector((state: RootState) => state.currency.value);
  const { currentData, isSuccess } = useGetCoinQuery(id);
  const hasData = currentData && isSuccess;
  // if (hasData) console.log(currentData);
  return (
    <div>
      {hasData && (
        <div className="grid grid-cols-2 w-fit m-7 gap-7 text-white">
          <div className="grid grid-cols-2 gap-7">
            <div className="flex flex-col gap-4">
              <div className="bg-purple-market p-10 flex flex-col items-center justify-center gap-7 rounded-lg">
                <Image
                  loader={() => currentData.image.large}
                  src={currentData.image.large}
                  width={80}
                  height={80}
                  alt="coin logo"
                />
                <h1>{currentData.name}</h1>
              </div>
              <div className="bg-purple-market p-4 flex items-center justify-center gap-3 rounded-lg">
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
            <div className="bg-purple-market p-7 rounded-lg">
              <div className="flex gap-3">
                <span className="font-semibold text-3xl">{formatCurrency(currency, currentData.market_data.current_price[currency], 6, false)}</span>
                <PriceChange value={currentData.market_data.price_change_percentage_24h} />
              </div> 
              <div className="flex flex-col gap-3 justify-center items-center">
                <div>All time high: {formatCurrency(currency, currentData.market_data.ath[currency], 6, false)}</div>
              </div>
            </div>
          </div>
          <div>
            <p>{currentData.description.en}</p>
          </div>
        </div>
      )}
    </div>
  );
};
export default CoinInfo;
