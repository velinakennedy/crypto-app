/* eslint-disable quotes */
import { useSelector, useDispatch } from "react-redux";
import { updateCurrency } from "../redux/features/currencySlice";
import { RootState } from "../redux/store";
import { HiCurrencyDollar } from "react-icons/hi2";
import { PiCurrencyBtcFill, PiCurrencyGbpFill } from "react-icons/pi";
import { FaEthereum } from "react-icons/fa";
import { AiFillEuroCircle } from "react-icons/ai";
import { CurrencyTypes } from "@/typings";
import { ReactNode, useEffect, useState } from "react";

const Dropdown = () => {
  const [isActive, setIsActive] = useState(false);
  const currency = useSelector((state: RootState) => state.currency.value);
  const dispatch = useDispatch();

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
      symbol: <HiCurrencyDollar className="text-2xl" />,
    },
    {
      name: "btc",
      symbol: <PiCurrencyBtcFill className="text-2xl" />,
    },
    {
      name: "eth",
      symbol: <FaEthereum className="text-2xl" />,
    },
    {
      name: "gbp",
      symbol: <PiCurrencyGbpFill className="text-2xl" />,
    },
    {
      name: "eur",
      symbol: <AiFillEuroCircle className="text-2xl" />,
    },
  ];

  useEffect(() => {
    const storedCurrency: string | null = localStorage.getItem("currency");
    if (storedCurrency) dispatch(updateCurrency(storedCurrency));
  });

  //finding symbol for main dropdown button
  const currentSymbol: ReactNode = currencyTypes.find(
    (element) => element.name == currency
  )!.symbol;

  return (
    <div
      className={`${
        isActive ? "rounded-t" : "rounded"
      } w-36 bg-purple-secondary dark:bg-purple-secondary-dark`}
    >
      <button
        className="flex items-center justify-center w-full h-full gap-1 rounded bg-purple-secondary dark:hover:bg-purple-hover-dark hover:bg-purple-hover dark:bg-purple-secondary-dark"
        onClick={handleToggle}
      >
        {currentSymbol}
        {currency.toUpperCase()}
      </button>

      <div
        className={`fixed flex flex-col gap-3 rounded-b w-36 bg-purple-secondary dark:bg-purple-secondary-dark ${
          isActive ? "" : "hidden"
        }`}
      >
        {currencyTypes.map(({ name, symbol }) => (
          <button
            className="flex items-center gap-1 p-5 px-10 rounded bg-purple-secondary hover:bg-purple-hover dark:hover:bg-purple-hover-dark dark:bg-purple-secondary-dark"
            key={name}
            onClick={() => handleSelect(name)}
          >
            {symbol}
            {name.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};
export default Dropdown;
