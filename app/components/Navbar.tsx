import { CiDark, CiSearch } from "react-icons/ci";
import { HiCurrencyDollar } from "react-icons/hi2";
import { GiCoins } from "react-icons/gi";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between h-full p-5 px-10 text-purple-text">
        <h1 className="flex gap-1 text-2xl font-bold"><GiCoins className="text-3xl" /> CoinTrade</h1>
        <div className="flex gap-7">
            <div className="flex items-center h-full gap-3 p-4 rounded-lg bg-purple-secondary bg-opacity-40 placeholder-purple-text">
                <CiSearch className="text-2xl" />
                <input className="bg-transparent rounded-lg outline-none placeholder-purple-text" type="text" placeholder="Search..." />
            </div>
            <button className="flex items-center gap-1 p-3 rounded-lg bg-purple-secondary bg-opacity-40"><HiCurrencyDollar className="text-2xl" /> USD</button>
            <button className="p-3 text-3xl rounded-lg bg-purple-secondary bg-opacity-40"><CiDark /></button>
        </div>
    </div>
  );
};
export default Navbar;