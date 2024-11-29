import { CoinMarketData } from "@/typings";
import formatCurrency from "@/utils/formatCurrency";
import { RootState } from "../redux/store";
import Image from "next/image";
import { useSelector } from "react-redux";
import PriceChange from "./PriceChange";
import { useEffect, useState } from "react";

const CoinCarouselItem = ({ coin }: { coin: CoinMarketData }) => {
  const currency = useSelector((state: RootState) => state.currency.value);
  const activeCoins = useSelector((state: RootState) => state.activeCoins.value);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  useEffect(() => {
    setIsSelected(false);
    activeCoins.forEach((activeCoin) => {
      if (activeCoin.id === coin.id) {
        setIsSelected(true);
      }
    });
  }, [activeCoins]);

  return (
    <div
      className={`z-0 p-[1.3px] rounded-lg ${
        isSelected
          ? "bg-gradient-to-b from-purple-border dark:to-[#3c3d7e80] to-[#7779f880] shadow-lg dark:shadow-[#7779f833] shadow-[#7779f84d]"
          : ""
      }`}
    >
      <div
        className={`flex gap-2 z-1 ${
          isSelected ? "dark:bg-purple-hover-dark bg-[#a2a4e8]" : "bg-purple-secondary dark:bg-purple-secondary-dark"
        } max-h-28 w-full justify-center items-center lg:px-4 lg:py-7 rounded-lg p-16`}
      >
        <div className="flex justify-center w-full xs:w-auto min-w-10">
          <Image loader={() => `${coin.image}/w=auto`} src={coin.image} width={30} height={30} alt="coin logo" />
        </div>
        <div className="flex flex-col items-center gap-2 w-auto lg:w-full text-center">
          <h2>{`${coin.name} (${coin.symbol.toUpperCase()})`}</h2>
          <div className="flex justify-center gap-2 w-full">
            <h3>
              {formatCurrency(coin.current_price, 6, false, currency).length > 10
                ? `${formatCurrency(coin.current_price, 6, false, currency).slice(0, 9)}...`
                : formatCurrency(coin.current_price, 6, false, currency)}
            </h3>
            <PriceChange value={coin.price_change_percentage_24h} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CoinCarouselItem;
