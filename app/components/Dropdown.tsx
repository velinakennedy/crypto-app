/* eslint-disable quotes */
import { useSelector, useDispatch } from "react-redux";
import { updateCurrency } from "../redux/features/currencySlice";
import { RootState } from "../redux/store";
import { HiCurrencyDollar } from "react-icons/hi2";
import { PiCurrencyBtcFill, PiCurrencyGbpFill } from "react-icons/pi";
import { FaEthereum } from "react-icons/fa";
import { AiFillEuroCircle } from "react-icons/ai";
import { CurrencyTypes } from "@/typings";
import { ReactNode, useEffect, useRef, useState } from "react";

const Dropdown = () => {
  const [isActive, setIsActive] = useState(false);
  const currency = useSelector((state: RootState) => state.currency.value);
  const dispatch = useDispatch();
  const dropdown = useRef<HTMLDivElement | null>(null);

  const handleToggle = () => {
    setIsActive(!isActive);
  };
  const handleSelect = (newCurrency: string) => {
    localStorage.setItem("currency", newCurrency);
    dispatch(updateCurrency(newCurrency));
    handleToggle();
  };

  const currencyTypes: CurrencyTypes[] = [
    {
      name: "usd",
      symbol: <HiCurrencyDollar />,
    },
    {
      name: "btc",
      symbol: <PiCurrencyBtcFill />,
    },
    {
      name: "eth",
      symbol: <FaEthereum />,
    },
    {
      name: "gbp",
      symbol: <PiCurrencyGbpFill />,
    },
    {
      name: "eur",
      symbol: <AiFillEuroCircle />,
    },
  ];

  useEffect(() => {
    const storedCurrency: string | null = localStorage.getItem("currency");
    if (storedCurrency) dispatch(updateCurrency(storedCurrency));
  }, []);

  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      if (!dropdown.current?.contains(e.target as Node)) {
        setIsActive(false);
      }
    };
    document.body.addEventListener("click", closeDropdown);
    return () => document.body.removeEventListener("click", closeDropdown);
  }, []);

  const currentSymbol: ReactNode = currencyTypes.find((element) => element.name == currency)!.symbol;

  return (
    <div
      className={`${isActive ? "rounded-t" : "rounded"} w-36 xs:w-20 lg:w-36 bg-purple-secondary dark:bg-purple-secondary-dark z-10 relative`}
      ref={dropdown}
    >
      <button
        className="flex justify-center items-center gap-1 bg-purple-secondary dark:hover:bg-purple-hover-dark hover:bg-purple-hover dark:bg-purple-secondary-dark rounded w-full h-full"
        onClick={handleToggle}
      >
        <span className="text-2xl">{currentSymbol}</span>
        <div className="lg:inline-block xs:hidden">{currency.toUpperCase()}</div>
      </button>

      <div className={`absolute flex flex-col gap-3 rounded-b w-full bg-purple-secondary dark:bg-purple-secondary-dark ${isActive ? "" : "hidden"}`}>
        {currencyTypes.map(({ name, symbol }) => {
          if (currency !== name)
            return (
              <button
                className="flex justify-center items-center gap-1 bg-purple-secondary hover:bg-purple-hover dark:hover:bg-purple-hover-dark dark:bg-purple-secondary-dark p-5 rounded text-xs lg:text-base"
                key={name}
                onClick={() => handleSelect(name)}
              >
                <span className="text-lg lg:text-2xl">{symbol}</span>
                {name.toUpperCase()}
              </button>
            );
        })}
      </div>
    </div>
  );
};
export default Dropdown;
