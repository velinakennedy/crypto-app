import SearchCoinList from "./SearchCoinList";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { FaCoins } from "react-icons/fa";
import formatCurrency from "@/utils/formatCurrency";
import { CoinMarketData } from "@/typings";

const CoinConverterItem = ({
  title,
  coin,
  handleCoin,
  active,
  bgColor,
  amount,
  handleAmount,
  convertedAmount,
}: {
  title: string;
  coin: CoinMarketData | null;
  handleCoin: CallableFunction;
  active: boolean;
  bgColor: string;
  amount?: number;
  handleAmount?: CallableFunction;
  convertedAmount?: number | null;
}) => {
  const currency = useSelector((state: RootState) => state.currency.value);

  return (
    <div className={`flex flex-col gap-3 ${bgColor} p-3 rounded-lg w-full`}>
      <h3>{title}</h3>
      <div>
        <div className="flex items-center gap-3 w-full">
          {coin ? (
            <Image loader={() => coin.image} src={coin.image} width={20} height={20} alt="coin logo" className="w-8 h-8" />
          ) : (
            <FaCoins className="w-6 h-6 text-slate-50" />
          )}
          <div className="w-full">
            <SearchCoinList
              isSearchBar={false}
              placeholderText="Select Coin"
              width="w-full"
              color={bgColor.split(" ")[0]}
              darkColor={bgColor.split(" ")[1]}
              handleCoin={handleCoin}
              clearInput={!active}
              updateSelection={coin ? coin : undefined}
            />
          </div>
          {amount !== null && handleAmount ? (
            <input
              type="number"
              value={amount}
              placeholder="amount"
              min={0}
              className="border-1 border-purple-border bg-transparent p-1.5 rounded-lg w-24"
              onChange={(e) => handleAmount(+e.target.value ? +e.target.value : "")}
            />
          ) : (
            convertedAmount && <p>{convertedAmount}</p>
          )}
        </div>
        <div className="bg-purple-text dark:bg-slate-50 w-full h-0.5"></div>
      </div>
      <p className={`${coin ? "" : "text-transparent"}`}>{`1 ${coin ? coin.symbol.toUpperCase() : "Coin"} = ${
        coin ? formatCurrency(coin.current_price, 4, false, currency) : "Current Price"
      }`}</p>
    </div>
  );
};
export default CoinConverterItem;
