"use client";
// import { CoinAsset } from "@/typings";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";

const SearchCoinList = ({ data, isSearchBar, placeholderText, width, handleCoin }: { data: any, isSearchBar: boolean, placeholderText: string, width: string, handleCoin?: any}) => {
  const [isActive, setIsActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const dropdown = useRef<any>(null);

  const handleSelection = (data?: {name: string, id: string, image: string}) => {
    if (!isSearchBar && data) {
      if (handleCoin) handleCoin(data);
      setSearchValue(data.name);
    } else {
      setSearchValue("");
    }
    setIsActive(false);
  };

  const filteredList = data.filter((element: any) =>
    element.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
        if (!dropdown.current.contains(e.target)) {
          setIsActive(false);
          if (isSearchBar) setSearchValue("");
        }
    };
    document.body.addEventListener("click", closeDropdown);
    return () => document.body.removeEventListener("click", closeDropdown);
}, []);

  return (
    <div
      className={`${
        isActive ? "rounded-t-lg" : "rounded-lg"
      } bg-purple-secondary dark:bg-purple-secondary-dark`} ref={dropdown}
    >
      <div className={`flex items-center h-full gap-3 p-4 rounded-lg ${width} bg-purple-secondary placeholder-purple-text ${isSearchBar ? "hover:bg-purple-hover dark:hover:bg-purple-hover-dark": ""} dark:bg-purple-secondary-dark`}>
        {isSearchBar && <CiSearch className="text-2xl" />}
        <input
          className="w-full bg-transparent rounded-lg outline-none placeholder-purple-text dark:placeholder-gray-400"
          type="text"
          placeholder={placeholderText}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setIsActive(true)}
          value={searchValue}
        />
      </div>
      <div
        className={`z-10 fixed flex flex-col gap-3 ${width} rounded-b bg-purple-secondary dark:bg-purple-secondary-dark ${
          isActive ? "" : "hidden" 
        }`}
      >
        {filteredList.slice(0, `${isSearchBar ? 10 : 5}`).map(({ id, name, image }: { id: string; name: string, image: string }) => {
          return isSearchBar ?  <Link
          className="flex gap-1 p-5 rounded bg-purple-secondary hover:bg-purple-hover dark:hover:bg-purple-hover-dark dark:bg-purple-secondary-dark"
          key={id}
          onClick={() => handleSelection()} href={`/coin/${id}`}
        >
          {name}
        </Link> :
          <div
          className="flex gap-1 p-5 rounded bg-purple-secondary hover:bg-purple-hover dark:hover:bg-purple-hover-dark dark:bg-purple-secondary-dark"
          key={id}
          onClick={() => handleSelection({id, name, image})}
      >
          {name}
      </div>;
        })}
      </div>
    </div>
  );
};
export default SearchCoinList;
