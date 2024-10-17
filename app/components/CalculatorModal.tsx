"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useGetPricesQuery } from "../redux/features/historicalCoinPriceSlice";
import { XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts";
import SearchCoinList from "./SearchCoinList";
import GradientButton from "./GradientButton";
import CalculatorItem from "./CalculatorItem";
import TooltipItem from "./TooltipItem";
import CalculatorChartTooltip from "./CalculatorChartTooltip";
import { calculateInvestment, intervalPrices } from "@/utils/calculateInvestment";
import { vcaText, dcaText, tooltipText } from "@/utils/investmentText";
import chartLabels from "@/utils/chartLabels";
import { FaCoins } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa6";
import { GoXCircle } from "react-icons/go";
import { CalcResult, CalculatorChartData, CalculatorInput, Coin, CoinMarketData, CoinData } from "@/typings";

const CalculatorModal = ({ handleCalculatorToggle, onCalculator }: { handleCalculatorToggle: VoidFunction; onCalculator: boolean }) => {
  const [coin, setCoin] = useState<CoinMarketData | Coin>({ name: "", id: "", image: "", symbol: "" });
  const [calculatorType, setCalculatorType] = useState<string>("VCA");
  const [skip, setSkip] = useState<boolean>(true);
  const [calcResult, setCalcResult] = useState<CalcResult>({ totalInvested: 0, coinsValue: 0 });
  const [CoinData, setCoinData] = useState<CoinData | undefined>(undefined);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [showChart, setShowChart] = useState<boolean>(false);
  const currency = useSelector((state: RootState) => state.currency.value);
  const [calculatorInput, setCalculatorInput] = useState<CalculatorInput>({
    from: new Date(new Date().getFullYear(), 0, 1).toISOString().slice(0, 16).toString(),
    to: new Date(Date.now()).toISOString().slice(0, 16).toString(),
    interval: undefined,
    investment: undefined,
    growth: undefined,
  });
  const [lineChartData, setLineChartData] = useState<CalculatorChartData[]>([]);
  const date = Date.now();
  const { currentData, isSuccess, isFetching } = useGetPricesQuery(
    {
      id: coin.id,
      currency,
      days: Math.ceil((date - Date.parse(calculatorInput.from)) / 86400000),
    },
    { skip }
  );

  const handleCalculatorInput = (inputType: string, input: number | string) => {
    switch (inputType) {
      case "from":
        if (typeof input === "string") {
          if (input.length < 1) {
            setCalculatorInput({ ...calculatorInput, from: "" });
          } else if (calculatorInput.to.length > 0 && Date.parse(input) < Date.parse(calculatorInput.to)) {
            setCalculatorInput({ ...calculatorInput, from: input });
          } else if (calculatorInput.to === "") {
            setCalculatorInput({ ...calculatorInput, from: input });
          }
        }
        break;
      case "to":
        if (typeof input === "string")
          if (input.length < 1) {
            setCalculatorInput({ ...calculatorInput, to: "" });
          } else if (calculatorInput.from.length > 0 && Date.parse(input) > Date.parse(calculatorInput.from)) {
            setCalculatorInput({ ...calculatorInput, to: input });
          } else if (calculatorInput.from === "") {
            setCalculatorInput({ ...calculatorInput, to: input });
          }
        break;
      case "interval":
        if (typeof input === "number") {
          if (input > 0) {
            setCalculatorInput({ ...calculatorInput, interval: input });
          } else {
            setCalculatorInput({ ...calculatorInput, interval: undefined });
          }
        }
        break;
      case "investment":
        if (typeof input === "number") {
          if (input > 0) {
            setCalculatorInput({ ...calculatorInput, investment: input });
          } else {
            setCalculatorInput({ ...calculatorInput, investment: undefined });
          }
        }
        break;
      case "growth":
        if (typeof input === "number") {
          if (input > 0) {
            setCalculatorInput({ ...calculatorInput, growth: input });
          } else {
            setCalculatorInput({ ...calculatorInput, growth: undefined });
          }
        }
        break;
      default:
        break;
    }
  };

  const handleCoin = (coin: CoinMarketData) => {
    setCoin(coin);
  };

  const handleCalculatorType = (type: string) => {
    if (calculatorType !== type) setCalculatorType(type);
  };

  const handleCalculation = () => {
    if (isValid && CoinData && calculatorInput.interval && calculatorInput.investment && calculatorInput.growth) {
      const pricesEachInterval = intervalPrices(
        CoinData.prices,
        Date.parse(calculatorInput.from),
        Date.parse(calculatorInput.to),
        calculatorInput.interval
      );
      const data: CalculatorChartData[] = [];
      pricesEachInterval.priceArray.forEach((price) => {
        const dataItem: CalculatorChartData = {
          day: chartLabels(price[0], "7d"),
          price: price[1],
        };
        data.push(dataItem);
      });
      setLineChartData(data);
      const calcResult = calculateInvestment(calculatorType, calculatorInput.investment, pricesEachInterval.intervalCoins, calculatorInput.growth);
      setCalcResult({ totalInvested: calcResult.totalInvested, coinsValue: calcResult.coinsValue });
    }
  };

  useEffect(() => {
    if (!onCalculator) {
      setCoin({ name: "", id: "", image: "", symbol: "" });
      setCalculatorInput({
        from: new Date(new Date().getFullYear(), 0, 1).toISOString().slice(0, 16).toString(),
        to: new Date(Date.now()).toISOString().slice(0, 16).toString(),
        interval: undefined,
        investment: undefined,
        growth: undefined,
      });
      setCalcResult({ totalInvested: 0, coinsValue: 0 });
      setCoinData(undefined);
      setSkip(true);
      setShowChart(false);
      setLineChartData([]);
    }
  }, [onCalculator]);

  useEffect(() => {
    calculatorInput.from.length > 0 && coin.id.length > 0 ? setSkip(false) : setSkip(true);
  }, [calculatorInput.from, coin.id]);

  useEffect(() => {
    if (isSuccess && currentData && !isFetching) {
      setCoinData(currentData);
      setSkip(true);
    }
  }, [currentData, isSuccess]);

  useEffect(() => {
    if (isFetching) setCoinData(undefined);
  }, [isFetching, CoinData]);

  useEffect(() => {
    if (
      calculatorInput.from.length > 0 &&
      calculatorInput.to.length > 0 &&
      calculatorInput.interval &&
      calculatorInput.investment &&
      calculatorInput.growth &&
      CoinData
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [calculatorInput, CoinData, coin]);

  return (
    <div
      className={`${
        onCalculator ? "" : "hidden"
      } z-10 h-full w-full fixed flex text-sm md:text-base justify-center dark:text-white text-purple-text top-0 left-0 items-center backdrop-blur-sm dark:backdrop-brightness-125`}
    >
      <div className="z-20 flex flex-col gap-5 bg-white dark:bg-dark-modal p-10 rounded-xl w-[36rem] md:w-[46rem] lg:w-[56rem] h-[85vh] max-h-[70rem] lg:max-h-[54rem] overflow-scroll scrollbar-hide">
        <div className="flex justify-between">
          <h2 className="text-2xl">Investments Calculator</h2>
          <button className="font-thin text-2xl" onClick={handleCalculatorToggle}>
            <GoXCircle />
          </button>
        </div>

        <div className="flex justify-between gap-2">
          <div className="flex justify-center items-center gap-4 bg-purple-secondary dark:bg-dark-modal-container p-2 rounded-lg w-1/3">
            <div className="flex justify-center items-center bg-purple-button dark:bg-dark-modal-icon dark:bg-opacity-30 p-2 rounded-lg">
              {coin.image.length > 0 ? (
                <Image loader={() => coin.image} src={coin.image} width={30} height={30} alt="coin logo" className="w-[20px] h-[20px]" />
              ) : (
                <FaCoins className="w-[20px] h-[20px] text-white" />
              )}
            </div>
            <div className="md:inline-block hidden text-center">{coin.name}</div>
          </div>
          <div className="w-full">
            <SearchCoinList
              isSearchBar={false}
              placeholderText="Select Coin"
              width="w-full"
              color="bg-purple-secondary"
              handleCoin={handleCoin}
              clearInput={!onCalculator}
            />
          </div>
        </div>

        <div className="flex gap-4 w-full text-sm md:text-base">
          {calculatorType === "VCA" ? (
            <GradientButton title="Value Cost Averaging" action={() => handleCalculatorType("VCA")} width="w-full" />
          ) : (
            <button
              className="bg-purple-secondary dark:bg-dark-modal-icon p-[1.3px] rounded-lg w-full dark:text-gray-400"
              onClick={() => handleCalculatorType("VCA")}
            >
              Value Cost Averaging
            </button>
          )}
          {calculatorType === "DCA" ? (
            <GradientButton title="Dollar Cost Averaging" action={() => handleCalculatorType("DCA")} width="w-full" />
          ) : (
            <button
              className="bg-purple-secondary dark:bg-dark-modal-icon p-[1.3px] rounded-lg w-full dark:text-gray-400"
              onClick={() => handleCalculatorType("DCA")}
            >
              Dollar Cost Averaging
            </button>
          )}
        </div>

        <div className="flex lg:flex-row flex-col gap-4">
          <button
            className="flex justify-center items-center bg-slate-100 dark:bg-dark-modal-container px-3 py-3 rounded-lg w-full lg:w-20 text-teal-500 dark:text-teal-positive"
            onClick={() => setShowChart(!showChart)}
            disabled={calcResult.coinsValue === 0 && calcResult.totalInvested === 0}
          >
            <FaChartLine />
          </button>
          <div className="flex items-center gap-3 bg-slate-100 dark:bg-dark-modal-container px-3 py-3 rounded-lg w-full min-h-6 appearance-none">
            <TooltipItem content={tooltipText.start} placement="right-start" color="dark:!bg-teal-700 !bg-teal-500" iconColor="purple-button" />
            <div className="flex-col w-full">
              <label htmlFor="startDate" className="text-sm">
                Enter start date
              </label>
              <input
                id="startDate"
                className="block bg-transparent w-full min-h-6 text-teal-500 dark:text-teal-positive appearance-none"
                type="datetime-local"
                placeholder="start date here"
                onChange={(e) => handleCalculatorInput("from", e.target.value)}
                value={calculatorInput.from}
              />
            </div>
          </div>
          <div className="flex items-center gap-3 bg-slate-100 dark:bg-dark-modal-container px-3 py-3 rounded-lg w-full min-h-6 appearance-none">
            <TooltipItem content={tooltipText.end} placement="right-start" color="dark:!bg-teal-700 !bg-teal-500" iconColor="purple-button" />
            <div className="flex-col w-full">
              <label htmlFor="endDate" className="text-sm">
                Enter end date
              </label>
              <input
                id="endDate"
                className="block bg-transparent w-full min-h-6 text-teal-500 dark:text-teal-positive appearance-none"
                type="datetime-local"
                onChange={(e) => handleCalculatorInput("to", e.target.value)}
                value={calculatorInput.to}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 bg-slate-100 dark:bg-purple-market px-6 py-4 rounded-lg">
          <div
            className={`relative flex flex-col justify-center items-center bg-purple-secondary dark:bg-purple-secondary-dark p-10 rounded-lg w-full h-[30vh] min-h-72 ${
              showChart ? "" : "hidden"
            }`}
          >
            <h1 className="pb-5 font-bold text-2xl text-purple-text md:text-lg dark:text-white self-start">{coin.name}</h1>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={lineChartData}>
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#04bfb4" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#04bfb4" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" />
                <YAxis dataKey="price" domain={["auto", "dataMax"]} hide />
                <Tooltip content={<CalculatorChartTooltip />} />
                <Legend />
                <Area dataKey="price" type="natural" fill="url(#gradient)" fillOpacity={0.4} stroke="#04bfb4" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className={`${showChart ? "hidden" : ""}`}>
            <CalculatorItem
              title="Contribution interval, days"
              isInput={true}
              content={tooltipText.interval}
              action={handleCalculatorInput}
              placeholder="Minimum 1"
              inputType="interval"
              value={calculatorInput.interval}
            />
            <CalculatorItem
              title="Initial investment, $"
              isInput={true}
              content={tooltipText.investment}
              action={handleCalculatorInput}
              placeholder="Minimum $1"
              inputType="investment"
              value={calculatorInput.investment}
            />
            <CalculatorItem
              title={calculatorType === "VCA" ? "Grow rate per interval, %" : "Funds added per interval, $"}
              isInput={true}
              content={tooltipText.growth}
              action={handleCalculatorInput}
              placeholder={calculatorType === "VCA" ? "Minimum 1%" : "Minimum $1"}
              inputType="growth"
              value={calculatorInput.growth}
            />
            <CalculatorItem title="Total amount spent on investments" isInput={false} content={tooltipText.total} result={calcResult.totalInvested} />
            <CalculatorItem title="Coins value, $" isInput={false} content={tooltipText.value} result={calcResult.coinsValue} isLast />
          </div>
        </div>

        {isValid ? (
          <GradientButton title={`Calculate (${calculatorType})`} action={handleCalculation} width="w-full" />
        ) : (
          <button
            className="bg-light-modal-container dark:bg-purple-secondary-dark opacity-70 p-[0.83rem] rounded-lg w-full dark:text-gray-400"
            disabled
          >
            {`Calculate (${calculatorType})`}
          </button>
        )}

        <p className="opacity-70 font-thin text-xs md:text-sm">{calculatorType === "VCA" ? vcaText : dcaText}</p>
      </div>
    </div>
  );
};
export default CalculatorModal;
