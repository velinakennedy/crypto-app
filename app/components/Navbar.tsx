"use client";
import MarketBar from "./MarketBar";
import Dropdown from "./Dropdown";
import SearchCoinList from "./SearchCoinList";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useGetCoinListQuery } from "../redux/features/coinListSlice";
import { GiCoins } from "react-icons/gi";
import DarkModeButton from "./DarkModeButton";
import Link from "next/link";
import NavbarLinks from "./NavbarLinks";
import { useEffect } from "react";
import { updateList } from "../redux/features/searchBarCoinList";

const Navbar = () => {
  const currency = useSelector((state: RootState) => state.currency.value);
  const { data } = useGetCoinListQuery(currency);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) dispatch(updateList(data));
  }, [data]);

  return (
    <div>
      {data && (
        <div>
          <MarketBar />
          <div className="flex justify-between items-center sm:gap-0 xs:gap-3 bg-white dark:bg-[#13121a] px-10 p-5 h-full text-purple-text dark:text-gray-300">
            <h1>
              <Link href={"/"} className="flex gap-1 font-bold text-2xl dark:text-white">
                <GiCoins className="text-3xl dark:text-white" /> <span className="lg:inline-block xs:hidden">CoinTrade</span>
              </Link>
            </h1>
            <div className="md:inline-block xs:hidden">
              <NavbarLinks />
            </div>
            <div className="flex gap-7 sm:gap-5 md:gap-7 xs:gap-3">
              <SearchCoinList
                isSearchBar={true}
                placeholderText="Search..."
                width="w-96 xs:w-40 md:w-60 lg:w-72 xl:w-96"
                clearInput={true}
                color="bg-purple-secondary"
              />
              <Dropdown />
              <div className="md:inline-block xs:hidden">
                <DarkModeButton />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Navbar;
