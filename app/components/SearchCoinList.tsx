"use client";
import Link from "next/link";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";

const SearchCoinList = ({ data }: { data: any }) => {
  const [isActive, setIsActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsActive(false);
    }
  };

  const filteredList = data.filter((element: any) =>
    element.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div
      className={`${
        isActive ? "rounded-t-lg" : "rounded-lg"
      } bg-purple-secondary dark:bg-purple-secondary-dark`} onBlur={(e) => handleBlur(e)}
    >
      <div className="flex items-center h-full gap-3 p-4 rounded-lg w-96 dark:hover:bg-purple-hover-dark bg-purple-secondary placeholder-purple-text hover:bg-purple-hover dark:bg-purple-secondary-dark">
        <CiSearch className="text-2xl" />
        <input
          className="w-full bg-transparent rounded-lg outline-none placeholder-purple-text dark:placeholder-gray-300"
          type="text"
          placeholder="Search..."
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsActive(true)}
        />
      </div>
      <div
        className={`z-10 fixed flex flex-col gap-3 w-96 rounded-b bg-purple-secondary dark:bg-purple-secondary-dark ${
          isActive ? "" : "hidden" 
        }`} 
      >
        {filteredList.slice(0, 10).map(({ id, name }: { id: string; name: string }) => (
            <Link
              className="flex gap-1 p-5 rounded bg-purple-secondary hover:bg-purple-hover dark:hover:bg-purple-hover-dark dark:bg-purple-secondary-dark"
              key={id}
              onClick={() => setIsActive(false)} href={`/coin/${id}`}
            >
              {name}
            </Link>
        ))}
      </div>
    </div>
  );
};
export default SearchCoinList;
