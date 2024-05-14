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
  const handleToggle = (): void => {
    if (activeCoins.length < 3) {
        setIsSelected(!isSelected);
    } else if (isSelected) {
        setIsSelected(false);
    }
  };

  useEffect(() => {
    if (coin.id === "bitcoin") setIsSelected(true);
  }, []);

  return (
    <div onClick={handleToggle} className={`flex gap-2 ${isSelected ? "bg-purple-hover dark:bg-purple-hover-dark" : "bg-purple-secondary dark:bg-purple-secondary-dark"} max-h-28 w-full justify-center items-center px-4 py-7 rounded-lg`}>
      <div className="flex justify-center w-full min-w-10">
        <Image
          loader={() => `${coin.image}/w=auto`}
          src={coin.image}
          width={30}
          height={30}
          alt="coin logo"
        />
      </div>
      <div className="flex flex-col items-center w-full gap-2">
        <h2>{`${coin.name} (${coin.symbol.toUpperCase()})`}</h2>
        <div className="flex gap-2">
          <h3>{formatCurrency(coin.current_price, 6, false, currency)}</h3>
          <PriceChange value={coin.price_change_percentage_24h} />
        </div>
      </div>
    </div>
  );
};
export default CoinCarouselItem;
