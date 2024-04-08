"use client";
import MarketBar from "./MarketBar";
import Dropdown from "./Dropdown";
import SearchCoinList from "./SearchCoinList";
import { useGetCoinListQuery } from "../redux/features/coinListSlice";
import { GiCoins } from "react-icons/gi";
import DarkModeButton from "./DarkModeButton";

const Navbar = () => {
  const { data } = useGetCoinListQuery("");
  
  return (
    <div>
      {data && (<div>
      <MarketBar />
      <div className="flex items-center justify-between h-full p-5 px-10 text-purple-text dark:text-gray-300 bg-white dark:bg-[#13121a]">
        <h1 className="flex gap-1 text-2xl font-bold dark:text-white">
          <GiCoins className="text-3xl dark:text-white" /> CoinTrade
        </h1>
        <div className="flex gap-7">
          <SearchCoinList data={data}/>
          <Dropdown />
          <DarkModeButton />
        </div>
      </div>
    </div>)}
    </div>
  );
};
export default Navbar;
