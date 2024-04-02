"use client";
import MarketBar from "./MarketBar";
import Dropdown from "./Dropdown";
import { CiSearch } from "react-icons/ci";
import { GiCoins } from "react-icons/gi";
import DarkModeButton from "./DarkModeButton";

const Navbar = () => {
  return (
    <div>
      <MarketBar />
      <div className="flex items-center justify-between h-full p-5 px-10 text-purple-text dark:text-gray-300 bg-white dark:bg-[#13121a]">
        <h1 className="flex gap-1 text-2xl font-bold dark:text-white">
          <GiCoins className="text-3xl dark:text-white" /> CoinTrade
        </h1>
        <div className="flex gap-7">
          <div className="flex items-center h-full gap-3 p-4 rounded-lg dark:hover:bg-purple-hover-dark bg-purple-secondary placeholder-purple-text hover:bg-purple-hover dark:bg-purple-secondary-dark">
            <CiSearch className="text-2xl" />
            <input
              className="bg-transparent rounded-lg outline-none placeholder-purple-text dark:placeholder-gray-300"
              type="text"
              placeholder="Search..."
            />
          </div>
          <Dropdown />
          <DarkModeButton />
        </div>
      </div>
    </div>
  );
};
export default Navbar;
