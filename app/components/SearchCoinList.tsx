import { useState } from "react";
import { CiSearch } from "react-icons/ci";

const SearchCoinList = ({ data }: { data: any }) => {
  const [isActive, setIsActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const filteredList = data.filter((element: any) =>
    element.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  return (
    <div
      className={`${
        isActive ? "rounded-t-lg" : "rounded-lg"
      } bg-purple-secondary dark:bg-purple-secondary-dark`}
    >
      <div className="flex items-center h-full gap-3 p-4 rounded-lg w-96 dark:hover:bg-purple-hover-dark bg-purple-secondary placeholder-purple-text hover:bg-purple-hover dark:bg-purple-secondary-dark">
        <CiSearch className="text-2xl" />
        <input
          className="w-full bg-transparent rounded-lg outline-none placeholder-purple-text dark:placeholder-gray-300"
          type="text"
          placeholder="Search..."
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
        />
      </div>
      <div
        className={`fixed flex flex-col gap-3 w-96 rounded-b bg-purple-secondary dark:bg-purple-secondary-dark h-96 overflow-y-scroll ${
          isActive ? "" : "hidden"
        }`}
      >
        {filteredList.map(({ id, name }: { id: string; name: string }) => (
          <button
            className="flex gap-1 p-5 rounded bg-purple-secondary hover:bg-purple-hover dark:hover:bg-purple-hover-dark dark:bg-purple-secondary-dark"
            key={id}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
};
export default SearchCoinList;
