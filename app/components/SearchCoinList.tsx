"use client";
import { CoinMarketData } from "@/typings";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { RootState } from "../redux/store";
import { CiSearch } from "react-icons/ci";
import { useSelector } from "react-redux";

const SearchCoinList = ({
  isSearchBar,
  placeholderText,
  width,
  handleCoin,
  clearInput,
  color,
}: {
  isSearchBar: boolean;
  placeholderText: string;
  width: string;
  color: string;
  handleCoin?: Function;
  clearInput: boolean;
}) => {
  const [isActive, setIsActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const dropdown = useRef<HTMLDivElement | null>(null);
  const data = useSelector((state: RootState) => state.coinList.value);

  const handleSelection = (data?: CoinMarketData) => {
    if (!isSearchBar && data) {
      if (handleCoin) handleCoin(data);
      setSearchValue(data.name);
    } else {
      setSearchValue("");
    }
    setIsActive(false);
  };

  const handleChange = (value: string) => {
    setSearchValue(value);
  };

  const filteredList = data?.filter((element: CoinMarketData) => element.name.toLowerCase().includes(searchValue.toLowerCase()));

  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      if (!dropdown.current?.contains(e.target as Node)) {
        setIsActive(false);
        if (isSearchBar) setSearchValue("");
      }
    };
    document.body.addEventListener("click", closeDropdown);
    return () => document.body.removeEventListener("click", closeDropdown);
  }, []);

  useEffect(() => {
    if (clearInput) setSearchValue("");
  }, [clearInput]);

  return (
    <div>
      {filteredList && (
        <div
          className={`${isActive ? "rounded-t-lg" : "rounded-lg"} ${
            isSearchBar ? "bg-purple-secondary" : `${color}`
          } dark:bg-purple-secondary-dark relative ${width}`}
          ref={dropdown}
        >
          <div
            className={`flex items-center h-full gap-3 p-4 rounded-lg ${width} ${color} placeholder-purple-text ${
              isSearchBar ? "hover:bg-purple-hover dark:hover:bg-purple-hover-dark" : ""
            } dark:bg-purple-secondary-dark`}
          >
            {isSearchBar && <CiSearch className="text-2xl" />}
            <input
              className="bg-transparent rounded-lg w-full outline-none placeholder-purple-text dark:placeholder-gray-400"
              type="text"
              placeholder={placeholderText}
              onChange={(e) => handleChange(e.target.value)}
              onFocus={() => setIsActive(true)}
              value={searchValue}
            />
          </div>
          <div
            className={`z-10 absolute flex flex-col gap-3 ${width} rounded-b ${isSearchBar ? "bg-purple-secondary " : `${color}`} ${
              isActive ? "" : "hidden"
            } dark:bg-purple-secondary-dark`}
          >
            {filteredList.slice(0, +`${isSearchBar ? 10 : 5}`).map((data: CoinMarketData) => {
              return isSearchBar ? (
                <Link
                  className="flex gap-1 bg-purple-secondary hover:bg-purple-hover dark:hover:bg-purple-hover-dark dark:bg-purple-secondary-dark p-5 rounded"
                  key={data.id}
                  onClick={() => handleSelection()}
                  href={`/coin/${data.id}`}
                >
                  {data.name}
                </Link>
              ) : (
                <div
                  className={`flex gap-1 ${color} dark:bg-purple-secondary-dark hover:bg-purple-hover dark:hover:bg-purple-hover-dark p-5 rounded`}
                  key={data.id}
                  onClick={() => handleSelection(data)}
                >
                  {data.name}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
export default SearchCoinList;
