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
}: {
  isSearchBar: boolean;
  placeholderText: string;
  width: string;
  handleCoin?: Function;
  clearInput: boolean;
}) => {
  const [isActive, setIsActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const dropdown = useRef<HTMLDivElement | null>(null);
  const data = useSelector((state: RootState) => state.coinList.value);

  const handleSelection = (data?: { name: string; id: string; image: string }) => {
    if (!isSearchBar && data) {
      if (handleCoin) handleCoin("coin", data);
      setSearchValue(data.name);
    } else {
      setSearchValue("");
    }
    setIsActive(false);
  };

  const handleChange = (value: string) => {
    setSearchValue(value);
    if (handleCoin) handleCoin("coin", value);
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
          className={`${isActive ? "rounded-t-lg" : "rounded-lg"} ${isSearchBar ? "bg-purple-secondary" : "bg-white"} dark:bg-purple-secondary-dark`}
          ref={dropdown}
        >
          <div
            className={`flex items-center h-full gap-3 p-4 rounded-lg ${width} ${
              isSearchBar ? "bg-purple-secondary" : "bg-white"
            } placeholder-purple-text ${isSearchBar ? "hover:bg-purple-hover dark:hover:bg-purple-hover-dark" : ""} dark:bg-purple-secondary-dark`}
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
            className={`z-10 fixed flex flex-col gap-3 ${width} rounded-b ${
              isSearchBar ? "bg-purple-secondary" : "bg-white"
            } dark:bg-purple-secondary-dark ${isActive ? "" : "hidden"}`}
          >
            {filteredList.slice(0, +`${isSearchBar ? 10 : 5}`).map(({ id, name, image }: { id: string; name: string; image: string }) => {
              return isSearchBar ? (
                <Link
                  className="flex gap-1 bg-purple-secondary hover:bg-purple-hover dark:hover:bg-purple-hover-dark dark:bg-purple-secondary-dark p-5 rounded"
                  key={id}
                  onClick={() => handleSelection()}
                  href={`/coin/${id}`}
                >
                  {name}
                </Link>
              ) : (
                <div
                  className="flex gap-1 bg-white hover:bg-purple-hover dark:hover:bg-purple-hover-dark dark:bg-purple-secondary-dark p-5 rounded"
                  key={id}
                  onClick={() => handleSelection({ id, name, image })}
                >
                  {name}
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
