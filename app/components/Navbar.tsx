"use client";
import MarketBar from "./MarketBar";
import Dropdown from "./Dropdown";
import SearchCoinList from "./SearchCoinList";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useGetCoinListQuery } from "../redux/features/coinListSlice";
import { GiCoins } from "react-icons/gi";
import DarkModeButton from "./DarkModeButton";
import Link from "next/link";
import NavbarLinks from "./NavbarLinks";

const Navbar = () => {
  const currency = useSelector((state: RootState) => state.currency.value);
  const { data } = useGetCoinListQuery(currency);
  
  return (
    <div>
      {data && (<div>
      <MarketBar />
      <div className="flex items-center justify-between h-full p-5 px-10 text-purple-text dark:text-gray-300 bg-white dark:bg-[#13121a]">
        <h1>
          <Link href={"/"} className="flex gap-1 text-2xl font-bold dark:text-white">
            <GiCoins className="text-3xl dark:text-white" /> CoinTrade
          </Link>
        </h1>
        <div>
          <NavbarLinks />
        </div>
        <div className="flex gap-7">
          <SearchCoinList data={data} isSearchBar={true} placeholderText="Search..." width="w-96"/>
          <Dropdown />
          <DarkModeButton />
        </div>
      </div>
    </div>)}
    </div>
  );
};
export default Navbar;
