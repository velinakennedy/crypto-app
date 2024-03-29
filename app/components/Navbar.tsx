"use client";
import MarketBar from "./MarketBar";
import Dropdown from "./Dropdown";
import { CiDark, CiSearch } from "react-icons/ci";
import { GiCoins } from "react-icons/gi";

const Navbar = () => {
  return (
    <div>
      <MarketBar />
      <div className="flex items-center justify-between h-full p-5 px-10 text-purple-text">
        <h1 className="flex gap-1 text-2xl font-bold">
          <GiCoins className="text-3xl" /> CoinTrade
        </h1>
        <div className="flex gap-7">
          <div className="flex items-center h-full gap-3 p-4 rounded-lg bg-purple-secondary placeholder-purple-text hover:bg-purple-hover">
            <CiSearch className="text-2xl" />
            <input
              className="bg-transparent rounded-lg outline-none placeholder-purple-text"
              type="text"
              placeholder="Search..."
            />
          </div>

          <Dropdown/>

          <button className="p-3 text-3xl rounded-lg bg-purple-secondary hover:bg-purple-hover">
            <CiDark />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Navbar;